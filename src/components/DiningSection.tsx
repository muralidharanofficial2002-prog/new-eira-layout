import React from 'react';
import { Sun, Sunset, Moon } from 'lucide-react';
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
      className="relative w-full bg-[#252B2D] text-[#F4F6F3] py-20 sm:py-28 overflow-hidden"
    >
      <div className="absolute inset-0">
        <ResilientImage
          src={DINING_IMAGE}
          alt="EIRA coastal restaurant overlooking the sea"
          className="w-full h-full"
          imgClassName="object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#252B2D]/95 via-[#252B2D]/78 to-[#252B2D]/94"
        />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Clean Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-14">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-[#80B8B4] mb-3">
              THE ART OF DINING
            </p>
            <h2
              id="dine-heading"
              className="font-serif-editorial text-[#F4F6F3] font-medium leading-[1.12]"
              style={{ fontSize: 'clamp(2.1rem, 4vw, 3.45rem)', textWrap: 'balance' }}
            >
              Good food. Great stories.{' '}
              <em className="italic font-normal text-[#80B8B4]">
                Beautiful moments.
              </em>
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onReserveTableClick}
              className="px-6 py-3 rounded-full bg-[#80B8B4] text-[#252B2D] text-[11px] font-bold uppercase tracking-[0.16em] hover:bg-[#D7E4E1] transition-colors cursor-pointer"
            >
              Explore Dining
            </button>
            <button
              type="button"
              onClick={onSampleMenuClick}
              className="px-6 py-3 rounded-full border border-[#D7E4E1]/50 text-[#F4F6F3] text-[11px] font-semibold uppercase tracking-[0.16em] hover:bg-[#F4F6F3]/15 transition-colors cursor-pointer"
            >
              View Menu
            </button>
          </div>
        </div>

        {/* Simple 3-Card Row for Breakfast, Lunch, Dinner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {DINING_SCHEDULE.map((item, idx) => {
            const Icon = serviceIcons[idx] || Sun;
            return (
              <div
                key={item.id}
                className="rounded-[24px] bg-[#F4F6F3] text-[#252B2D] p-6 sm:p-7 flex flex-col justify-between min-h-[200px] shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-xl bg-[#D7E4E1] flex items-center justify-center text-[#252B2D]">
                    <Icon className="w-5 h-5" />
                  </span>
                  <span className="font-serif-editorial text-lg font-medium text-[#252B2D] tabular-nums">
                    {item.hours}
                  </span>
                </div>
                <div className="mt-6">
                  <h3 className="font-serif-editorial text-2xl font-normal text-[#252B2D] mb-1">
                    {item.service}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#252B2D]/75">
                    {item.note}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
