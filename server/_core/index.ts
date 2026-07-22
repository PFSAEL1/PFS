import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);

  // Consumable product checkout via Shopify Admin draft order
  // Bypasses Storefront Cart API inventory issue for new products
  app.post('/api/consumable-checkout', async (req, res) => {
    try {
      const shopDomain = process.env.SHOPIFY_SHOP_DOMAIN || 'abc-filter-splash-rwyxj.myshopify.com';
      const adminToken = process.env.SHOPIFY_ADMIN_TOKEN;
      if (!adminToken) {
        return res.status(500).json({ error: 'Admin token not configured' });
      }

      const { variantId, quantity = 1, email } = req.body;
      if (!variantId) {
        return res.status(400).json({ error: 'Missing variantId' });
      }

      // Extract numeric variant ID from GID format
      const match = String(variantId).match(/(\d+)$/);
      const numericId = match ? parseInt(match[1], 10) : parseInt(variantId, 10);

      // Create draft order
      const draftPayload = {
        draft_order: {
          line_items: [{ variant_id: numericId, quantity: quantity }],
          ...(email ? { email } : {}),
          use_customer_default_address: true
        }
      };

      const createResp = await fetch(
        `https://${shopDomain}/admin/api/2024-04/draft_orders.json`,
        {
          method: 'POST',
          headers: {
            'X-Shopify-Access-Token': adminToken,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(draftPayload)
        }
      );

      if (!createResp.ok) {
        const errText = await createResp.text();
        console.error('[Consumable Checkout] Draft order failed:', errText);
        return res.status(500).json({ error: 'Failed to create order', details: errText });
      }

      const { draft_order } = await createResp.json() as any;
      return res.json({
        success: true,
        checkoutUrl: draft_order.invoice_url,
        orderId: draft_order.id
      });
    } catch (err: any) {
      console.error('[Consumable Checkout] Error:', err);
      return res.status(500).json({ error: err.message });
    }
  });

  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
