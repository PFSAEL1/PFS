import { useMemo, useState } from 'react';
import { ArrowRight, Package, Search } from 'lucide-react';
import { Link } from 'wouter';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { getImmediateShopifyProducts, searchShopifyProducts } from '@/lib/productCatalog';
import { shopProductCardImageUrl, shopifyImageAltText } from '@/lib/imageUrls';
import type { ShopifyProduct } from '@/lib/shopify';

interface ProductSearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PRODUCT_ROUTES: Record<string, string> = {
  'pfs-vitra': '/consumables/pfs-vitra',
  'pfs-vanguard-complete-booth-protection-kit': '/consumables/pfs-vanguard',
};

function productHref(product: ShopifyProduct): string {
  return PRODUCT_ROUTES[product.node.handle] || `/product/${product.node.handle}`;
}

function matchingVariantLabel(product: ShopifyProduct, query: string): string | null {
  const normalizedQuery = query.toLowerCase().replace(/[^a-z0-9]+/g, '');
  if (!normalizedQuery) return null;

  const match = product.node.variants.edges.find(({ node }) => {
    const variantText = [
      node.title,
      node.sku || '',
      ...(node.selectedOptions || []).map((option) => `${option.name} ${option.value}`),
    ]
      .join(' ')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '');
    return variantText.includes(normalizedQuery) || normalizedQuery.includes(variantText);
  });

  if (!match || match.node.title === 'Default Title') return null;
  return match.node.sku ? `${match.node.title} · SKU ${match.node.sku}` : match.node.title;
}

export default function ProductSearchDialog({ open, onOpenChange }: ProductSearchDialogProps) {
  const [query, setQuery] = useState('');
  const products = useMemo(() => getImmediateShopifyProducts(), []);
  const results = useMemo(() => searchShopifyProducts(products, query, 8), [products, query]);
  const hasQuery = query.trim().length > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-1.5rem)] max-w-2xl gap-0 overflow-hidden border-white/15 bg-[#0b0b0b] p-0 text-white shadow-2xl sm:max-w-2xl">
        <DialogHeader className="border-b border-white/10 px-5 pb-4 pt-5 pr-14 text-left">
          <DialogTitle className="font-['Barlow_Condensed'] text-2xl font-bold uppercase tracking-normal">
            Search Products
          </DialogTitle>
          <DialogDescription className="sr-only">
            Search the current product catalog.
          </DialogDescription>
        </DialogHeader>

        <div className="border-b border-white/10 p-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#4d9fff]" />
            <input
              autoFocus
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder='Try "20x20 fiberglass" or "MERV 10"'
              aria-label="Search products"
              className="h-12 w-full rounded-md border border-white/15 bg-white/[0.06] pl-12 pr-4 text-base text-white outline-none placeholder:text-white/35 focus:border-[#4d9fff] focus:ring-2 focus:ring-[#4d9fff]/25"
            />
          </div>
        </div>

        <div className="max-h-[min(58vh,32rem)] overflow-y-auto p-2" aria-live="polite">
          {!hasQuery ? (
            <div className="flex min-h-44 flex-col items-center justify-center px-6 text-center">
              <Search className="mb-3 h-8 w-8 text-white/20" />
              <p className="text-sm font-medium text-white/70">Find the right filter faster</p>
              <p className="mt-1 max-w-sm text-xs leading-relaxed text-white/40">
                Enter a size, material, filter stage, product name, or SKU to search the current catalog.
              </p>
            </div>
          ) : results.length === 0 ? (
            <div className="flex min-h-44 flex-col items-center justify-center px-6 text-center">
              <Package className="mb-3 h-8 w-8 text-white/20" />
              <p className="text-sm font-medium text-white/70">No matching products found</p>
              <p className="mt-1 text-xs text-white/40">Try a broader product name, size, or filter type.</p>
              <Link
                href="/contact"
                onClick={() => onOpenChange(false)}
                className="mt-4 text-sm font-semibold text-[#4d9fff] hover:text-[#76b5ff]"
              >
                Ask us to identify the filter
              </Link>
            </div>
          ) : (
            <>
              <p className="px-3 py-2 text-xs font-semibold uppercase text-white/35">
                {results.length} {results.length === 1 ? 'result' : 'results'}
              </p>
              <div className="space-y-1">
                {results.map((product) => {
                  const node = product.node;
                  const imageNode = node.images.edges[0]?.node;
                  const image = imageNode?.url;
                  const price = node.priceRange.minVariantPrice;
                  const variantMatch = matchingVariantLabel(product, query);

                  return (
                    <Link
                      key={node.id}
                      href={productHref(product)}
                      onClick={() => onOpenChange(false)}
                      className="group flex min-h-20 items-center gap-3 rounded-md border border-transparent px-3 py-2.5 hover:border-white/10 hover:bg-white/[0.06] focus-visible:border-[#4d9fff] focus-visible:bg-white/[0.06] focus-visible:outline-none"
                    >
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-md bg-white/[0.05]">
                        {image ? (
                          <img
                            src={shopProductCardImageUrl(node.handle, image, 128)}
                            alt={shopifyImageAltText(imageNode, node.title)}
                            width={64}
                            height={64}
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-contain p-1.5"
                          />
                        ) : (
                          <Package className="h-6 w-6 text-white/20" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 text-sm font-semibold leading-tight text-white group-hover:text-[#76b5ff]">
                          {node.title}
                        </p>
                        <p className="mt-1 truncate text-xs text-white/40">
                          {variantMatch || node.productType || node.vendor || 'Paint booth filtration'}
                        </p>
                        <p className="mt-1 text-sm font-bold text-[#4d9fff]">
                          From ${Number(price.amount).toFixed(2)} {price.currencyCode}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 shrink-0 text-white/25 transition-transform group-hover:translate-x-0.5 group-hover:text-[#4d9fff]" />
                    </Link>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
