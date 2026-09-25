import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Mic,
  Subtitles,
  Sliders,
  Share2,
  Maximize2,
  Volume2,
  Scissors,
  Check,
} from 'lucide-react';

interface PhoneMockupProps {
  interactive?: boolean;
}

export const PhoneMockup: React.FC<PhoneMockupProps> = ({ interactive = true }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentFilter, setCurrentFilter] = useState<'normal' | 'warm' | 'noir' | 'cyber' | 'vivid'>('warm');
  const [aspectRatio, setAspectRatio] = useState<'9:16' | '16:9' | '1:1'>('9:16');
  const [showCaptions, setShowCaptions] = useState(true);
  const [currentProgress, setCurrentProgress] = useState(38);
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);

  // Playhead scrubber simulation
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentProgress((prev) => (prev >= 98 ? 2 : prev + 1.2));
    }, 150);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleExportSim = () => {
    setIsExporting(true);
    setExportComplete(false);
    setTimeout(() => {
      setIsExporting(false);
      setExportComplete(true);
      setTimeout(() => setExportComplete(false), 3000);
    }, 1800);
  };

  const getFilterStyle = () => {
    switch (currentFilter) {
      case 'warm':
        return 'sepia(30%) saturate(140%) contrast(108%) hue-rotate(-10deg)';
      case 'noir':
        return 'grayscale(100%) contrast(160%) brightness(90%)';
      case 'cyber':
        return 'hue-rotate(180deg) saturate(180%) contrast(120%)';
      case 'vivid':
        return 'saturate(200%) contrast(115%) brightness(105%)';
      default:
        return 'none';
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[380px]">
      {/* Outer Glow & Shadow */}
      <div className="absolute -inset-1.5 rounded-[44px] bg-gradient-to-b from-pink-500/20 via-rose-500/10 to-transparent blur-xl" />

      {/* Android Device Shell */}
      <div className="relative overflow-hidden rounded-[42px] border-[5px] border-neutral-800 bg-neutral-950 shadow-2xl shadow-black/80 ring-1 ring-white/10">
        {/* Device Top Speaker Notch / Camera Island */}
        <div className="relative flex h-7 items-center justify-between px-6 pt-2 text-[10px] font-mono text-neutral-400">
          <span>11:24</span>
          {/* Punch-hole camera */}
          <div className="absolute left-1/2 top-2.5 h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-neutral-900 ring-2 ring-neutral-800/80">
            <div className="absolute inset-1 rounded-full bg-blue-950/60" />
          </div>
          <div className="flex items-center gap-1.5">
            <span>5G</span>
            <div className="h-2 w-4 rounded-sm border border-neutral-400 p-0.5">
              <div className="h-full w-3/4 rounded-xs bg-pink-400" />
            </div>
          </div>
        </div>

        {/* Canrot App Header Inside Phone */}
        <div className="flex items-center justify-between border-b border-neutral-800/80 px-4 py-2.5 bg-neutral-900/60">
          <div className="flex items-center gap-1.5">
            <span className="flex h-4 w-4 items-center justify-center rounded-xs bg-[#f4f3ef] text-[6px] font-extrabold text-[#18181b] tracking-tighter">
              c
            </span>
            <span className="font-extrabold text-xs text-white tracking-tight lowercase">canrot</span>
            <span className="text-[10px] text-neutral-500 font-mono ml-1">1080p·60fps</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentProgress(0)}
              className="text-neutral-400 hover:text-white"
              title="Reset Playhead"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={handleExportSim}
              disabled={isExporting}
              className={`flex items-center gap-1 rounded px-2.5 py-1 text-[11px] font-semibold transition-all ${
                exportComplete
                  ? 'bg-emerald-600 text-white'
                  : isExporting
                  ? 'bg-neutral-700 text-neutral-300'
                  : 'bg-pink-500 text-neutral-950 hover:bg-pink-400'
              }`}
            >
              {isExporting ? (
                <>
                  <div className="h-2.5 w-2.5 animate-spin rounded-full border-2 border-pink-400 border-t-transparent" />
                  <span>FFmpeg...</span>
                </>
              ) : exportComplete ? (
                <>
                  <Check className="h-3 w-3" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Share2 className="h-3 w-3" />
                  <span>Export 4K</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Video Canvas Preview Stage */}
        <div className="relative flex aspect-[4/3] sm:aspect-square items-center justify-center bg-neutral-950 p-2 overflow-hidden">
          {/* Dynamic Video Simulation Screen with Aspect Ratio selector */}
          <div
            className={`relative overflow-hidden rounded-lg bg-neutral-900 transition-all duration-300 shadow-inner flex items-center justify-center ${
              aspectRatio === '9:16'
                ? 'h-full aspect-[9/16]'
                : aspectRatio === '16:9'
                ? 'w-full aspect-[16/9]'
                : 'h-full aspect-square'
            }`}
          >
            {/* Simulated Live Footage with Artistic Shader / Elements */}
            <div
              className="absolute inset-0 transition-all duration-200"
              style={{ filter: getFilterStyle() }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-900/60 via-rose-800/40 to-neutral-900" />
              {/* Animated visual elements */}
              <div
                className="absolute inset-0 opacity-70"
                style={{
                  background:
                    'radial-gradient(circle at 60% 40%, rgba(236, 72, 153, 0.4) 0%, rgba(244, 63, 94, 0.2) 40%, transparent 80%)',
                }}
              />
              
              {/* Street Scene Graphic Simulation */}
              <svg className="absolute inset-0 h-full w-full opacity-60" viewBox="0 0 200 300" preserveAspectRatio="none">
                <path d="M0,220 Q50,180 100,210 T200,200 L200,300 L0,300 Z" fill="#09090b" />
                <path d="M40,240 L160,240 L190,300 L10,300 Z" fill="#18181b" />
                <circle cx="100" cy="120" r="36" fill="#ec4899" opacity="0.3" />
                {/* Subject Auto-Tracking Bounding Box (Google ML Kit Demo) */}
                <rect
                  x="72"
                  y="92"
                  width="56"
                  height="75"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                  rx="4"
                />
              </svg>
            </div>

            {/* Smart Face / Subject Detection Pill (ML Kit On-Device) */}
            <div className="absolute top-2 left-2 flex items-center gap-1 rounded bg-black/60 px-1.5 py-0.5 text-[9px] font-mono text-sky-300 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
              ML Kit Auto-Reframe
            </div>

            {/* Animated On-Device Captions */}
            {showCaptions && (
              <div className="absolute bottom-5 inset-x-2 text-center pointer-events-none">
                <span className="inline-block rounded-md bg-neutral-950/80 px-2.5 py-1 text-[11px] font-bold text-pink-300 shadow-md backdrop-blur-xs tracking-wide">
                  "Editing 100% on Android phone..."
                </span>
              </div>
            )}

            {/* Canvas Overlay Play Indicator */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/20 transition-colors group cursor-pointer"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-950/70 text-white shadow-lg backdrop-blur-sm transition-transform group-hover:scale-110">
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5 fill-white" />}
              </div>
            </button>
          </div>
        </div>

        {/* Quick Mode Toolbar on Canvas */}
        <div className="flex items-center justify-between border-y border-neutral-800/60 bg-neutral-900/40 px-3 py-1.5 text-[11px]">
          {/* Aspect Ratio Switcher */}
          <div className="flex items-center gap-1">
            <span className="text-neutral-500 text-[10px]">Ratio:</span>
            {(['9:16', '16:9', '1:1'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setAspectRatio(r)}
                className={`rounded px-1.5 py-0.5 text-[10px] font-mono transition-colors ${
                  aspectRatio === r
                    ? 'bg-pink-500/20 text-pink-300 font-bold border border-pink-500/40'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          {/* Captions & Filter Toggles */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCaptions(!showCaptions)}
              className={`flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] transition-colors ${
                showCaptions ? 'text-pink-400' : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              <Subtitles className="h-3 w-3" />
              <span>On-Device AI</span>
            </button>
          </div>
        </div>

        {/* Timecode & Playhead Controls */}
        <div className="flex items-center justify-between bg-neutral-950 px-4 py-1 text-[10px] font-mono text-neutral-400 border-b border-neutral-900">
          <span>00:03:12</span>
          <span className="text-pink-400 font-semibold">Native FFmpeg Engine</span>
          <span>00:15:00</span>
        </div>

        {/* Multi-Track Timeline Stage */}
        <div className="relative bg-neutral-950 p-2.5 space-y-2 border-b border-neutral-800/80">
          {/* Playhead vertical marker */}
          <div
            className="absolute top-0 bottom-0 z-20 w-0.5 bg-pink-400 pointer-events-none"
            style={{ left: `${currentProgress}%` }}
          >
            <div className="h-2 w-2 -ml-[3px] rounded-full bg-pink-400 shadow-sm" />
          </div>

          {/* Track 1: Auto Captions Subtitle track */}
          <div className="flex items-center gap-2 text-[10px]">
            <span className="w-12 text-neutral-500 text-right truncate">Captions</span>
            <div className="relative flex-1 h-5 rounded bg-neutral-900 border border-neutral-800 overflow-hidden flex items-center px-1">
              <div className="h-3.5 w-1/3 rounded bg-pink-500/25 border border-pink-500/40 flex items-center justify-center text-[9px] text-pink-300 font-medium">
                On-Device STT
              </div>
              <div className="h-3.5 w-1/4 ml-2 rounded bg-pink-500/25 border border-pink-500/40 flex items-center justify-center text-[9px] text-pink-300 font-medium">
                Auto Timing
              </div>
            </div>
          </div>

          {/* Track 2: Video Footage Track (with cut thumbnails) */}
          <div className="flex items-center gap-2 text-[10px]">
            <span className="w-12 text-neutral-500 text-right truncate">Video 1</span>
            <div className="relative flex-1 h-8 rounded bg-neutral-900 border border-neutral-800 overflow-hidden flex items-center gap-1 p-0.5">
              <div className="h-full w-2/5 rounded bg-rose-950/70 border border-rose-600/40 flex items-center justify-between px-1.5 text-[9px] text-rose-200">
                <span className="truncate">Clip_01.mp4</span>
                <Scissors className="h-2.5 w-2.5 opacity-60" />
              </div>
              <div className="h-full w-3/5 rounded bg-pink-950/70 border border-pink-600/40 flex items-center justify-between px-1.5 text-[9px] text-pink-200">
                <span className="truncate">Clip_02_4K.mp4</span>
                <Scissors className="h-2.5 w-2.5 opacity-60" />
              </div>
            </div>
          </div>

          {/* Track 3: Audio Waveform Track */}
          <div className="flex items-center gap-2 text-[10px]">
            <span className="w-12 text-neutral-500 text-right truncate">Audio</span>
            <div className="relative flex-1 h-5 rounded bg-neutral-900 border border-neutral-800 overflow-hidden flex items-center px-1">
              {/* Simulated Waveform SVG */}
              <svg className="w-full h-3 text-emerald-500/80" preserveAspectRatio="none" viewBox="0 0 100 10">
                <path
                  d="M0,5 Q5,1 10,5 T20,8 T30,2 T40,7 T50,1 T60,9 T70,3 T80,7 T90,2 T100,5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          </div>

          {/* Track 4: Voice-over Mic Track (RECORD_AUDIO) */}
          <div className="flex items-center gap-2 text-[10px]">
            <span className="w-12 text-neutral-500 text-right truncate flex items-center justify-end gap-1">
              <Mic className="h-2.5 w-2.5 text-rose-400" />
              <span>Voice</span>
            </span>
            <div className="relative flex-1 h-5 rounded bg-neutral-900 border border-neutral-800 overflow-hidden flex items-center px-1">
              <div className="h-3 w-1/2 ml-8 rounded bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-[8px] text-rose-300">
                Studio Commentary (PCM 48kHz)
              </div>
            </div>
          </div>
        </div>

        {/* Live Filter Selection Bar inside Phone */}
        <div className="bg-neutral-900/90 px-3 py-2 flex items-center justify-between">
          <span className="text-[10px] text-neutral-400 font-medium">Color Grade:</span>
          <div className="flex items-center gap-1.5">
            {(
              [
                { id: 'warm', label: 'Warm 35mm' },
                { id: 'noir', label: 'Noir' },
                { id: 'cyber', label: 'Cyber' },
                { id: 'vivid', label: 'Vivid' },
                { id: 'normal', label: 'Raw' },
              ] as const
            ).map((filter) => (
              <button
                key={filter.id}
                onClick={() => setCurrentFilter(filter.id)}
                className={`rounded px-1.5 py-0.5 text-[9px] transition-all ${
                  currentFilter === filter.id
                    ? 'bg-pink-500 text-neutral-950 font-bold'
                    : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Android Bottom Navigation Bar */}
        <div className="flex h-7 items-center justify-around bg-neutral-950 px-8">
          <div className="h-1 w-24 rounded-full bg-neutral-700" />
        </div>
      </div>

      {/* Decorative Floating Spec Badges */}
      <div className="absolute -bottom-4 -left-6 hidden sm:flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900/95 px-3 py-2 shadow-xl backdrop-blur-md">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
          <Sparkles className="h-4 w-4" />
        </div>
        <div className="text-left">
          <p className="text-[11px] font-semibold text-white">Zero Cloud Upload</p>
          <p className="text-[10px] text-neutral-400">Media stays on your phone</p>
        </div>
      </div>

      <div className="absolute -top-4 -right-4 hidden sm:flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900/95 px-3 py-2 shadow-xl backdrop-blur-md">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-pink-500/20 text-pink-400">
          <Subtitles className="h-4 w-4" />
        </div>
        <div className="text-left">
          <p className="text-[11px] font-semibold text-white">On-Device Technology Auto-Captions</p>
          <p className="text-[10px] text-neutral-400">Runs offline on Android</p>
        </div>
      </div>
    </div>
  );
};
