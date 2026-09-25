import React, { useState, useEffect } from 'react';
import { PageTab } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturesBento } from './components/FeaturesBento';
import { InteractivePlayground } from './components/InteractivePlayground';
import { PrivacyPolicyView } from './components/PrivacyPolicyView';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { DownloadModal } from './components/DownloadModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<PageTab>('home');
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

  // Check URL hash on initial mount and hash changes (e.g. #privacy)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('privacy') || hash.includes('policy')) {
        setCurrentTab('privacy');
      } else if (hash.includes('playground') || hash.includes('simulator')) {
        setCurrentTab('playground');
      } else if (hash.includes('faq')) {
        setCurrentTab('home');
        setTimeout(() => {
          document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else if (hash.includes('contact')) {
        setCurrentTab('home');
        setTimeout(() => {
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else if (hash.includes('features')) {
        setCurrentTab('home');
        setTimeout(() => {
          document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleTabChange = (tab: PageTab) => {
    setCurrentTab(tab);
    if (tab === 'privacy') {
      window.location.hash = 'privacy';
    } else if (tab === 'playground') {
      window.location.hash = 'playground';
    } else if (tab === 'home') {
      history.pushState(null, '', window.location.pathname);
    }
  };

  const handleFooterNavigate = (tab: PageTab, hashId?: string) => {
    setCurrentTab(tab);
    if (tab === 'privacy') {
      window.location.hash = 'privacy';
    }
    if (hashId) {
      setTimeout(() => {
        const el = document.getElementById(hashId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
        ) : (
          <>
            <HeroSection
              onOpenDownload={() => setIsDownloadOpen(true)}
              onNavigateToPrivacy={() => handleTabChange('privacy')}
            />
            <FeaturesBento />
            <InteractivePlayground />
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
