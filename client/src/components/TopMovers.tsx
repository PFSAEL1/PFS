// TopMovers — PFS Filters
// 4-card discovery grid: no prices, no Add to Cart
// Fetches top 4 products from Shopify, displays as discovery cards
import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { Loader2 } from 'lucide-react';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';

const FALLBACK_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/filter-product_42a81f27.jpg';

export const TopMovers = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts(12)
      .then((data) => {
        setProducts(
          data
            .filter((p) => !p.node.title.toLowerCase().includes('membership'))
            .slice(0, 4)
        );
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-16 px-4" style={{ backgroundColor: '#080808' }}>
        <div className="flex justify-center py-16">
          <Loader2 className="h-7 w-7 animate-spin text-white/30" />
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="py-16 px-4" style={{ backgroundColor: '#080808' }}>
      <div className="max-w-5xl mx-auto">
        {/* Eyebrow */}
        <div className="flex justify-center mb-3">
          <span className="bg-white/5 border border-white/10 rounded-full text-blue-400 text-xs tracking-widest font-medium px-4 py-1.5 inline-flex items-center gap-2 uppercase">
            Top Movers
          </span>
        </div>
        <h2 className="text-white text-2xl font-semibold text-center mt-2">
          Most ordered this month
        </h2>
        <p className="text-white/60 text-sm text-center mt-2 mb-8">
          The filters 1,200+ shops keep coming back for.
        </p>

        {/* 4-card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-0 md:px-6">
          {products.map((product) => {
            const image = product.node.images.edges[0]?.node.url || FALLBACK_IMAGE;
            const variantCount = product.node.variants.edges.length;
            const variantHint = variantCount > 1 ? `Available in ${variantCount} sizes` : 'One size available';

            return (
              <Link key={product.node.id} href={`/product/${product.node.handle}`}>
                <div className="bg-[#111111] border border-white/[0.08] rounded-xl overflow-hidden hover:border-white/20 hover:scale-[1.02] transition-all duration-200 cursor-pointer h-full flex flex-col">
                  {/* Image area */}
                  <div className="h-[180px] bg-[#1a1a1a] flex items-center justify-center p-4">
                    <img
                      src={image}
                      alt={product.node.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  {/* Card body */}
                  <div className="px-4 pb-4 pt-3 flex flex-col flex-1">
                    <h3 className="text-white/90 font-medium text-sm leading-snug line-clamp-2">
                      {product.node.title}
                    </h3>
                    <p className="text-white/40 text-xs mt-1">{variantHint}</p>
                    <span className="text-blue-400 text-xs font-medium mt-3">Shop Now →</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
