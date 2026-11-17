import React, { useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { CoastalLandscapeLineArt, ResilientImage } from './EiraIllustrations';
import { ROOMS_DATA, EXPERIENCES_DATA, DINING_IMAGE } from '../data/resortData';

const APPROACH_PILLARS = [
  {
    id: 'rooms',
    statNumber: '18',
    statLabel: 'Villas & suites',
    title: 'Vernacular Coastal Living',
    description:
      'Hand-dressed laterite stone, sustainably harvested Malabar teak, handloom khadi linens, and private verandahs facing the Arabian Sea.',
    image: ROOMS_DATA[0].image,
    href: '#stay',
  },
  {
    id: 'spa',
    statNumber: '1',
    statLabel: 'Ayurvedic sea spa',
    title: 'Rhythms of Tide & Herb',
    description:
      'Filtered Arabian Sea water warmed to 30°C inside a cliffside infinity pool, herbal steam pavilions, and traditional Kansa rituals.',
    image: EXPERIENCES_DATA[0].image,
    href: '#experiences',
  },
  {
    id: 'kitchen',
    statNumber: '36',
    statLabel: 'Covers at The Verandah',
    title: 'From Estate & Fishing Canoes',
    description:
      'Menus written every morning from what local country-boats land at dawn and what ripens in our organic pepper and kokum gardens.',
    image: DINING_IMAGE,
    href: '#dine',
  },
];

export const WelcomeSection: React.FC = () => {
  const [featuredIndex, setFeaturedIndex] = useState(1);

  const handlePrev = () => {
    setFeaturedIndex((prev) => (prev === 0 ? APPROACH_PILLARS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setFeaturedIndex((prev) => (prev === APPROACH_PILLARS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      aria-labelledby="welcome-heading"
      className="relative w-full bg-[#F4F6F3] py-20 sm:py-28 lg:py-32 overflow-hidden"
    >
      {/* Subtle oversized coastal landscape line-art illustration behind heading */}
      <CoastalLandscapeLineArt
        strokeColor="#80B8B4"
        className="absolute top-8 left-1/2 -translate-x-1/2 w-[560px] sm:w-[680px] h-auto opacity-[0.22] pointer-events-none"
      />

      <div className="relative z-10 max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Centered Editorial Introduction */}
        <div className="max-w-[800px] mx-auto text-center mb-14 sm:mb-20">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#80B8B4] mb-4">
            Welcome · The EIRA Philosophy
          </p>
          <h2
            id="welcome-heading"
            className="font-serif-editorial text-[#252B2D] font-medium leading-[1.14] tracking-[-0.01em]"
            style={{ fontSize: 'clamp(2.1rem, 4vw, 3.45rem)', textWrap: 'balance' }}
          >
            Eighteen coastal sanctuaries, one endless horizon and{' '}
            <em className="italic font-normal text-[#80B8B4]">
              unhurried rhythms by the sea.
            </em>
          </h2>
          <p className="mt-5 text-sm sm:text-base text-[#252B2D]/80 leading-[1.75] max-w-[60ch] mx-auto">
            Cradled between laterite sea cliffs and whispering coconut groves along the Konkan shoreline, EIRA brings together vernacular stone architecture, spice-garden dining, and ocean wellness —{' '}
            <span className="text-[#252B2D]/60">
              crafted for stillness, warm Indian hospitality, and soulful coastal living.
            </span>
          </p>
        </div>

        {/* Asymmetric Staggered 3-Column Editorial Triptych */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {APPROACH_PILLARS.map((pillar, idx) => {
            const isCenterFeatured = idx === featuredIndex;

            if (isCenterFeatured) {
              return (
                <article
                  key={pillar.id}
                  className="lg:col-span-4 relative rounded-[28px] overflow-hidden min-h-[430px] sm:min-h-[490px] shadow-[0_24px_50px_rgba(37,43,45,0.16)] group border border-[#80B8B4]/30"
                >
                  <ResilientImage
                    src={pillar.image}
                    alt={pillar.title}
                    className="absolute inset-0 w-full h-full"
                    imgClassName="transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#252B2D]/90 via-[#252B2D]/35 to-[#252B2D]/15"
                  />

                  {/* Top-left stat numeral & Top-right arrow link */}
                  <div className="relative z-10 p-6 sm:p-8 flex items-start justify-between">
                    <div className="text-[#F4F6F3]">
                      <span className="block font-serif-editorial text-4xl sm:text-5xl font-normal tabular-nums leading-none">
                        {pillar.statNumber}
                      </span>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#80B8B4] mt-1 block">
                        {pillar.statLabel}
                      </span>
                    </div>
                    <a
                      href={pillar.href}
                      aria-label={`Explore ${pillar.title}`}
                      className="w-10 h-10 rounded-full bg-[#80B8B4] text-[#252B2D] flex items-center justify-center hover:bg-[#D7E4E1] transition-colors"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Bottom overlay story copy */}
                  <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-8 text-[#F4F6F3]">
                    <h3 className="font-serif-editorial text-2xl sm:text-3xl font-normal mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#D7E4E1] leading-relaxed max-w-[40ch]">
                      {pillar.description}
                    </p>
                  </div>
                </article>
              );
            }

            return (
              <article
                key={pillar.id}
                onClick={() => setFeaturedIndex(idx)}
                className="lg:col-span-4 bg-white border border-[#D7E4E1] rounded-[26px] p-5 sm:p-6 flex flex-col justify-between min-h-[350px] sm:min-h-[380px] transition-all duration-200 hover:-translate-y-1 hover:border-[#80B8B4] cursor-pointer shadow-xs"
              >
                {/* Top row: Inset square photograph + circular arrow */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-[18px] overflow-hidden shrink-0 border border-[#D7E4E1]">
                    <ResilientImage
                      src={pillar.image}
                      alt={pillar.title}
                      className="w-full h-full"
                    />
                  </div>
                  <div className="flex flex-col items-end">
                    <a
                      href={pillar.href}
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`Go to ${pillar.statLabel}`}
                      className="w-9 h-9 rounded-full border border-[#252B2D]/20 text-[#252B2D] flex items-center justify-center hover:bg-[#80B8B4] hover:border-[#80B8B4] transition-colors mb-3"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                    <span className="font-serif-editorial text-3xl font-normal text-[#252B2D] tabular-nums">
                      {pillar.statNumber}
                    </span>
                    <span className="text-[11px] font-medium text-[#252B2D]/65">
                      {pillar.statLabel}
                    </span>
                  </div>
                </div>

                {/* Bottom text block */}
                <div className="pt-4 border-t border-[#D7E4E1]">
                  <h3 className="font-serif-editorial text-2xl font-normal text-[#252B2D] mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#252B2D]/75 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        {/* Editorial Pagination / Pillar Switcher Bar */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous coastal pillar"
            className="w-9 h-9 rounded-full border border-[#252B2D]/20 flex items-center justify-center text-[#252B2D] hover:bg-[#D7E4E1] transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-semibold tracking-[0.16em] text-[#252B2D] tabular-nums">
            0{featuredIndex + 1}
          </span>
          <div className="w-28 sm:w-40 h-[2px] bg-[#D7E4E1] relative overflow-hidden rounded-full">
            <div
              className="absolute inset-y-0 left-0 bg-[#80B8B4] transition-all duration-300"
              style={{ width: `${((featuredIndex + 1) / APPROACH_PILLARS.length) * 100}%` }}
            />
          </div>
          <span className="text-xs font-semibold tracking-[0.16em] text-[#252B2D]/60 tabular-nums">
            0{APPROACH_PILLARS.length}
          </span>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next coastal pillar"
            className="w-9 h-9 rounded-full bg-[#252B2D] text-[#F4F6F3] flex items-center justify-center hover:bg-[#80B8B4] hover:text-[#252B2D] transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
