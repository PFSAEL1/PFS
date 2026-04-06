/**
 * LightProductSlider — Horizontal swipeable product slider for the light design
 * Fetches real Shopify products, renders editorial-style cards with Add to Cart
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { fetchProducts, ShopifyProduct } from "../../lib/shopify";
import { useCartStore } from "../../stores/cartStore";

export default function LightProductSlider() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);
  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setCartOpen);
  const [addingId, setAddingId] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts(8).then(p => { setProducts(p); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const handleAddToCart = async (product: ShopifyProduct) => {
    const variantId = product.node.variants?.edges?.[0]?.node?.id;
    if (!variantId) return;
    setAddingId(product.node.id);
    try {
      addItem({
        variantId,
        productId: product.node.id,
        title: product.node.title,
        variantTitle: "",
        price: {
          amount: product.node.priceRange?.minVariantPrice?.amount || "0",
          currencyCode: product.node.priceRange?.minVariantPrice?.currencyCode || "USD",
        },
        quantity: 1,
        image: product.node.images?.edges?.[0]?.node?.url || "",
        handle: product.node.handle,
      });
      setCartOpen(true);
    } finally {
      setAddingId(null);
    }
  };

  const scroll = (dir: "left" | "right") => {
    const el = sliderRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div style={{ display: "flex", gap: "1.5rem", overflow: "hidden" }}>
        {[...Array(4)].map((_, i) => (
          <div key={i} style={{ minWidth: "280px", background: "#F4F2EE", height: "380px", flexShrink: 0, animation: "lpulse 1.5s ease-in-out infinite", animationDelay: `${i * 0.15}s` }} />
        ))}
        <style>{`@keyframes lpulse { 0%,100%{opacity:1} 50%{opacity:0.5} }`}</style>
      </div>
    );
  }

  if (!products.length) return null;

  return (
    <div style={{ position: "relative" }}>
      {/* Arrow controls */}
      <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem", justifyContent: "flex-end" }}>
        {(["←", "→"] as const).map((arrow, i) => (
          <button
            key={arrow}
            onClick={() => scroll(i === 0 ? "left" : "right")}
            style={{
              width: "44px",
              height: "44px",
              border: "1px solid #E5E2DC",
              background: "transparent",
              cursor: "pointer",
              fontFamily: "'Barlow Condensed', 'Barlow', sans-serif",
              fontSize: "1rem",
              color: "#111",
              transition: "all 0.2s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "#111"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#111"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#111"; e.currentTarget.style.borderColor = "#E5E2DC"; }}
          >
            {arrow}
          </button>
        ))}
      </div>

      {/* Slider */}
      <div
        ref={sliderRef}
        style={{
          display: "flex",
          gap: "1.5rem",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          paddingBottom: "0.5rem",
        }}
      >
        {products.map((product) => {
          const p = product.node;
          const price = parseFloat(p.priceRange?.minVariantPrice?.amount || "0");
          const imgUrl = p.images?.edges?.[0]?.node?.url;
          const isAdding = addingId === p.id;

          return (
            <div
              key={p.id}
              style={{
                minWidth: "280px",
                maxWidth: "280px",
                flexShrink: 0,
                scrollSnapAlign: "start",
                background: "#fff",
                border: "1px solid #E5E2DC",
                overflow: "hidden",
                transition: "box-shadow 0.3s",
              }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.08)")}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
            >
              {/* Image */}
              <Link href={`/product/${p.handle}`}>
                <a style={{ display: "block", overflow: "hidden", aspectRatio: "1/1", background: "#F4F2EE" }}>
                  {imgUrl ? (
                    <img
                      src={imgUrl}
                      alt={p.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)" }}
                      onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
                      onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                    />
                  ) : (
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontFamily: "'Barlow Condensed', 'Barlow', sans-serif", fontSize: "0.6rem", letterSpacing: "0.1em", color: "#ccc" }}>NO IMAGE</span>
                    </div>
                  )}
                </a>
              </Link>

              {/* Info */}
              <div style={{ padding: "1.25rem" }}>
                <Link href={`/product/${p.handle}`}>
                  <a style={{ textDecoration: "none" }}>
                    <h3 style={{
                      fontFamily: "'Barlow Condensed', 'Barlow', sans-serif",
                      fontSize: "0.95rem",
                      fontWeight: 700,
                      color: "#111",
                      marginBottom: "0.4rem",
                      lineHeight: 1.3,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}>
                      {p.title}
                    </h3>
                  </a>
                </Link>
                <p style={{ fontFamily: "'Barlow Condensed', 'Barlow', sans-serif", fontSize: "0.75rem", color: "#1B4FD8", marginBottom: "1rem" }}>
                  ${price.toFixed(2)}
                </p>
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={isAdding}
                  style={{
                    width: "100%",
                    padding: "0.7rem",
                    background: isAdding ? "#E5E2DC" : "#111",
                    color: isAdding ? "#888" : "#fff",
                    border: "none",
                    cursor: isAdding ? "not-allowed" : "pointer",
                    fontFamily: "'Barlow Condensed', 'Barlow', sans-serif",
                    fontSize: "0.6rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={e => { if (!isAdding) e.currentTarget.style.background = "#1B4FD8"; }}
                  onMouseLeave={e => { if (!isAdding) e.currentTarget.style.background = "#111"; }}
                >
                  {isAdding ? "Adding..." : "Add to Cart"}
                </button>
              </div>
            </div>
          );
        })}

        {/* View All card */}
        <Link href="/light/shop">
          <a style={{
            minWidth: "200px",
            flexShrink: 0,
            scrollSnapAlign: "start",
            border: "1px dashed #E5E2DC",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            textDecoration: "none",
            padding: "2rem",
            transition: "border-color 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = "#1B4FD8")}
            onMouseLeave={e => (e.currentTarget.style.borderColor = "#E5E2DC")}
          >
            <div style={{ width: "48px", height: "48px", border: "1px solid #111", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.25rem" }}>→</div>
            <p style={{ fontFamily: "'Barlow Condensed', 'Barlow', sans-serif", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#111", textAlign: "center" }}>View All Products</p>
          </a>
        </Link>
      </div>

      <style>{`div::-webkit-scrollbar{display:none}`}</style>
    </div>
  );
}
