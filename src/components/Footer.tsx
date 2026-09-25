import React from 'react';
import { Mail, ShieldCheck, Heart } from 'lucide-react';
import { PageTab } from '../types';
import { CanrotLogo } from './CanrotLogo';

interface FooterProps {
  onNavigate: (tab: PageTab, hashId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-neutral-900 bg-neutral-950 text-neutral-400 text-xs">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 text-left">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-2">
            <button
              onClick={() => onNavigate('home')}
              className="focus-visible:outline-none"
              aria-label="Canrot Home"
            >
              <CanrotLogo size="md" />
            </button>
            <p className="text-neutral-400 max-w-sm leading-relaxed">
              Fast, privacy-focused video editor for Android. Powered by native on-device FFmpeg, on-device technology speech auto-captioning, and Google ML Kit subject tracking.
            </p>
            <div className="flex items-center gap-2 text-neutral-300">
              <Mail className="h-3.5 w-3.5 text-pink-400" />
              <a href="mailto:canrot@gmail.com" className="hover:text-pink-400 font-mono transition-colors">
                canrot@gmail.com
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
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors"
                >
                  Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('home', 'features')}
                  className="hover:text-white transition-colors"
                >
                  Features & SDKs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('playground')}
                  className="hover:text-white transition-colors"
                >
                  Editor Simulator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('home', 'faq')}
                  className="hover:text-white transition-colors"
                >
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-2">
            <h4 className="font-semibold text-white uppercase text-[11px] tracking-wider">
              Legal & Compliance
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => onNavigate('privacy')}
                  className="flex items-center gap-1.5 text-pink-400 hover:text-pink-300 font-medium transition-colors"
                >
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Privacy Policy for canrot</span>
                </button>
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
            <a href="mailto:canrot@gmail.com" className="text-neutral-400 hover:text-pink-400 underline">
              canrot@gmail.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
