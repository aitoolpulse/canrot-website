import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Shield, Cpu, Mic, FileText } from 'lucide-react';
import { FAQItem } from '../types';

const FAQS: FAQItem[] = [
  {
    category: 'Privacy',
    question: 'Are my videos, photos, or voice-overs ever uploaded to a server?',
    answer:
      'Never. Canrot operates under a strict local-first architecture. All video decoding, cutting, filter rendering, and audio mixing happen on your Android device hardware using native FFmpeg libraries. We do not own, operate, or maintain any user media storage servers.',
  },
  {
    category: 'Permissions',
    question: 'Why does Canrot request the Microphone (RECORD_AUDIO) permission?',
    answer:
      'The microphone permission is requested solely to enable the Voice-Over studio commentary feature. When you tap the record button to narrate over your video timeline, your voice is encoded on your phone and added directly into your timeline project file. It is never transmitted anywhere.',
  },
  {
    category: 'Features',
    question: 'How do auto-captions work without sending audio to the cloud?',
    answer:
      'Canrot integrates on-device technology for speech recognition. When you first use auto-captions, the app downloads a lightweight speech acoustic model to your device via the INTERNET permission. From that point on, speech-to-text recognition runs completely offline on your device processor with zero internet usage.',
  },
  {
    category: 'Privacy',
    question: 'How does Google AdMob use my device Advertising ID (AD_ID)?',
    answer:
      'AdMob uses the Android Advertising ID to display relevant advertisements and detect fraudulent clicks. You can reset or delete your Advertising ID anytime in Android Settings > Privacy > Ads. We do not link ads to any personal identity or media content.',
  },
  {
    category: 'Performance',
    question: 'What video export resolutions and formats are supported?',
    answer:
      'Canrot supports 720p, 1080p Full HD, and 4K UHD export in MP4 container using H.264 (AVC) and H.265 (HEVC) hardware-accelerated encoders on supported Android devices (Android 8.0+).',
  },
  {
    category: 'Permissions',
    question: 'How do I submit crash logs if an export fails?',
    answer:
      'If an unexpected crash or export failure occurs, a technical text report (app version, Android OS version, device model, and FFmpeg error log) is generated locally. It is NEVER sent automatically; you have full control to email it to contacts@tiyazo.com if you want us to investigate.',
  },
];

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const categories = ['All', 'Privacy', 'Permissions', 'Features', 'Performance'];

  const filteredFaqs =
    activeFilter === 'All'
      ? FAQS
      : FAQS.filter((f) => f.category === activeFilter);

  return (
    <section id="faq" className="py-20 border-t border-neutral-900 bg-neutral-950">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-left space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-pink-400">
            <span>COMMON QUESTIONS</span>
            <span aria-hidden="true">·</span>
            <span>TRANSPARENCY FIRST</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            Clear answers about data privacy, Android permissions, and on-device video rendering.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveFilter(cat);
                setOpenIdx(null);
              }}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                activeFilter === cat
                  ? 'bg-pink-500 text-neutral-950 font-bold'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="mt-6 space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/60 transition-colors"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between p-4 sm:p-5 text-left text-sm font-semibold text-white hover:text-pink-400 transition-colors"
                >
                  <span className="pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-neutral-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-pink-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-neutral-800/80 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
