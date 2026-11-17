import React from 'react';
import { Utensils, Sun, Sunset, Moon } from 'lucide-react';
import { DINING_IMAGE, DINING_SCHEDULE } from '../data/resortData';
import { ResilientImage } from './EiraIllustrations';

interface DiningSectionProps {
  onReserveTableClick: () => void;
  onSampleMenuClick: () => void;
}

export const DiningSection: React.FC<DiningSectionProps> = ({
  onReserveTableClick,
  onSampleMenuClick,
}) => {
  const serviceIcons = [Sun, Sunset, Moon];

  return (
    <section
      id="dine"
      aria-labelledby="dine-heading"
      className="relative w-full bg-[#252B2D] text-[#F4F6F3] py-24 sm:py-32 lg:py-36 overflow-hidden"
    >
      {/* Full-bleed atmospheric coastal dining background photograph with gradient mask */}
      <div className="absolute inset-0">
        <ResilientImage
          src={DINING_IMAGE}
          alt="EIRA intimate candlelit coastal restaurant overlooking the twilight sea"
          className="w-full h-full"
          imgClassName="object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#252B2D]/95 via-[#252B2D]/75 to-[#252B2D]/92"
        />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Centered Editorial Header */}
        <div className="max-w-[780px] mx-auto text-center mb-14 sm:mb-20">
          <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-[#80B8B4] mb-4">
            Dine · Spice Garden to Shore
          </p>
          <h2
            id="dine-heading"
            className="font-serif-editorial text-[#F4F6F3] font-medium leading-[1.12]"
            style={{ fontSize: 'clamp(2.1rem, 4vw, 3.55rem)', textWrap: 'balance' }}
          >
            A coastal kitchen guided by{' '}
            <em className="italic font-normal text-[#80B8B4]">
              the morning canoes and spice beds.
            </em>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#D7E4E1]/90 leading-relaxed max-w-[58ch] mx-auto">
            Savour hyper-local coastal cuisine rooted in Konkan and Malabar traditions — slow-cooked in clay pots over coconut-shell embers using freshly landed reef fish and estate-grown spices.
          </p>
        </div>

        {/* Architectural 6-Tile Checkerboard Bento Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {/* Tile 1: Translucent Frosted Stat Card */}
          <div className="rounded-[24px] bg-[#F4F6F3]/10 backdrop-blur-md border border-[#80B8B4]/35 p-7 sm:p-8 flex flex-col justify-center items-center text-center min-h-[240px]">
            <span className="font-serif-editorial text-5xl sm:text-6xl font-normal text-[#80B8B4] tabular-nums mb-2">
              36
            </span>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F4F6F3] mb-2">
              Covers at The Verandah
            </p>
            <p className="text-xs text-[#D7E4E1]/85 max-w-[26ch] leading-relaxed">
              Intimate brass-lit teak tables and open-air sea deck seating above the surf.
            </p>
          </div>

          {/* Tile 2: Cloud White Card — Morning Harvest */}
          <div className="rounded-[24px] bg-[#F4F6F3] text-[#252B2D] p-7 sm:p-8 flex flex-col justify-between min-h-[240px] shadow-lg">
            <div className="flex items-center justify-between">
              <span className="w-10 h-10 rounded-xl bg-[#D7E4E1] flex items-center justify-center text-[#252B2D]">
                {React.createElement(serviceIcons[0], { className: 'w-5 h-5' })}
              </span>
              <span className="font-serif-editorial text-xl font-medium text-[#252B2D] tabular-nums">
                {DINING_SCHEDULE[0].hours}
              </span>
            </div>
            <div className="mt-6">
              <h3 className="font-serif-editorial text-2xl font-normal text-[#252B2D] mb-2">
                {DINING_SCHEDULE[0].service}
              </h3>
              <p className="text-xs sm:text-sm text-[#252B2D]/75 leading-relaxed">
                {DINING_SCHEDULE[0].note}
              </p>
            </div>
          </div>

          {/* Tile 3: Cloud White Card — Verandah Grill & Toddy */}
          <div className="rounded-[24px] bg-[#F4F6F3] text-[#252B2D] p-7 sm:p-8 flex flex-col justify-between min-h-[240px] shadow-lg">
            <div className="flex items-center justify-between">
              <span className="w-10 h-10 rounded-xl bg-[#D7E4E1] flex items-center justify-center text-[#252B2D]">
                {React.createElement(serviceIcons[1], { className: 'w-5 h-5' })}
              </span>
              <span className="font-serif-editorial text-xl font-medium text-[#252B2D] tabular-nums">
                {DINING_SCHEDULE[1].hours}
              </span>
            </div>
            <div className="mt-6">
              <h3 className="font-serif-editorial text-2xl font-normal text-[#252B2D] mb-2">
                {DINING_SCHEDULE[1].service}
              </h3>
              <p className="text-xs sm:text-sm text-[#252B2D]/75 leading-relaxed">
                {DINING_SCHEDULE[1].note}
              </p>
            </div>
          </div>

          {/* Tile 4: Cloud White Card — Candlelit Coastal Tasting */}
          <div className="rounded-[24px] bg-[#F4F6F3] text-[#252B2D] p-7 sm:p-8 flex flex-col justify-between min-h-[240px] shadow-lg">
            <div className="flex items-center justify-between">
              <span className="w-10 h-10 rounded-xl bg-[#D7E4E1] flex items-center justify-center text-[#252B2D]">
                {React.createElement(serviceIcons[2], { className: 'w-5 h-5' })}
              </span>
              <span className="font-serif-editorial text-xl font-medium text-[#252B2D] tabular-nums">
                {DINING_SCHEDULE[2].hours}
              </span>
            </div>
            <div className="mt-6">
              <h3 className="font-serif-editorial text-2xl font-normal text-[#252B2D] mb-2">
                {DINING_SCHEDULE[2].service}
              </h3>
              <p className="text-xs sm:text-sm text-[#252B2D]/75 leading-relaxed">
                {DINING_SCHEDULE[2].note}
              </p>
            </div>
          </div>

          {/* Tile 5: Mist Blue Card — Pepper Vines & Country Boats */}
          <div className="rounded-[24px] bg-[#D7E4E1] text-[#252B2D] p-7 sm:p-8 flex flex-col justify-between min-h-[240px] shadow-lg">
            <div className="flex items-center justify-between">
              <span className="w-10 h-10 rounded-xl bg-[#F4F6F3] flex items-center justify-center text-[#252B2D]">
                <Utensils className="w-5 h-5" />
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#252B2D]/75">
                Estate Provenance
              </span>
            </div>
            <div className="mt-6">
              <h3 className="font-serif-editorial text-2xl font-normal text-[#252B2D] mb-2">
                Pepper Vines &amp; Country Boats
              </h3>
              <p className="text-xs sm:text-sm text-[#252B2D]/80 leading-relaxed">
                Line-caught seer fish over tamarind wood, Karwar rock oysters, and organic curry leaves harvested minutes before service.
              </p>
            </div>
          </div>

          {/* Tile 6: Translucent Frosted Action Tile — Reserve & Tasting Menu */}
          <div className="rounded-[24px] bg-[#F4F6F3]/10 backdrop-blur-md border border-[#80B8B4]/35 p-7 sm:p-8 flex flex-col justify-between min-h-[240px]">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#80B8B4] mb-2">
                Dining Reservations
              </p>
              <h3 className="font-serif-editorial text-2xl sm:text-3xl font-normal text-[#F4F6F3]">
                Dine under the palms or by the open hearth.
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button
                type="button"
                onClick={onReserveTableClick}
                className="px-6 py-3 rounded-full bg-[#80B8B4] text-[#252B2D] text-[11px] font-bold uppercase tracking-[0.16em] hover:bg-[#D7E4E1] transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                Reserve a table
              </button>
              <button
                type="button"
                onClick={onSampleMenuClick}
                className="px-6 py-3 rounded-full border border-[#D7E4E1]/50 text-[#F4F6F3] text-[11px] font-semibold uppercase tracking-[0.16em] hover:bg-[#F4F6F3]/15 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                Tasting menu
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
