import React, { useState } from 'react';
import {
  Play,
  Pause,
  Sliders,
  Subtitles,
  Mic,
  Maximize,
  Volume2,
  VolumeX,
  Sparkles,
  Smartphone,
  Gauge,
  Clock,
  Layers,
} from 'lucide-react';

interface SampleClip {
  id: string;
  title: string;
  duration: string;
  category: string;
  gradient: string;
  captionText: string;
}

const SAMPLE_CLIPS: SampleClip[] = [
  {
    id: 'travel',
    title: 'Tokyo Street Food Walk',
    duration: '00:15',
    category: 'Vlog / Travel',
    gradient: 'from-pink-600 via-rose-600 to-rose-700',
    captionText: 'The best ramen shop hidden in Shinjuku alleys...',
  },
  {
    id: 'action',
    title: 'Downhill Mountain Biking',
    duration: '00:22',
    category: 'Sports / Action',
    gradient: 'from-emerald-600 via-teal-700 to-cyan-800',
    captionText: 'Full speed descent through the alpine rock garden!',
  },
  {
    id: 'podcast',
    title: 'Solo Creator Discussion',
    duration: '00:30',
    category: 'Talking Head',
    gradient: 'from-purple-700 via-indigo-800 to-slate-900',
    captionText: 'Why local-first video editing is the future of privacy.',
  },
];

export const InteractivePlayground: React.FC = () => {
  const [selectedClip, setSelectedClip] = useState<SampleClip>(SAMPLE_CLIPS[0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [aspectRatio, setAspectRatio] = useState<'9:16' | '16:9' | '1:1'>('9:16');
  const [filter, setFilter] = useState<'normal' | 'warm' | 'noir' | 'cyber' | 'vivid'>('warm');
  const [captionsActive, setCaptionsActive] = useState(true);
  const [captionStyle, setCaptionStyle] = useState<'impact' | 'minimal' | 'boxed'>('impact');
  const [isMicSimActive, setIsMicSimActive] = useState(false);
  const [targetRes, setTargetRes] = useState<'1080p' | '4k'>('1080p');
  const [chipsetTier, setChipsetTier] = useState<'flagship' | 'midrange' | 'entry'>('flagship');

  const getFilterStyle = () => {
    switch (filter) {
      case 'warm':
        return 'sepia(35%) saturate(140%) contrast(110%)';
      case 'noir':
        return 'grayscale(100%) contrast(150%) brightness(95%)';
      case 'cyber':
        return 'hue-rotate(170deg) saturate(180%) contrast(125%)';
      case 'vivid':
        return 'saturate(210%) contrast(110%) brightness(105%)';
      default:
        return 'none';
    }
  };

  // Calculate estimated FFmpeg render speed
  const getRenderTimeEstimate = () => {
    const baseSeconds = selectedClip.id === 'travel' ? 15 : selectedClip.id === 'action' ? 22 : 30;
    let multiplier = targetRes === '4k' ? 2.8 : 1.0;
    if (chipsetTier === 'flagship') multiplier *= 0.4;
    else if (chipsetTier === 'midrange') multiplier *= 0.85;
    else multiplier *= 1.6;

    const est = Math.round(baseSeconds * multiplier);
    return `${est}s`;
  };

  return (
    <section id="playground" className="py-20 border-t border-neutral-900 bg-neutral-950/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-left space-y-3 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono text-pink-400">
            <span>INTERACTIVE SIMULATOR</span>
            <span aria-hidden="true">·</span>
            <span>TRY THE WORKFLOW</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white text-balance">
            Experience the Canrot Video Canvas
          </h2>
          <p className="text-base text-neutral-400">
            Preview how real-time color grading, aspect ratio reframing, and on-device technology auto-captions behave without needing to install anything first.
          </p>
        </div>

        {/* Studio Workspace Layout */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left/Center: Video Canvas Monitor (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl border border-neutral-800 bg-neutral-900/90 p-4 sm:p-6 shadow-xl">
            {/* Monitor Header */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800 text-xs">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-neutral-300 font-semibold">{selectedClip.title}</span>
              </div>
              <div className="flex items-center gap-3 font-mono text-neutral-400">
                <span>{aspectRatio}</span>
                <span>·</span>
                <span className="text-pink-400">FFmpeg Ready</span>
              </div>
            </div>

            {/* Video Stage Frame */}
            <div className="relative my-6 flex h-[360px] sm:h-[420px] w-full items-center justify-center rounded-xl bg-neutral-950 overflow-hidden border border-neutral-800/80">
              {/* Dynamic Aspect Ratio Box */}
              <div
                className={`relative overflow-hidden rounded-lg shadow-2xl transition-all duration-300 flex items-center justify-center ${
                  aspectRatio === '9:16'
                    ? 'h-full aspect-[9/16]'
                    : aspectRatio === '16:9'
                    ? 'w-full aspect-[16/9]'
                    : 'h-full aspect-square'
                }`}
              >
                {/* Visual Backdrop with Selected Gradient & Filter */}
                <div
                  className={`absolute inset-0 bg-gradient-to-tr ${selectedClip.gradient} transition-all duration-300`}
                  style={{ filter: getFilterStyle() }}
                >
                  {/* Subtle Grid and Camera Crosshairs */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage:
                        'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
                      backgroundSize: '40px 40px',
                    }}
                  />
                  {/* Sun / Spotlight graphic */}
                  <div className="absolute top-1/4 right-1/4 h-32 w-32 rounded-full bg-white/20 blur-xl" />
                </div>

                {/* Simulated Google ML Kit Auto-Reframe Box */}
                <div className="absolute inset-x-8 top-12 bottom-20 rounded-md border-2 border-dashed border-sky-400/70 pointer-events-none flex flex-col justify-between p-2">
                  <span className="self-start rounded bg-sky-950/80 px-1.5 py-0.5 text-[10px] font-mono text-sky-300">
                    ML Kit Track: 99.4% confidence
                  </span>
                  <div className="self-end text-[10px] font-mono text-sky-300/80">
                    Auto-Centered
                  </div>
                </div>

                {/* Subtitle Caption Overlay (On-Device Technology) */}
                {captionsActive && (
                  <div className="absolute bottom-6 inset-x-4 text-center pointer-events-none">
                    {captionStyle === 'impact' && (
                      <span className="inline-block rounded-md bg-pink-500 px-3 py-1 font-display text-sm font-black uppercase text-neutral-950 shadow-lg tracking-wide">
                        {selectedClip.captionText}
                      </span>
                    )}
                    {captionStyle === 'minimal' && (
                      <span className="inline-block rounded bg-black/75 px-3 py-1 text-sm font-semibold text-white backdrop-blur-xs">
                        {selectedClip.captionText}
                      </span>
                    )}
                    {captionStyle === 'boxed' && (
                      <span className="inline-block rounded-lg border border-pink-400/60 bg-neutral-950/90 px-3 py-1.5 text-sm font-mono text-pink-300 shadow-md">
                        [VO: {selectedClip.captionText}]
                      </span>
                    )}
                  </div>
                )}

                {/* Center Playback Overlay */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/25 transition-colors cursor-pointer"
                  aria-label={isPlaying ? 'Pause video preview' : 'Play video preview'}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-950/80 text-white shadow-xl backdrop-blur-sm transition-transform hover:scale-110">
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5 fill-white" />}
                  </div>
                </button>
              </div>
            </div>

            {/* Video Canvas Bottom Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-400">Aspect Ratio:</span>
                {(['9:16', '16:9', '1:1'] as const).map((ratio) => (
                  <button
                    key={ratio}
                    onClick={() => setAspectRatio(ratio)}
                    className={`rounded-lg px-2.5 py-1 text-xs font-mono transition-colors ${
                      aspectRatio === ratio
                        ? 'bg-pink-500 text-neutral-950 font-bold'
                        : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                    }`}
                  >
                    {ratio}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCaptionsActive(!captionsActive)}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                    captionsActive
                      ? 'bg-pink-500/20 text-pink-300 border border-pink-500/40'
                      : 'bg-neutral-800 text-neutral-400'
                  }`}
                >
                  <Subtitles className="h-3.5 w-3.5" />
                  <span>{captionsActive ? 'Auto Captions ON' : 'Captions OFF'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Tool Customizer & Speed Estimator (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* 1. Choose Sample Footage */}
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white">1. Select Sample Project</h3>
                <span className="text-xs text-neutral-500 font-mono">3 Clips</span>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {SAMPLE_CLIPS.map((clip) => (
                  <button
                    key={clip.id}
                    onClick={() => setSelectedClip(clip)}
                    className={`flex items-center justify-between rounded-xl border p-3 text-left transition-all ${
                      selectedClip.id === clip.id
                        ? 'border-pink-500/60 bg-pink-500/10 text-white'
                        : 'border-neutral-800/80 bg-neutral-950/60 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-semibold">{clip.title}</p>
                      <p className="text-[11px] text-neutral-400">{clip.category}</p>
                    </div>
                    <span className="font-mono text-xs text-pink-400">{clip.duration}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Color Grading Preset */}
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white">2. Local Color LUT / Filter</h3>
                <span className="text-xs text-neutral-500 font-mono">Zero Lag</span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {(
                  [
                    { id: 'warm', name: 'Warm 35mm' },
                    { id: 'noir', name: 'Noir 90s' },
                    { id: 'cyber', name: 'Cyberpunk' },
                    { id: 'vivid', name: 'Vivid Pop' },
                    { id: 'normal', name: 'Raw Flat' },
                  ] as const
                ).map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFilter(f.id)}
                    className={`rounded-lg px-2 py-1.5 text-xs text-center font-medium transition-all ${
                      filter === f.id
                        ? 'bg-pink-500 text-neutral-950 font-bold shadow-sm'
                        : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                    }`}
                  >
                    {f.name}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. On-Device Caption Typography */}
            {captionsActive && (
              <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-white">3. Subtitle Preset Style</h3>
                  <span className="text-xs text-pink-400 font-mono">On-Device Technology</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {(
                    [
                      { id: 'impact', label: 'Bold Pop' },
                      { id: 'minimal', label: 'Dark Scrim' },
                      { id: 'boxed', label: 'Outlined' },
                    ] as const
                  ).map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setCaptionStyle(style.id)}
                      className={`rounded-lg p-2 text-xs text-center font-medium transition-colors ${
                        captionStyle === style.id
                          ? 'bg-pink-500 text-neutral-950 font-bold'
                          : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                      }`}
                    >
                      {style.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Native FFmpeg Local Render Time Estimator */}
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-sm font-semibold text-white">
                  <Gauge className="h-4 w-4 text-pink-400" />
                  <span>FFmpeg Local Render Benchmark</span>
                </div>
                <span className="font-mono text-xs text-emerald-400 font-bold">
                  ~{getRenderTimeEstimate()}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Export Resolution:</span>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setTargetRes('1080p')}
                      className={`rounded px-2 py-0.5 font-mono ${
                        targetRes === '1080p'
                          ? 'bg-pink-500 text-neutral-950 font-bold'
                          : 'bg-neutral-800 text-neutral-300'
                      }`}
                    >
                      1080p FHD
                    </button>
                    <button
                      onClick={() => setTargetRes('4k')}
                      className={`rounded px-2 py-0.5 font-mono ${
                        targetRes === '4k'
                          ? 'bg-pink-500 text-neutral-950 font-bold'
                          : 'bg-neutral-800 text-neutral-300'
                      }`}
                    >
                      4K UHD
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-neutral-400">Android Chipset:</span>
                  <select
                    value={chipsetTier}
                    onChange={(e) => setChipsetTier(e.target.value as any)}
                    className="rounded bg-neutral-950 border border-neutral-800 px-2 py-1 text-xs text-neutral-200 focus:outline-none"
                  >
                    <option value="flagship">Snapdragon 8 / Dimensity 9000 (Fastest)</option>
                    <option value="midrange">Snapdragon 7 / Tensor G2/G3 (Balanced)</option>
                    <option value="entry">Entry-level 4G/5G Octa-Core</option>
                  </select>
                </div>
              </div>

              <p className="text-[11px] text-neutral-500 pt-1">
                Render times are estimated based on hardware-accelerated MediaCodec and native FFmpeg pipelines executing locally without internet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
