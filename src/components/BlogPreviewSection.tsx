import React from 'react';
import { ArrowRight, Clock, Subtitles } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogPosts';

interface BlogPreviewSectionProps {
  onOpenBlogIndex: () => void;
  onOpenPost: (slug: string) => void;
}

export const BlogPreviewSection: React.FC<BlogPreviewSectionProps> = ({
  onOpenBlogIndex,
  onOpenPost,
}) => {
  const previewSlugs = [
    'caption-free-video-editor',
    'free-video-editor-android-no-watermark',
    'capcut-free-alternatives-android-2026',
    'best-export-settings-instagram-reels-android',
    'video-editor-for-low-end-android-phone',
    'offline-auto-caption-app-android',
  ];
  const previewPosts = previewSlugs
    .map((slug) => BLOG_POSTS.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  if (previewPosts.length === 0) return null;

  return (
    <section
      id="blog"
      className="border-t border-neutral-900 bg-neutral-950 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-pink-400 mb-2">
              Creator Guides &amp; Blog
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Android Video Editing &amp; Auto-Caption Guides
            </h2>
          </div>

          <a
            href="/blog"
            onClick={(e) => {
              if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
                e.preventDefault();
                onOpenBlogIndex();
              }
            }}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-pink-400 hover:text-pink-300 transition-colors"
          >
            <span>View all {BLOG_POSTS.length} guides</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {previewPosts.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col justify-between rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 transition-colors hover:border-pink-500/40"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2.5 text-xs text-neutral-400 mb-3">
                  <span className="inline-flex items-center gap-1.5 rounded-md border border-pink-500/30 bg-pink-500/10 px-2 py-0.5 font-mono text-[11px] font-medium text-pink-400">
                    <Subtitles className="h-3 w-3" />
                    {post.category}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3 text-neutral-500" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="font-display text-lg font-bold text-white leading-snug mb-3 group-hover:text-pink-400 transition-colors">
                  <a
                    href={`/blog/${post.slug}`}
                    onClick={(e) => {
                      if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
                        e.preventDefault();
                        onOpenPost(post.slug);
                      }
                    }}
                  >
                    {post.title}
                  </a>
                </h3>

                <p className="text-sm text-neutral-400 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-neutral-800/80">
                <a
                  href={`/blog/${post.slug}`}
                  onClick={(e) => {
                    if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
                      e.preventDefault();
                      onOpenPost(post.slug);
                    }
                  }}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-pink-400 hover:text-pink-300 transition-colors"
                >
                  <span>Read Full Guide</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
