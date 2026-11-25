export interface SeoMetadata {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  keywords?: string[];
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

function upsertMeta(attrName: 'name' | 'property', attrValue: string, content: string) {
  let meta = document.head.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null;
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attrName, attrValue);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

function removeMeta(attrName: 'name' | 'property', attrValue: string) {
  const meta = document.head.querySelector(`meta[${attrName}="${attrValue}"]`);
  if (meta) meta.remove();
}

function upsertCanonical(href: string) {
  let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

function upsertJsonLd(data?: Record<string, unknown> | Record<string, unknown>[]) {
  const existing = document.getElementById('canrot-dynamic-jsonld');
  if (!data) {
    if (existing) existing.remove();
    return;
  }

  let script = existing as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.id = 'canrot-dynamic-jsonld';
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

export function getCanonicalUrl(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : 'https://tiyazo.com';
  return `${origin}${normalizedPath === '/' ? '' : normalizedPath}`;
}

export function updateSeoMetadata(meta: SeoMetadata) {
  if (typeof document === 'undefined') return;

  const fullUrl = getCanonicalUrl(meta.path);
  const ogType = meta.type || 'website';

  document.title = meta.title;
  upsertMeta('name', 'description', meta.description);
  upsertMeta('name', 'robots', 'index, follow');

  if (meta.keywords && meta.keywords.length > 0) {
    upsertMeta('name', 'keywords', meta.keywords.join(', '));
  } else {
    removeMeta('name', 'keywords');
  }

  // OpenGraph
  upsertMeta('property', 'og:title', meta.title);
  upsertMeta('property', 'og:description', meta.description);
  upsertMeta('property', 'og:type', ogType);
  upsertMeta('property', 'og:url', fullUrl);
  upsertMeta('property', 'og:site_name', 'Canrot Video Editor');

  if (ogType === 'article' && meta.publishedTime) {
    upsertMeta('property', 'article:published_time', meta.publishedTime);
  } else {
    removeMeta('property', 'article:published_time');
  }

  if (ogType === 'article' && meta.modifiedTime) {
    upsertMeta('property', 'article:modified_time', meta.modifiedTime);
  } else {
    removeMeta('property', 'article:modified_time');
  }

  if (ogType === 'article' && meta.author) {
    upsertMeta('property', 'article:author', meta.author);
  } else {
    removeMeta('property', 'article:author');
  }

  // Twitter / X Card
  upsertMeta('name', 'twitter:card', 'summary_large_image');
  upsertMeta('name', 'twitter:title', meta.title);
  upsertMeta('name', 'twitter:description', meta.description);

  // Canonical link
  upsertCanonical(fullUrl);

  // Structured data JSON-LD
  upsertJsonLd(meta.jsonLd);
}
