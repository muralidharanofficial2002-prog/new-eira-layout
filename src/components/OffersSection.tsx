import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SEASONAL_OFFERS, SeasonalOffer } from '../data/resortData';

interface OffersSectionProps {
  onSelectOffer: (offer: SeasonalOffer) => void;
}

export const OffersSection: React.FC<OffersSectionProps> = ({ onSelectOffer }) => {
  return (
    <section
      id="offers"
      aria-labelledby="offers-heading"
      className="w-full bg-[#F4F6F3] pt-12 sm:pt-16 pb-20 sm:pb-28 lg:pb-36"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#80B8B4] mb-3">
              Offers · Curated Coastal Sojourns
            </p>
            <h2
              id="offers-heading"
              className="font-serif-editorial text-[#252B2D] font-medium leading-[1.12]"
              style={{ fontSize: 'clamp(2.1rem, 3.9vw, 3.45rem)' }}
            >
              <em className="italic font-normal text-[#80B8B4]">Seasonal retreats</em> along the Konkan coast
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#252B2D]/75 max-w-[40ch] leading-relaxed">
            Every curated package includes daily Morning Harvest breakfast at The Verandah and unhurried access to our Samudra seawater thermal pool.
          </p>
        </div>

        {/* Asymmetric Architectural Offer Cards (Center card highlighted in Charcoal #252B2D) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {SEASONAL_OFFERS.map((offer, idx) => {
            const isHighlighted = idx === 1;

            return (
              <article
                key={offer.id}
                className={`group rounded-[26px] p-7 sm:p-9 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 ${
                  isHighlighted
                    ? 'bg-[#252B2D] text-[#F4F6F3] shadow-[0_24px_50px_rgba(37,43,45,0.18)] border border-[#80B8B4]/30'
                    : 'bg-white text-[#252B2D] border border-[#D7E4E1] hover:border-[#80B8B4] hover:shadow-[0_18px_40px_rgba(37,43,45,0.08)]'
                }`}
              >
                <div>
                  <div
                    className={`flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.2em] pb-4 mb-6 border-b ${
                      isHighlighted
                        ? 'text-[#80B8B4] border-[#F4F6F3]/15'
                        : 'text-[#252B2D]/65 border-[#D7E4E1]'
                    }`}
                  >
                    <span>
                      0{idx + 1} · {offer.category}
                    </span>
                    <span className="tabular-nums">
                      {offer.discountPercent}% Privilege · {offer.minNights}+ Nights
                    </span>
                  </div>

                  <h3 className="font-serif-editorial text-2xl sm:text-3xl font-normal mb-3">
                    {offer.title}
                  </h3>

                  <p
                    className={`text-sm sm:text-[15px] leading-[1.7] mb-6 ${
                      isHighlighted ? 'text-[#F4F6F3]/85' : 'text-[#252B2D]/80'
                    }`}
                  >
                    {offer.description}
                  </p>

                  <ul
                    className={`space-y-2 text-xs mb-8 ${
                      isHighlighted ? 'text-[#D7E4E1]/85' : 'text-[#252B2D]/70'
                    }`}
                  >
                    {offer.inclusions.slice(0, 3).map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span aria-hidden="true" className="text-[#80B8B4]">
                          —
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className={`pt-4 border-t flex items-center justify-between gap-4 ${
                    isHighlighted ? 'border-[#F4F6F3]/15' : 'border-[#D7E4E1]'
                  }`}
                >
                  <span
                    className={`text-xs ${
                      isHighlighted ? 'text-[#D7E4E1]/75' : 'text-[#252B2D]/60'
                    }`}
                  >
                    {offer.validityNote}
                  </span>
                  <button
                    type="button"
                    onClick={() => onSelectOffer(offer)}
                    aria-label={`View offer: ${offer.title}`}
                    className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] cursor-pointer whitespace-nowrap shrink-0 ${
                      isHighlighted ? 'text-[#80B8B4] hover:text-[#D7E4E1]' : 'text-[#252B2D] hover:text-[#80B8B4]'
                    }`}
                  >
                    <span>View offer</span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
