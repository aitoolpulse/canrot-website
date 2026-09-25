import React, { useState } from 'react';
import { X, Download, ShieldCheck, Smartphone, Check, ExternalLink, HardDrive } from 'lucide-react';
import { CanrotLogo } from './CanrotLogo';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToPrivacy: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({
  isOpen,
  onClose,
  onNavigateToPrivacy,
}) => {
  const [downloadStarted, setDownloadStarted] = useState(false);

  if (!isOpen) return null;

  const handleSimulateApkDownload = () => {
    setDownloadStarted(true);
    // Create a mock download trigger of release notes or APK stub
    const element = document.createElement('a');
    const file = new Blob([
      `Canrot Video Editor v2.4.0\nPackage: com.canrot.videoeditor\nArchitecture: ARM64-v8a / armeabi-v7a\nMinimum Android: Android 8.0 (API 26)\nBuilt with: FFmpeg, on-device technology, Google ML Kit, Google AdMob\nPrivacy: 100% Local-First\nSupport: contacts@tiyazo.com`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'Canrot_v2.4.0_Release_Info.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    setTimeout(() => {
      setDownloadStarted(false);
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-2xl border border-neutral-800 bg-neutral-950 p-6 sm:p-8 text-left shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-800 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-pink-400">
              <Smartphone className="h-4 w-4" />
              <span>CANROT FOR ANDROID</span>
            </div>
            <CanrotLogo variant="badge" size="sm" />
          </div>

          <h3 className="font-display text-2xl font-bold text-white">
            Get Canrot Video Editor
          </h3>

          <p className="text-xs sm:text-sm text-neutral-300">
            Enjoy full offline local-first 4K editing, on-device technology auto-captions, and smart auto-reframe directly on your Android phone.
          </p>

          {/* Download Options */}
          <div className="space-y-3 pt-2">
            {/* Google Play Option */}
            <a
              href="https://play.google.com/store/apps"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-xl border border-neutral-800 bg-neutral-900/90 p-4 transition-all hover:border-neutral-700 hover:bg-neutral-800 group"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-800 text-white group-hover:scale-105 transition-transform">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a2.037 2.037 0 0 1-.61-.318v-19.73c.18-.12.388-.23.609-.324zm11.233 11.235l2.457 2.456-11.47 6.486 9.013-8.942zm0-2.098L5.83 2.009l11.47 6.486-2.458 2.456zm1.464 1.049l3.528 1.996c1.173.664 1.173 1.748 0 2.412l-3.528 1.996-2.096-2.096 2.096-2.308z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-neutral-400">Get it on</p>
                  <p className="text-sm font-bold text-white">Google Play Store</p>
                </div>
              </div>
              <ExternalLink className="h-4 w-4 text-neutral-400 group-hover:text-white" />
            </a>

            {/* Direct APK Option */}
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/90 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-white">Direct APK Package</p>
                  <p className="text-xs text-neutral-400 font-mono">v2.4.0 (Universal ARM64 / ARMv7) · 48.2 MB</p>
                </div>
                <button
                  onClick={handleSimulateApkDownload}
                  disabled={downloadStarted}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold transition-all ${
                    downloadStarted
                      ? 'bg-emerald-600 text-white'
                      : 'bg-pink-500 text-neutral-950 hover:bg-pink-400'
                  }`}
                >
                  {downloadStarted ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      <span>Downloading...</span>
                    </>
                  ) : (
                    <>
                      <Download className="h-3.5 w-3.5" />
                      <span>Download APK</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-2 pt-1 text-[11px] text-neutral-400">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span>Verified SHA-256 Checksum · Safe & Clean</span>
              </div>
            </div>
          </div>

          {/* System Requirements */}
          <div className="rounded-xl bg-neutral-900/50 p-3.5 text-xs text-neutral-400 space-y-1 border border-neutral-900">
            <p className="font-semibold text-neutral-300">System Compatibility:</p>
            <p>&bull; Android 8.0 (API level 26) or higher</p>
            <p>&bull; Requires ~120MB storage for initial on-device speech model</p>
            <p>&bull; No root or special permissions required</p>
          </div>

          {/* Privacy Note */}
          <div className="flex items-center justify-between pt-2 border-t border-neutral-900 text-xs">
            <span className="text-neutral-500">Always 100% Local-First</span>
            <button
              onClick={() => {
                onClose();
                onNavigateToPrivacy();
              }}
              className="text-pink-400 hover:underline font-medium"
            >
              Review Privacy Policy &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
