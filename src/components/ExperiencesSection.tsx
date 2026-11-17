import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { EXPERIENCES_DATA, ExperienceItem } from '../data/resortData';
import { ResilientImage } from './EiraIllustrations';

interface ExperiencesSectionProps {
  onSelectExperience: (experience: ExperienceItem) => void;
}

export const ExperiencesSection: React.FC<ExperiencesSectionProps> = ({
  onSelectExperience,
}) => {
  const [expandedIndex, setExpandedIndex] = useState<number>(0);

  return (
    <section
      id="experiences"
      aria-labelledby="experiences-heading"
      className="w-full bg-[#F4F6F3] pt-20 sm:pt-28 lg:pt-36 pb-12 sm:pb-16"
    >
      <div id="outdoors" className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Editorial Heading Block */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14 sm:mb-18">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#80B8B4] mb-3">
              Between Tides · Coastal Wellness &amp; Rituals
            </p>
            <h2
              id="experiences-heading"
              className="font-serif-editorial text-[#252B2D] font-medium leading-[1.12] max-w-[18ch]"
              style={{ fontSize: 'clamp(2.1rem, 4vw, 3.45rem)', textWrap: 'balance' }}
            >
              Days measured in <em className="italic font-normal text-[#80B8B4]">tides,</em> not timetables.
            </h2>
          </div>

          <p className="text-sm sm:text-[15px] text-[#252B2D]/80 leading-[1.7] max-w-[46ch]">
            Select any coastal ritual below to explore our warm seawater thalassotherapy pool, sunrise lagoon crossings, and guided laterite cliff trails.
          </p>
        </div>

        {/* Interactive Numbered Editorial Index (01, 02, 03) */}
        <div className="border-t border-[#252B2D]/15">
          {EXPERIENCES_DATA.map((exp, idx) => {
            const isExpanded = idx === expandedIndex;
            const numberLabel = `0${idx + 1}`;

            return (
              <article
                key={exp.id}
                className="border-b border-[#252B2D]/15 transition-colors duration-200"
              >
                {isExpanded ? (
                  <div className="py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                    <div className="lg:col-span-2 self-start">
                      <span className="font-serif-editorial text-3xl sm:text-4xl font-normal text-[#80B8B4] tabular-nums">
                        {numberLabel}
                      </span>
                    </div>

                    <div className="lg:col-span-5 space-y-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#252B2D]/65">
                        {exp.schedule}
                      </p>
                      <h3 className="font-serif-editorial text-3xl sm:text-4xl font-normal text-[#252B2D]">
                        {exp.title}
                      </h3>
                      <p className="text-sm sm:text-[15px] text-[#252B2D]/80 leading-relaxed max-w-[46ch]">
                        {exp.description}
                      </p>
                      <ul className="space-y-1.5 text-xs text-[#252B2D]/70 pt-1">
                        {exp.details.map((detail) => (
                          <li key={detail}>— {detail}</li>
                        ))}
                      </ul>
                      <div className="pt-3">
                        <button
                          type="button"
                          onClick={() => onSelectExperience(exp)}
                          aria-label={`Explore ${exp.title} — ${exp.subtitle}`}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#252B2D] text-[#F4F6F3] text-[11px] font-semibold uppercase tracking-[0.16em] hover:bg-[#80B8B4] hover:text-[#252B2D] transition-colors cursor-pointer"
                        >
                          <span>Explore {exp.title}</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="lg:col-span-5">
                      <button
                        type="button"
                        onClick={() => onSelectExperience(exp)}
                        className="group relative w-full h-[280px] sm:h-[340px] rounded-[26px] overflow-hidden block text-left cursor-pointer shadow-lg border border-[#D7E4E1]"
                      >
                        <ResilientImage
                          src={exp.image}
                          alt={`${exp.title} — ${exp.subtitle}`}
                          className="absolute inset-0 w-full h-full"
                          imgClassName="transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 bg-gradient-to-t from-[#252B2D]/85 via-transparent to-transparent"
                        />
                        <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between text-[#F4F6F3]">
                          <div>
                            <span className="block font-serif-editorial text-2xl font-normal">
                              {exp.title}
                            </span>
                            <span className="text-xs text-[#D7E4E1]">
                              {exp.subtitle}
                            </span>
                          </div>
                          <span className="w-9 h-9 rounded-full bg-[#80B8B4] text-[#252B2D] flex items-center justify-center">
                            <ArrowUpRight className="w-4 h-4" />
                          </span>
                        </div>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => setExpandedIndex(idx)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setExpandedIndex(idx);
                      }
                    }}
                    aria-label={`Expand ${exp.title} (${exp.subtitle})`}
                    className="py-6 sm:py-7 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 items-center hover:bg-[#D7E4E1]/45 px-3 -mx-3 rounded-2xl transition-colors cursor-pointer group"
                  >
                    <div className="lg:col-span-2">
                      <span className="font-serif-editorial text-2xl sm:text-3xl font-normal text-[#252B2D]/70 tabular-nums">
                        {numberLabel}
                      </span>
                    </div>

                    <div className="lg:col-span-5">
                      <h3 className="font-serif-editorial text-2xl sm:text-[28px] font-normal text-[#252B2D] group-hover:translate-x-1 transition-transform">
                        {exp.title}
                      </h3>
                      <p className="text-xs text-[#252B2D]/65 mt-0.5">
                        {exp.subtitle} · {exp.schedule}
                      </p>
                    </div>

                    <div className="lg:col-span-5 flex items-center justify-end">
                      <div className="relative w-full sm:w-80 lg:w-full h-18 sm:h-20 rounded-full overflow-hidden border border-[#80B8B4]/40">
                        <ResilientImage
                          src={exp.image}
                          alt={exp.title}
                          className="w-full h-full"
                          imgClassName="transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
