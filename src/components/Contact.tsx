import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { VenomButton } from './VenomButton';
import { SITE, WHATSAPP_URL } from '../data/portfolioData';
import { Mail, Phone, CheckCircle2, AlertCircle, Loader2, ArrowRight } from 'lucide-react';

const DISPLAY_PHONE = '+91 6303976056';

gsap.registerPlugin(ScrollTrigger);

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })
        .fromTo(titleRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' })
        .fromTo(cardRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'back.out(1.4)' }, '-=0.3');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName) {
      newErrors.name = 'Please enter your name.';
    } else if (trimmedName.length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail) {
      newErrors.email = 'Please enter your email address.';
    } else if (!emailRegex.test(trimmedEmail)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!trimmedMessage) {
      newErrors.message = 'Please enter your message.';
    } else if (trimmedMessage.length < 10) {
      newErrors.message = 'Message must be at least 10 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: 'name' | 'email' | 'message', value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (submitStatus === 'error') {
      setServerError('');
      setSubmitStatus('idle');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setServerError('');
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || `Server responded with status ${response.status}`);
      }

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
    } catch (err: any) {
      console.error('Contact form submission error:', err);
      setSubmitStatus('error');
      setServerError(
        err?.message || 'Failed to deliver message. Please try again or reach out directly via email or WhatsApp.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full text-gray-100 py-28 px-6 md:px-16 lg:px-24 flex flex-col items-center justify-center overflow-hidden border-t border-white/5"
    >
      {/* Section Title */}
      <div ref={titleRef} className="flex flex-col items-center text-center mb-14 z-10 max-w-2xl">
        <span className="text-[#a31515] font-bold uppercase text-sm md:text-base tracking-[0.2em] mb-2 flex items-center gap-1.5">
          <img src="/assets/icon.svg" alt="" aria-hidden="true" className="w-6 h-6 object-contain" />
          Let's Build Something Together
        </span>
        <h2 className="text-5xl md:text-7xl font-black tracking-tight uppercase text-white">
          CONTACT.
        </h2>
        <div className="w-20 h-1.5 bg-[#a31515] mt-3 rounded-full" />
        <p className="text-gray-400 text-sm md:text-base mt-4 font-normal leading-relaxed">
          I'm always open to connecting with developers, exploring opportunities, collaborating on interesting projects, and discussing innovative ideas.
        </p>
      </div>

      {/* Cards Container */}
      <div className="relative w-full max-w-4xl z-10">
        {/* WhatsApp Card */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Chat with ${SITE.name} on WhatsApp`}
          className="whatsapp-card glass glass-hover mb-6 flex items-center gap-4 rounded-3xl px-6 py-5 md:px-8 relative z-10"
        >
          <span className="whatsapp-icon grid h-12 w-12 shrink-0 place-items-center rounded-2xl">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </span>
          <span className="flex min-w-0 flex-col">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">WhatsApp</span>
            <span className="text-base sm:text-lg md:text-xl font-extrabold text-gray-100">{DISPLAY_PHONE}</span>
          </span>
          <span className="whatsapp-cta ml-auto hidden shrink-0 text-xs font-bold uppercase tracking-wider sm:block">Chat now →</span>
        </a>

        {/* Call Card */}
        <a
          href={`tel:+${SITE.phone}`}
          className="glass glass-hover mb-8 flex items-center gap-4 rounded-3xl px-6 py-5 md:px-8 relative z-10"
        >
          <span className="glass-chip grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-red-500">
            <Phone className="h-6 w-6" aria-hidden="true" />
          </span>
          <span className="flex min-w-0 flex-col">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Call</span>
            <span className="text-base sm:text-lg md:text-xl font-extrabold text-gray-100">{DISPLAY_PHONE}</span>
          </span>
          <span className="whatsapp-cta ml-auto hidden shrink-0 text-xs font-bold uppercase tracking-wider sm:block">Call now →</span>
        </a>

        <div className="red-halo" style={{ inset: '-14% -10%' }} aria-hidden="true" />

        {/* Main Contact Form Glass Card */}
        <div
          ref={cardRef}
          className="glass glass-panel-card w-full p-8 md:p-14 rounded-3xl relative z-10"
        >
          {submitStatus === 'success' ? (
            <div className="py-12 flex flex-col items-center text-center">
              <div className="glass-red w-20 h-20 text-white rounded-full flex items-center justify-center text-3xl font-black mb-6 shadow-[0_0_30px_rgba(255,42,59,0.5)]">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              </div>
              <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white mb-3">
                Message Delivered!
              </h3>
              <p className="text-base md:text-lg text-gray-300 font-medium max-w-lg mb-2 leading-relaxed">
                Thank you! Your message has been sent directly to <span className="text-white font-semibold">{SITE.email}</span>.
              </p>
              <p className="text-sm text-gray-400 mb-8">
                I will review your inquiry and respond to you as soon as possible.
              </p>
              <VenomButton
                type="button"
                variant="secondary"
                onClick={() => setSubmitStatus('idle')}
                className="mt-2"
              >
                Send Another Message
              </VenomButton>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-7" noValidate>
              {/* Direct Email Header Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full glass-chip flex items-center justify-center text-red-500">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-gray-400 block">Direct Inquiries</span>
                    <a href={`mailto:${SITE.email}`} className="text-sm md:text-base font-bold text-white hover:text-red-400 transition-colors">
                      {SITE.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">Open To New Projects</span>
                </div>
              </div>

              {/* Server-side Error Alert */}
              {submitStatus === 'error' && (
                <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/40 flex items-start gap-3.5 text-red-300">
                  <AlertCircle className="w-5 h-5 shrink-0 text-red-400 mt-0.5" />
                  <div className="flex-1 text-sm leading-relaxed">
                    <p className="font-semibold text-red-200">Delivery Notice</p>
                    <p>{serverError || 'Unable to deliver message right now. Please try again or email directly.'}</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name Input */}
                <div className="flex flex-col gap-2.5">
                  <div className="flex justify-between items-center">
                    <label htmlFor="contact-name" className="text-sm md:text-base font-bold uppercase tracking-wider text-gray-400">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                  </div>
                  <input
                    id="contact-name"
                    type="text"
                    disabled={isSubmitting}
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Deepu Mahapatro"
                    className={`w-full px-6 py-5 glass-input rounded-3xl text-lg md:text-xl font-medium text-gray-100 placeholder:text-gray-500 focus:outline-none transition-all disabled:opacity-50 ${
                      errors.name ? 'border-red-500/80 ring-1 ring-red-500/40' : ''
                    }`}
                  />
                  {errors.name && (
                    <span className="text-xs font-medium text-red-400 flex items-center gap-1.5 px-2">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* Email Input */}
                <div className="flex flex-col gap-2.5">
                  <div className="flex justify-between items-center">
                    <label htmlFor="contact-email" className="text-sm md:text-base font-bold uppercase tracking-wider text-gray-400">
                      Your Email <span className="text-red-500">*</span>
                    </label>
                  </div>
                  <input
                    id="contact-email"
                    type="email"
                    disabled={isSubmitting}
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your.email@example.com"
                    className={`w-full px-6 py-5 glass-input rounded-3xl text-lg md:text-xl font-medium text-gray-100 placeholder:text-gray-500 focus:outline-none transition-all disabled:opacity-50 ${
                      errors.email ? 'border-red-500/80 ring-1 ring-red-500/40' : ''
                    }`}
                  />
                  {errors.email && (
                    <span className="text-xs font-medium text-red-400 flex items-center gap-1.5 px-2">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>

              {/* Message Textarea */}
              <div className="flex flex-col gap-2.5">
                <div className="flex justify-between items-center">
                  <label htmlFor="contact-message" className="text-sm md:text-base font-bold uppercase tracking-wider text-gray-400">
                    Message &amp; Project Scope <span className="text-red-500">*</span>
                  </label>
                </div>
                <textarea
                  id="contact-message"
                  rows={6}
                  disabled={isSubmitting}
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Tell me about your idea, timeline and what you need built..."
                  className={`w-full px-6 py-5 glass-input rounded-3xl text-lg md:text-xl font-medium text-gray-100 placeholder:text-gray-500 focus:outline-none transition-all resize-none disabled:opacity-50 ${
                    errors.message ? 'border-red-500/80 ring-1 ring-red-500/40' : ''
                  }`}
                />
                {errors.message && (
                  <span className="text-xs font-medium text-red-400 flex items-center gap-1.5 px-2">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {errors.message}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex flex-col items-center gap-3 mt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`inline-flex items-center justify-center gap-2.5 whitespace-nowrap px-9 py-3.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider text-white transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF1238] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] ${
                    isSubmitting
                      ? 'opacity-60 cursor-not-allowed glass'
                      : 'glass-red hover:-translate-y-0.5 cursor-pointer hover:shadow-[0_0_28px_rgba(163,21,21,0.5)]'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                      <span>SENDING MESSAGE...</span>
                    </>
                  ) : (
                    <>
                      <span>SEND MESSAGE</span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </>
                  )}
                </button>

                {isSubmitting && (
                  <p className="text-xs font-mono text-gray-400 animate-pulse">
                    Connecting to secure mail relay...
                  </p>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
