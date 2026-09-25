import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, MessageSquare, Bug, HelpCircle } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Feedback / Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;

    // Build mailto link so it actually creates an email to contacts@tiyazo.com
    const mailtoUrl = `mailto:contacts@tiyazo.com?subject=${encodeURIComponent(
      `[Canrot App] ${subject} - from ${name || 'User'}`
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    )}`;

    window.location.href = mailtoUrl;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-20 border-t border-neutral-900 bg-neutral-950/80">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Info Column */}
          <div className="md:col-span-5 text-left space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-pink-400">
              <Mail className="h-3.5 w-3.5" />
              <span>DIRECT DEVELOPER CONTACT</span>
            </div>

            <h2 className="font-display text-3xl font-extrabold tracking-tight text-white">
              Get in Touch with Canrot
            </h2>

            <p className="text-sm text-neutral-300 leading-relaxed">
              Have questions regarding our privacy policy, feature requests, or encountered an issue with video rendering? We are here to help.
            </p>

            <div className="space-y-3 pt-3">
              <a
                href="mailto:contacts@tiyazo.com"
                className="flex items-center gap-3 rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 transition-colors hover:border-pink-500/40 group"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-500/10 text-pink-400 group-hover:bg-pink-500 group-hover:text-neutral-950 transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-neutral-400">Official Contact Email</p>
                  <p className="text-sm font-semibold text-white font-mono group-hover:text-pink-400 transition-colors">
                    contacts@tiyazo.com
                  </p>
                </div>
              </a>

              <div className="rounded-xl border border-neutral-800/80 bg-neutral-900/40 p-4 space-y-1 text-xs text-neutral-400">
                <p className="font-medium text-white">Privacy Inquiries & Crash Logs</p>
                <p>
                  When reporting a crash, please include your Android version and device model (e.g., Pixel 8, Samsung Galaxy S23) to help us diagnose quickly.
                </p>
              </div>
            </div>
          </div>

          {/* Right Contact Form Column */}
          <div className="md:col-span-7">
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 sm:p-8 text-left">
              <h3 className="text-lg font-bold text-white mb-1">Send a Message</h3>
              <p className="text-xs text-neutral-400 mb-6">
                Your message will be sent directly to <strong className="text-neutral-200">contacts@tiyazo.com</strong>.
              </p>

              {submitted ? (
                <div className="rounded-xl border border-emerald-800 bg-emerald-950/40 p-6 text-center space-y-2">
                  <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-400" />
                  <p className="text-sm font-semibold text-white">Opening Your Email Client...</p>
                  <p className="text-xs text-neutral-300">
                    If your email app did not open automatically, please send your email directly to{' '}
                    <strong className="text-pink-400">contacts@tiyazo.com</strong>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-neutral-300 mb-1 font-medium">Your Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Alex"
                        className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3.5 py-2.5 text-white placeholder-neutral-500 focus:border-pink-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-neutral-300 mb-1 font-medium">Your Email *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@example.com"
                        className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3.5 py-2.5 text-white placeholder-neutral-500 focus:border-pink-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-neutral-300 mb-1 font-medium">Subject</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3.5 py-2.5 text-white focus:border-pink-400 focus:outline-none"
                    >
                      <option value="Privacy Policy Question">Privacy Policy Question</option>
                      <option value="Feature Request">Feature Request</option>
                      <option value="Crash Report / Bug">Crash Report / Technical Bug</option>
                      <option value="General Inquiry">General Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-neutral-300 mb-1 font-medium">Message *</label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe your inquiry or attach technical error logs..."
                      className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3.5 py-2.5 text-white placeholder-neutral-500 focus:border-pink-400 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-pink-500 py-3 text-xs font-bold text-neutral-950 shadow-md hover:bg-pink-400 transition-colors"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Send Message to contacts@tiyazo.com</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
