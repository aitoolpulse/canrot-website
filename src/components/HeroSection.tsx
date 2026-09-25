import React from 'react';
import { Download, ShieldCheck, Cpu, HardDrive, Zap, Lock } from 'lucide-react';
import { PhoneMockup } from './PhoneMockup';
import { PageTab } from '../types';
import { CanrotLogo } from './CanrotLogo';

interface HeroSectionProps {
  onOpenDownload: () => void;
  onNavigateToPrivacy: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenDownload,
  onNavigateToPrivacy,
}) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
      {/* Background radial gradient mesh */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-gradient-to-b from-pink-500/10 via-rose-500/5 to-transparent blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Value Proposition & Copy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Clean unboxed metadata with official logo badge */}
            <div className="flex flex-wrap items-center gap-3">
              <CanrotLogo variant="badge" size="sm" />
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-pink-400">
                <span className="flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5" />
                  100% Local-First Video Editor
                </span>
                <span aria-hidden="true" className="text-neutral-600">·</span>
                <span className="text-neutral-400">Built for Android</span>
                <span aria-hidden="true" className="text-neutral-600">·</span>
                <span className="text-neutral-400">No Server Uploads</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white text-balance leading-[1.08]">
              Edit, Grade & Export 4K Videos.{' '}
              <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 bg-clip-text text-transparent">
                Completely On Your Device.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-2xl text-base sm:text-lg text-neutral-300 leading-relaxed">
              <strong className="text-white font-semibold">Canrot</strong> is engineered for creators who demand speed, privacy, and control.
              Your photos, videos, and commentary never leave your phone. All rendering, speech-to-text auto-captions, and smart auto-reframe execute directly on your Android hardware.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenDownload}
                className="flex items-center gap-2.5 rounded-xl bg-pink-500 px-6 py-3.5 text-sm font-bold text-neutral-950 shadow-lg shadow-pink-500/20 transition-all hover:bg-pink-400 hover:shadow-pink-500/30 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
              >
                <Download className="h-4 w-4" />
                <span>Get Canrot for Android</span>
              </button>

              <button
                onClick={onNavigateToPrivacy}
                className="flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900/80 px-5 py-3.5 text-sm font-semibold text-neutral-300 transition-all hover:border-neutral-700 hover:bg-neutral-800 hover:text-white active:scale-95"
              >
                <ShieldCheck className="h-4 w-4 text-pink-400" />
                <span>Read Privacy Policy</span>
              </button>
            </div>

            {/* Architectural Trust Points */}
            <div className="pt-6 border-t border-neutral-900 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                  <HardDrive className="h-3.5 w-3.5 text-pink-400" />
                  <span>Zero Cloud Storage</span>
                </div>
                <p className="mt-1 text-xs text-neutral-400">
                  No remote servers or media databases.
                </p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                  <Cpu className="h-3.5 w-3.5 text-pink-400" />
                  <span>Native FFmpeg Engine</span>
                </div>
                <p className="mt-1 text-xs text-neutral-400">
                  GPU-accelerated local video encoding.
                </p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                  <Zap className="h-3.5 w-3.5 text-pink-400" />
                  <span>On-Device Technology AI</span>
                </div>
                <p className="mt-1 text-xs text-neutral-400">
                  Offline speech-to-text auto-captions.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Phone Mockup Visual Anchor */}
          <div className="lg:col-span-5 flex justify-center">
            <PhoneMockup />
          </div>
        </div>
      </div>
    </section>
  );
};
