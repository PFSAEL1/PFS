// TopMovers — home featured row in the dark lineup layout.
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { usePricing } from '@/hooks/usePricing';
import { toast } from 'sonner';
import { getProductBadges } from '@/lib/productSignals';
import { cacheShopifyProducts, getImmediateShopifyProducts } from '@/lib/productCatalog';
import { localAvifSrcSet, shopProductCardImageSrcSet, shopProductCardImageUrl, shopifyImageAltText } from '@/lib/imageUrls';
import { LineupCard, LineupCarousel, LineupHeader, formatFromPrice, plainText, tintFor } from '@/components/Lineup';

const FALLBACK_IMAGE = '/images/filters/fiberglass-arrestors.png';

const selectFeaturedProducts = (products: ShopifyProduct[]) =>
  products
    .filter((p) => !p.node.title.toLowerCase().includes('membership'))
    .slice(0, 8);

export const TopMovers = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>(() =>
    selectFeaturedProducts(getImmediateShopifyProducts()),
  );
  const [loading, setLoading] = useState(() => products.length === 0);
  const { discountPercent } = usePricing();
  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setCartOpen);

  useEffect(() => {
    let active = true;
    let idleId: number | undefined;
    let timerId: number | undefined;

    const refreshProducts = () => {
      fetchProducts(12)
        .then((data) => {
          if (!active) return;
          cacheShopifyProducts(data);
          setProducts(selectFeaturedProducts(data));
          setLoading(false);
        })
        .catch(() => {
          if (active) setLoading(false);
        });
    };

    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(refreshProducts, { timeout: 4500 });
    } else {
      timerId = globalThis.setTimeout(refreshProducts, 2500) as unknown as number;
    }

    return () => {
      active = false;
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timerId !== undefined) window.clearTimeout(timerId);
    };
  }, []);

  const handleAdd = (product: ShopifyProduct) => {
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

  if (loading) {
    return (
      <section className="section-darker py-16 px-4">
        <div className="flex justify-center py-16">
          <Loader2 className="h-7 w-7 animate-spin text-white/30" />
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="section-darker px-4 py-16">
      <div className="mx-auto max-w-7xl">
        <LineupHeader title="Popular filters." href="/shop" linkLabel="Shop all" />
        <LineupCarousel label="Popular filters">
          {products.map((product, index) => {
            const imageNode = product.node.images.edges[0]?.node;
            const image = imageNode?.url || FALLBACK_IMAGE;
            const cardSrc = shopProductCardImageUrl(product.node.handle, image, 480);
            const cardSrcSet = shopProductCardImageSrcSet(product.node.handle, image);
            const variant = product.node.variants.edges[0]?.node;
            const amounts = product.node.variants.edges
              .map((edge) => parseFloat(edge.node.price?.amount || ''))
              .filter((amount) => amount > 0);
            const priced = formatFromPrice(amounts, discountPercent);
            const inStock = Boolean(variant) && (variant?.availableForSale ?? true);
            const badges = getProductBadges(product);
            const badge = badges.some((item) => item.tone === 'new')
              ? 'New'
              : badges.some((item) => item.tone === 'reorder')
                ? 'Popular'
                : null;
            return (
              <LineupCard
                key={product.node.id}
                href={`/product/${product.node.handle}`}
                title={product.node.title}
                description={plainText(product.node.description)}
                image={cardSrc}
                imageSrcSet={cardSrcSet}
                avifSrcSet={localAvifSrcSet(cardSrc, cardSrcSet)}
                alt={shopifyImageAltText(imageNode, product.node.title)}
                tint={tintFor(`${product.node.productType} ${product.node.title}`, index)}
                sizes="300px"
                badge={badge}
                price={priced?.price}
                comparePrice={priced?.compare}
                buyLabel={inStock ? 'Buy' : 'Sold out'}
                buyDisabled={!inStock}
                onBuy={() => handleAdd(product)}
                quickView={{
                  href: `/product/${product.node.handle}`,
                  title: product.node.title,
                  description: plainText(product.node.description).slice(0, 220),
                  image: cardSrc,
                  alt: shopifyImageAltText(imageNode, product.node.title),
                  productId: product.node.id,
                  handle: product.node.handle,
                  options: product.node.variants.edges.map((edge) => ({
                    id: edge.node.id,
                    title: edge.node.title,
                    amount: edge.node.price.amount,
                    currency: edge.node.price.currencyCode,
                    available: Boolean(edge.node.availableForSale),
                  })),
                }}
              />
            );
          })}
        </LineupCarousel>
      </div>
    </section>
  );
};
