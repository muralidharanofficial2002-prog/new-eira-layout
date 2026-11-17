import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar } from 'lucide-react';
import { EiraLogoMark } from './EiraIllustrations';

interface HeaderProps {
  activePage: 'home' | 'availability';
  onNavigateHomeSection: (sectionHash?: string) => void;
  onOpenCheckAvailabilityPage: () => void;
  activeReservationCount: number;
}

const NAV_ITEMS = [
  { label: 'Stay', href: '#stay' },
  { label: 'Dine', href: '#dine' },
  { label: 'Outdoors', href: '#outdoors' },
  { label: 'Experiences', href: '#experiences' },
  { label: 'Offers', href: '#offers' },
];

export const Header: React.FC<HeaderProps> = ({
  activePage,
  onNavigateHomeSection,
  onOpenCheckAvailabilityPage,
  activeReservationCount,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 36);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isSolidHeader = scrolled || activePage === 'availability';

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 w-full transition-all duration-200 ${
        isSolidHeader
          ? 'bg-[#F4F6F3]/95 backdrop-blur-md border-b border-[#252B2D]/10 shadow-[0_6px_28px_rgba(37,43,45,0.06)]'
          : 'bg-[#252B2D]/25 backdrop-blur-sm border-b border-[#F4F6F3]/15'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Single brand element */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            onNavigateHomeSection('#top');
          }}
          className="inline-flex items-center whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#80B8B4] rounded-sm transition-opacity duration-150 hover:opacity-85 cursor-pointer"
        >
          <EiraLogoMark color={isSolidHeader ? '#252B2D' : '#F4F6F3'} showCrest={true} />
        </a>

        {/* Zone 2: Center navigation (including Check Availability subpage link) */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-6 lg:gap-9"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                onNavigateHomeSection(item.href);
              }}
              className={`group relative py-1 text-[12px] font-semibold uppercase tracking-[0.16em] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#80B8B4] cursor-pointer ${
                isSolidHeader
                  ? 'text-[#252B2D]/80 hover:text-[#252B2D]'
                  : 'text-[#F4F6F3]/90 hover:text-[#F4F6F3]'
              }`}
            >
              {item.label}
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-[1.5px] w-full origin-left scale-x-0 transition-transform duration-200 ease-out group-hover:scale-x-100 bg-[#80B8B4]"
              />
            </a>
          ))}

          <button
            type="button"
            onClick={onOpenCheckAvailabilityPage}
            className={`group relative py-1 text-[12px] font-semibold uppercase tracking-[0.16em] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
              activePage === 'availability'
                ? 'text-[#80B8B4]'
                : isSolidHeader
                ? 'text-[#252B2D]/80 hover:text-[#252B2D]'
                : 'text-[#F4F6F3]/90 hover:text-[#F4F6F3]'
            }`}
          >
            Check Availability
            <span
              aria-hidden="true"
              className={`absolute bottom-0 left-0 h-[1.5px] w-full origin-left transition-transform duration-200 ease-out bg-[#80B8B4] ${
                activePage === 'availability' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`}
            />
          </button>
        </nav>

        {/* Zone 3: Primary Check Availability Subpage CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenCheckAvailabilityPage}
            className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.16em] active:scale-[0.99] transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
              activePage === 'availability'
                ? 'bg-[#80B8B4] text-[#252B2D]'
                : isSolidHeader
                ? 'bg-[#252B2D] text-[#F4F6F3] hover:bg-[#80B8B4] hover:text-[#252B2D]'
                : 'bg-[#80B8B4] text-[#252B2D] hover:bg-[#D7E4E1]'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
            <span>
              {activeReservationCount > 0
                ? `Check Availability (${activeReservationCount})`
                : 'Check Availability'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className={`md:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border transition-colors duration-150 cursor-pointer ${
              isSolidHeader
                ? 'border-[#252B2D]/20 text-[#252B2D] hover:bg-[#D7E4E1]/60'
                : 'border-[#F4F6F3]/30 text-[#F4F6F3] hover:bg-[#F4F6F3]/15'
            }`}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F4F6F3] text-[#252B2D] border-b border-[#252B2D]/15 px-6 pt-3 pb-6 shadow-xl">
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  onNavigateHomeSection(item.href);
                }}
                className="py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#252B2D] border-b border-[#252B2D]/10"
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCheckAvailabilityPage();
              }}
              className="py-3 text-left text-xs font-bold uppercase tracking-[0.16em] text-[#80B8B4]"
            >
              Check Availability
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
