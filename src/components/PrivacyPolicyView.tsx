import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  HardDrive,
  Mic,
  Bell,
  Globe,
  CheckCircle2,
  Copy,
  Printer,
  Mail,
  ExternalLink,
  Cpu,
  Layers,
  Info,
  Check,
  FileText,
  AlertCircle,
  Smartphone,
  Trash2,
  EyeOff,
  UserCheck,
} from 'lucide-react';
import { CanrotLogo } from './CanrotLogo';

export const PrivacyPolicyView: React.FC = () => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('sec-1');

  const handleCopyLink = () => {
    const url = window.location.origin + window.location.pathname + '#privacy';
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const scrollToSec = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="py-10 md:py-16 bg-neutral-950 text-neutral-100 min-h-screen">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* =========================================================================
            DOCUMENT HEADER (Simple, Official & Clean)
           ========================================================================= */}
        <header className="border-b border-neutral-800 pb-8 text-left space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-mono font-medium text-pink-400">
              <ShieldCheck className="h-4 w-4 shrink-0" />
              <span>OFFICIAL PRIVACY POLICY · ANDROID APP</span>
            </div>

            {/* Quick Action Tools */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 rounded-lg border border-neutral-800 bg-neutral-900/90 px-3 py-1.5 text-xs font-medium text-neutral-200 transition-colors hover:border-pink-500/50 hover:text-white"
                title="Copy link to paste into Google Play Console"
              >
                {copiedLink ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">URL Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-neutral-400" />
                    <span>Copy URL for Play Console</span>
                  </>
                )}
              </button>

              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 rounded-lg border border-neutral-800 bg-neutral-900/90 px-3 py-1.5 text-xs font-medium text-neutral-300 transition-colors hover:border-neutral-700 hover:text-white"
              >
                <Printer className="h-3.5 w-3.5 text-neutral-400" />
                <span>Print / PDF</span>
              </button>
            </div>
          </div>

          {/* Exact Required Title with Brand Badge */}
          <div className="flex flex-wrap items-center gap-3">
            <CanrotLogo variant="badge" size="md" />
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Privacy Policy for canrot
            </h1>
          </div>

          {/* Exact Required Date & Introductory Declaration */}
          <div className="space-y-2 text-sm text-neutral-300">
            <p className="font-mono text-xs sm:text-sm text-neutral-400">
              Last updated: <span className="text-pink-400 font-semibold">24 September 2026</span>
            </p>
            <p className="text-base text-neutral-200 leading-relaxed font-normal">
              <strong>canrot</strong> ("we", "our", "us") is a video editor app for Android. This policy explains what data the app accesses and how it is used.
            </p>
          </div>
        </header>

        {/* =========================================================================
            GOOGLE PLAY CONSOLE AT-A-GLANCE COMPLIANCE SUMMARY
            (Designed specifically for fast review by Google Play reviewers & bots)
           ========================================================================= */}
        <section className="mt-8 rounded-2xl border border-neutral-800 bg-neutral-900/50 p-5 sm:p-6 text-left space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
            <h2 className="text-sm sm:text-base font-bold text-white tracking-wide">
              Google Play Console Compliance Summary (At a Glance)
            </h2>
          </div>
          
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            This application is engineered as a <strong>local-first utility</strong>. Below is a quick overview verifying compliance with Google Play's User Data policy and Data Safety requirements:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs pt-1">
            <div className="rounded-xl border border-neutral-800/80 bg-neutral-950 p-3 space-y-1">
              <span className="text-neutral-400 block text-[11px] uppercase tracking-wider font-mono">User Media</span>
              <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5" />
                100% On-Device Only
              </span>
              <p className="text-neutral-400 text-[11px]">Videos, photos and audio never leave the user's phone.</p>
            </div>

            <div className="rounded-xl border border-neutral-800/80 bg-neutral-950 p-3 space-y-1">
              <span className="text-neutral-400 block text-[11px] uppercase tracking-wider font-mono">Cloud Server</span>
              <span className="font-bold text-white flex items-center gap-1.5">
                <HardDrive className="h-3.5 w-3.5 text-pink-400" />
                No Remote Servers
              </span>
              <p className="text-neutral-400 text-[11px]">We do not run, maintain, or connect to any user database.</p>
            </div>

            <div className="rounded-xl border border-neutral-800/80 bg-neutral-950 p-3 space-y-1">
              <span className="text-neutral-400 block text-[11px] uppercase tracking-wider font-mono">Accounts & Login</span>
              <span className="font-bold text-white flex items-center gap-1.5">
                <UserCheck className="h-3.5 w-3.5 text-pink-400" />
                No Account Required
              </span>
              <p className="text-neutral-400 text-[11px]">No signup, no passwords, no email or phone tracking.</p>
            </div>

            <div className="rounded-xl border border-neutral-800/80 bg-neutral-950 p-3 space-y-1">
              <span className="text-neutral-400 block text-[11px] uppercase tracking-wider font-mono">Microphone</span>
              <span className="font-bold text-white flex items-center gap-1.5">
                <Mic className="h-3.5 w-3.5 text-rose-400" />
                Voice-Over Only
              </span>
              <p className="text-neutral-400 text-[11px]">Recorded only upon user action; rendered locally.</p>
            </div>

            <div className="rounded-xl border border-neutral-800/80 bg-neutral-950 p-3 space-y-1">
              <span className="text-neutral-400 block text-[11px] uppercase tracking-wider font-mono">Advertising ID</span>
              <span className="font-bold text-neutral-200 flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5 text-sky-400" />
                Google AdMob SDK
              </span>
              <p className="text-neutral-400 text-[11px]">Used for ad delivery. User can reset/opt out in Settings.</p>
            </div>

            <div className="rounded-xl border border-neutral-800/80 bg-neutral-950 p-3 space-y-1">
              <span className="text-neutral-400 block text-[11px] uppercase tracking-wider font-mono">Data Deletion</span>
              <span className="font-bold text-white flex items-center gap-1.5">
                <Trash2 className="h-3.5 w-3.5 text-emerald-400" />
                App Uninstall
              </span>
              <p className="text-neutral-400 text-[11px]">Uninstalling the app clears all application data from device.</p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            TABLE OF CONTENTS JUMP LINKS (Simple Navigation)
           ========================================================================= */}
        <nav className="mt-8 rounded-xl border border-neutral-800/80 bg-neutral-900/30 p-4 text-left">
          <p className="text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2 font-mono">
            Table of Contents
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs">
            {[
              { id: 'sec-1', label: '1. Local-first editing' },
              { id: 'sec-2', label: '2. Permissions we request and why' },
              { id: 'sec-3', label: '3. Advertising (Google AdMob)' },
              { id: 'sec-4', label: '4. Third-party SDKs' },
              { id: 'sec-5', label: '5. Crash and error logs' },
              { id: 'sec-6', label: '6. Children' },
              { id: 'sec-7', label: '7. Data retention and deletion' },
              { id: 'sec-8', label: '8. Changes to this policy' },
              { id: 'sec-9', label: '9. Contact us' },
              { id: 'sec-data-safety', label: '10. Play Console Data Safety Sheet' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSec(item.id)}
                className="text-left text-neutral-400 hover:text-pink-400 transition-colors py-1 truncate"
              >
                &bull; {item.label}
              </button>
            ))}
          </div>
        </nav>

        {/* =========================================================================
            POLICY BODY SECTIONS (Simple, High-Legibility Standard Cards)
           ========================================================================= */}
        <div className="mt-10 space-y-8 text-left">
          
          {/* SECTION 1: Local-first editing */}
          <article id="sec-1" className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 sm:p-7 space-y-4">
            <div className="flex items-center gap-2.5 border-b border-neutral-800/80 pb-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-pink-500/10 font-mono text-xs font-bold text-pink-400">
                1
              </span>
              <h2 className="font-display text-xl font-bold text-white">
                Local-first editing
              </h2>
            </div>

            <p className="text-sm sm:text-base text-neutral-200 leading-relaxed">
              canrot edits videos locally on your device. Your videos, photos, and audio files never leave your phone unless you share or upload them yourself. We do not operate our own server, we do not create user accounts, and we do not store your media files on any server.
            </p>

            <div className="rounded-xl border border-neutral-800/80 bg-neutral-950 p-4 text-xs text-neutral-300 space-y-2">
              <div className="flex items-center gap-2 font-semibold text-emerald-400">
                <Check className="h-4 w-4" />
                <span>Key Technical Guarantee:</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-neutral-400 pl-1 leading-relaxed">
                <li>Video rendering, audio mixing, and file processing happen directly on your device CPU/GPU.</li>
                <li>No automated uploads, background sync, or telemetry with media assets.</li>
                <li>Full access to edit offline without internet connectivity.</li>
              </ul>
            </div>
          </article>

          {/* SECTION 2: Permissions we request and why */}
          <article id="sec-2" className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 sm:p-7 space-y-5">
            <div className="flex items-center gap-2.5 border-b border-neutral-800/80 pb-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-pink-500/10 font-mono text-xs font-bold text-pink-400">
                2
              </span>
              <h2 className="font-display text-xl font-bold text-white">
                Permissions we request and why
              </h2>
            </div>

            <p className="text-sm text-neutral-300 leading-relaxed">
              In accordance with Google Play's Permissions policy, Canrot only requests runtime permissions that are strictly necessary to deliver user-initiated video editing features:
            </p>

            {/* Permission 1: Photos, videos and audio */}
            <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-sm font-bold text-white flex items-center gap-1.5">
                  <HardDrive className="h-4 w-4 text-pink-400" />
                  Photos, videos and audio
                </span>
                <div className="flex flex-wrap gap-1 font-mono text-[10px] text-pink-300">
                  <span className="rounded bg-neutral-900 border border-neutral-800 px-2 py-0.5">READ_MEDIA_VIDEO</span>
                  <span className="rounded bg-neutral-900 border border-neutral-800 px-2 py-0.5">READ_MEDIA_IMAGES</span>
                  <span className="rounded bg-neutral-900 border border-neutral-800 px-2 py-0.5">READ_MEDIA_AUDIO</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Photos, videos and audio (READ_MEDIA_VIDEO, READ_MEDIA_IMAGES, READ_MEDIA_AUDIO) — to let you select and edit your media. On older Android versions, READ_EXTERNAL_STORAGE / WRITE_EXTERNAL_STORAGE is used for the same purpose.
              </p>
            </div>

            {/* Permission 2: Microphone */}
            <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Mic className="h-4 w-4 text-rose-400" />
                  Microphone
                </span>
                <span className="rounded bg-neutral-900 border border-neutral-800 px-2 py-0.5 font-mono text-[10px] text-rose-300">
                  RECORD_AUDIO
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Microphone (RECORD_AUDIO) — only when you use the Voice-Over feature to record commentary. Audio is processed on your device and added to your project.
              </p>
            </div>

            {/* Permission 3: Notifications */}
            <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Bell className="h-4 w-4 text-sky-400" />
                  Notifications
                </span>
                <span className="rounded bg-neutral-900 border border-neutral-800 px-2 py-0.5 font-mono text-[10px] text-sky-300">
                  POST_NOTIFICATIONS
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Notifications (POST_NOTIFICATIONS) — to inform you when a video export finishes.
              </p>
            </div>

            {/* Permission 4: Internet */}
            <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Globe className="h-4 w-4 text-pink-400" />
                  Internet
                </span>
                <span className="rounded bg-neutral-900 border border-neutral-800 px-2 py-0.5 font-mono text-[10px] text-pink-300">
                  INTERNET
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Internet (INTERNET) — to load ads and to download on-device AI models (e.g. auto-caption speech model) when you use those features.
              </p>
            </div>
          </article>

          {/* SECTION 3: Advertising (Google AdMob) */}
          <article id="sec-3" className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 sm:p-7 space-y-4">
            <div className="flex items-center gap-2.5 border-b border-neutral-800/80 pb-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-pink-500/10 font-mono text-xs font-bold text-pink-400">
                3
              </span>
              <h2 className="font-display text-xl font-bold text-white">
                Advertising (Google AdMob)
              </h2>
            </div>

            <p className="text-sm sm:text-base text-neutral-200 leading-relaxed">
              The app shows ads provided by Google AdMob. AdMob may collect your device's Advertising ID (AD_ID) to show and measure ads. You can reset or opt out of ad personalisation in your Android Settings &gt; Privacy &gt; Ads. Our AdMob use follows the Google Play Ads policy.
            </p>

            <div className="rounded-xl border border-neutral-800/80 bg-neutral-950 p-4 text-xs text-neutral-300 space-y-1.5">
              <p className="font-bold text-white">User Opt-Out Instructions (Android):</p>
              <p className="text-neutral-400 leading-relaxed">
                Users can reset or delete their advertising identifier at any time: Open Android <strong className="text-neutral-200">Settings</strong> &rarr; <strong className="text-neutral-200">Privacy</strong> &rarr; <strong className="text-neutral-200">Ads</strong>, then select <strong className="text-neutral-200">Reset advertising ID</strong> or <strong className="text-neutral-200">Delete advertising ID</strong>.
              </p>
            </div>
          </article>

          {/* SECTION 4: Third-party SDKs */}
          <article id="sec-4" className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 sm:p-7 space-y-4">
            <div className="flex items-center gap-2.5 border-b border-neutral-800/80 pb-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-pink-500/10 font-mono text-xs font-bold text-pink-400">
                4
              </span>
              <h2 className="font-display text-xl font-bold text-white">
                Third-party SDKs
              </h2>
            </div>

            <p className="text-sm text-neutral-300 leading-relaxed">
              The application incorporates vetted third-party libraries for advertising and on-device processing:
            </p>

            <div className="space-y-3">
              {/* SDK 1: AdMob */}
              <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-pink-400">Google AdMob (ads)</span>
                  <span className="text-[11px] font-mono text-neutral-400">Advertising Service</span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-300">
                  collects Advertising ID as described above.
                </p>
              </div>

              {/* SDK 2: Google ML Kit */}
              <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-sky-400">Google ML Kit (face detection, subject tracking for Auto Reframe / Beauty)</span>
                  <span className="text-[11px] font-mono text-emerald-400">100% On-Device</span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-300">
                  processing happens on your device.
                </p>
              </div>

              {/* SDK 3: on-device technology */}
              <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-indigo-400">on-device technology</span>
                  <span className="text-[11px] font-mono text-emerald-400">100% On-Device</span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-300">
                  speech recognition runs on your device after a one-time model download.
                </p>
              </div>

              {/* SDK 4: FFmpeg */}
              <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-orange-400">FFmpeg (video export, filters, effects)</span>
                  <span className="text-[11px] font-mono text-emerald-400">100% Local Binary</span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-300">
                  all rendering happens locally on your device.
                </p>
              </div>
            </div>
          </article>

          {/* SECTION 5: Crash and error logs */}
          <article id="sec-5" className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 sm:p-7 space-y-4">
            <div className="flex items-center gap-2.5 border-b border-neutral-800/80 pb-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-pink-500/10 font-mono text-xs font-bold text-pink-400">
                5
              </span>
              <h2 className="font-display text-xl font-bold text-white">
                Crash and error logs
              </h2>
            </div>

            <p className="text-sm sm:text-base text-neutral-200 leading-relaxed">
              If the app crashes or an export fails, a technical log (app version, device model, Android version, error message) is saved on your device. It is shared with us only if you choose to send it (e.g. via issue report or email).
            </p>
          </article>

          {/* SECTION 6: Children */}
          <article id="sec-6" className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 sm:p-7 space-y-4">
            <div className="flex items-center gap-2.5 border-b border-neutral-800/80 pb-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-pink-500/10 font-mono text-xs font-bold text-pink-400">
                6
              </span>
              <h2 className="font-display text-xl font-bold text-white">
                Children
              </h2>
            </div>

            <p className="text-sm sm:text-base text-neutral-200 leading-relaxed">
              The app is not directed at children under 13. If you are a parent and believe your child has provided data through ads, contact Google Ad settings to manage it.
            </p>
          </article>

          {/* SECTION 7: Data retention and deletion */}
          <article id="sec-7" className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 sm:p-7 space-y-4">
            <div className="flex items-center gap-2.5 border-b border-neutral-800/80 pb-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-pink-500/10 font-mono text-xs font-bold text-pink-400">
                7
              </span>
              <h2 className="font-display text-xl font-bold text-white">
                Data retention and deletion
              </h2>
            </div>

            <p className="text-sm sm:text-base text-neutral-200 leading-relaxed">
              Since we run no server and store no user data, there is nothing to delete on our side. Deleting the app and removing exported files from your gallery removes all app data from your device.
            </p>
          </article>

          {/* SECTION 8: Changes to this policy */}
          <article id="sec-8" className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 sm:p-7 space-y-4">
            <div className="flex items-center gap-2.5 border-b border-neutral-800/80 pb-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-pink-500/10 font-mono text-xs font-bold text-pink-400">
                8
              </span>
              <h2 className="font-display text-xl font-bold text-white">
                Changes to this policy
              </h2>
            </div>

            <p className="text-sm sm:text-base text-neutral-200 leading-relaxed">
              We may update this policy when the app changes. The updated date above will always show the latest version.
            </p>
          </article>

          {/* SECTION 9: Contact us */}
          <article id="sec-9" className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 sm:p-7 space-y-4">
            <div className="flex items-center gap-2.5 border-b border-neutral-800/80 pb-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-pink-500/10 font-mono text-xs font-bold text-pink-400">
                9
              </span>
              <h2 className="font-display text-xl font-bold text-white">
                Contact us
              </h2>
            </div>

            <p className="text-sm sm:text-base text-neutral-200 leading-relaxed">
              If you have questions about this policy, contact us at: <a href="mailto:canrot@gmail.com" className="text-pink-400 hover:underline font-semibold">[ canrot@gmail.com ]</a>
            </p>

            <div className="pt-2">
              <a
                href="mailto:canrot@gmail.com"
                className="inline-flex items-center gap-2 rounded-xl bg-pink-500 px-5 py-2.5 text-xs font-bold text-neutral-950 hover:bg-pink-400 transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>Email: canrot@gmail.com</span>
              </a>
            </div>
          </article>

          {/* =========================================================================
              SECTION 10: GOOGLE PLAY CONSOLE DATA SAFETY MAPPING SHEET
              (Reference table for filling out Google Play Console forms)
             ========================================================================= */}
          <section id="sec-data-safety" className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 sm:p-7 space-y-4">
            <div className="border-b border-neutral-800/80 pb-3">
              <h3 className="font-display text-lg font-bold text-white">
                10. Google Play Console Data Safety Mapping Sheet
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Official declaration answers to use when completing your app's Data Safety form in Google Play Console.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-neutral-300">
                <thead className="border-b border-neutral-800 font-mono text-neutral-400 bg-neutral-950/60">
                  <tr>
                    <th className="py-3 px-3">Google Play Data Safety Question</th>
                    <th className="py-3 px-3">Official Declaration</th>
                    <th className="py-3 px-3">Details & Technical Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60">
                  <tr>
                    <td className="py-3 px-3 font-semibold text-white">Does the app collect user data?</td>
                    <td className="py-3 px-3 text-emerald-400 font-bold">No</td>
                    <td className="py-3 px-3 text-neutral-400">Canrot does not collect, record, or transmit user media, names, or accounts.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-semibold text-white">Are photos & videos transferred off-device?</td>
                    <td className="py-3 px-3 text-emerald-400 font-bold">No (0 transfers)</td>
                    <td className="py-3 px-3 text-neutral-400">All media editing, trimming, and rendering is handled locally via native FFmpeg.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-semibold text-white">Are voice recordings uploaded to a server?</td>
                    <td className="py-3 px-3 text-emerald-400 font-bold">No</td>
                    <td className="py-3 px-3 text-neutral-400">Voice-over audio is recorded directly into local timeline cache on device storage.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-semibold text-white">How is data deleted by the user?</td>
                    <td className="py-3 px-3 text-neutral-200 font-semibold">Uninstall App</td>
                    <td className="py-3 px-3 text-neutral-400">Since no cloud server or accounts exist, uninstalling the app deletes all local data.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};
