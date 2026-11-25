import React from 'react';
import { Download, ShieldCheck, BookOpen, Menu, X } from 'lucide-react';
import { PageTab } from '../types';
import { CanrotLogo } from './CanrotLogo';

interface NavbarProps {
  currentTab: PageTab;
  setCurrentTab: (tab: PageTab, hashId?: string) => void;
  onOpenDownload: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  onOpenDownload,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    tab: PageTab,
    hashId?: string
  ) => {
    if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
      e.preventDefault();
      setMobileMenuOpen(false);
      setCurrentTab(tab, hashId);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-800/80 bg-neutral-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Chic Minimalist Typographic Logo */}
        <a
          href="/"
          onClick={(e) => handleLinkClick(e, 'home')}
          className="focus-visible:outline-none"
          aria-label="Canrot Home"
        >
          <CanrotLogo size="md" />
        </a>

        {/* Zone 2: Clean crawlable text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-300">
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, 'home')}
            className={`transition-colors hover:text-white ${
              currentTab === 'home' ? 'text-pink-400 font-semibold' : 'text-neutral-400'
            }`}
          >
            Overview
          </a>
          <a
            href="/#features"
            onClick={(e) => handleLinkClick(e, 'home', 'features')}
            className="text-neutral-400 transition-colors hover:text-white"
          >
            Features
          </a>
          <a
            href="/playground"
            onClick={(e) => handleLinkClick(e, 'playground')}
            className={`transition-colors hover:text-white ${
              currentTab === 'playground' ? 'text-pink-400 font-semibold' : 'text-neutral-400'
            }`}
          >
            Simulator
          </a>
          <a
            href="/blog"
            onClick={(e) => handleLinkClick(e, 'blog')}
            className={`flex items-center gap-1.5 transition-colors hover:text-white ${
              currentTab === 'blog' ? 'text-pink-400 font-semibold' : 'text-neutral-400'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span>Blog</span>
          </a>
          <a
            href="/privacy"
            onClick={(e) => handleLinkClick(e, 'privacy')}
            className={`flex items-center gap-1.5 transition-colors hover:text-white ${
              currentTab === 'privacy' ? 'text-pink-400 font-semibold' : 'text-neutral-400'
            }`}
          >
            <ShieldCheck className="h-4 w-4" />
            <span>Privacy Policy</span>
          </a>
          <a
            href="/#faq"
            onClick={(e) => handleLinkClick(e, 'home', 'faq')}
            className="text-neutral-400 transition-colors hover:text-white"
          >
            FAQ
          </a>
        </nav>

        {/* Zone 3: Primary action + mobile toggle */}
        <div className="flex items-center gap-3">
          <a
            href="https://play.google.com/store/apps/details?id=com.canrot.android"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg bg-pink-500 px-4 py-2 text-xs font-semibold text-neutral-950 transition-all hover:bg-pink-400 active:scale-95 focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:outline-none whitespace-nowrap"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download for Android</span>
          </a>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-800 text-neutral-400 hover:text-white md:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-neutral-800 bg-neutral-950 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3 text-sm">
            <a
              href="/"
              onClick={(e) => handleLinkClick(e, 'home')}
              className="text-left py-2 font-medium text-neutral-300 hover:text-pink-400"
            >
              Overview
            </a>
            <a
              href="/#features"
              onClick={(e) => handleLinkClick(e, 'home', 'features')}
              className="text-left py-2 font-medium text-neutral-300 hover:text-pink-400"
            >
              Features &amp; Architecture
            </a>
            <a
              href="/playground"
              onClick={(e) => handleLinkClick(e, 'playground')}
              className="text-left py-2 font-medium text-neutral-300 hover:text-pink-400"
            >
              Interactive Editor Simulator
            </a>
            <a
              href="/blog"
              onClick={(e) => handleLinkClick(e, 'blog')}
              className="flex items-center gap-2 text-left py-2 font-medium text-pink-400"
            >
              <BookOpen className="h-4 w-4" />
              <span>Blog &amp; Guides</span>
            </a>
            <a
              href="/privacy"
              onClick={(e) => handleLinkClick(e, 'privacy')}
              className="flex items-center gap-2 text-left py-2 font-medium text-neutral-300 hover:text-pink-400"
            >
              <ShieldCheck className="h-4 w-4" />
              <span>Privacy Policy</span>
            </a>
            <a
              href="/#faq"
              onClick={(e) => handleLinkClick(e, 'home', 'faq')}
              className="text-left py-2 font-medium text-neutral-300 hover:text-pink-400"
            >
              FAQ
            </a>
            <a
              href="/#contact"
              onClick={(e) => handleLinkClick(e, 'home', 'contact')}
              className="text-left py-2 font-medium text-neutral-300 hover:text-pink-400"
            >
              Support (contacts@tiyazo.com)
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
