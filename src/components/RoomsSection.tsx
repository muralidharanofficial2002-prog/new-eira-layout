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
      className="w-full bg-[#D7E4E1] py-20 sm:py-26"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Clean Header without definition paragraphs */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-14">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#252B2D]/70 mb-2">
              STAY BEAUTIFULLY
            </p>
            <h2
              id="stay-heading"
              className="font-serif-editorial text-[#252B2D] font-medium leading-[1.12]"
              style={{ fontSize: 'clamp(2.1rem, 4vw, 3.45rem)', textWrap: 'balance' }}
            >
              Your own little world of <em className="italic font-normal">comfort.</em>
            </h2>
          </div>

          <button
            type="button"
            onClick={onViewAllRooms}
            className="px-6 py-2.5 rounded-full bg-[#252B2D] text-[#F4F6F3] text-[11px] font-semibold uppercase tracking-[0.16em] hover:bg-[#80B8B4] hover:text-[#252B2D] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer self-start sm:self-auto"
          >
            Explore All Stays
          </button>
        </div>

        {/* Clean 2x2 Room Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 lg:gap-8">
          {ROOMS_DATA.map((room, index) => (
            <article
              key={room.id}
              className="group bg-[#F4F6F3] rounded-[28px] p-4 sm:p-5 border border-[#252B2D]/10 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(37,43,45,0.10)]"
            >
              <div>
                <div className="relative aspect-[16/10] w-full rounded-[20px] overflow-hidden mb-4">
                  <ResilientImage
                    src={room.image}
                    alt={`${room.name} — ${room.tagline}`}
                    className="absolute inset-0 w-full h-full"
                    imgClassName="transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-b from-[#252B2D]/55 via-transparent to-[#252B2D]/40"
                  />

                  <div className="relative z-10 p-4 sm:p-5 flex items-center justify-between text-[11px] font-semibold tracking-[0.12em] uppercase text-[#F4F6F3] tabular-nums">
                    <span>
                      {room.roomNumberLabel} · {room.sizeSqm} m²
                    </span>
                    <span>Up to {room.maxGuests} Guests</span>
                  </div>
                </div>

                <div className="px-1 sm:px-2 pb-4 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-serif-editorial text-2xl sm:text-3xl font-normal text-[#252B2D]">
                      {room.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#252B2D]/70 mt-1">
                      {room.tagline}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectRoomDetails(room)}
                    aria-label={`View Details for ${room.name}`}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-150 shrink-0 cursor-pointer ${
                      index === 1
                        ? 'bg-[#80B8B4] text-[#252B2D] hover:bg-[#252B2D] hover:text-[#F4F6F3]'
                        : 'border border-[#252B2D]/20 text-[#252B2D] group-hover:bg-[#252B2D] group-hover:text-[#F4F6F3]'
                    }`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="px-1 sm:px-2 pt-3.5 border-t border-[#252B2D]/10 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-[#252B2D]/80">
                  <Star className="w-3.5 h-3.5 fill-[#80B8B4] text-[#80B8B4]" aria-hidden="true" />
                  <span className="font-semibold text-[#252B2D]">5.0</span>
                  <span aria-hidden="true">·</span>
                  <button
                    type="button"
                    onClick={() => onSelectRoomDetails(room)}
                    className="font-semibold uppercase tracking-[0.12em] underline underline-offset-4 hover:text-[#80B8B4] cursor-pointer"
                  >
                    View Details
                  </button>
                </div>

                <div className="flex items-baseline gap-1.5 tabular-nums">
                  <span className="font-serif-editorial text-2xl sm:text-[26px] font-normal text-[#252B2D]">
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
