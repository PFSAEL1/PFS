import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { createBreadcrumbSchema } from '@/lib/structuredData';
import { Ruler, ArrowRight, Star, Package, Loader2, ShoppingCart } from 'lucide-react';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';
import { ProductBadges } from '@/components/ProductBadge';
import { getProductBadges } from '@/lib/productSignals';
import { usePricing, getDiscountedPrice } from '@/hooks/usePricing';

const breadcrumbSchema = createBreadcrumbSchema([
  { name: 'Home', url: 'https://pfsfilters.com' },
  { name: 'Shop by Size', url: 'https://pfsfilters.com/shop-by-size' },
]);

/**
 * Extract all WxH sizes from a product's title, option values, and variant titles.
 * Returns an array of normalized size strings like "20x20", "20x25", etc.
 */
function extractSizesFromProduct(product: ShopifyProduct): string[] {
  const sizeRegex = /(\d+(?:\.\d+)?)\s*[""]?\s*x\s*(\d+(?:\.\d+)?)/gi;
  const sizes = new Set<string>();

  // Check product title
  const titleMatches = [...product.node.title.matchAll(sizeRegex)];
  titleMatches.forEach(m => sizes.add(`${m[1]}x${m[2]}`));

  // Check option values
  product.node.options?.forEach(opt => {
    opt.values.forEach(val => {
      const matches = [...val.matchAll(sizeRegex)];
      matches.forEach(m => sizes.add(`${m[1]}x${m[2]}`));
    });
  });

  // Check variant titles
  product.node.variants.edges.forEach(v => {
    const matches = [...v.node.title.matchAll(sizeRegex)];
    matches.forEach(m => sizes.add(`${m[1]}x${m[2]}`));
  });

  return [...sizes];
}

/**
 * Determine if a size is a "pad" size (both dimensions <= 50) vs a roll/large format.
 * We only show pad/panel sizes in the grid since those are what customers search by.
 */
function isPadSize(size: string): boolean {
  const parts = size.split('x');
  const w = parseFloat(parts[0]);
  const h = parseFloat(parts[1]);
  // Pad/panel sizes: both dimensions are reasonable panel sizes (not rolls like 20x100)
  return w <= 60 && h <= 60;
}

const FALLBACK_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/filter-product_42a81f27.jpg';

export default function ShopBySize() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [sizeMap, setSizeMap] = useState<Map<string, ShopifyProduct[]>>(new Map());
  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setCartOpen);
  const { discountPercent, tier } = usePricing();

  useEffect(() => {
    fetchProducts(50)
      .then((data) => {
        const filtered = data.filter(
          (p) =>
            !p.node.title.toLowerCase().includes('membership') &&
            p.node.title.toLowerCase() !== 'platinum' &&
            p.node.title.toLowerCase() !== 'test'
        );
        setProducts(filtered);

        // Build size → products map
        const map = new Map<string, ShopifyProduct[]>();
        filtered.forEach((product) => {
          const sizes = extractSizesFromProduct(product);
          sizes.forEach((size) => {
            if (isPadSize(size)) {
              if (!map.has(size)) map.set(size, []);
              map.get(size)!.push(product);
            }
          });
        });
        setSizeMap(map);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (product: ShopifyProduct) => {
    const variant = product.node.variants.edges[0]?.node;
    if (!variant) return;
    addItem({
      variantId: variant.id,
      productId: product.node.id,
      title: product.node.title,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      image: product.node.images.edges[0]?.node.url,
      handle: product.node.handle,
    });
    toast.success(`${product.node.title} added to cart`);
    setCartOpen(true);
  };

  // Sort sizes by product count (most popular first), then alphabetically
  const sortedSizes = [...sizeMap.entries()]
    .sort((a, b) => {
      if (b[1].length !== a[1].length) return b[1].length - a[1].length;
      const [aw, ah] = a[0].split('x').map(Number);
      const [bw, bh] = b[0].split('x').map(Number);
      return aw - bw || ah - bh;
    });

  // Get products for the selected size
  const filteredProducts = selectedSize ? (sizeMap.get(selectedSize) || []) : [];

  return (
    <div className="min-h-screen bg-[#040404] text-white">
      <SEO
        title="Shop Paint Booth Filters by Size - 20x20, 20x25, Custom Cuts"
        description="Find the right paint booth filter by size. We stock 20x20, 20x25, 24x24, 25x25 and many more standard sizes. Custom-cut filters available for any booth configuration."
        canonical="https://pfsfilters.com/shop-by-size"
        structuredData={breadcrumbSchema}
      />
      <Navigation />

      {/* Header - darker */}
      <section className="section-darker pt-28 pb-10 px-4">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb items={[{ label: 'Shop by Size' }]} />
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
              <Ruler className="h-3.5 w-3.5 text-white/80" />
              <span className="text-xs font-semibold text-white/80 uppercase tracking-wider">Filter Sizes</span>
            </div>
            <h1 className="text-5xl font-extrabold mb-4 text-white pfs-heading-animate">Find Your Filter Size</h1>
            <p className="text-xl text-white/50 max-w-2xl mx-auto">
              Select your filter dimensions to see all matching products. Can't find your size? We cut custom filters to spec.
            </p>
          </div>
        </div>
      </section>

      {/* Arc transition */}
      <div className="arc-divider arc-divider-up" />

      {/* Size grid - raised */}
      <section className="section-raised tex-dots py-14 px-4">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 mb-12">
                {sortedSizes.map(([size, prods]) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                    className={`group cursor-pointer rounded-2xl p-5 text-center transition-all duration-300 border h-[120px] flex flex-col items-center justify-center ${
                      selectedSize === size
                        ? 'border-blue-500/60 bg-blue-500/10 ring-1 ring-blue-500/30'
                        : prods.length >= 7
                        ? 'border-white/20 bg-white/[0.05] hover:border-blue-400/40 hover:bg-white/[0.08]'
                        : 'border-white/8 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]'
                    }`}
                  >
                    <p className={`text-2xl font-bold mb-1 ${selectedSize === size ? 'text-blue-400' : 'text-white'}`}>
                      {size}
                    </p>
                    <p className="text-xs text-white/50">{prods.length} product{prods.length !== 1 ? 's' : ''}</p>
                    {prods.length >= 7 && (
                      <span className="inline-flex items-center gap-1 text-[10px] bg-blue-500/15 text-white/80 border border-blue-500/20 px-2 py-0.5 rounded-full mt-1.5">
                        <Star className="h-2.5 w-2.5" /> Popular
                      </span>
                    )}
                  </button>
                ))}
                {/* Custom size card */}
                <Link href="/contact">
                  <div className="group cursor-pointer rounded-2xl p-5 text-center transition-all duration-300 border border-dashed border-white/20 bg-white/[0.03] hover:border-white/40 hover:bg-white/[0.06] h-[120px] flex flex-col items-center justify-center">
                    <p className="text-2xl font-bold mb-1 text-white/60">Custom</p>
                    <p className="text-xs text-white/50">Cut to your specs</p>
                    <span className="text-[10px] bg-white/8 text-white/50 border border-white/10 px-2 py-0.5 rounded-full mt-1.5">Request Quote</span>
                  </div>
                </Link>
              </div>

              {/* Products for selected size */}
              {selectedSize && (
                <div className="mt-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">
                      {selectedSize}" Products
                      <span className="text-white/50 text-lg font-normal ml-2">({filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''})</span>
                    </h2>
                    <button
                      onClick={() => setSelectedSize(null)}
                      className="text-sm text-white/50 hover:text-white transition-colors"
                    >
                      Clear filter
                    </button>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => {
                      const variant = product.node.variants.edges[0]?.node;
                      const image = product.node.images.edges[0]?.node.url || FALLBACK_IMAGE;
                      const originalPrice = variant?.price.amount ? parseFloat(variant.price.amount) : 0;
                      const memberPrice = discountPercent > 0 ? getDiscountedPrice(originalPrice, discountPercent) : originalPrice;
                      const currency = variant?.price.currencyCode || 'USD';
                      const inStock = variant?.availableForSale ?? true;

                      return (
                        <div key={product.node.id} className="glow-card group">
                          <Link href={`/product/${product.node.handle}`}>
                            <div className="product-img-wrap relative aspect-square overflow-hidden cursor-pointer">
                              <ProductBadges badges={getProductBadges(product)} />
                              <img
                                src={image}
                                alt={product.node.title}
                                className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                                style={{ filter: 'brightness(0.95) contrast(1.05)' }}
                              />
                            </div>
                          </Link>
                          <div className="p-4">
                            <Link href={`/product/${product.node.handle}`}>
                              <h3 className="font-semibold text-sm leading-tight mb-1 hover:text-blue-400 transition-colors line-clamp-2">
                                {product.node.title}
                              </h3>
                            </Link>
                            <div className="flex items-center justify-between mt-2 mb-3">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-blue-400">
                                  ${memberPrice.toFixed(2)} <span className="text-xs font-normal text-white/70">{currency}</span>
                                </span>
                                {discountPercent > 0 && (
                                  <span className="text-xs line-through text-white/30">
                                    ${originalPrice.toFixed(2)}
                                  </span>
                                )}
                              </div>
                              {!inStock && (
                                <span className="text-xs bg-white/10 text-white/50 px-2 py-0.5 rounded">Out of Stock</span>
                              )}
                            </div>
                            <Button
                              size="sm"
                              className="w-full bg-blue-500 text-white hover:bg-blue-500/90 gap-2"
                              onClick={() => handleAddToCart(product)}
                              disabled={!inStock}
                            >
                              <ShoppingCart className="h-3.5 w-3.5" />
                              {inStock ? 'Add to Cart' : 'Out of Stock'}
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {!selectedSize && (
                <p className="text-center text-white/40 text-sm mt-4">
                  Click a size above to see all matching products
                </p>
              )}
            </>
          )}
        </div>
      </section>

      {/* Arc transition */}
      <div className="arc-divider arc-divider-down" />

      {/* Custom size CTA - glow */}
      <section className="section-glow py-14 px-4">
        <div className="max-w-2xl mx-auto text-center border border-white/10 rounded-2xl p-10 bg-white/[0.03]">
          <div className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-5">
            <Ruler className="h-7 w-7 text-white/80" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Need a Custom Size?</h2>
          <p className="text-white/70 mb-6 leading-relaxed">
            We cut filters to any dimension. Tell us your booth make/model or exact measurements and we'll get you a perfect fit — usually ships same day.
          </p>
          <Link href="/contact">
            <Button className="bg-white text-black hover:bg-white/90 font-bold gap-2">
              Request Custom Size <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Arc transition */}
      <div className="arc-divider arc-divider-up" />

      <Footer />
    </div>
  );
}
