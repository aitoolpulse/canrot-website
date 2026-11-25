import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  Copy,
  Download,
  Play,
  Search,
  ShieldCheck,
  Sparkles,
  Subtitles,
} from 'lucide-react';
import { BLOG_POSTS, getBlogPostBySlug } from '../data/blogPosts';
import { BlogPost, PageTab } from '../types';
import { getCanonicalUrl } from '../utils/seo';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.canrot.android';

interface BlogViewProps {
  activeSlug: string | null;
  onSelectPost: (slug: string | null) => void;
  onNavigate: (tab: PageTab) => void;
  onOpenDownload: () => void;
}

export const BlogView: React.FC<BlogViewProps> = ({
  activeSlug,
  onSelectPost,
  onNavigate,
  onOpenDownload,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const activePost = activeSlug ? getBlogPostBySlug(activeSlug) : undefined;

  if (activePost) {
    return (
      <BlogArticleView
        post={activePost}
        onBackToBlog={() => onSelectPost(null)}
        onSelectPost={onSelectPost}
        onNavigate={onNavigate}
        onOpenDownload={onOpenDownload}
      />
    );
  }

  const categories = ['All', ...Array.from(new Set(BLOG_POSTS.map((p) => p.category)))];
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredPosts = BLOG_POSTS.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;
    return (
      p.title.toLowerCase().includes(normalizedQuery) ||
      p.excerpt.toLowerCase().includes(normalizedQuery) ||
      p.keywords.some((kw) => kw.toLowerCase().includes(normalizedQuery))
    );
  });

  const featuredPost = filteredPosts[0];
  const secondaryPosts = filteredPosts.slice(1);

  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs text-neutral-400">
        <a
          href="/"
          onClick={(e) => {
            if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
              e.preventDefault();
              onNavigate('home');
            }
          }}
          className="hover:text-pink-400 transition-colors"
        >
          Home
        </a>
        <ChevronRight className="h-3.5 w-3.5 text-neutral-600" />
        <span className="text-neutral-200 font-medium">Blog</span>
      </nav>

      {/* Header */}
      <div className="max-w-3xl mb-10">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-pink-400 mb-3">
          Canrot Guides &amp; Tutorials
        </p>
        <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4">
          Video Editing &amp; Auto-Caption Guides for Android Creators
        </h1>
        <p className="text-base sm:text-lg text-neutral-400 leading-relaxed">
          Practical workflows for offline video editing, free on-device auto-captions, 9:16 Reels auto-reframe, voice-over narration, and privacy-first mobile production.
        </p>
      </div>

      {/* Category Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-neutral-800/80">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-pink-500 text-neutral-950 font-semibold'
                    : 'border border-neutral-800 bg-neutral-900/60 text-neutral-300 hover:border-neutral-700 hover:text-white'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-500" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guides (e.g. 4K, captions)..."
            aria-label="Search blog guides"
            className="w-full rounded-lg border border-neutral-800 bg-neutral-900/70 py-1.5 pl-9 pr-3 text-xs text-neutral-200 placeholder:text-neutral-500 focus:border-pink-500/50 focus:outline-none"
          />
        </div>
      </div>

      {filteredPosts.length === 0 && (
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-10 text-center">
          <p className="text-sm text-neutral-300 mb-3">
            No guides matched &ldquo;{searchQuery}&rdquo;.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="text-xs font-semibold text-pink-400 hover:text-pink-300"
          >
            Reset filters
          </button>
        </div>
      )}

      {/* Featured Article */}
      {featuredPost && (
        <article className="group relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 sm:p-8 mb-8 transition-colors hover:border-pink-500/40">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="max-w-3xl space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400">
                <span className="inline-flex items-center gap-1.5 rounded-md border border-pink-500/30 bg-pink-500/10 px-2.5 py-1 font-mono text-[11px] font-medium text-pink-400">
                  <Subtitles className="h-3.5 w-3.5" />
                  {featuredPost.category}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-neutral-500" />
                  <time dateTime={featuredPost.publishedIso}>{featuredPost.publishedDate}</time>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-neutral-500" />
                  {featuredPost.readTime}
                </span>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white leading-snug group-hover:text-pink-400 transition-colors">
                <a
                  href={`/blog/${featuredPost.slug}`}
                  onClick={(e) => {
                    if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
                      e.preventDefault();
                      onSelectPost(featuredPost.slug);
                    }
                  }}
                  className="focus-visible:outline-none"
                >
                  {featuredPost.title}
                </a>
              </h2>

              <p className="text-neutral-400 leading-relaxed text-sm sm:text-base">
                {featuredPost.excerpt}
              </p>

              <div className="pt-2">
                <a
                  href={`/blog/${featuredPost.slug}`}
                  onClick={(e) => {
                    if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
                      e.preventDefault();
                      onSelectPost(featuredPost.slug);
                    }
                  }}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-pink-400 hover:text-pink-300 transition-colors"
                >
                  <span>Read Full Guide</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>

            <div className="shrink-0 lg:w-64 rounded-xl border border-neutral-800/80 bg-neutral-950/80 p-5 space-y-3">
              <p className="font-mono text-[11px] uppercase tracking-wider text-neutral-500">
                Key Highlights
              </p>
              <ul className="space-y-2 text-xs text-neutral-300">
                {featuredPost.keyTakeaways.slice(0, 3).map((takeaway, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-pink-400 shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      )}

      {/* Secondary Articles Grid */}
      {secondaryPosts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {secondaryPosts.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col justify-between rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 transition-colors hover:border-pink-500/40"
            >
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400">
                  <span className="inline-flex items-center gap-1.5 rounded-md border border-pink-500/30 bg-pink-500/10 px-2.5 py-0.5 font-mono text-[11px] font-medium text-pink-400">
                    {post.category}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-neutral-500" />
                    {post.readTime}
                  </span>
                </div>

                <h2 className="font-display text-xl font-bold text-white leading-snug group-hover:text-pink-400 transition-colors">
                  <a
                    href={`/blog/${post.slug}`}
                    onClick={(e) => {
                      if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
                        e.preventDefault();
                        onSelectPost(post.slug);
                      }
                    }}
                  >
                    {post.title}
                  </a>
                </h2>

                <p className="text-sm text-neutral-400 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-neutral-800/80 flex items-center justify-between">
                <time dateTime={post.publishedIso} className="text-xs text-neutral-500">
                  {post.publishedDate}
                </time>
                <a
                  href={`/blog/${post.slug}`}
                  onClick={(e) => {
                    if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
                      e.preventDefault();
                      onSelectPost(post.slug);
                    }
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-pink-400 hover:text-pink-300 transition-colors"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

interface BlogArticleViewProps {
  post: BlogPost;
  onBackToBlog: () => void;
  onSelectPost: (slug: string) => void;
  onNavigate: (tab: PageTab) => void;
  onOpenDownload: () => void;
}

const BlogArticleView: React.FC<BlogArticleViewProps> = ({
  post,
  onBackToBlog,
  onSelectPost,
  onNavigate,
}) => {
  const [copied, setCopied] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleCopyLink = async () => {
    const url = getCanonicalUrl(`/blog/${post.slug}`);
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const tocItems = [
    ...post.sections.map((sec) => ({ id: sec.id, label: sec.heading })),
    { id: 'how-to-add-captions', label: post.howToTitle },
    { id: 'comparison', label: post.comparisonTitle },
    { id: 'article-faq', label: 'Frequently Asked Questions' },
  ];

  const currentIndex = BLOG_POSTS.findIndex((item) => item.slug === post.slug);
  const rotatedPosts = [
    ...BLOG_POSTS.slice(currentIndex + 1),
    ...BLOG_POSTS.slice(0, currentIndex),
  ];
  const relatedPosts = rotatedPosts.slice(0, 3);
  const remainingSections = post.sections.slice(2);

  return (
    <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-xs text-neutral-400">
        <a
          href="/"
          onClick={(e) => {
            if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
              e.preventDefault();
              onNavigate('home');
            }
          }}
          className="hover:text-pink-400 transition-colors"
        >
          Home
        </a>
        <ChevronRight className="h-3.5 w-3.5 text-neutral-600" />
        <a
          href="/blog"
          onClick={(e) => {
            if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
              e.preventDefault();
              onBackToBlog();
            }
          }}
          className="hover:text-pink-400 transition-colors"
        >
          Blog
        </a>
        <ChevronRight className="h-3.5 w-3.5 text-neutral-600" />
        <span className="text-neutral-200 font-medium line-clamp-1">{post.seoTitle}</span>
      </nav>

      {/* Article Header */}
      <header className="mb-10 border-b border-neutral-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400 mb-4">
          <span className="inline-flex items-center gap-1.5 rounded-md border border-pink-500/30 bg-pink-500/10 px-2.5 py-1 font-mono text-[11px] font-medium text-pink-400">
            <BookOpen className="h-3.5 w-3.5" />
            {post.heroBadge}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-neutral-500" />
            <time dateTime={post.publishedIso}>{post.publishedDate}</time>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-neutral-500" />
            {post.readTime}
          </span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15] mb-5">
          {post.title}
        </h1>

        <p className="text-base sm:text-lg text-neutral-300 leading-relaxed mb-6">
          {post.excerpt}
        </p>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="text-xs text-neutral-400">
            Written by <span className="font-medium text-neutral-200">{post.author}</span>
          </div>

          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900/70 px-3 py-1.5 text-xs font-medium text-neutral-300 hover:border-pink-500/40 hover:text-white transition-colors"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-pink-400" />
                <span>Article Link Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-neutral-400" />
                <span>Copy Article URL</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Key Takeaways & Table of Contents */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-12">
        <div className="md:col-span-3 rounded-2xl border border-pink-500/20 bg-pink-500/5 p-6">
          <h2 className="flex items-center gap-2 font-display text-base font-bold text-white mb-3">
            <Sparkles className="h-4 w-4 text-pink-400" />
            <span>Key Takeaways</span>
          </h2>
          <ul className="space-y-2.5 text-sm text-neutral-300 leading-relaxed">
            {post.keyTakeaways.map((point, index) => (
              <li key={index} className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-pink-400 shrink-0 mt-0.5" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <nav
          aria-label="Table of contents"
          className="md:col-span-2 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6"
        >
          <p className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 mb-3">
            In this guide
          </p>
          <ol className="space-y-2 text-xs text-neutral-300">
            {tocItems.map((item, idx) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="flex items-start gap-2 hover:text-pink-400 transition-colors leading-snug"
                >
                  <span className="font-mono text-neutral-500 shrink-0">0{idx + 1}.</span>
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      {/* Intro Paragraphs */}
      <div className="space-y-5 text-base sm:text-[17px] text-neutral-300 leading-8 mb-12">
        {post.intro.map((para, idx) => (
          <p key={idx}>{para}</p>
        ))}
      </div>

      {/* First Two Main Content Sections */}
      <div className="space-y-12 mb-14">
        {post.sections.slice(0, 2).map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-24 space-y-5">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {section.heading}
            </h2>

            {section.paragraphs.map((para, idx) => (
              <p key={idx} className="text-base sm:text-[17px] text-neutral-300 leading-8">
                {para}
              </p>
            ))}

            {section.bullets && (
              <ul className="space-y-3 pt-1">
                {section.bullets.map((bullet, idx) => (
                  <li
                    key={idx}
                    className="rounded-xl border border-neutral-800/90 bg-neutral-900/40 p-4 text-sm sm:text-base text-neutral-300 leading-relaxed"
                  >
                    <strong className="text-white font-semibold">{bullet.label}: </strong>
                    {bullet.text}
                  </li>
                ))}
              </ul>
            )}

            {section.callout && (
              <div className="rounded-xl border-l-2 border-pink-500 bg-neutral-900/60 p-5">
                <div className="flex items-center gap-2 text-sm font-semibold text-pink-400 mb-1.5">
                  <ShieldCheck className="h-4 w-4" />
                  <span>{section.callout.title}</span>
                </div>
                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                  {section.callout.text}
                </p>
              </div>
            )}
          </section>
        ))}
      </div>

      {/* Step-by-Step HowTo Section */}
      <section
        id="how-to-add-captions"
        className="scroll-mt-24 mb-14 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 sm:p-8"
      >
        <p className="font-mono text-xs uppercase tracking-wider text-pink-400 mb-2">
          Step-by-Step Tutorial
        </p>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
          {post.howToTitle}
        </h2>
        <p className="text-sm sm:text-base text-neutral-400 leading-relaxed mb-8">
          {post.howToDescription}
        </p>

        <ol className="space-y-5">
          {post.howToSteps.map((step) => (
            <li key={step.stepNumber} className="flex items-start gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-pink-500/15 border border-pink-500/30 font-mono text-xs font-bold text-pink-400 mt-0.5">
                {step.stepNumber}
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-1">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Comparison Table */}
      <section id="comparison" className="scroll-mt-24 mb-14 space-y-5">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
          {post.comparisonTitle}
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-neutral-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-900 text-xs uppercase tracking-wider text-neutral-400 border-b border-neutral-800">
              <tr>
                <th className="px-5 py-4 font-semibold">Feature</th>
                <th className="px-5 py-4 font-semibold text-pink-400">Canrot (Android)</th>
                <th className="px-5 py-4 font-semibold">Typical Alternatives</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/80 bg-neutral-950/60">
              {post.comparisonRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-neutral-900/40 transition-colors">
                  <td className="px-5 py-4 font-medium text-white">{row.feature}</td>
                  <td className="px-5 py-4 text-neutral-200">{row.canrot}</td>
                  <td className="px-5 py-4 text-neutral-400">{row.cloudApps}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Remaining Editorial Sections (Pro Tips) */}
      {remainingSections.length > 0 && (
        <div className="space-y-12 mb-14">
          {remainingSections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-24 space-y-5">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {section.heading}
              </h2>

              {section.paragraphs.map((para, idx) => (
                <p key={idx} className="text-base sm:text-[17px] text-neutral-300 leading-8">
                  {para}
                </p>
              ))}

              {section.bullets && (
                <ul className="space-y-3 pt-1">
                  {section.bullets.map((bullet, idx) => (
                    <li
                      key={idx}
                      className="rounded-xl border border-neutral-800/90 bg-neutral-900/40 p-4 text-sm sm:text-base text-neutral-300 leading-relaxed"
                    >
                      <strong className="text-white font-semibold">{bullet.label}: </strong>
                      {bullet.text}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      )}

      {/* Inline CTA Banner */}
      <div className="mb-14 rounded-2xl border border-pink-500/30 bg-gradient-to-br from-pink-500/10 via-neutral-900/80 to-neutral-950 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
              Try Canrot Video Editor on Android Today
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed">
              Get fast offline auto-captions, 9:16 Auto-Reframe, studio voice-over recording, and native FFmpeg rendering directly from Google Play.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-pink-500 px-5 py-2.5 text-sm font-semibold text-neutral-950 hover:bg-pink-400 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Download Canrot</span>
            </a>
            <a
              href="/playground"
              onClick={(e) => {
                if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
                  e.preventDefault();
                  onNavigate('playground');
                }
              }}
              className="inline-flex items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-2.5 text-sm font-medium text-neutral-200 hover:border-pink-500/50 hover:text-white transition-colors"
            >
              <Play className="h-4 w-4 text-pink-400" />
              <span>Try Simulator</span>
            </a>
          </div>
        </div>
      </div>

      {/* Article FAQ Section */}
      <section id="article-faq" className="scroll-mt-24 mb-14">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {post.faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-neutral-800 bg-neutral-900/40 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm sm:text-base font-semibold text-white hover:text-pink-400 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-neutral-400 transition-transform ${
                      isOpen ? 'rotate-180 text-pink-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="border-t border-neutral-800/80 px-5 py-4 text-sm sm:text-base text-neutral-300 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Related Guides — Internal SEO Linking Cluster */}
      {relatedPosts.length > 0 && (
        <section className="mb-12 pt-10 border-t border-neutral-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
              Related Android Video Editing Guides
            </h2>
            <a
              href="/blog"
              onClick={(e) => {
                if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
                  e.preventDefault();
                  onBackToBlog();
                }
              }}
              className="text-xs font-semibold text-pink-400 hover:text-pink-300 transition-colors"
            >
              All guides &rarr;
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedPosts.map((related) => (
              <a
                key={related.slug}
                href={`/blog/${related.slug}`}
                onClick={(e) => {
                  if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
                    e.preventDefault();
                    onSelectPost(related.slug);
                  }
                }}
                className="group flex flex-col justify-between rounded-xl border border-neutral-800 bg-neutral-900/40 p-5 transition-colors hover:border-pink-500/40"
              >
                <div className="space-y-2">
                  <span className="font-mono text-[11px] text-pink-400">
                    {related.category}
                  </span>
                  <h3 className="text-sm font-semibold text-white leading-snug group-hover:text-pink-400 transition-colors line-clamp-3">
                    {related.title}
                  </h3>
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-neutral-400 group-hover:text-pink-400 transition-colors">
                  <span>Read guide</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Bottom Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-neutral-800 pt-8">
        <a
          href="/blog"
          onClick={(e) => {
            if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
              e.preventDefault();
              onBackToBlog();
            }
          }}
          className="inline-flex items-center gap-2 text-sm font-medium text-neutral-300 hover:text-pink-400 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>All Blog Guides</span>
        </a>

        <a
          href="/privacy"
          onClick={(e) => {
            if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
              e.preventDefault();
              onNavigate('privacy');
            }
          }}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-400 hover:text-pink-400 transition-colors"
        >
          <ShieldCheck className="h-4 w-4" />
          <span>Read Canrot Privacy Policy</span>
        </a>
      </div>
    </article>
  );
};
