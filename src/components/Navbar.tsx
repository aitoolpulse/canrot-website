import React from 'react';
import { Download, ShieldCheck, Menu, X } from 'lucide-react';
import { PageTab } from '../types';
import { CanrotLogo } from './CanrotLogo';

interface NavbarProps {
  currentTab: PageTab;
  setCurrentTab: (tab: PageTab) => void;
  onOpenDownload: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  onOpenDownload,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleNav = (tab: PageTab, hashId?: string) => {
    setCurrentTab(tab);
    setMobileMenuOpen(false);
    if (hashId) {
      setTimeout(() => {
        const element = document.getElementById(hashId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-800/80 bg-neutral-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Chic Minimalist Typographic Logo */}
        <button
          onClick={() => handleNav('home')}
          className="focus-visible:outline-none"
          aria-label="Canrot Home"
        >
          <CanrotLogo size="md" />
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-300">
          <button
            onClick={() => handleNav('home')}
            className={`transition-colors hover:text-white ${
              currentTab === 'home' ? 'text-pink-400 font-semibold' : 'text-neutral-400'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => handleNav('home', 'features')}
            className="text-neutral-400 transition-colors hover:text-white"
          >
            Features
          </button>
          <button
            onClick={() => handleNav('playground')}
            className={`transition-colors hover:text-white ${
              currentTab === 'playground' ? 'text-pink-400 font-semibold' : 'text-neutral-400'
            }`}
          >
            Editor Simulator
          </button>
          <button
            onClick={() => handleNav('privacy')}
            className={`flex items-center gap-1.5 transition-colors hover:text-white ${
              currentTab === 'privacy' ? 'text-pink-400 font-semibold' : 'text-neutral-400'
            }`}
          >
            <ShieldCheck className="h-4 w-4" />
            <span>Privacy Policy</span>
          </button>
          <button
            onClick={() => handleNav('home', 'faq')}
            className="text-neutral-400 transition-colors hover:text-white"
          >
            FAQ
          </button>
          <button
            onClick={() => handleNav('home', 'contact')}
            className="text-neutral-400 transition-colors hover:text-white"
          >
            Contact
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenDownload}
            className="flex items-center gap-2 rounded-lg bg-pink-500 px-4 py-2 text-xs font-semibold text-neutral-950 transition-all hover:bg-pink-400 active:scale-95 focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:outline-none whitespace-nowrap"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download for Android</span>
          </button>

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
            <button
              onClick={() => handleNav('home')}
              className="text-left py-2 font-medium text-neutral-300 hover:text-pink-400"
            >
              Overview
            </button>
            <button
              onClick={() => handleNav('home', 'features')}
              className="text-left py-2 font-medium text-neutral-300 hover:text-pink-400"
            >
              Features & Architecture
            </button>
            <button
              onClick={() => handleNav('playground')}
              className="text-left py-2 font-medium text-neutral-300 hover:text-pink-400"
            >
              Interactive Editor Simulator
            </button>
            <button
              onClick={() => handleNav('privacy')}
              className="flex items-center gap-2 text-left py-2 font-medium text-pink-400"
            >
              <ShieldCheck className="h-4 w-4" />
              <span>Privacy Policy</span>
            </button>
            <button
              onClick={() => handleNav('home', 'faq')}
              className="text-left py-2 font-medium text-neutral-300 hover:text-pink-400"
            >
              FAQ
            </button>
            <button
              onClick={() => handleNav('home', 'contact')}
              className="text-left py-2 font-medium text-neutral-300 hover:text-pink-400"
            >
              Support (contacts@tiyazo.com)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
