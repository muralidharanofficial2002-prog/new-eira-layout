import React, { useState } from 'react';
import {
  Star,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Check,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';
import {
  HERO_IMAGE,
  SWING_DECK_HERO_IMAGE,
  ROOMS_DATA,
  GALLERY_ITEMS,
} from '../data/resortData';
import { ResilientImage } from './EiraIllustrations';
import { validateEmail } from '../utils/bookingLogic';

interface TestimonialSectionProps {
  onBookYourStay?: () => void;
  onExploreStays?: () => void;
}

const GALLERY_CATEGORIES = [
  'All',
  'Our Spaces',
  'Beautiful Stays',
  'Dining Moments',
  'Coastal Experiences',
  'Life at EIRA',
] as const;

const GUEST_STORIES = [
  {
    id: 'story-1',
    quote:
      "There's something about this place that makes time feel different. Every morning felt peaceful, every evening unforgettable. We arrived for a getaway and left with memories we'll always treasure.",
    guest: 'Aarav & Meera Kapoor',
    location: 'Mumbai · Stayed in The Retreat',
    image: ROOMS_DATA[2].image,
  },
  {
    id: 'story-2',
    quote:
      'Waking up to the ocean breeze in The Breeze and unwinding over candlelit coastal dinners felt effortlessly special. True luxury is having the time and freedom to simply be present.',
    guest: 'Rohan & Ananya Singhania',
    location: 'Bengaluru · Stayed in The Breeze',
    image: ROOMS_DATA[1].image,
  },
  {
    id: 'story-3',
    quote:
      'From golden hour moments on the swing deck to slow mornings by the water’s edge, EIRA is far from the ordinary and closer to everything that truly matters.',
    guest: 'Vikramaditya & Tara Menon',
    location: 'New Delhi · Stayed in The Horizon',
    image: ROOMS_DATA[3].image,
  },
];

export const TestimonialSection: React.FC<TestimonialSectionProps> = ({
  onBookYourStay,
  onExploreStays,
}) => {
  const [activeGalleryCategory, setActiveGalleryCategory] =
    useState<(typeof GALLERY_CATEGORIES)[number]>('All');
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [circleEmail, setCircleEmail] = useState('');
  const [circleError, setCircleError] = useState<string | null>(null);
  const [circleSubscribed, setCircleSubscribed] = useState<string | null>(null);

  const currentStory = GUEST_STORIES[activeStoryIndex];

  const filteredGallery =
    activeGalleryCategory === 'All'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeGalleryCategory);

  const handlePrev = () => {
    setActiveStoryIndex((prev) =>
      prev === 0 ? GUEST_STORIES.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setActiveStoryIndex((prev) =>
      prev === GUEST_STORIES.length - 1 ? 0 : prev + 1
    );
  };

  const handleCircleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const check = validateEmail(circleEmail);
    if (!check.valid) {
      setCircleError(check.error || 'Please enter a valid email address.');
      setCircleSubscribed(null);
      return;
    }
    setCircleError(null);
    setCircleSubscribed(circleEmail.trim());
    setCircleEmail('');
  };

  return (
    <>
      {/* =====================================================================
          08. LIFESTYLE / FEATURED SECTION
      ===================================================================== */}
      <section
        id="lifestyle"
        aria-labelledby="lifestyle-heading"
        className="w-full bg-[#252B2D] text-[#F4F6F3] py-20 sm:py-28 lg:py-32 overflow-hidden"
      >
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#80B8B4]">
                LIFE AT EIRA
              </p>
              <h2
                id="lifestyle-heading"
                className="font-serif-editorial text-[#F4F6F3] font-medium leading-[1.12]"
                style={{ fontSize: 'clamp(2.1rem, 4vw, 3.45rem)', textWrap: 'balance' }}
              >
                The beauty of{' '}
                <em className="italic font-normal text-[#80B8B4]">
                  doing nothing at all.
                </em>
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-[#D7E4E1]/90 leading-[1.75] max-w-[54ch]">
                <p>
                  An extra hour in bed. Coffee that turns into conversation. A book you finally finish. A sunset you never want to end.
                </p>
                <p className="font-medium text-[#F4F6F3]">
                  Sometimes, the most unforgettable moments are the simplest ones.
                </p>
                <p>
                  At EIRA, we believe true luxury is having the time and freedom to enjoy them.
                </p>
              </div>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onBookYourStay}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#80B8B4] text-[#252B2D] text-[11px] font-bold uppercase tracking-[0.16em] hover:bg-[#D7E4E1] transition-colors cursor-pointer"
                >
                  <span>Experience EIRA</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-[28px] overflow-hidden aspect-[16/11] border border-[#80B8B4]/30 shadow-2xl">
                <ResilientImage
                  src={SWING_DECK_HERO_IMAGE}
                  alt="Life at EIRA — twin hanging swing daybeds by the sea at sunset"
                  className="w-full h-full"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#252B2D]/70 via-transparent to-transparent"
                />
                <div className="absolute bottom-5 left-6 right-6 text-[#F4F6F3]">
                  <p className="font-serif-editorial italic text-lg sm:text-xl">
                    &ldquo;True luxury is having the time and freedom to enjoy the simplest moments.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          09. GALLERY SECTION
      ===================================================================== */}
      <section
        id="gallery"
        aria-labelledby="gallery-heading"
        className="w-full bg-[#F4F6F3] py-20 sm:py-28 lg:py-32"
      >
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-[760px] mx-auto text-center mb-10 sm:mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#80B8B4] mb-3">
              GLIMPSES OF EIRA
            </p>
            <h2
              id="gallery-heading"
              className="font-serif-editorial text-[#252B2D] font-medium leading-[1.12]"
              style={{ fontSize: 'clamp(2.1rem, 4vw, 3.45rem)' }}
            >
              A picture-perfect{' '}
              <em className="italic font-normal text-[#80B8B4]">escape.</em>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#252B2D]/80 leading-relaxed max-w-[58ch] mx-auto">
              Every corner has a story. Every moment has its own kind of magic. Take a glimpse into the spaces, experiences, and beautiful little details that make EIRA special.
            </p>
          </div>

          {/* Gallery Category Filter Bar */}
          <div
            role="tablist"
            aria-label="Gallery Categories"
            className="flex flex-wrap items-center justify-center gap-2.5 mb-10"
          >
            {GALLERY_CATEGORIES.map((category) => {
              const isSelected = category === activeGalleryCategory;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveGalleryCategory(category)}
                  className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.14em] transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#252B2D] text-[#F4F6F3]'
                      : 'bg-[#D7E4E1]/65 text-[#252B2D] hover:bg-[#80B8B4]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Gallery Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((item) => (
              <article
                key={item.id}
                className="group relative rounded-[24px] overflow-hidden aspect-[4/3] border border-[#D7E4E1] shadow-sm"
              >
                <ResilientImage
                  src={item.image}
                  alt={`${item.title} — ${item.category}`}
                  className="w-full h-full"
                  imgClassName="transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#252B2D]/85 via-[#252B2D]/20 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 p-5 text-[#F4F6F3]">
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#80B8B4] block mb-1">
                    {item.category}
                  </span>
                  <h3 className="font-serif-editorial text-xl font-normal">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#D7E4E1]/85 mt-1">{item.caption}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => setActiveGalleryCategory('All')}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#252B2D] text-[#F4F6F3] text-[11px] font-semibold uppercase tracking-[0.16em] hover:bg-[#80B8B4] hover:text-[#252B2D] transition-colors cursor-pointer"
            >
              <span>Explore Gallery</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================================
          10. GUEST STORIES / TESTIMONIAL SECTION
      ===================================================================== */}
      <section
        id="stories"
        aria-label="Guest Testimonial"
        className="w-full bg-[#D7E4E1] py-20 sm:py-28 lg:py-32"
      >
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
          {/* Centered Section Header */}
          <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#252B2D]/70 mb-3">
              WORDS TO REMEMBER
            </p>
            <h2
              className="font-serif-editorial text-[#252B2D] font-medium leading-[1.12]"
              style={{ fontSize: 'clamp(2.05rem, 3.7vw, 3.35rem)' }}
            >
              Some stays become <em className="italic font-normal">stories.</em>
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

              <div className="mx-auto max-w-[540px] w-full rounded-[28px] border border-[#80B8B4]/60 p-3 sm:p-4 bg-[#F4F6F3]/12 backdrop-blur-xs">
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
                    <p className="font-serif-editorial italic text-lg sm:text-xl text-[#252B2D] leading-[1.45]">
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

                    <button
                      type="button"
                      onClick={handleNext}
                      className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#252B2D] hover:text-[#80B8B4] underline underline-offset-4 cursor-pointer"
                    >
                      Read Guest Stories
                    </button>
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

      {/* =====================================================================
          11. NEWSLETTER SECTION
      ===================================================================== */}
      <section
        id="newsletter"
        aria-labelledby="newsletter-heading"
        className="w-full bg-[#F4F6F3] py-20 sm:py-24 border-b border-[#D7E4E1]"
      >
        <div className="max-w-[920px] mx-auto px-5 sm:px-8 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#80B8B4] mb-3">
            STAY CONNECTED
          </p>
          <h2
            id="newsletter-heading"
            className="font-serif-editorial text-[#252B2D] font-medium leading-[1.12]"
            style={{ fontSize: 'clamp(2rem, 3.8vw, 3.25rem)' }}
          >
            A little escape,{' '}
            <em className="italic font-normal text-[#80B8B4]">
              delivered to your inbox.
            </em>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#252B2D]/80 max-w-[52ch] mx-auto leading-relaxed">
            Beautiful stories, exclusive updates, and a little inspiration for your next memorable getaway.
          </p>

          <form
            onSubmit={handleCircleSubmit}
            noValidate
            aria-label="Join the EIRA Circle"
            className="mt-8 max-w-lg mx-auto"
          >
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <label htmlFor="eira-circle-email" className="sr-only">
                Enter your email address
              </label>
              <input
                id="eira-circle-email"
                type="email"
                value={circleEmail}
                onChange={(e) => {
                  setCircleEmail(e.target.value);
                  if (circleError) setCircleError(null);
                }}
                placeholder="Enter your email address"
                className="flex-1 px-5 py-3.5 rounded-full bg-white border border-[#252B2D]/20 text-sm text-[#252B2D] placeholder:text-[#252B2D]/45 focus:outline-none focus:border-[#80B8B4]"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#252B2D] text-[#F4F6F3] text-[11px] font-bold uppercase tracking-[0.16em] hover:bg-[#80B8B4] hover:text-[#252B2D] transition-colors cursor-pointer shrink-0"
              >
                <span>Join the EIRA Circle</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {circleError && (
              <p
                role="alert"
                className="mt-3 inline-flex items-center gap-1.5 text-xs text-red-800"
              >
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{circleError}</span>
              </p>
            )}

            {circleSubscribed && (
              <p
                role="status"
                className="mt-3 inline-flex items-center gap-1.5 text-xs text-[#252B2D] font-medium"
              >
                <Check className="w-4 h-4 text-[#80B8B4] shrink-0" />
                <span>
                  Welcome to the EIRA Circle. Escapes and stories will be sent to {circleSubscribed}.
                </span>
              </p>
            )}
          </form>
        </div>
      </section>

      {/* =====================================================================
          12. FINAL BOOKING CTA SECTION
      ===================================================================== */}
      <section
        id="final-cta"
        aria-labelledby="final-cta-heading"
        className="relative w-full bg-[#1D2F2D] text-[#F4F6F3] py-20 sm:py-28 overflow-hidden"
      >
        <ResilientImage
          src={SWING_DECK_HERO_IMAGE}
          alt="Your next beautiful memory starts with EIRA"
          className="absolute inset-0 w-full h-full"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[#1D2F2D]/82 backdrop-blur-[1px]"
        />

        <div className="relative z-10 max-w-[880px] mx-auto px-5 sm:px-8 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#80B8B4] mb-3">
            YOUR NEXT CHAPTER BEGINS HERE
          </p>
          <h2
            id="final-cta-heading"
            className="font-serif-editorial text-[#F4F6F3] font-medium leading-[1.12]"
            style={{ fontSize: 'clamp(2.2rem, 4.2vw, 3.6rem)', textWrap: 'balance' }}
          >
            Your next beautiful memory{' '}
            <em className="italic font-normal text-[#80B8B4]">
              starts with EIRA.
            </em>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#D7E4E1]/90 max-w-[54ch] mx-auto leading-relaxed">
            Leave the everyday behind. Discover a place where every stay feels special and every moment is worth remembering.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={onBookYourStay}
              className="px-8 py-3.5 rounded-full bg-[#80B8B4] text-[#252B2D] text-xs font-bold uppercase tracking-[0.16em] hover:bg-[#D7E4E1] transition-colors cursor-pointer"
            >
              Book Your Stay
            </button>
            <a
              href="#stay"
              onClick={(e) => {
                if (onExploreStays) {
                  e.preventDefault();
                  onExploreStays();
                }
              }}
              className="px-8 py-3.5 rounded-full border border-[#F4F6F3]/45 text-[#F4F6F3] text-xs font-semibold uppercase tracking-[0.16em] hover:bg-[#F4F6F3]/15 transition-colors cursor-pointer"
            >
              Explore Our Stays
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
