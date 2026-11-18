import React, { useState } from 'react';
import { Check, AlertCircle, ArrowRight } from 'lucide-react';
import { CoastalLandscapeLineArt, EiraLogoMark, ResilientImage } from './EiraIllustrations';
import { validateEmail } from '../utils/bookingLogic';
import { HERO_IMAGE } from '../data/resortData';

interface FooterProps {
  onOpenInfoModal: (topic: string) => void;
  onViewAllRooms: () => void;
  onReserveTableClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenInfoModal,
  onViewAllRooms,
  onReserveTableClick,
}) => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [subscribedEmail, setSubscribedEmail] = useState<string | null>(null);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateEmail(email);
    if (!validation.valid) {
      setErrorMessage(validation.error || 'Please enter a valid email address.');
      setSubscribedEmail(null);
      return;
    }
    setErrorMessage(null);
    setSubscribedEmail(email.trim());
    setEmail('');
  };

  return (
    <footer
      id="contact"
      className="relative w-full bg-[#252B2D] text-[#F4F6F3] pt-20 sm:pt-24 pb-10 overflow-hidden"
    >
      {/* Large subtle coastal landscape line-art illustration behind footer content */}
      <CoastalLandscapeLineArt
        strokeColor="#80B8B4"
        className="absolute top-12 right-1/2 translate-x-1/2 w-[780px] max-w-none h-auto opacity-[0.09] pointer-events-none"
      />

      <div className="relative z-10 max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section 13: FOOTER Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-[#D7E4E1]/15">
          {/* Brand Summary Column */}
          <div className="lg:col-span-4">
            <div className="mb-3">
              <EiraLogoMark color="#F4F6F3" showCrest={true} />
            </div>
            <p className="font-serif-editorial italic text-base text-[#80B8B4] mb-3">
              Where Every Stay Becomes a Memory
            </p>
            <p className="text-sm text-[#D7E4E1]/80 leading-relaxed max-w-[36ch]">
              An intimate coastal escape where thoughtful comfort, beautiful surroundings, and unforgettable experiences come together.
            </p>
          </div>

          {/* Explore Column */}
          <div className="lg:col-span-2">
            <h3 className="font-serif-editorial text-xl text-[#80B8B4] mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm text-[#D7E4E1]/85">
              <li>
                <a href="#top" className="hover:text-[#F4F6F3] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#stay"
                  onClick={onViewAllRooms}
                  className="hover:text-[#F4F6F3] transition-colors"
                >
                  Rooms &amp; Suites
                </a>
              </li>
              <li>
                <a
                  href="#dine"
                  onClick={onReserveTableClick}
                  className="hover:text-[#F4F6F3] transition-colors"
                >
                  Dining
                </a>
              </li>
              <li>
                <a href="#experiences" className="hover:text-[#F4F6F3] transition-colors">
                  Experiences
                </a>
              </li>
              <li>
                <a href="#offers" className="hover:text-[#F4F6F3] transition-colors">
                  Special Offers
                </a>
              </li>
            </ul>
          </div>

          {/* Discover Column */}
          <div className="lg:col-span-3">
            <h3 className="font-serif-editorial text-xl text-[#80B8B4] mb-4">
              Discover
            </h3>
            <ul className="space-y-2.5 text-sm text-[#D7E4E1]/85">
              <li>
                <a href="#about" className="hover:text-[#F4F6F3] transition-colors">
                  About EIRA
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#F4F6F3] transition-colors">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#experiences" className="hover:text-[#F4F6F3] transition-colors">
                  Explore Goa
                </a>
              </li>
              <li>
                <a href="#stories" className="hover:text-[#F4F6F3] transition-colors">
                  Guest Stories
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenInfoModal('getting-here')}
                  className="hover:text-[#F4F6F3] transition-colors cursor-pointer text-left"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Get in Touch Column */}
          <div className="lg:col-span-3">
            <h3 className="font-serif-editorial text-xl text-[#80B8B4] mb-4">
              Get in Touch
            </h3>
            <ul className="space-y-2.5 text-sm text-[#D7E4E1]/85">
              <li className="text-[#D7E4E1]/90">Location: Goa, India</li>
              <li>
                <a
                  href="tel:+918322849100"
                  className="hover:text-[#F4F6F3] transition-colors tabular-nums"
                >
                  Phone: +91 832 284 9100
                </a>
              </li>
              <li>
                <a
                  href="mailto:reservations@eiragoa.com"
                  className="hover:text-[#F4F6F3] transition-colors"
                >
                  Email: reservations@eiragoa.com
                </a>
              </li>
              <li className="pt-2 flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#80B8B4]">
                <button
                  type="button"
                  onClick={() => onOpenInfoModal('instagram')}
                  className="hover:text-[#F4F6F3] transition-colors cursor-pointer"
                >
                  Instagram
                </button>
                <button
                  type="button"
                  onClick={() => onOpenInfoModal('facebook')}
                  className="hover:text-[#F4F6F3] transition-colors cursor-pointer"
                >
                  Facebook
                </button>
                <button
                  type="button"
                  onClick={() => onOpenInfoModal('youtube')}
                  className="hover:text-[#F4F6F3] transition-colors cursor-pointer"
                >
                  YouTube
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Middle Row: Footer Newsletter ("Beautiful moments begin here...") */}
        <div className="py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <h3 className="font-serif-editorial text-2xl sm:text-3xl font-normal text-[#F4F6F3] mb-1.5">
              Newsletter
            </h3>
            <p className="text-xs sm:text-sm text-[#D7E4E1]/75 mb-5 max-w-[52ch]">
              Beautiful moments begin here. Stay connected for updates, inspiration, and exclusive experiences.
            </p>

            <form
              onSubmit={handleNewsletterSubmit}
              noValidate
              aria-label="Newsletter subscription"
              className="max-w-md"
            >
              <div className="relative flex items-center">
                <label htmlFor="newsletter-email" className="sr-only">
                  Enter your email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  placeholder="Enter your email address"
                  className="w-full pl-5 pr-32 py-3.5 rounded-full bg-[#F4F6F3]/10 border border-[#D7E4E1]/25 text-sm text-[#F4F6F3] placeholder:text-[#D7E4E1]/50 focus:outline-none focus:border-[#80B8B4]"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#80B8B4] text-[#252B2D] text-[11px] font-bold uppercase tracking-[0.14em] hover:bg-[#D7E4E1] transition-colors cursor-pointer"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {errorMessage && (
                <p
                  role="alert"
                  className="mt-2.5 flex items-center gap-1.5 text-xs text-[#80B8B4]"
                >
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>{errorMessage}</span>
                </p>
              )}

              {subscribedEmail && (
                <p
                  role="status"
                  className="mt-2.5 flex items-center gap-1.5 text-xs text-[#80B8B4]"
                >
                  <Check className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>
                    Thank you for subscribing. Updates and exclusive experiences will be sent to {subscribedEmail}.
                  </span>
                </p>
              )}
            </form>
          </div>

          <div className="lg:col-span-5 lg:text-right">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#80B8B4] mb-1">
              Get in Touch
            </p>
            <a
              href="mailto:reservations@eiragoa.com"
              className="font-serif-editorial text-2xl sm:text-3xl text-[#F4F6F3] hover:text-[#80B8B4] transition-colors"
            >
              reservations@eiragoa.com
            </a>
          </div>
        </div>

        {/* Monumental Architectural Banner with Oversized EIRA Wordmark */}
        <div className="relative rounded-[28px] overflow-hidden h-48 sm:h-64 mb-8 border border-[#80B8B4]/25">
          <ResilientImage
            src={HERO_IMAGE}
            alt="EIRA coastal architecture at dusk"
            className="absolute inset-0 w-full h-full"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[#252B2D]/70 backdrop-blur-[1px]"
          />
          <div className="relative z-10 w-full h-full flex items-center justify-center p-6">
            <span
              className="font-serif-editorial text-[#F4F6F3] font-normal tracking-[0.28em] uppercase select-none"
              style={{ fontSize: 'clamp(3.25rem, 9vw, 7.5rem)' }}
            >
              ∃IRA
            </span>
          </div>
        </div>

        {/* Footer Bottom Legal Row */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#D7E4E1]/65">
          <p>© 2026 EIRA Resort. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => onOpenInfoModal('privacy')}
              className="hover:text-[#F4F6F3] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => onOpenInfoModal('terms')}
              className="hover:text-[#F4F6F3] transition-colors cursor-pointer"
            >
              Terms &amp; Conditions
            </button>
            <button
              type="button"
              onClick={() => onOpenInfoModal('cancellation')}
              className="hover:text-[#F4F6F3] transition-colors cursor-pointer"
            >
              Cancellation Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
