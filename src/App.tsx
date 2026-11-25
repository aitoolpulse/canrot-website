import React, { useState, useEffect, useCallback } from 'react';
import { PageTab } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturesBento } from './components/FeaturesBento';
import { InteractivePlayground } from './components/InteractivePlayground';
import { BlogPreviewSection } from './components/BlogPreviewSection';
import { BlogView } from './components/BlogView';
import { PrivacyPolicyView } from './components/PrivacyPolicyView';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { DownloadModal } from './components/DownloadModal';
import { BLOG_POSTS, getBlogPostBySlug } from './data/blogPosts';
import { getCanonicalUrl, updateSeoMetadata } from './utils/seo';

function parseRouteFromLocation(): { tab: PageTab; postSlug: string | null; scrollId?: string } {
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
  const hash = window.location.hash.toLowerCase();

  // Clean URL paths take priority for SEO crawlability
  if (pathname === '/blog') {
    return { tab: 'blog', postSlug: null };
  }
  if (pathname.startsWith('/blog/')) {
    const slug = decodeURIComponent(pathname.slice('/blog/'.length)).split('/')[0];
    return { tab: 'blog', postSlug: slug || null };
  }
  if (pathname === '/privacy' || pathname === '/privacy-policy') {
    return { tab: 'privacy', postSlug: null };
  }
  if (pathname === '/playground' || pathname === '/simulator') {
    return { tab: 'playground', postSlug: null };
  }

  // Backward-compatible hash routes (e.g., Google Play Console links to /#privacy)
  if (hash.includes('privacy') || hash.includes('policy')) {
    return { tab: 'privacy', postSlug: null };
  }
  if (hash.includes('playground') || hash.includes('simulator')) {
    return { tab: 'playground', postSlug: null };
  }
  if (hash.startsWith('#blog/')) {
    const slug = decodeURIComponent(hash.slice('#blog/'.length));
    return { tab: 'blog', postSlug: slug || null };
  }
  if (hash === '#blog') {
    return { tab: 'blog', postSlug: null };
  }
  if (hash.includes('faq')) {
    return { tab: 'home', postSlug: null, scrollId: 'faq' };
  }
  if (hash.includes('contact')) {
    return { tab: 'home', postSlug: null, scrollId: 'contact' };
  }
  if (hash.includes('features')) {
    return { tab: 'home', postSlug: null, scrollId: 'features' };
  }

  return { tab: 'home', postSlug: null };
}

export default function App() {
  const initialRoute = parseRouteFromLocation();
  const [currentTab, setCurrentTab] = useState<PageTab>(initialRoute.tab);
  const [activePostSlug, setActivePostSlug] = useState<string | null>(initialRoute.postSlug);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

  const syncFromLocation = useCallback(() => {
    const parsed = parseRouteFromLocation();
    setCurrentTab(parsed.tab);
    setActivePostSlug(parsed.postSlug);
    if (parsed.scrollId) {
      setTimeout(() => {
        document.getElementById(parsed.scrollId!)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, []);

  useEffect(() => {
    if (initialRoute.scrollId) {
      setTimeout(() => {
        document.getElementById(initialRoute.scrollId!)?.scrollIntoView({ behavior: 'smooth' });
      }, 120);
    }

    window.addEventListener('popstate', syncFromLocation);
    window.addEventListener('hashchange', syncFromLocation);
    return () => {
      window.removeEventListener('popstate', syncFromLocation);
      window.removeEventListener('hashchange', syncFromLocation);
    };
  }, [initialRoute.scrollId, syncFromLocation]);

  // Dynamic SEO metadata + Schema.org JSON-LD per route
  useEffect(() => {
    if (currentTab === 'blog' && activePostSlug) {
      const post = getBlogPostBySlug(activePostSlug);
      if (post) {
        const postUrl = getCanonicalUrl(`/blog/${post.slug}`);
        const blogUrl = getCanonicalUrl('/blog');
        const homeUrl = getCanonicalUrl('/');

        updateSeoMetadata({
          title: post.seoTitle,
          description: post.metaDescription,
          path: `/blog/${post.slug}`,
          type: 'article',
          keywords: post.keywords,
          publishedTime: post.publishedIso,
          modifiedTime: post.updatedIso,
          author: post.author,
          jsonLd: [
            {
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: post.title,
              description: post.metaDescription,
              datePublished: post.publishedIso,
              dateModified: post.updatedIso,
              author: {
                '@type': 'Organization',
                name: post.author,
              },
              publisher: {
                '@type': 'Organization',
                name: 'Canrot Video Editor',
              },
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': postUrl,
              },
              keywords: post.keywords.join(', '),
            },
            {
              '@context': 'https://schema.org',
              '@type': 'HowTo',
              name: post.howToTitle,
              description: post.howToDescription,
              step: post.howToSteps.map((s) => ({
                '@type': 'HowToStep',
                position: s.stepNumber,
                name: s.title,
                text: s.description,
              })),
            },
            {
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: post.faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.answer,
                },
              })),
            },
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: homeUrl },
                { '@type': 'ListItem', position: 2, name: 'Blog', item: blogUrl },
                { '@type': 'ListItem', position: 3, name: post.title, item: postUrl },
              ],
            },
          ],
        });
        return;
      }
    }

    if (currentTab === 'blog') {
      updateSeoMetadata({
        title: 'Canrot Blog — Android Video Editing & Caption Guides',
        description:
          'Learn how to edit videos faster on Android with free offline auto-captions, 9:16 Reels auto-reframe, studio voice-overs, and local-first FFmpeg exports.',
        path: '/blog',
        type: 'website',
        keywords: [
          'caption free video editor',
          'android video editing blog',
          'offline auto captions tutorial',
          'canrot guides',
        ],
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: 'Canrot Video Editor Blog',
          description:
            'Guides and tutorials for fast, privacy-focused Android video editing and offline auto-captions.',
          url: getCanonicalUrl('/blog'),
          blogPost: BLOG_POSTS.map((post) => ({
            '@type': 'BlogPosting',
            headline: post.title,
            datePublished: post.publishedIso,
            url: getCanonicalUrl(`/blog/${post.slug}`),
          })),
        },
      });
      return;
    }

    if (currentTab === 'privacy') {
      updateSeoMetadata({
        title: 'Privacy Policy — Canrot Video Editor for Android',
        description:
          'Read the official Privacy Policy for Canrot Video Editor. All video editing, offline auto-captions, and FFmpeg exports happen locally on your Android device.',
        path: '/privacy',
        type: 'website',
      });
      return;
    }

    if (currentTab === 'playground') {
      updateSeoMetadata({
        title: 'Editor Simulator — Canrot Video Editor for Android',
        description:
          'Preview Canrot Video Editor directly in your browser. Explore offline auto-captions, 9:16 auto-reframe, voice-over controls, and local timeline workflows.',
        path: '/playground',
        type: 'website',
      });
      return;
    }

    // Home page default SEO
    updateSeoMetadata({
      title: 'Canrot Video Editor — Fast & Private Android Video Editor',
      description:
        'Canrot is a fast, privacy-focused Android video editor with offline auto-captions, 9:16 auto-reframe, voice-over recording, and native FFmpeg rendering.',
      path: '/',
      type: 'website',
      keywords: [
        'canrot video editor',
        'caption free video editor',
        'android video editor',
        'offline auto captions',
        'privacy video editor android',
      ],
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Canrot Video Editor',
        operatingSystem: 'Android',
        applicationCategory: 'MultimediaApplication',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Fast, local-first video editor for Android with offline on-device auto-captions, auto-reframe, studio voice-over, and native FFmpeg rendering.',
        url: getCanonicalUrl('/'),
        downloadUrl: 'https://play.google.com/store/apps/details?id=com.canrot.android',
      },
    });
  }, [currentTab, activePostSlug]);

  const navigateToPath = (path: string, tab: PageTab, postSlug: string | null = null, hashId?: string) => {
    setCurrentTab(tab);
    setActivePostSlug(postSlug);

    const targetUrl = hashId ? `${path}#${hashId}` : path;
    if (window.location.pathname + window.location.hash !== targetUrl) {
      window.history.pushState(null, '', targetUrl);
    }

    if (hashId) {
      setTimeout(() => {
        const el = document.getElementById(hashId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleTabChange = (tab: PageTab, hashId?: string) => {
    if (tab === 'privacy') {
      navigateToPath('/privacy', 'privacy');
    } else if (tab === 'playground') {
      navigateToPath('/playground', 'playground');
    } else if (tab === 'blog') {
      navigateToPath('/blog', 'blog', null);
    } else {
      navigateToPath('/', 'home', null, hashId);
    }
  };

  const handleSelectBlogPost = (slug: string | null) => {
    if (slug) {
      navigateToPath(`/blog/${slug}`, 'blog', slug);
    } else {
      navigateToPath('/blog', 'blog', null);
    }
  };

  const handleFooterNavigate = (tab: PageTab, hashId?: string, postSlug?: string) => {
    if (tab === 'blog' && postSlug) {
      handleSelectBlogPost(postSlug);
      return;
    }
    handleTabChange(tab, hashId);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col selection:bg-pink-500 selection:text-neutral-950 font-sans">
      {/* 3-Zone Navigation Header */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={handleTabChange}
        onOpenDownload={() => setIsDownloadOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentTab === 'privacy' ? (
          <PrivacyPolicyView />
        ) : currentTab === 'playground' ? (
          <div className="pt-8">
            <InteractivePlayground />
          </div>
        ) : currentTab === 'blog' ? (
          <BlogView
            activeSlug={activePostSlug}
            onSelectPost={handleSelectBlogPost}
            onNavigate={handleTabChange}
            onOpenDownload={() => setIsDownloadOpen(true)}
          />
        ) : (
          <>
            <HeroSection
              onOpenDownload={() => setIsDownloadOpen(true)}
              onNavigateToPrivacy={() => handleTabChange('privacy')}
            />
            <FeaturesBento />
            <InteractivePlayground />
            <BlogPreviewSection
              onOpenBlogIndex={() => handleTabChange('blog')}
              onOpenPost={(slug) => handleSelectBlogPost(slug)}
            />
            <FAQSection />
            <ContactSection />
          </>
        )}
      </main>

      {/* Quiet Footer */}
      <Footer onNavigate={handleFooterNavigate} />

      {/* Download Modal Dialog */}
      <DownloadModal
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
        onNavigateToPrivacy={() => handleTabChange('privacy')}
      />
    </div>
  );
}
