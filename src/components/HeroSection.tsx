import React, { useState } from 'react';
import { Calendar, ChevronDown, ChevronRight, Star } from 'lucide-react';
import {
  HERO_IMAGE,
  SWING_DECK_HERO_IMAGE,
  ROOMS_DATA,
  EXPERIENCES_DATA,
  RoomItem,
  ExperienceItem,
} from '../data/resortData';
import { calculateNights, formatINR } from '../utils/bookingLogic';
import { ResilientImage } from './EiraIllustrations';

export interface BookingSearchState {
  arrive: string;
  depart: string;
  adults: number;
  children: number;
  roomId: string;
}

interface HeroSectionProps {
  searchState?: BookingSearchState;
  onOpenCheckAvailabilityPage: () => void;
  onInspectRoom?: (room: RoomItem) => void;
  onInspectExperience?: (experience: ExperienceItem) => void;
  onOpenLocationInfo?: () => void;
}

type HeroTabId = 'overview' | 'rooms' | 'information' | 'location';

interface HeroSlideConfig {
  id: HeroTabId;
  tabLabel: string;
  kicker: string;
  titleBold: string;
  titleLight: string;
  image: string;
  imageAlt: string;
  nightlyRate: number;
  tooltipTitle: string;
  tooltipDetail: string;
}

const HERO_TABS: HeroSlideConfig[] = [
  {
    id: 'overview',
    tabLabel: 'Overview',
    kicker: 'Where Every Stay Becomes a Memory',
    titleBold: 'Eira',
    titleLight: 'luxury',
    image: SWING_DECK_HERO_IMAGE,
    imageAlt:
      'EIRA beachfront timber deck at twilight with twin hanging swing daybeds overlooking the Arabian Sea',
    nightlyRate: 38000,
    tooltipTitle: 'The Haven & Swing Verandah',
    tooltipDetail: 'Twilight Sea Deck · Daily Breakfast Included',
  },
  {
    id: 'rooms',
    tabLabel: 'Our Stays',
    kicker: 'Your Own Little World of Comfort',
    titleBold: 'Haven',
    titleLight: 'retreats',
    image: ROOMS_DATA[3].image,
    imageAlt: 'The Horizon panoramic oceanfront terrace at EIRA',
    nightlyRate: 68000,
    tooltipTitle: 'The Retreat & The Horizon',
    tooltipDetail: 'Private Plunge Pools & Ocean Views',
  },
  {
    id: 'information',
    tabLabel: 'Experiences',
    kicker: 'Less Planning · More Living',
    titleBold: 'Ocean',
    titleLight: 'moments',
    image: EXPERIENCES_DATA[0].image,
    imageAlt: "The Water's Edge cliffside saltwater pool overlooking the ocean",
    nightlyRate: 46000,
    tooltipTitle: "The Water's Edge",
    tooltipDetail: 'Saltwater Infinity Pool · Sunrise to Dusk',
  },
  {
    id: 'location',
    tabLabel: 'Goa',
    kicker: 'Goa, India',
    titleBold: 'Coastal',
    titleLight: 'escape',
    image: HERO_IMAGE,
    imageAlt: 'EIRA curved stone coastal architecture in Goa at sunset',
    nightlyRate: 38000,
    tooltipTitle: 'EIRA · Goa, India',
    tooltipDetail: 'Direct Arabian Sea Shoreline Sanctuary',
  },
];

function formatShortDate(isoDate: string): string {
  const parsed = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return isoDate;
  const day = parsed.getDate();
  const month = parsed
    .toLocaleDateString('en-IN', { month: 'short' })
    .toLowerCase();
  return `${day} ${month}`;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchState,
  onOpenCheckAvailabilityPage,
  onInspectRoom,
  onInspectExperience,
  onOpenLocationInfo,
}) => {
  const [activeTab, setActiveTab] = useState<HeroTabId>('overview');
  const [showInfoTooltip, setShowInfoTooltip] = useState<boolean>(false);
  const [parallaxOffset, setParallaxOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const currentSlide =
    HERO_TABS.find((item) => item.id === activeTab) || HERO_TABS[0];

  const nights = searchState
    ? Math.max(1, calculateNights(searchState.arrive, searchState.depart))
    : 3;

  const arriveFormatted = searchState
    ? formatShortDate(searchState.arrive)
    : '20 nov';
  const departFormatted = searchState
    ? formatShortDate(searchState.depart)
    : '23 nov';

  const totalDisplayPrice = currentSlide.nightlyRate * nights;

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;
    setParallaxOffset({
      x: Math.round(normX * 14),
      y: Math.round(normY * 10),
    });
  };

  const handleMouseLeave = () => {
    setParallaxOffset({ x: 0, y: 0 });
  };

  const handleInfoAction = () => {
    if (activeTab === 'rooms' && onInspectRoom) {
      onInspectRoom(ROOMS_DATA[3]);
      return;
    }
    if (activeTab === 'information' && onInspectExperience) {
      onInspectExperience(EXPERIENCES_DATA[0]);
      return;
    }
    if (activeTab === 'location' && onOpenLocationInfo) {
      onOpenLocationInfo();
      return;
    }
    if (onInspectRoom) {
      onInspectRoom(ROOMS_DATA[2]);
    }
  };

  return (
    <section
      id="top"
      aria-label="EIRA Coastal Sanctuary Full-Screen Hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-[#1D2F2D] text-[#F4F6F3] select-none"
    >
      {/* 1. Full-Bleed Swing-Deck Background with Green Gradient Atmosphere */}
      <div
        className="absolute inset-0 w-full h-full transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${-parallaxOffset.x * 0.6}px, ${-parallaxOffset.y * 0.6}px, 0) scale(1.03)`,
        }}
      >
        <ResilientImage
          key={currentSlide.image}
          src={currentSlide.image}
          alt={currentSlide.imageAlt}
          priority={true}
          className="absolute inset-0 w-full h-full"
          imgClassName="animate-hero-zoom object-center transition-all duration-700"
        />

        {/* Color-Harmonizing Layer: Reduced in the Center so Sunset & Sea Remain Clear */}
        <div
          aria-hidden="true"
          className="absolute inset-0 mix-blend-color"
          style={{
            background:
              'radial-gradient(circle at 45% 50%, rgba(128, 184, 180, 0.08) 0%, rgba(128, 184, 180, 0.32) 45%, rgba(45, 79, 76, 0.82) 100%)',
          }}
        />

        {/* Green (#80B8B4) Vignette with Clear Center Window */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 45% 50%, rgba(29, 47, 45, 0.02) 0%, rgba(42, 72, 69, 0.18) 44%, rgba(25, 42, 40, 0.84) 100%)',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#1D2F2D]/72 via-transparent to-[#192927]/82"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#1D2F2D]/55 via-transparent to-[#233B39]/78"
        />
      </div>

      {/* 2. Left-Edge Horizontal Hairline */}
      <div
        aria-hidden="true"
        className="hidden lg:block pointer-events-none absolute left-0 top-[25.5%] w-[16.5%] h-px bg-white/35 z-10"
      />

      {/* 3. Far-Left Vertical Mouse Scroll Icon */}
      <a
        href="#about"
        aria-label="Scroll down to explore EIRA"
        className="hidden lg:flex flex-col items-center gap-2 text-white/80 hover:text-[#80B8B4] transition-colors absolute left-[7.5%] top-[48%] -translate-y-1/2 z-20"
      >
        <span className="w-[22px] h-[34px] rounded-full border border-white/75 flex items-start justify-center p-1.5 shadow-sm">
          <span className="w-[2px] h-2 bg-white rounded-full animate-bounce" />
        </span>
        <ChevronDown className="w-3.5 h-3.5 text-white/75" />
      </a>

      {/* 4. Main Hero Foreground Content Container */}
      <div className="relative z-10 flex-1 max-w-[1440px] w-full mx-auto px-6 sm:px-10 lg:px-16 pt-28 sm:pt-32 pb-8 flex flex-col justify-between">
        {/* Center Stage Aligned to the Left Editorial Axis */}
        <div
          className="my-auto pt-4 lg:pl-[13%] transition-transform duration-300 ease-out"
          style={{
            transform: `translate3d(${parallaxOffset.x * 0.35}px, ${parallaxOffset.y * 0.35}px, 0)`,
          }}
        >
          {/* Kicker */}
          <div className="mb-3 sm:mb-4">
            <span className="text-xs sm:text-sm font-medium tracking-wide text-white/95 drop-shadow-sm">
              {currentSlide.kicker}
            </span>
          </div>

          {/* Giant Two-Line Contrast Typography ("Eira / luxury") + Right Action Link */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div>
              <h1 className="leading-[0.86] tracking-[-0.025em]">
                <span
                  className="block font-extrabold text-white drop-shadow-[0_12px_32px_rgba(16,28,27,0.55)] normal-case"
                  style={{
                    fontFamily: "'Proxima Nova', 'Montserrat', sans-serif",
                    fontSize: 'clamp(4.75rem, 11.5vw, 9.75rem)',
                  }}
                >
                  {currentSlide.titleBold}
                </span>
                <span
                  className="block font-thin text-white/95 tracking-[0.015em] lowercase -mt-1 sm:-mt-3"
                  style={{
                    fontFamily: "'Proxima Nova', 'Montserrat', sans-serif",
                    fontWeight: 100,
                    fontSize: 'clamp(3.6rem, 8.4vw, 7.25rem)',
                  }}
                >
                  {currentSlide.titleLight}
                </span>
              </h1>

              {/* Five Crisp White Stars Below Title */}
              <div
                aria-label="Rated 5 out of 5 stars"
                className="mt-6 sm:mt-7 inline-flex items-center gap-2 text-white"
              >
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5 fill-white text-white drop-shadow-sm"
                  />
                ))}
              </div>
            </div>

            {/* Right-Aligned Minimal "Book Your Stay ───›" Link */}
            <div className="flex lg:justify-end items-center lg:pr-6">
              <button
                type="button"
                onClick={onOpenCheckAvailabilityPage}
                className="group inline-flex items-center gap-4 text-base sm:text-lg font-medium text-white hover:text-[#80B8B4] transition-colors cursor-pointer whitespace-nowrap shrink-0 drop-shadow"
              >
                <span>Book Your Stay</span>
                <span className="relative flex items-center">
                  <span className="w-10 sm:w-12 h-px bg-current transition-all duration-300 group-hover:w-16" />
                  <ChevronRight className="w-4 h-4 -ml-2.5" />
                </span>
              </button>
            </div>
          </div>

          {/* Lower-Right Floating Price Callout in ₹ INR + Yellow-Orange 'i' Hotspot Pin */}
          <div className="mt-8 sm:mt-10 lg:mt-2 flex items-center justify-start lg:justify-end lg:pr-48 relative z-30">
            <div className="relative inline-flex flex-col items-start">
              {/* Yellow-Orange (#F5931E) 'i' Hotspot Pin */}
              <div className="self-end -mb-1 -mr-5 relative">
                <button
                  type="button"
                  onClick={() => setShowInfoTooltip((prev) => !prev)}
                  onDoubleClick={handleInfoAction}
                  aria-label="Toggle sanctuary tariff details"
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FBBF24] to-[#F5931E] text-white ring-8 ring-[#F5931E]/25 hover:scale-105 transition-transform flex items-center justify-center shadow-xl cursor-pointer font-serif-editorial italic font-bold text-sm"
                >
                  i
                </button>

                {showInfoTooltip && (
                  <div className="absolute bottom-11 right-0 w-60 p-3.5 rounded-xl bg-[#1D2F2D]/95 backdrop-blur-md border border-[#80B8B4]/35 shadow-2xl text-left z-30">
                    <p className="font-serif-editorial text-xs font-semibold text-white">
                      {currentSlide.tooltipTitle}
                    </p>
                    <p className="mt-1 text-[11px] text-[#D7E4E1]/85">
                      {currentSlide.tooltipDetail}
                    </p>
                    <button
                      type="button"
                      onClick={handleInfoAction}
                      className="mt-2 text-[10px] font-proxima-wide uppercase tracking-[0.18em] text-[#FBBF24] hover:text-white font-semibold cursor-pointer"
                    >
                      View Details ↗
                    </button>
                  </div>
                )}
              </div>

              {/* Large Crisp White Price Numeral + Caption */}
              <button
                type="button"
                onClick={onOpenCheckAvailabilityPage}
                className="text-left group cursor-pointer"
              >
                <div className="flex items-start gap-1.5 tabular-nums">
                  <span
                    className="text-4xl sm:text-5xl font-bold text-white tracking-tight group-hover:text-[#80B8B4] transition-colors drop-shadow-[0_6px_20px_rgba(0,0,0,0.55)]"
                    style={{
                      fontFamily: "'Proxima Nova', 'Montserrat', sans-serif",
                    }}
                  >
                    {formatINR(totalDisplayPrice)}
                  </span>
                </div>
                <p className="mt-1 text-[11px] sm:text-xs text-white/80 font-light tabular-nums">
                  Price on {nights} {nights === 1 ? 'night' : 'nights'}
                </p>
              </button>
            </div>

            {/* Subtle Secondary Translucent Glass Hotspot Dot */}
            <button
              type="button"
              onClick={handleInfoAction}
              aria-label="Inspect coastal deck sanctuary"
              className="hidden lg:flex ml-24 -mt-14 w-4 h-4 rounded-full bg-white/55 hover:bg-[#FBBF24] ring-4 ring-white/15 backdrop-blur-sm transition-all cursor-pointer"
            />
          </div>
        </div>

        {/* Bottom Minimal Baseline Bar: Date Range Trigger + 4 Clean Text Tabs */}
        <div className="mt-auto pt-4 relative z-30">
          <div className="border-b border-white/25 lg:pl-[13%] flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            {/* Bottom-Left: Minimal Date Range Trigger */}
            <button
              type="button"
              onClick={onOpenCheckAvailabilityPage}
              className="group text-left pb-3.5 border-b-2 border-white -mb-px inline-flex items-center gap-3 cursor-pointer sm:min-w-[200px]"
            >
              <span className="inline-flex items-center gap-2.5 text-sm sm:text-base font-medium text-white group-hover:text-[#80B8B4] transition-colors tabular-nums">
                <span>{arriveFormatted}</span>
                <ChevronRight className="w-3.5 h-3.5 text-white/50" />
                <span>{departFormatted}</span>
              </span>
              <Calendar className="w-4 h-4 text-[#F5931E] ml-2" />
            </button>

            {/* Bottom-Right: 4 Clean Unboxed Text Tabs */}
            <div
              role="tablist"
              aria-label="Sanctuary Hero Views"
              className="flex items-center gap-6 sm:gap-10 lg:gap-12 overflow-x-auto lg:pr-6"
            >
              {HERO_TABS.map((tab) => {
                const isActive = tab.id === activeTab;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setShowInfoTooltip(false);
                    }}
                    className={`pb-3.5 -mb-px text-xs sm:text-sm tracking-wide transition-colors cursor-pointer whitespace-nowrap shrink-0 border-b-2 ${
                      isActive
                        ? 'border-white text-white font-semibold'
                        : 'border-transparent text-white/60 hover:text-white font-normal'
                    }`}
                  >
                    {tab.tabLabel}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
