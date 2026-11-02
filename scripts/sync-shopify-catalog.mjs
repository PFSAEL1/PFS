#!/usr/bin/env node
/**
 * Refresh the committed Storefront snapshot before prerender.
 * Existing product records are left in place so curated images and copy stay put.
 * Published products that are missing from the snapshot are appended, which is
 * how a new Shopify product gets a /product/<handle> page on the next build.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const productFile = path.join(root, 'client', 'src', 'data', 'shopifyProductSnapshot.json');
const collectionsFile = path.join(root, 'client', 'src', 'data', 'shopifyCollections.json');
const domain = process.env.VITE_SHOPIFY_DOMAIN || process.env.SHOPIFY_SHOP_DOMAIN || 'pfsfilters.myshopify.com';
const token = process.env.VITE_SHOPIFY_STOREFRONT_TOKEN || '5e357a0ae8e9906edb44ef570a4ed219';
const apiVersion = '2024-04';
const collectionHandle = 'aerospace-neshap-filters';

const REQUIRED_HANDLES = [
  '20x20-neshap-319-final-stage-panel-filter-20-cs',
  '20x25-neshap-319-final-stage-panel-filter-20-cs',
  '20x20x12-neshap-319-final-stage-5-pocket-bag-filter-6-cs',
  '20x25x12-neshap-319-final-stage-5-pocket-bag-filter-6-cs',
  '24x24x12-neshap-319-final-stage-6-pocket-bag-filter-6-cs',
  '20x20x15-neshap-319-final-stage-2-pocket-bag-filter-6-cs',
  '20x25x15-neshap-319-final-stage-2-pocket-bag-filter-6-cs',
  '53x112-volz-sfr-ceiling-filter-blanket-4-bag',
  '20x20x15-cg100-2-pocket-bag-filter-8-cs',
  '24x24x12-hepa-xfp-6000-6-pocket-bag-filter-5-cs',
  '20x20-me-pt-aerospace-exhaust-panel-filter-24-cs',
  '20x20x12-hepa-xfp-6-pocket-bag-filter-5-cs',
  '96x50-cpa-polyester-overspray-filter-roll',
];

const BLOCKED_HANDLES = new Set(['test', 'platinum']);

const PRODUCT_FIELDS = `
  id
  title
  handle
  description
  productType
  vendor
  tags
  seo { title description }
  priceRange { minVariantPrice { amount currencyCode } }
  images(first: 5) { edges { node { url altText } } }
  variants(first: 50) {
    edges {
      node {
        id
        title
        sku
        availableForSale
        price { amount currencyCode }
        selectedOptions { name value }
        sellingPlanAllocations(first: 10) {
          edges {
            node {
              sellingPlan {
                id
                name
                description
                recurringDeliveries
                options { name value }
              }
              priceAdjustments {
                price { amount currencyCode }
                compareAtPrice { amount currencyCode }
                perDeliveryPrice { amount currencyCode }
              }
            }
          }
        }
      }
    }
  }
  selectedOrFirstAvailableVariant {
    id
    sellingPlanAllocations(first: 10) {
      edges {
        node {
          sellingPlan {
            id
            name
            description
            recurringDeliveries
            options { name value }
          }
          priceAdjustments {
            price { amount currencyCode }
            compareAtPrice { amount currencyCode }
            perDeliveryPrice { amount currencyCode }
          }
        }
      }
    }
  }
  options { name values }
`;

const PRODUCTS_QUERY = `
  query SyncProducts($cursor: String) {
    products(first: 50, after: $cursor) {
      pageInfo { hasNextPage endCursor }
      edges { node { ${PRODUCT_FIELDS} } }
    }
  }
`;

const COLLECTION_QUERY = `
  query SyncCollection($handle: String!) {
    collectionByHandle(handle: $handle) {
      title
      description
      handle
      seo { title description }
      products(first: 50) {
        edges { node { handle } }
      }
    }
  }
`;

function readJson(file, fallback) {
  if (!fs.existsSync(file)) return fallback;
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function writeJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${JSON.stringify(value)}\n`);
}

function orderHandles(handles) {
  const present = new Set(handles);
  const preferred = REQUIRED_HANDLES.filter((handle) => present.has(handle));
  const extra = handles.filter((handle) => !REQUIRED_HANDLES.includes(handle));
  return [...preferred, ...extra];
}

function snapshotNode(node, collections) {
  const selected = node.selectedOrFirstAvailableVariant;
  return {
    id: node.id,
    title: node.title,
    handle: node.handle,
    description: node.description || '',
    productType: node.productType || '',
    vendor: node.vendor || '',
    tags: node.tags || [],
    seo: {
      title: node.seo?.title || '',
      description: node.seo?.description || '',
    },
    priceRange: node.priceRange,
    images: node.images || { edges: [] },
    variants: node.variants || { edges: [] },
    ...(selected ? { selectedOrFirstAvailableVariant: selected } : {}),
    options: node.options || [],
    ...(collections.length ? { collections } : {}),
  };
}

async function storefront(query, variables) {
  const response = await fetch(`https://${domain}/api/${apiVersion}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!response.ok) {
    throw new Error(`Storefront HTTP ${response.status}`);
  }
  const payload = await response.json();
  if (payload.errors?.length) {
    throw new Error(payload.errors.map((error) => error.message).join('; '));
  }
  return payload.data;
}

async function fetchAllProducts() {
  const products = [];
  let cursor = null;
  do {
    const data = await storefront(PRODUCTS_QUERY, { cursor });
    const connection = data.products;
    products.push(...connection.edges.map((edge) => edge.node));
    cursor = connection.pageInfo.hasNextPage ? connection.pageInfo.endCursor : null;
  } while (cursor);
  return products;
}

function missingRequired(snapshot) {
  const handles = new Set(snapshot.map((edge) => edge.node.handle));
  return REQUIRED_HANDLES.filter((handle) => !handles.has(handle));
}

async function sync() {
  const [liveProducts, collectionData] = await Promise.all([
    fetchAllProducts(),
    storefront(COLLECTION_QUERY, { handle: collectionHandle }),
  ]);
  const collection = collectionData.collectionByHandle;
  if (!collection) throw new Error(`Collection ${collectionHandle} was not found`);

  const memberHandles = orderHandles(collection.products.edges.map((edge) => edge.node.handle));
  const memberSet = new Set(memberHandles);
  const snapshot = readJson(productFile, []);
  const known = new Set(snapshot.map((edge) => edge.node.handle));
  let added = 0;

  for (const node of liveProducts) {
    if (!node.handle || known.has(node.handle) || BLOCKED_HANDLES.has(node.handle)) continue;
    const collections = memberSet.has(node.handle) ? [collectionHandle] : [];
    snapshot.push({ node: snapshotNode(node, collections) });
    known.add(node.handle);
    added += 1;
  }

  writeJson(productFile, snapshot);

  const collections = readJson(collectionsFile, {});
  collections[collectionHandle] = {
    title: collection.title,
    seoTitle: collection.seo?.title || collection.title,
    seoDescription: collection.seo?.description || '',
    handles: memberHandles,
  };
  writeJson(collectionsFile, collections);

  const missing = missingRequired(snapshot);
  if (missing.length) {
    throw new Error(`Shopify catalog is missing ${missing.join(', ')}`);
  }
  const absentFromCollection = REQUIRED_HANDLES.filter((handle) => !memberSet.has(handle));
  if (absentFromCollection.length) {
    throw new Error(`Collection ${collectionHandle} is missing ${absentFromCollection.join(', ')}`);
  }

  console.log(`Shopify catalog sync added ${added} product(s). ${collectionHandle} lists ${memberHandles.length}.`);
}

try {
  await sync();
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  const snapshot = readJson(productFile, []);
  const missing = missingRequired(snapshot);
  if (missing.length === 0 && fs.existsSync(collectionsFile)) {
    console.warn(`Shopify catalog sync skipped (${message}). Using the committed snapshot.`);
    process.exit(0);
  }
  console.error(`Shopify catalog sync failed: ${message}`);
  process.exit(1);
}
