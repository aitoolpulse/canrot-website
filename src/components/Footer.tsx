import React from 'react';
import { Mail, ShieldCheck } from 'lucide-react';
import { PageTab } from '../types';
import { CanrotLogo } from './CanrotLogo';

interface FooterProps {
  onNavigate: (tab: PageTab, hashId?: string, postSlug?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    tab: PageTab,
    hashId?: string,
    postSlug?: string
  ) => {
    if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
      e.preventDefault();
      onNavigate(tab, hashId, postSlug);
    }
  };

  return (
    <footer className="border-t border-neutral-900 bg-neutral-950 text-neutral-400 text-xs">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 text-left">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-2">
            <a
              href="/"
              onClick={(e) => handleLinkClick(e, 'home')}
              className="inline-block focus-visible:outline-none"
              aria-label="Canrot Home"
            >
              <CanrotLogo size="md" />
            </a>
            <p className="text-neutral-400 max-w-sm leading-relaxed">
              Fast, privacy-focused video editor for Android. Powered by native on-device FFmpeg, on-device technology speech auto-captioning, and Google ML Kit subject tracking.
            </p>
            <div className="flex items-center gap-2 text-neutral-300">
              <Mail className="h-3.5 w-3.5 text-pink-400" />
              <a href="mailto:contacts@tiyazo.com" className="hover:text-pink-400 font-mono transition-colors">
                contacts@tiyazo.com
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="font-semibold text-white uppercase text-[11px] tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-1.5">
              <li>
                <a
                  href="/"
                  onClick={(e) => handleLinkClick(e, 'home')}
                  className="hover:text-white transition-colors"
                >
                  Overview
                </a>
              </li>
              <li>
                <a
                  href="/#features"
                  onClick={(e) => handleLinkClick(e, 'home', 'features')}
                  className="hover:text-white transition-colors"
                >
                  Features &amp; SDKs
                </a>
              </li>
              <li>
                <a
                  href="/playground"
                  onClick={(e) => handleLinkClick(e, 'playground')}
                  className="hover:text-white transition-colors"
                >
                  Editor Simulator
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  onClick={(e) => handleLinkClick(e, 'blog')}
                  className="hover:text-white transition-colors"
                >
                  All Blog Guides
                </a>
              </li>
              <li>
                <a
                  href="/blog/caption-free-video-editor"
                  onClick={(e) => handleLinkClick(e, 'blog', undefined, 'caption-free-video-editor')}
                  className="hover:text-pink-400 transition-colors"
                >
                  Caption Free Video Editor
                </a>
              </li>
              <li>
                <a
                  href="/blog/offline-auto-caption-app-android"
                  onClick={(e) => handleLinkClick(e, 'blog', undefined, 'offline-auto-caption-app-android')}
                  className="hover:text-pink-400 transition-colors"
                >
                  Offline Auto-Caption App
                </a>
              </li>
              <li>
                <a
                  href="/blog/auto-reframe-16-9-to-9-16-android"
                  onClick={(e) => handleLinkClick(e, 'blog', undefined, 'auto-reframe-16-9-to-9-16-android')}
                  className="hover:text-pink-400 transition-colors"
                >
                  16:9 to 9:16 Auto-Reframe
                </a>
              </li>
              <li>
                <a
                  href="/blog/offline-video-editor-android-no-login"
                  onClick={(e) => handleLinkClick(e, 'blog', undefined, 'offline-video-editor-android-no-login')}
                  className="hover:text-pink-400 transition-colors"
                >
                  Offline Editor (No Login)
                </a>
              </li>
              <li>
                <a
                  href="/#faq"
                  onClick={(e) => handleLinkClick(e, 'home', 'faq')}
                  className="hover:text-white transition-colors"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-2">
            <h4 className="font-semibold text-white uppercase text-[11px] tracking-wider">
              Legal &amp; Compliance
            </h4>
            <ul className="space-y-1.5">
              <li>
                <a
                  href="/privacy"
                  onClick={(e) => handleLinkClick(e, 'privacy')}
                  className="flex items-center gap-1.5 text-pink-400 hover:text-pink-300 font-medium transition-colors"
                >
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Privacy Policy for canrot</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="border-t border-neutral-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-neutral-500">
            &copy; {new Date().getFullYear()} Canrot Video Editor. All rights reserved. Built for Android.
          </p>

          <p className="text-neutral-500 flex items-center gap-1">
            <span>Contact: </span>
            <a href="mailto:contacts@tiyazo.com" className="text-neutral-400 hover:text-pink-400 underline">
              contacts@tiyazo.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
