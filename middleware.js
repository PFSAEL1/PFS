/**
 * /shop is one prerendered file, so a query string cannot change its meta tag.
 * Any /shop?query request is rewritten to the noindex copy and also gets
 * X-Robots-Tag. /shop itself is unchanged.
 */
export const config = {
  matcher: '/shop',
};

export default function middleware(request) {
  const url = new URL(request.url);
  if (url.search.length <= 1) return;
  return new Response(null, {
    headers: {
      'x-middleware-rewrite': '/shop-query',
      'X-Robots-Tag': 'noindex, follow',
    },
  });
}
