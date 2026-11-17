import React from 'react';
import { ArrowUpRight, Star } from 'lucide-react';
import { ROOMS_DATA, RoomItem } from '../data/resortData';
import { ResilientImage } from './EiraIllustrations';
import { formatINR } from '../utils/bookingLogic';

interface RoomsSectionProps {
  onSelectRoomDetails: (room: RoomItem) => void;
  onViewAllRooms: () => void;
}

export const RoomsSection: React.FC<RoomsSectionProps> = ({
  onSelectRoomDetails,
  onViewAllRooms,
}) => {
  return (
    <section
      id="stay"
      aria-labelledby="stay-heading"
      className="w-full bg-[#D7E4E1] py-20 sm:py-28 lg:py-32"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Editorial Asymmetric Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-12 sm:mb-16">
          <div className="lg:col-span-7">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#252B2D]/70 mb-3">
              Stay · Private Coastal Sanctuaries
            </p>
            <h2
              id="stay-heading"
              className="font-serif-editorial text-[#252B2D] font-medium leading-[1.12]"
              style={{ fontSize: 'clamp(2.1rem, 4vw, 3.45rem)', textWrap: 'balance' }}
            >
              <em className="italic font-normal">Villas</em> &amp; suites shaped by the sea breeze
            </h2>
          </div>

          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col xl:flex-row sm:items-end lg:items-start xl:items-end justify-between gap-4">
            <p className="text-xs sm:text-sm text-[#252B2D]/80 leading-relaxed max-w-[42ch]">
              Every sanctuary opens directly to the Arabian Sea. Discover hand-crafted spaces designed for golden coastal light, khadi linen textures, and private teak decks.
            </p>
            <button
              type="button"
              onClick={onViewAllRooms}
              className="px-6 py-2.5 rounded-full bg-[#252B2D] text-[#F4F6F3] text-[11px] font-semibold uppercase tracking-[0.16em] hover:bg-[#80B8B4] hover:text-[#252B2D] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
            >
              Explore all stays
            </button>
          </div>
        </div>

        {/* Architectural 2x2 Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 lg:gap-9">
          {ROOMS_DATA.map((room, index) => (
            <article
              key={room.id}
              className="group bg-[#F4F6F3] rounded-[28px] p-4 sm:p-5 border border-[#252B2D]/10 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(37,43,45,0.10)]"
            >
              <div>
                {/* Large 16:10 Architectural Photograph with subtle top/bottom scrim */}
                <div className="relative aspect-[16/10] w-full rounded-[20px] overflow-hidden mb-5">
                  <ResilientImage
                    src={room.image}
                    alt={`${room.name} — ${room.shortDescription}`}
                    className="absolute inset-0 w-full h-full"
                    imgClassName="transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-b from-[#252B2D]/55 via-transparent to-[#252B2D]/40"
                  />

                  {/* Top unboxed metadata overlay inside image */}
                  <div className="relative z-10 p-4 sm:p-5 flex items-center justify-between text-[11px] font-semibold tracking-[0.12em] uppercase text-[#F4F6F3] tabular-nums">
                    <span>
                      {room.sizeSqm} m² · {room.bedType}
                    </span>
                    <span>Up to {room.maxGuests} Guests</span>
                  </div>
                </div>

                {/* Card Body: View Kicker, Title + Circular Arrow Button */}
                <div className="px-1 sm:px-2">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <p className="text-xs font-medium text-[#252B2D]/65 mb-1">
                        {room.view} · {room.category}
                      </p>
                      <h3 className="font-serif-editorial text-2xl sm:text-3xl font-normal text-[#252B2D]">
                        {room.name}
                      </h3>
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectRoomDetails(room)}
                      aria-label={`Details for ${room.name}`}
                      className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors duration-150 shrink-0 cursor-pointer ${
                        index === 1
                          ? 'bg-[#80B8B4] text-[#252B2D] hover:bg-[#252B2D] hover:text-[#F4F6F3]'
                          : 'border border-[#252B2D]/20 text-[#252B2D] group-hover:bg-[#252B2D] group-hover:text-[#F4F6F3]'
                      }`}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-[#252B2D]/80 leading-relaxed mb-3">
                    {room.shortDescription}
                  </p>

                  <p className="text-xs text-[#252B2D]/65 leading-relaxed pb-4">
                    {room.highlights.join(' · ')}
                  </p>
                </div>
              </div>

              {/* Card Bottom Bar: Rating / Orientation + Nightly Rate in INR */}
              <div className="px-1 sm:px-2 pt-3.5 border-t border-[#252B2D]/10 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-[#252B2D]/80">
                  <Star className="w-3.5 h-3.5 fill-[#80B8B4] text-[#80B8B4]" aria-hidden="true" />
                  <span className="font-semibold text-[#252B2D]">5.0</span>
                  <span aria-hidden="true">·</span>
                  <button
                    type="button"
                    onClick={() => onSelectRoomDetails(room)}
                    className="font-medium underline underline-offset-4 hover:text-[#80B8B4] cursor-pointer"
                  >
                    Villa details
                  </button>
                </div>

                <div className="flex items-baseline gap-1.5 tabular-nums">
                  <span className="font-serif-editorial text-2xl sm:text-[28px] font-normal text-[#252B2D]">
                    {formatINR(room.nightlyRate)}
                  </span>
                  <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#252B2D]/60">
                    / night
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
