/**
 * LightShop — Editorial product grid for the light design
 * Design: Clean white grid, Playfair titles, Space Mono labels, blue accent
 */

import { useEffect, useState } from "react";
import { Link } from "wouter";
import LightLayout from "../../components/light/LightLayout";
import { fetchProducts, ShopifyProduct } from "../../lib/shopify";
import { useCartStore } from "../../stores/cartStore";

export default function LightShop() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setCartOpen);
  const [addingId, setAddingId] = useState<string | null>(null);

  const filters = ["All", "Fiberglass", "Tacky", "Ceiling", "Roll Media"];

  useEffect(() => {
    fetchProducts(50).then(p => { setProducts(p); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const filtered = filter === "All" ? products : products.filter(p =>
    p.node.title.toLowerCase().includes(filter.toLowerCase())
  );

  const handleAddToCart = (product: ShopifyProduct) => {
    const p = product.node;
    const variantId = p.variants?.edges?.[0]?.node?.id;
    if (!variantId) return;
    setAddingId(p.id);
    addItem({
      variantId,
      productId: p.id,
      title: p.title,
      variantTitle: "",
      price: { amount: p.priceRange?.minVariantPrice?.amount || "0", currencyCode: p.priceRange?.minVariantPrice?.currencyCode || "USD" },
      quantity: 1,
      image: p.images?.edges?.[0]?.node?.url || "",
      handle: p.handle,
    });
    setCartOpen(true);
    setTimeout(() => setAddingId(null), 800);
  };

  return (
    <LightLayout>
      {/* Header */}
      <section style={{ background: "#F4F2EE", padding: "10rem 2rem 4rem" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#1B4FD8", marginBottom: "1rem" }}>
            All Products
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(3rem, 6vw, 6rem)", fontWeight: 700, color: "#111", letterSpacing: "-0.02em", lineHeight: 1 }}>
            Shop Filters
          </h1>
        </div>
      </section>

      {/* Filter tabs */}
      <section style={{ background: "#fff", borderBottom: "1px solid #E5E2DC", position: "sticky", top: "72px", zIndex: 50 }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 2rem", display: "flex", gap: "0", overflowX: "auto" }}>
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: "1rem 1.5rem",
                background: "transparent",
                border: "none",
                borderBottom: filter === f ? "2px solid #111" : "2px solid transparent",
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: filter === f ? "#111" : "#888",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "color 0.2s",
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* Product grid */}
      <section style={{ background: "#fff", padding: "4rem 2rem 7rem" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          {loading ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
              {[...Array(8)].map((_, i) => (
                <div key={i} style={{ background: "#F4F2EE", height: "400px", animation: "lpulse 1.5s ease-in-out infinite", animationDelay: `${i * 0.1}s` }} />
              ))}
              <style>{`@keyframes lpulse { 0%,100%{opacity:1} 50%{opacity:0.5} }`}</style>
            </div>
          ) : (
            <>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", marginBottom: "2rem" }}>
                {filtered.length} Products
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
                {filtered.map(product => {
                  const p = product.node;
                  const price = parseFloat(p.priceRange?.minVariantPrice?.amount || "0");
                  const imgUrl = p.images?.edges?.[0]?.node?.url;
                  const isAdding = addingId === p.id;

                  return (
                    <div key={p.id} style={{ border: "1px solid #E5E2DC", overflow: "hidden", transition: "box-shadow 0.3s" }}
                      onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.08)")}
                      onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
                    >
                      <Link href={`/product/${p.handle}`}>
                        <a style={{ display: "block", overflow: "hidden", aspectRatio: "1/1", background: "#F4F2EE" }}>
                          {imgUrl ? (
                            <img src={imgUrl} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)" }}
                              onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
                              onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                            />
                          ) : (
                            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", color: "#ccc" }}>NO IMAGE</span>
                            </div>
                          )}
                        </a>
                      </Link>
                      <div style={{ padding: "1.25rem" }}>
                        <Link href={`/product/${p.handle}`}>
                          <a style={{ textDecoration: "none" }}>
                            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 700, color: "#111", marginBottom: "0.4rem", lineHeight: 1.3, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                              {p.title}
                            </h3>
                          </a>
                        </Link>
                        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#1B4FD8", marginBottom: "1rem" }}>${price.toFixed(2)}</p>
                        <button
                          onClick={() => handleAddToCart(product)}
                          disabled={isAdding}
                          style={{ width: "100%", padding: "0.7rem", background: isAdding ? "#E5E2DC" : "#111", color: isAdding ? "#888" : "#fff", border: "none", cursor: isAdding ? "not-allowed" : "pointer", fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", transition: "background 0.2s" }}
                          onMouseEnter={e => { if (!isAdding) e.currentTarget.style.background = "#1B4FD8"; }}
                          onMouseLeave={e => { if (!isAdding) e.currentTarget.style.background = "#111"; }}
                        >
                          {isAdding ? "Adding..." : "Add to Cart"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>
    </LightLayout>
  );
}
