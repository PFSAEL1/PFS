// ShopifyProductPicker.tsx
// Searchable dropdown that fetches real Shopify products via the Storefront API.
// Stores both the product title and variant ID for use in draft order creation.

import { useState, useEffect, useRef, useCallback } from 'react';
import { Search, X, ChevronDown, Package, RefreshCw } from 'lucide-react';

interface ShopifyVariant {
  id: string; // gid://shopify/ProductVariant/...
  title: string;
  price: string;
  sku: string | null;
}

interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  variants: ShopifyVariant[];
  featuredImage: string | null;
}

interface Props {
  value: { product_id: string; variant_id: string; title: string } | null;
  onChange: (val: { product_id: string; variant_id: string; title: string } | null) => void;
  placeholder?: string;
}

const SHOP_DOMAIN = import.meta.env.VITE_SHOPIFY_DOMAIN as string;
const STOREFRONT_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN as string;

async function searchShopifyProducts(query: string): Promise<ShopifyProduct[]> {
  const gql = `
    query SearchProducts($query: String!) {
      products(first: 20, query: $query, sortKey: RELEVANCE) {
        edges {
          node {
            id
            title
            handle
            featuredImage { url }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  price { amount }
                  sku
                }
              }
            }
          }
        }
      }
    }
  `;

  const resp = await fetch(`https://${SHOP_DOMAIN}/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query: gql, variables: { query } }),
  });

  if (!resp.ok) throw new Error('Failed to fetch products');
  const json = await resp.json();
  const edges = json?.data?.products?.edges || [];

  return edges.map((e: any) => ({
    id: e.node.id,
    title: e.node.title,
    handle: e.node.handle,
    featuredImage: e.node.featuredImage?.url || null,
    variants: e.node.variants.edges.map((v: any) => ({
      id: v.node.id,
      title: v.node.title,
      price: v.node.price?.amount || '0',
      sku: v.node.sku || null,
    })),
  }));
}

export default function ShopifyProductPicker({ value, onChange, placeholder = 'Search Shopify products…' }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<{ productId: string; variantId: string } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Load all products on first open
  const loadProducts = useCallback(async (q: string) => {
    setLoading(true);
    try {
      const results = await searchShopifyProducts(q || 'filter');
      setProducts(results);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounced search
  useEffect(() => {
    if (!open) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      loadProducts(query);
    }, 300);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [query, open, loadProducts]);

  const handleOpen = () => {
    setOpen(true);
    setTimeout(() => inputRef.current?.focus(), 50);
    if (products.length === 0) loadProducts('');
  };

  const handleSelect = (product: ShopifyProduct, variant: ShopifyVariant) => {
    const label = product.variants.length === 1 || variant.title === 'Default Title'
      ? product.title
      : `${product.title} — ${variant.title}`;
    onChange({ product_id: product.id, variant_id: variant.id, title: label });
    setOpen(false);
    setQuery('');
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={handleOpen}
        className="w-full h-9 rounded-md bg-[#111] border border-white/10 text-white text-sm px-3 flex items-center gap-2 hover:border-white/20 transition-colors focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        <Package className="w-3.5 h-3.5 text-white/30 flex-shrink-0" />
        <span className={`flex-1 text-left truncate ${value ? 'text-white' : 'text-white/30'}`}>
          {value ? value.title : placeholder}
        </span>
        {value ? (
          <X className="w-3.5 h-3.5 text-white/40 hover:text-white/80 flex-shrink-0" onClick={handleClear} />
        ) : (
          <ChevronDown className="w-3.5 h-3.5 text-white/30 flex-shrink-0" />
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-[#1a1a1a] border border-white/15 rounded-xl shadow-2xl overflow-hidden">
          {/* Search input */}
          <div className="p-2 border-b border-white/8">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Type to search products…"
                className="w-full h-8 pl-8 pr-3 bg-[#111] border border-white/10 rounded-lg text-white text-xs placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Results */}
          <div className="max-h-64 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <RefreshCw className="w-4 h-4 animate-spin text-blue-400" />
              </div>
            ) : products.length === 0 ? (
              <div className="py-8 text-center text-xs text-white/30">No products found</div>
            ) : (
              products.map(product => (
                <div key={product.id}>
                  {/* If single variant (Default Title), show as one row */}
                  {product.variants.length === 1 && product.variants[0].title === 'Default Title' ? (
                    <button
                      type="button"
                      onClick={() => handleSelect(product, product.variants[0])}
                      className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-white/5 transition-colors text-left"
                    >
                      {product.featuredImage ? (
                        <img src={product.featuredImage} alt="" className="w-8 h-8 rounded-md object-cover flex-shrink-0 bg-white/5" />
                      ) : (
                        <div className="w-8 h-8 rounded-md bg-white/5 flex items-center justify-center flex-shrink-0">
                          <Package className="w-4 h-4 text-white/20" />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-white truncate">{product.title}</p>
                        <p className="text-[10px] text-white/30">${parseFloat(product.variants[0].price).toFixed(2)}{product.variants[0].sku ? ` · SKU: ${product.variants[0].sku}` : ''}</p>
                      </div>
                    </button>
                  ) : (
                    <>
                      {/* Product header */}
                      <div className="flex items-center gap-2 px-3 pt-2 pb-1">
                        {product.featuredImage ? (
                          <img src={product.featuredImage} alt="" className="w-5 h-5 rounded object-cover flex-shrink-0 bg-white/5" />
                        ) : (
                          <Package className="w-4 h-4 text-white/20 flex-shrink-0" />
                        )}
                        <p className="text-[11px] font-medium text-white/60 truncate">{product.title}</p>
                      </div>
                      {/* Variants */}
                      {product.variants.map(variant => (
                        <button
                          key={variant.id}
                          type="button"
                          onClick={() => handleSelect(product, variant)}
                          className="w-full flex items-center gap-3 px-3 py-2 pl-9 hover:bg-white/5 transition-colors text-left"
                        >
                          <div className="min-w-0 flex-1">
                            <p className="text-xs text-white/80 truncate">{variant.title}</p>
                            <p className="text-[10px] text-white/30">${parseFloat(variant.price).toFixed(2)}{variant.sku ? ` · SKU: ${variant.sku}` : ''}</p>
                          </div>
                        </button>
                      ))}
                    </>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="px-3 py-2 border-t border-white/8">
            <button
              type="button"
              onClick={() => { onChange(null); setOpen(false); setQuery(''); }}
              className="text-xs text-white/30 hover:text-white/60 transition-colors"
            >
              Clear selection
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
