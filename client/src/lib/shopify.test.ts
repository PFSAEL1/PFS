import { afterEach, describe, expect, it, vi } from "vitest";
import {
  CartItem,
  createStorefrontCheckout,
  getCartItemPurchaseType,
  getCartLineKey,
  isMonthlySellingPlan,
  productMatchesCategory,
  SellingPlan,
  ShopifyProduct,
  validateCartItemsForCheckout,
} from "./shopify";

const MONTHLY_PLAN_ID = "gid://shopify/SellingPlan/monthly";

const plan = (name: string, optionValue: string): SellingPlan => ({
  id: `gid://shopify/SellingPlan/${name}`,
  name,
  description: null,
  options: [{ name: "Delivery frequency", value: optionValue }],
  recurringDeliveries: true,
});

const cartItem = (overrides: Partial<CartItem> = {}): CartItem => ({
  variantId: "gid://shopify/ProductVariant/1",
  productId: "gid://shopify/Product/1",
  title: "Filter",
  variantTitle: "Default Title",
  price: { amount: "100.00", currencyCode: "USD" },
  quantity: 1,
  handle: "filter",
  purchaseType: "one-time",
  ...overrides,
});

const categoryProduct = (
  title: string,
  productType = "",
  tags: string[] = []
): ShopifyProduct => ({
  node: {
    id: `gid://shopify/Product/${title}`,
    title,
    handle: title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    description: "",
    productType,
    tags,
    priceRange: { minVariantPrice: { amount: "1.00", currencyCode: "USD" } },
    images: { edges: [] },
    variants: { edges: [] },
    options: [],
  },
});

const shopifyCartResponse = (sellingPlanId: string | null) => ({
  data: {
    cartCreate: {
      cart: {
        id: "gid://shopify/Cart/test",
        checkoutUrl: "https://example.myshopify.com/checkouts/test",
        totalQuantity: 1,
        cost: {
          totalAmount: { amount: "95.00", currencyCode: "USD" },
          subtotalAmount: { amount: "95.00", currencyCode: "USD" },
        },
        discountCodes: [],
        lines: {
          edges: [
            {
              node: {
                id: "gid://shopify/CartLine/test",
                quantity: 1,
                merchandise: { id: "gid://shopify/ProductVariant/1" },
                sellingPlanAllocation: sellingPlanId
                  ? { sellingPlan: { id: sellingPlanId, name: "Monthly" } }
                  : null,
              },
            },
          ],
        },
      },
      userErrors: [],
    },
  },
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("Shopify monthly subscriptions", () => {
  it("accepts only a recurring one-month selling plan", () => {
    expect(
      isMonthlySellingPlan(
        plan("Deliver every month, 5% off", "Deliver every month")
      )
    ).toBe(true);
    expect(isMonthlySellingPlan(plan("Subscribe & Save", "1 Month"))).toBe(
      true
    );
    expect(isMonthlySellingPlan(plan("Monthly delivery", "Monthly"))).toBe(
      true
    );
    expect(isMonthlySellingPlan(plan("Bi-monthly delivery", "Bi-monthly"))).toBe(
      false
    );
    expect(
      isMonthlySellingPlan(plan("Semi-monthly delivery", "Semi-monthly"))
    ).toBe(false);
    expect(
      isMonthlySellingPlan(
        plan("Deliver every 2 months, 5% off", "Deliver every 2 months")
      )
    ).toBe(false);
    expect(
      isMonthlySellingPlan(
        plan("Deliver every 3 months, 5% off", "Deliver every 3 months")
      )
    ).toBe(false);
    expect(
      isMonthlySellingPlan({
        ...plan("Monthly", "Monthly"),
        recurringDeliveries: false,
      })
    ).toBe(false);
  });

  it("keeps one-time and subscription purchases of the same variant separate", () => {
    const oneTime = cartItem();
    const subscription = cartItem({
      purchaseType: "subscription",
      sellingPlanId: MONTHLY_PLAN_ID,
    });

    expect(getCartLineKey(oneTime)).not.toBe(getCartLineKey(subscription));
    expect(getCartLineKey(subscription)).toContain(MONTHLY_PLAN_ID);
  });

  it("preserves legacy cart semantics while making new purchase types explicit", () => {
    expect(getCartItemPurchaseType(cartItem({ purchaseType: undefined }))).toBe(
      "one-time"
    );
    expect(
      getCartItemPurchaseType(
        cartItem({ purchaseType: undefined, sellingPlanId: MONTHLY_PLAN_ID })
      )
    ).toBe("subscription");
  });

  it("blocks checkout when a subscription has no verified selling plan", () => {
    expect(() =>
      validateCartItemsForCheckout([
        cartItem({ purchaseType: "subscription", sellingPlanId: undefined }),
      ])
    ).toThrow("monthly subscription could not be verified");
  });

  it("sends the selling-plan ID and accepts only Shopify-confirmed allocation", async () => {
    const fetchMock = vi.fn(async (_input: RequestInfo | URL, init?: RequestInit) => {
      const body = JSON.parse(String(init?.body));
      expect(body.variables.input.lines[0]).toEqual({
        quantity: 1,
        merchandiseId: "gid://shopify/ProductVariant/1",
        sellingPlanId: MONTHLY_PLAN_ID,
      });
      return new Response(JSON.stringify(shopifyCartResponse(MONTHLY_PLAN_ID)), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    });
    vi.stubGlobal("fetch", fetchMock);

    const checkoutUrl = await createStorefrontCheckout([
      cartItem({
        purchaseType: "subscription",
        sellingPlanId: MONTHLY_PLAN_ID,
      }),
    ]);

    expect(checkoutUrl).toBe("https://example.myshopify.com/checkouts/test");
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("stops checkout when Shopify returns the line without its selling plan", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        new Response(JSON.stringify(shopifyCartResponse(null)), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        })
      )
    );

    await expect(
      createStorefrontCheckout([
        cartItem({
          purchaseType: "subscription",
          sellingPlanId: MONTHLY_PLAN_ID,
        }),
      ])
    ).rejects.toThrow("Shopify did not confirm the monthly subscription");
  });
});

describe("Shopify category classification", () => {
  it("keeps the fiberglass arrestor category strictly fiberglass-only", () => {
    expect(
      productMatchesCategory(
        categoryProduct("22-Gram Fiberglass Paint Arrestor Pads", "Paint Arrestor", [
          "fiberglass",
          "exhaust-filters",
        ]),
        "fiberglass-arrestors"
      )
    ).toBe(true);
    expect(
      productMatchesCategory(
        categoryProduct("15-Gram Fiberglass Paint Arrestor Roll"),
        "fiberglass-arrestors"
      )
    ).toBe(true);

    for (const nonFiberglassProduct of [
      categoryProduct("Paint Pockets Paint Arrestor Media", "Paint Arrestor", [
        "paint-pockets",
        "exhaust-filters",
      ]),
      categoryProduct("Andreae Accordion Style Paint Arrestors", "Paint Arrestor"),
      categoryProduct('20x20 Paint Arrestor Holding Grids', "Accessories", [
        "holding-grids",
      ]),
    ]) {
      expect(
        productMatchesCategory(nonFiberglassProduct, "fiberglass-arrestors")
      ).toBe(false);
    }
  });
});
