import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { HERO_IMAGE, ROOMS_DATA } from '../data/resortData';
import { ResilientImage } from './EiraIllustrations';

const GUEST_STORIES = [
  {
    id: 'kapoor',
    quote:
      'We booked for a long weekend and stayed a full week. Warm appams on the verandah at eight, the seawater pool at dusk — nothing on the coast compares.',
    guest: 'Aarav & Meera Kapoor',
    location: 'Mumbai · Stayed in Konkan Dune Suite',
    image: ROOMS_DATA[2].image,
  },
  {
    id: 'singhania',
    quote:
      'Waking up to Arabian Sea waves below our teak deck and dining on banana-leaf pearl spot under the brass lanterns felt deeply restorative.',
    guest: 'Rohan & Ananya Singhania',
    location: 'Bengaluru · Stayed in Lagoon Verandah Room',
    image: ROOMS_DATA[0].image,
  },
  {
    id: 'menon',
    quote:
      'The Ayurvedic Kansa ritual after a sunrise cove swim and wood-fired Konkan dinner is the finest coastal hospitality experience we have had in India.',
    guest: 'Vikramaditya & Tara Menon',
    location: 'New Delhi · Stayed in The Cliffside Haveli',
    image: ROOMS_DATA[3].image,
  },
];

export const TestimonialSection: React.FC = () => {
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const currentStory = GUEST_STORIES[activeStoryIndex];

  const handlePrev = () => {
    setActiveStoryIndex((prev) => (prev === 0 ? GUEST_STORIES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveStoryIndex((prev) => (prev === GUEST_STORIES.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      aria-label="Guest Testimonial"
      className="w-full bg-[#D7E4E1] py-20 sm:py-28 lg:py-32"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Centered Section Header */}
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#252B2D]/70 mb-3">
            Guest Chronicles · Karwar Cove
          </p>
          <h2
            className="font-serif-editorial text-[#252B2D] font-medium leading-[1.12]"
            style={{ fontSize: 'clamp(2.05rem, 3.7vw, 3.35rem)' }}
          >
            <em className="italic font-normal">Every</em> coastal sojourn leaves a memory
          </h2>
        </div>

        {/* Full-Width Rounded Architectural Panorama with Central Double-Framed Portrait Card */}
        <div className="relative rounded-[32px] overflow-hidden min-h-[540px] sm:min-h-[620px] flex flex-col justify-between p-6 sm:p-10 lg:p-14 shadow-[0_24px_60px_rgba(37,43,45,0.16)]">
          <ResilientImage
            src={HERO_IMAGE}
            alt="EIRA coastal shoreline sanctuary backdrop"
            className="absolute inset-0 w-full h-full"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[#252B2D]/55 backdrop-blur-[2px]"
          />

          <div aria-hidden="true" className="hidden sm:block" />

          {/* Central Double-Framed Floating Portrait Testimonial Card + Left/Right Controls */}
          <div className="relative z-10 my-auto flex items-center justify-between gap-4 max-w-[1120px] w-full mx-auto">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous guest story"
              className="hidden sm:flex w-11 h-11 rounded-full bg-[#F4F6F3]/20 backdrop-blur-md border border-[#D7E4E1]/50 text-[#F4F6F3] items-center justify-center hover:bg-[#80B8B4] hover:text-[#252B2D] transition-colors cursor-pointer shrink-0"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="mx-auto max-w-[520px] w-full rounded-[28px] border border-[#80B8B4]/60 p-3 sm:p-4 bg-[#F4F6F3]/12 backdrop-blur-xs">
              <div className="rounded-[22px] bg-[#F4F6F3] text-[#252B2D] p-6 sm:p-8 shadow-2xl">
                <div className="relative h-36 sm:h-44 w-full rounded-[14px] overflow-hidden mb-6 border border-[#D7E4E1]">
                  <ResilientImage
                    src={currentStory.image}
                    alt={currentStory.location}
                    className="w-full h-full"
                  />
                </div>

                {/* Five small Soft Aqua / Charcoal stars */}
                <div
                  className="inline-flex items-center gap-1.5 mb-4"
                  aria-label="Rated 5 out of 5 stars"
                >
                  {[0, 1, 2, 3, 4].map((idx) => (
                    <Star
                      key={idx}
                      aria-hidden="true"
                      className="w-3.5 h-3.5 fill-[#80B8B4] text-[#80B8B4]"
                    />
                  ))}
                </div>

                <blockquote className="mb-6">
                  <p className="font-serif-editorial italic text-xl sm:text-2xl text-[#252B2D] leading-[1.35]">
                    &ldquo;{currentStory.quote}&rdquo;
                  </p>
                </blockquote>

                <div className="pt-4 border-t border-[#252B2D]/12 flex items-center justify-between gap-3">
                  <cite className="not-italic">
                    <span className="block text-xs font-semibold text-[#252B2D]">
                      {currentStory.guest}
                    </span>
                    <span className="block text-[11px] text-[#252B2D]/65">
                      {currentStory.location}
                    </span>
                  </cite>

                  <div className="flex items-center gap-1.5" aria-hidden="true">
                    {GUEST_STORIES.map((s, idx) => (
                      <span
                        key={s.id}
                        className={`h-1.5 rounded-full transition-all ${
                          idx === activeStoryIndex
                            ? 'w-5 bg-[#80B8B4]'
                            : 'w-1.5 bg-[#252B2D]/25'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next guest story"
              className="hidden sm:flex w-11 h-11 rounded-full bg-[#80B8B4] text-[#252B2D] items-center justify-center hover:bg-[#D7E4E1] transition-colors cursor-pointer shrink-0 shadow-md"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Bottom Guest Story Selector Strip */}
          <div className="relative z-10 mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-[860px] w-full mx-auto">
            {GUEST_STORIES.map((story, idx) => {
              const isSelected = idx === activeStoryIndex;
              return (
                <button
                  key={story.id}
                  type="button"
                  onClick={() => setActiveStoryIndex(idx)}
                  className={`flex items-center gap-3 p-2.5 rounded-full text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#F4F6F3] text-[#252B2D] shadow-md ring-2 ring-[#80B8B4]'
                      : 'bg-[#252B2D]/45 backdrop-blur-md text-[#F4F6F3] hover:bg-[#252B2D]/65 border border-[#D7E4E1]/30'
                  }`}
                >
                  <div className="w-9 h-9 rounded-full overflow-hidden shrink-0">
                    <ResilientImage
                      src={story.image}
                      alt={story.guest}
                      className="w-full h-full"
                    />
                  </div>
                  <div className="min-w-0 pr-2">
                    <p className="text-xs font-semibold truncate">{story.guest}</p>
                    <p
                      className={`text-[10px] truncate ${
                        isSelected ? 'text-[#252B2D]/65' : 'text-[#D7E4E1]'
                      }`}
                    >
                      {story.location}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
