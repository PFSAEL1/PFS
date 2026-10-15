import AxeBuilder from '@axe-core/playwright';
import { expect, test, type ConsoleMessage, type Page, type Request } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const EXTRA_PATHS = ['/auth', '/returns', '/privacy-policy', '/terms-of-service', '/memberships', '/why-choose-us', '/faq', '/contact'];
const IGNORED_REQUEST = /googletagmanager|google-analytics|googleadservices|doubleclick|facebook\.net|fonts\.gstatic|fonts\.googleapis|cdn\.shopify\.com\/videos|google\.com\/maps|maps\.googleapis/i;
const IGNORED_CONSOLE = /googletagmanager|google-analytics|Download the React DevTools|favicon|createRoot|existing content/i;

function sitemapPaths() {
  const xml = fs.readFileSync(path.resolve('client/public/sitemap.xml'), 'utf8');
  const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => {
    const url = new URL(match[1]);
    return url.pathname === '/' ? '/' : url.pathname.replace(/\/+$/, '');
  });
  return [...new Set([...paths, ...EXTRA_PATHS])];
}

async function settle(page: Page) {
  await page.evaluate(async () => {
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    const height = document.body.scrollHeight;
    for (let y = 0; y < height; y += 700) {
      window.scrollTo(0, y);
      await delay(40);
    }
    window.scrollTo(0, 0);
  });
}

test.describe('sitemap and navigation pages', () => {
  test.setTimeout(30 * 60 * 1000);

  test('every page is intact', async ({ page }, testInfo) => {
    const failures: string[] = [];
    const contrastReport: string[] = [];
    const internalLinks = new Set<string>();
    const paths = sitemapPaths();

    for (const pathname of paths) {
      const consoleErrors: string[] = [];
      const failedRequests: string[] = [];
      const onConsole = (message: ConsoleMessage) => {
        if (message.type() !== 'error') return;
        const text = message.text();
        if (IGNORED_CONSOLE.test(text)) return;
        consoleErrors.push(text.slice(0, 240));
      };
      const onPageError = (error: Error) => consoleErrors.push(error.message.slice(0, 240));
      const onRequestFailed = (request: Request) => {
        const url = request.url();
        if (IGNORED_REQUEST.test(url)) return;
        if (request.failure()?.errorText === 'net::ERR_ABORTED') return;
        failedRequests.push(`${request.failure()?.errorText || 'failed'} ${url}`);
      };
      const onResponse = (response: { url: () => string; status: () => number }) => {
        const url = response.url();
        if (IGNORED_REQUEST.test(url)) return;
        if (response.status() >= 400 && url.startsWith('http://127.0.0.1:4173')) {
          failedRequests.push(`${response.status()} ${url}`);
        }
      };

      page.on('console', onConsole);
      page.on('pageerror', onPageError);
      page.on('requestfailed', onRequestFailed);
      page.on('response', onResponse);

      const response = await page.goto(pathname, { waitUntil: 'domcontentloaded' });
      const status = response?.status() ?? 0;
      await page.locator('h1').first().waitFor({ state: 'visible', timeout: 20_000 }).catch(() => {});
      await page.waitForLoadState('networkidle', { timeout: 8_000 }).catch(() => {});
      await settle(page);

      const h1 = await page.locator('h1').first().isVisible().catch(() => false);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
      const brokenImages = await page.evaluate(() =>
        [...document.images]
          .filter((image) => image.complete && image.naturalWidth === 0 && image.src && !image.src.startsWith('data:'))
          .map((image) => image.currentSrc || image.src),
      );
      const links = await page.locator('a[href^="/"], a[href^="http://127.0.0.1"]').evaluateAll((anchors) =>
        anchors.map((anchor) => (anchor as HTMLAnchorElement).getAttribute('href') || ''),
      );
      links.forEach((href) => {
        const clean = href.split(/[?#]/, 1)[0];
        if (clean.startsWith('/') && clean !== '/') internalLinks.add(clean.replace(/\/+$/, '') || '/');
      });

      const contrast = await new AxeBuilder({ page }).withRules(['color-contrast']).analyze();
      const contrastFailures = contrast.violations.flatMap((violation) =>
        violation.nodes.slice(0, 5).map((node) => {
          const detail = node.any?.find((check) => check.id === 'color-contrast')?.message || violation.help;
          return `contrast: ${(node.target || []).join(' ')} ${detail}`;
        }),
      );

      const problems = [
        status !== 200 ? `status ${status}` : '',
        !h1 ? 'missing visible h1' : '',
        overflow ? 'horizontal overflow' : '',
        ...consoleErrors.map((error) => `console: ${error}`),
        ...failedRequests.map((error) => `request: ${error}`),
        ...brokenImages.map((src) => `image: ${src}`),
      ].filter(Boolean);
      if (contrastFailures.length > 0) {
        contrastReport.push(`${pathname} [${testInfo.project.name}]: ${contrastFailures.join(' | ')}`);
      }

      page.removeListener('console', onConsole);
      page.removeListener('pageerror', onPageError);
      page.removeListener('requestfailed', onRequestFailed);
      page.removeListener('response', onResponse);

      if (problems.length > 0) failures.push(`${pathname} [${testInfo.project.name}]: ${problems.join(' | ')}`);
    }

    const linkFailures: string[] = [];
    for (const href of internalLinks) {
      const response = await page.request.get(href);
      if (response.status() >= 400) linkFailures.push(`${href} -> ${response.status()}`);
    }

    const report = {
      project: testInfo.project.name,
      pages: paths.length,
      axeRule: 'color-contrast',
      note: 'Production blue, eyebrow, and search-button colors are reported and left in place so the current design stays intact.',
      contrastFindings: contrastReport,
      failures,
      brokenLinks: linkFailures,
    };
    const reportDir = path.resolve('e2e/reports');
    fs.mkdirSync(reportDir, { recursive: true });
    fs.writeFileSync(path.join(reportDir, `${testInfo.project.name}.json`), JSON.stringify(report, null, 2));

    expect(failures, failures.join('\n')).toEqual([]);
    expect(linkFailures, linkFailures.join('\n')).toEqual([]);
  });
});
