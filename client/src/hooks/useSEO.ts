/**
 * useSEO — Per-page SEO meta injection hook
 * Sets document.title, meta description, canonical, OG tags, Twitter card,
 * and optional JSON-LD structured data on mount; restores defaults on unmount.
 */
import { useEffect } from "react";

const DEFAULT_TITLE = "PFS | Industrial Finishing Equipment — Spray Booths, Ovens & Blast Systems";
const DEFAULT_DESC  = "PFS manufactures industrial spray paint booths, powder coating systems, industrial ovens, blast equipment, and finishing lines for automotive, aerospace, industrial, and more. Manufactured in Santa Rosa, CA with ETL/UL listed and certified components.";
const BASE_URL      = "https://platinumfinishingsystems.com";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.jpg`;

interface SEOOptions {
  title: string;
  description: string;
  /** Relative path for canonical, e.g. "/spray-booth-service-california" */
  canonical?: string;
  /** Absolute URL for og:image — falls back to default OG image */
  ogImage?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

function setMeta(selector: string, attr: string, value: string, attrName = "content") {
  let el = document.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    const [attrKey, attrVal] = selector.replace("meta[", "").replace("]", "").split("=");
    el.setAttribute(attrKey, attrVal.replace(/"/g, ""));
    document.head.appendChild(el);
  }
  el.setAttribute(attrName, value);
}

function setLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function useSEO({ title, description, canonical, ogImage, jsonLd }: SEOOptions) {
  useEffect(() => {
    const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : `${BASE_URL}${window.location.pathname}`;
    const ogImg = ogImage || DEFAULT_OG_IMAGE;

    // Title
    document.title = title;

    // Meta description
    setMeta('meta[name="description"]', "name", description);

    // Canonical
    setLink("canonical", canonicalUrl);

    // Open Graph
    setMeta('meta[property="og:title"]', "property", title);
    setMeta('meta[property="og:description"]', "property", description);
    setMeta('meta[property="og:url"]', "property", canonicalUrl);
    setMeta('meta[property="og:image"]', "property", ogImg);

    // Twitter Card
    setMeta('meta[name="twitter:title"]', "name", title);
    setMeta('meta[name="twitter:description"]', "name", description);
    setMeta('meta[name="twitter:image"]', "name", ogImg);

    // JSON-LD
    let ldScript: HTMLScriptElement | null = null;
    if (jsonLd) {
      ldScript = document.createElement("script");
      ldScript.type = "application/ld+json";
      ldScript.id = "page-jsonld";
      ldScript.textContent = JSON.stringify(jsonLd);
      const existing = document.getElementById("page-jsonld");
      if (existing) existing.remove();
      document.head.appendChild(ldScript);
    }

    return () => {
      document.title = DEFAULT_TITLE;
      const m = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
      if (m) m.setAttribute("content", DEFAULT_DESC);
      setLink("canonical", BASE_URL + "/");
      setMeta('meta[property="og:title"]', "property", DEFAULT_TITLE);
      setMeta('meta[property="og:description"]', "property", DEFAULT_DESC);
      setMeta('meta[property="og:url"]', "property", BASE_URL + "/");
      setMeta('meta[property="og:image"]', "property", DEFAULT_OG_IMAGE);
      setMeta('meta[name="twitter:title"]', "name", DEFAULT_TITLE);
      setMeta('meta[name="twitter:description"]', "name", DEFAULT_DESC);
      setMeta('meta[name="twitter:image"]', "name", DEFAULT_OG_IMAGE);
      const ld = document.getElementById("page-jsonld");
      if (ld) ld.remove();
    };
  }, [title, description, canonical, ogImage, jsonLd]);
}
