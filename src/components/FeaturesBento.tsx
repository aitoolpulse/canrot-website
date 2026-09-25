import React from 'react';
import {
  ShieldCheck,
  Cpu,
  Mic,
  Subtitles,
  Smartphone,
  BellRing,
  Layers,
  Wand2,
  Lock,
  Zap,
} from 'lucide-react';

export const FeaturesBento: React.FC = () => {
  return (
    <section id="features" className="py-20 border-t border-neutral-900 bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl text-left space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-pink-400">
            <span>ENGINEERED FOR ANDROID</span>
            <span aria-hidden="true">·</span>
            <span>HARDWARE ACCELERATED</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white text-balance">
            Pro Video Tools That Respect Your Privacy
          </h2>
          <p className="text-base text-neutral-400 leading-relaxed">
            Most modern video editors upload your raw video footage, photos, and voice notes to cloud servers.
            Canrot does the opposite: everything is processed directly on your Android device using industry-standard native engines.
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: Local-First Privacy (Col 7) */}
          <div className="md:col-span-7 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 sm:p-8 flex flex-col justify-between hover:border-neutral-700 transition-colors">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-pink-400">01. Architectural Principle</span>
                <div className="flex items-center gap-1.5 rounded-full bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-0.5 text-xs text-emerald-400">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Zero Cloud Pipeline</span>
                </div>
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                Local-First Editing: Your Media Stays In Your Pocket
              </h3>

              <p className="text-sm text-neutral-300 leading-relaxed">
                Canrot edits videos completely on your phone. Your high-resolution camera recordings, sensitive private family photos, and custom soundtracks never touch an external server or database. We don’t require an account, phone number, or login.
              </p>

              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="rounded-lg bg-neutral-950 p-3 border border-neutral-800/80">
                  <div className="flex items-center gap-2 font-semibold text-white">
                    <Lock className="h-3.5 w-3.5 text-emerald-400" />
                    <span>No User Accounts</span>
                  </div>
                  <p className="mt-1 text-neutral-400">
                    Open the app and start trimming immediately. No signup wall.
                  </p>
                </div>

                <div className="rounded-lg bg-neutral-950 p-3 border border-neutral-800/80">
                  <div className="flex items-center gap-2 font-semibold text-white">
                    <Zap className="h-3.5 w-3.5 text-pink-400" />
                    <span>Offline Capability</span>
                  </div>
                  <p className="mt-1 text-neutral-400">
                    Edit on airplanes, in remote areas, or without cellular data.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: On-Device Technology Auto Captions (Col 5) */}
          <div className="md:col-span-5 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 sm:p-8 flex flex-col justify-between hover:border-neutral-700 transition-colors">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-pink-400">02. On-Device Speech Model</span>
                <span className="text-xs text-neutral-500 font-mono">On-Device Engine</span>
              </div>

              <h3 className="font-display text-xl font-bold text-white">
                On-Device Technology Auto-Captions
              </h3>

              <p className="text-sm text-neutral-300 leading-relaxed">
                Generate word-by-word synchronized subtitles and animated captions automatically. After a one-time lightweight model download over internet, the speech recognition engine runs 100% on your Android hardware with zero cloud latency.
              </p>

              <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-3.5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-400">Speech-to-Text Model:</span>
                  <span className="font-mono text-pink-400">On-Device Technology (Local)</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-400">Network Transmission:</span>
                  <span className="font-mono text-emerald-400">0 bytes during transcription</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Google ML Kit Auto Reframe (Col 4) */}
          <div className="md:col-span-4 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 flex flex-col justify-between hover:border-neutral-700 transition-colors">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-pink-400">03. Smart Tracking</span>
                <Wand2 className="h-4 w-4 text-sky-400" />
              </div>

              <h3 className="font-display text-lg font-bold text-white">
                ML Kit Auto-Reframe
              </h3>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Powered by Google ML Kit running on-device. Automatically tracks subjects and faces when converting 16:9 widescreen footage into 9:16 vertical videos for YouTube Shorts, Instagram Reels, and TikTok.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
              <span>Face & Subject Bounding</span>
              <span className="text-sky-400 font-mono">Realtime 60fps</span>
            </div>
          </div>

          {/* Card 4: Studio Voice-Over (Col 4) */}
          <div className="md:col-span-4 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 flex flex-col justify-between hover:border-neutral-700 transition-colors">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-pink-400">04. Studio Voice-Over</span>
                <Mic className="h-4 w-4 text-rose-400" />
              </div>

              <h3 className="font-display text-lg font-bold text-white">
                Live Microphone Commentary
              </h3>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Record crystal-clear voice narration directly over your video timeline. Utilizing the Android <code className="font-mono text-xs text-pink-300 bg-neutral-950 px-1 py-0.5 rounded">RECORD_AUDIO</code> permission exclusively when commentary is active.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
              <span>Audio Ducking & Curve</span>
              <span className="text-rose-400 font-mono">PCM 48kHz</span>
            </div>
          </div>

          {/* Card 5: Native FFmpeg & Background Export (Col 4) */}
          <div className="md:col-span-4 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 flex flex-col justify-between hover:border-neutral-700 transition-colors">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-pink-400">05. Render Engine</span>
                <BellRing className="h-4 w-4 text-pink-400" />
              </div>

              <h3 className="font-display text-lg font-bold text-white">
                FFmpeg & Push Export
              </h3>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Heavy video export, filtering, transitions, and audio muxing are executed locally by native FFmpeg binaries. When your 4K render finishes, Android system notifications alert you instantly.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
              <span>Hardware Acceleration</span>
              <span className="text-pink-400 font-mono">H.264 / HEVC</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
