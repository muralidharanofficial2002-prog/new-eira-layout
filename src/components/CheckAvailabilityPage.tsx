import React, { useState } from 'react';
import {
  Calendar,
  Users,
  Home,
  ChevronDown,
  Minus,
  Plus,
  ArrowLeft,
  Check,
  AlertCircle,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import {
  HERO_IMAGE,
  ROOMS_DATA,
  RoomItem,
  SEASONAL_OFFERS,
} from '../data/resortData';
import {
  calculateNights,
  validateStayDates,
  filterAvailableRooms,
  calculateStayQuote,
  formatINR,
  validateEmail,
} from '../utils/bookingLogic';
import { BookingSearchState } from './HeroSection';
import { ResilientImage } from './EiraIllustrations';
import { SubmittedInquiry } from './InteractiveModals';

interface CheckAvailabilityPageProps {
  searchState: BookingSearchState;
  onUpdateSearch: (partial: Partial<BookingSearchState>) => void;
  selectedOfferId: string | null;
  onSelectOfferId: (offerId: string | null) => void;
  onConfirmInquiry: (inquiry: SubmittedInquiry) => void;
  onBackToHome: () => void;
  onInspectRoomDetails: (room: RoomItem) => void;
}

export const CheckAvailabilityPage: React.FC<CheckAvailabilityPageProps> = ({
  searchState,
  onUpdateSearch,
  selectedOfferId,
  onSelectOfferId,
  onConfirmInquiry,
  onBackToHome,
  onInspectRoomDetails,
}) => {
  const [guestPopoverOpen, setGuestPopoverOpen] = useState(false);
  const [chosenRoomId, setChosenRoomId] = useState<string>(
    searchState.roomId !== 'all' ? searchState.roomId : ROOMS_DATA[0].id
  );
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null);

  const nights = calculateNights(searchState.arrive, searchState.depart);
  const dateValidation = validateStayDates(searchState.arrive, searchState.depart);
  const matchingRooms = filterAvailableRooms(
    ROOMS_DATA,
    searchState.roomId,
    searchState.adults,
    searchState.children
  );

  const activeRoom =
    matchingRooms.find((r) => r.id === chosenRoomId) ||
    matchingRooms[0] ||
    ROOMS_DATA[0];

  const quote = calculateStayQuote(
    activeRoom,
    dateValidation.nights || 1,
    searchState.adults,
    searchState.children,
    selectedOfferId
  );

  const handleSearchBarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGuestPopoverOpen(false);
    const resultsEl = document.getElementById('availability-results');
    if (resultsEl) {
      resultsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dateValidation.valid) {
      setFormError(dateValidation.error || 'Please check your selected stay dates.');
      return;
    }
    if (!guestName.trim() || guestName.trim().length < 2) {
      setFormError('Please enter your full name to request a reservation.');
      return;
    }
    const emailValidation = validateEmail(guestEmail);
    if (!emailValidation.valid) {
      setFormError(emailValidation.error || 'Please enter a valid email address.');
      return;
    }

    setFormError(null);
    const summary = `${activeRoom.name} · ${searchState.arrive} to ${searchState.depart} (${
      quote.nights
    } ${quote.nights === 1 ? 'night' : 'nights'}) · ${formatINR(quote.finalTotal)}`;

    onConfirmInquiry({
      id: `stay-${Date.now()}`,
      type: 'stay',
      summary,
      guestName: guestName.trim(),
      guestEmail: guestEmail.trim(),
    });

    setConfirmationMessage(
      `Your reservation inquiry for ${activeRoom.name} (${searchState.arrive} – ${searchState.depart}) for ${formatINR(
        quote.finalTotal
      )} has been registered with our Karwar Cove reservations desk. A formal confirmation and itinerary will be sent to ${guestEmail.trim()}.`
    );
  };

  return (
    <div className="min-h-screen bg-[#F4F6F3] text-[#252B2D] pb-24">
      {/* Subpage Atmospheric Header Banner */}
      <section
        aria-label="Check Availability Header"
        className="relative w-full pt-28 sm:pt-36 pb-20 sm:pb-28 bg-[#252B2D] text-[#F4F6F3] overflow-hidden"
      >
        <ResilientImage
          src={HERO_IMAGE}
          alt="EIRA coastal sanctuary availability and reservations"
          priority={true}
          className="absolute inset-0 w-full h-full"
          imgClassName="object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#252B2D]/85 via-[#252B2D]/70 to-[#252B2D]/95"
        />

        <div className="relative z-10 max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#80B8B4] hover:text-[#D7E4E1] transition-colors mb-8 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to EIRA Sanctuary</span>
          </button>

          <div className="max-w-3xl">
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.26em] text-[#80B8B4] mb-3">
              EIRA Reservations · Karwar Cove, Arabian Sea
            </p>
            <h1
              className="font-serif-editorial text-[#F4F6F3] font-medium leading-[1.08]"
              style={{ fontSize: 'clamp(2.35rem, 4.8vw, 4rem)' }}
            >
              Check <em className="italic font-normal text-[#80B8B4]">availability</em> &amp; plan your coastal stay
            </h1>
            <p className="mt-4 text-sm sm:text-base text-[#D7E4E1]/90 max-w-[56ch] leading-relaxed">
              Select your arrival and departure dates, number of guests, and preferred villa below to view live availability and tariff quotes in Indian Rupees (₹).
            </p>
          </div>

          {/* Dedicated Check Availability Bar (Moved from Hero to this Subpage) */}
          <div className="w-full mt-10">
            <form
              onSubmit={handleSearchBarSubmit}
              aria-label="Check room availability"
              className="bg-[#F4F6F3] border border-[#D7E4E1] rounded-[28px] lg:rounded-full p-4 sm:p-5 lg:px-7 lg:py-4 shadow-[0_24px_60px_rgba(37,43,45,0.4)] text-[#252B2D]"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 lg:gap-4 items-center">
                {/* Arrive Date Picker */}
                <div className="lg:col-span-2 flex flex-col px-3.5 py-1.5 rounded-2xl hover:bg-[#D7E4E1]/50 transition-colors duration-150">
                  <label
                    htmlFor="subpage-booking-arrive"
                    className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#252B2D]/65 mb-1"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#80B8B4]" aria-hidden="true" />
                    Arrive
                  </label>
                  <input
                    id="subpage-booking-arrive"
                    type="date"
                    value={searchState.arrive}
                    onChange={(e) => {
                      setConfirmationMessage(null);
                      onUpdateSearch({ arrive: e.target.value });
                    }}
                    className="w-full bg-transparent text-sm font-semibold text-[#252B2D] focus:outline-none cursor-pointer tabular-nums"
                    required
                  />
                </div>

                {/* Depart Date Picker */}
                <div className="lg:col-span-3 flex flex-col px-3.5 py-1.5 rounded-2xl hover:bg-[#D7E4E1]/50 transition-colors duration-150 lg:border-l lg:border-[#252B2D]/10">
                  <label
                    htmlFor="subpage-booking-depart"
                    className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.16em] text-[#252B2D]/65 mb-1"
                  >
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#80B8B4]" aria-hidden="true" />
                      Depart
                    </span>
                    {nights > 0 && (
                      <span className="text-[10px] font-semibold tracking-[0.08em] text-[#252B2D]/75 tabular-nums">
                        {nights} {nights === 1 ? 'night' : 'nights'}
                      </span>
                    )}
                  </label>
                  <input
                    id="subpage-booking-depart"
                    type="date"
                    value={searchState.depart}
                    min={searchState.arrive}
                    onChange={(e) => {
                      setConfirmationMessage(null);
                      onUpdateSearch({ depart: e.target.value });
                    }}
                    className="w-full bg-transparent text-sm font-semibold text-[#252B2D] focus:outline-none cursor-pointer tabular-nums"
                    required
                  />
                </div>

                {/* Guests Selector */}
                <div className="relative lg:col-span-2 flex flex-col px-3.5 py-1.5 rounded-2xl hover:bg-[#D7E4E1]/50 transition-colors duration-150 lg:border-l lg:border-[#252B2D]/10">
                  <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#252B2D]/65 mb-1">
                    <Users className="w-3.5 h-3.5 text-[#80B8B4]" aria-hidden="true" />
                    Guests
                  </span>
                  <button
                    type="button"
                    onClick={() => setGuestPopoverOpen((prev) => !prev)}
                    aria-expanded={guestPopoverOpen}
                    aria-label="Select number of adults and children"
                    className="flex items-center justify-between w-full text-left text-sm font-semibold text-[#252B2D] focus:outline-none cursor-pointer whitespace-nowrap"
                  >
                    <span className="tabular-nums truncate">
                      {searchState.adults} {searchState.adults === 1 ? 'Adult' : 'Adults'}
                      {searchState.children > 0
                        ? `, ${searchState.children} ${
                            searchState.children === 1 ? 'Child' : 'Children'
                          }`
                        : ''}
                    </span>
                    <ChevronDown className="w-4 h-4 text-[#252B2D]/60 shrink-0 ml-1" />
                  </button>

                  {guestPopoverOpen && (
                    <div
                      role="region"
                      aria-label="Guest count controls"
                      className="absolute left-0 top-full mt-3 w-64 bg-[#F4F6F3] border border-[#252B2D]/15 rounded-2xl p-4 shadow-2xl z-30 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-semibold text-[#252B2D]">Adults</p>
                          <p className="text-[11px] text-[#252B2D]/60">Ages 13 or above</p>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <button
                            type="button"
                            aria-label="Decrease adults"
                            onClick={() =>
                              onUpdateSearch({ adults: Math.max(1, searchState.adults - 1) })
                            }
                            className="w-7 h-7 rounded-full border border-[#252B2D]/25 flex items-center justify-center text-[#252B2D] hover:bg-[#D7E4E1] cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-4 text-center text-sm font-semibold tabular-nums">
                            {searchState.adults}
                          </span>
                          <button
                            type="button"
                            aria-label="Increase adults"
                            onClick={() =>
                              onUpdateSearch({ adults: Math.min(4, searchState.adults + 1) })
                            }
                            className="w-7 h-7 rounded-full border border-[#252B2D]/25 flex items-center justify-center text-[#252B2D] hover:bg-[#D7E4E1] cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="h-[1px] bg-[#252B2D]/10" />

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-semibold text-[#252B2D]">Children</p>
                          <p className="text-[11px] text-[#252B2D]/60">Ages 0 to 12</p>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <button
                            type="button"
                            aria-label="Decrease children"
                            onClick={() =>
                              onUpdateSearch({
                                children: Math.max(0, searchState.children - 1),
                              })
                            }
                            className="w-7 h-7 rounded-full border border-[#252B2D]/25 flex items-center justify-center text-[#252B2D] hover:bg-[#D7E4E1] cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-4 text-center text-sm font-semibold tabular-nums">
                            {searchState.children}
                          </span>
                          <button
                            type="button"
                            aria-label="Increase children"
                            onClick={() =>
                              onUpdateSearch({
                                children: Math.min(3, searchState.children + 1),
                              })
                            }
                            className="w-7 h-7 rounded-full border border-[#252B2D]/25 flex items-center justify-center text-[#252B2D] hover:bg-[#D7E4E1] cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="pt-1 flex justify-end">
                        <button
                          type="button"
                          onClick={() => setGuestPopoverOpen(false)}
                          className="text-[11px] uppercase tracking-[0.14em] font-semibold text-[#252B2D] hover:underline cursor-pointer"
                        >
                          Done
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Room Type Selector */}
                <div className="lg:col-span-2 flex flex-col px-3.5 py-1.5 rounded-2xl hover:bg-[#D7E4E1]/50 transition-colors duration-150 lg:border-l lg:border-[#252B2D]/10">
                  <label
                    htmlFor="subpage-booking-room"
                    className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#252B2D]/65 mb-1"
                  >
                    <Home className="w-3.5 h-3.5 text-[#80B8B4]" aria-hidden="true" />
                    Room
                  </label>
                  <select
                    id="subpage-booking-room"
                    value={searchState.roomId}
                    onChange={(e) => {
                      const nextRoomId = e.target.value;
                      onUpdateSearch({ roomId: nextRoomId });
                      if (nextRoomId !== 'all') {
                        setChosenRoomId(nextRoomId);
                      }
                    }}
                    className="w-full bg-transparent text-sm font-semibold text-[#252B2D] focus:outline-none cursor-pointer truncate"
                  >
                    <option value="all">All Rooms</option>
                    {ROOMS_DATA.map((room) => (
                      <option key={room.id} value={room.id}>
                        {room.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Check Availability CTA */}
                <div className="sm:col-span-2 lg:col-span-3 flex items-center justify-end">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-full bg-[#252B2D] text-[#F4F6F3] text-[11px] font-semibold uppercase tracking-[0.16em] hover:bg-[#80B8B4] hover:text-[#252B2D] active:scale-[0.99] transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer shadow-sm"
                  >
                    Check availability
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Main Subpage Body: Available Villas Grid + Sticky Reservation Folio */}
      <section
        id="availability-results"
        aria-label="Available Villas and Reservation Summary"
        className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12 pt-14 sm:pt-20"
      >
        {!dateValidation.valid ? (
          <div className="p-6 rounded-2xl bg-[#D7E4E1] text-[#252B2D] flex items-center gap-3 text-sm font-medium">
            <AlertCircle className="w-5 h-5 shrink-0 text-[#252B2D]" />
            <span>{dateValidation.error}</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left 7 Columns: Available Villas & Seasonal Offer Selector */}
            <div className="lg:col-span-7 space-y-8">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#252B2D]/12">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#80B8B4]">
                    Step 1 · Choose Your Sanctuary
                  </p>
                  <h2 className="font-serif-editorial text-2xl sm:text-3xl font-medium text-[#252B2D] mt-1">
                    {matchingRooms.length}{' '}
                    {matchingRooms.length === 1 ? 'Villa Available' : 'Villas Available'} for{' '}
                    {searchState.adults + searchState.children}{' '}
                    {searchState.adults + searchState.children === 1 ? 'Guest' : 'Guests'}
                  </h2>
                </div>

                {/* Seasonal Offer Privilege Selector */}
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#80B8B4]" />
                  <label htmlFor="subpage-offer-select" className="sr-only">
                    Seasonal Offer
                  </label>
                  <select
                    id="subpage-offer-select"
                    value={selectedOfferId || ''}
                    onChange={(e) => {
                      setConfirmationMessage(null);
                      onSelectOfferId(e.target.value ? e.target.value : null);
                    }}
                    className="px-4 py-2 rounded-full bg-white border border-[#D7E4E1] text-xs font-semibold text-[#252B2D] focus:outline-none focus:border-[#80B8B4] cursor-pointer"
                  >
                    <option value="">Standard Sanctuary Tariff</option>
                    {SEASONAL_OFFERS.map((offer) => (
                      <option key={offer.id} value={offer.id}>
                        {offer.title} ({offer.discountPercent}% Privilege, {offer.minNights}+ Nights)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Room Cards List */}
              <div className="space-y-6">
                {matchingRooms.map((room) => {
                  const isSelected = room.id === activeRoom.id;
                  return (
                    <article
                      key={room.id}
                      onClick={() => {
                        setChosenRoomId(room.id);
                        setConfirmationMessage(null);
                      }}
                      className={`rounded-[26px] p-5 sm:p-6 transition-all cursor-pointer border ${
                        isSelected
                          ? 'bg-white border-[#252B2D] ring-2 ring-[#80B8B4] shadow-[0_18px_45px_rgba(37,43,45,0.10)]'
                          : 'bg-white/80 border-[#D7E4E1] hover:border-[#80B8B4]'
                      }`}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                        <div className="sm:col-span-5 aspect-[16/11] rounded-[18px] overflow-hidden">
                          <ResilientImage
                            src={room.image}
                            alt={room.name}
                            className="w-full h-full"
                          />
                        </div>

                        <div className="sm:col-span-7 flex flex-col justify-between space-y-3">
                          <div>
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#80B8B4]">
                                {room.category} · {room.sizeSqm} m²
                              </span>
                              {isSelected && (
                                <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#252B2D] bg-[#D7E4E1] px-3 py-0.5 rounded-full">
                                  <Check className="w-3 h-3 text-[#252B2D]" />
                                  Selected
                                </span>
                              )}
                            </div>

                            <h3 className="font-serif-editorial text-2xl font-medium text-[#252B2D] mt-1">
                              {room.name}
                            </h3>
                            <p className="text-xs text-[#252B2D]/75 leading-relaxed mt-1">
                              {room.shortDescription}
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-[#252B2D]/65 pt-1">
                            <span>• {room.bedType}</span>
                            <span>• Up to {room.maxGuests} Guests</span>
                            <span>• {room.view}</span>
                          </div>

                          <div className="pt-3 border-t border-[#D7E4E1] flex items-center justify-between gap-4">
                            <div>
                              <span className="font-serif-editorial text-2xl font-medium text-[#252B2D] tabular-nums">
                                {formatINR(room.nightlyRate)}
                              </span>
                              <span className="text-xs text-[#252B2D]/60"> / night</span>
                            </div>

                            <div className="flex items-center gap-3">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onInspectRoomDetails(room);
                                }}
                                className="text-xs font-medium underline underline-offset-4 text-[#252B2D]/75 hover:text-[#252B2D] cursor-pointer"
                              >
                                Amenities
                              </button>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setChosenRoomId(room.id);
                                  setConfirmationMessage(null);
                                }}
                                className={`px-5 py-2 rounded-full text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors cursor-pointer ${
                                  isSelected
                                    ? 'bg-[#252B2D] text-[#F4F6F3]'
                                    : 'bg-[#D7E4E1] text-[#252B2D] hover:bg-[#80B8B4]'
                                }`}
                              >
                                {isSelected ? 'Selected' : 'Select Villa'}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            {/* Right 5 Columns: Sticky Stay Folio & Guest Confirmation Form */}
            <div className="lg:col-span-5 lg:sticky lg:top-28 bg-white rounded-[28px] border border-[#D7E4E1] p-6 sm:p-8 shadow-[0_20px_50px_rgba(37,43,45,0.08)] space-y-6">
              <div className="pb-4 border-b border-[#D7E4E1]">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#80B8B4]">
                  Step 2 · Reservation Summary
                </p>
                <h3 className="font-serif-editorial text-2xl sm:text-3xl font-medium text-[#252B2D] mt-1">
                  {activeRoom.name}
                </h3>
                <p className="text-xs text-[#252B2D]/65 mt-1 tabular-nums">
                  {searchState.arrive} → {searchState.depart} ({quote.nights}{' '}
                  {quote.nights === 1 ? 'Night' : 'Nights'}) · {searchState.adults}{' '}
                  {searchState.adults === 1 ? 'Adult' : 'Adults'}
                  {searchState.children > 0
                    ? `, ${searchState.children} ${
                        searchState.children === 1 ? 'Child' : 'Children'
                      }`
                    : ''}
                </p>
              </div>

              {/* Tariff Breakdown in INR */}
              <div className="p-5 rounded-2xl bg-[#F4F6F3] border border-[#D7E4E1] space-y-2.5 text-sm">
                <div className="flex justify-between tabular-nums">
                  <span className="text-[#252B2D]/80">
                    {formatINR(activeRoom.nightlyRate)} × {quote.nights}{' '}
                    {quote.nights === 1 ? 'night' : 'nights'}
                  </span>
                  <span className="font-medium text-[#252B2D]">
                    {formatINR(activeRoom.nightlyRate * quote.nights)}
                  </span>
                </div>

                {quote.extraGuestFeePerNight > 0 && (
                  <div className="flex justify-between tabular-nums text-xs text-[#252B2D]/75">
                    <span>Extra guest supplement ({formatINR(quote.extraGuestFeePerNight)}/night)</span>
                    <span>{formatINR(quote.extraGuestFeePerNight * quote.nights)}</span>
                  </div>
                )}

                {quote.discountAmount > 0 && (
                  <div className="flex justify-between text-[#252B2D] font-medium tabular-nums">
                    <span>Privilege ({quote.appliedOfferTitle})</span>
                    <span className="text-[#80B8B4]">-{formatINR(quote.discountAmount)}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-[#252B2D]/12 flex justify-between items-baseline">
                  <div>
                    <span className="font-semibold text-[#252B2D] block">
                      Estimated Total (INR)
                    </span>
                    <span className="text-[11px] text-[#252B2D]/60">
                      Includes daily Morning Harvest breakfast &amp; Samudra spa access
                    </span>
                  </div>
                  <span className="font-serif-editorial text-2xl sm:text-3xl font-medium text-[#252B2D] tabular-nums">
                    {formatINR(quote.finalTotal)}
                  </span>
                </div>
              </div>

              {confirmationMessage ? (
                <div
                  role="status"
                  className="p-6 rounded-2xl bg-[#252B2D] text-[#F4F6F3] space-y-3"
                >
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Check className="w-4 h-4 text-[#80B8B4]" />
                    <span>Reservation Inquiry Confirmed</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#D7E4E1] leading-relaxed">
                    {confirmationMessage}
                  </p>
                  <button
                    type="button"
                    onClick={() => setConfirmationMessage(null)}
                    className="text-xs font-semibold uppercase tracking-[0.14em] text-[#80B8B4] underline cursor-pointer"
                  >
                    Modify dates or submit another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleReservationSubmit} noValidate className="space-y-4">
                  <div>
                    <label
                      htmlFor="subpage-guest-name"
                      className="block text-xs font-semibold text-[#252B2D] mb-1"
                    >
                      Full Name *
                    </label>
                    <input
                      id="subpage-guest-name"
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="Aarav & Meera Kapoor"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F4F6F3] border border-[#D7E4E1] text-sm text-[#252B2D] focus:outline-none focus:border-[#80B8B4]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label
                        htmlFor="subpage-guest-email"
                        className="block text-xs font-semibold text-[#252B2D] mb-1"
                      >
                        Email Address *
                      </label>
                      <input
                        id="subpage-guest-email"
                        type="email"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        placeholder="meera@example.in"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#F4F6F3] border border-[#D7E4E1] text-sm text-[#252B2D] focus:outline-none focus:border-[#80B8B4]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="subpage-guest-phone"
                        className="block text-xs font-semibold text-[#252B2D] mb-1"
                      >
                        Phone / WhatsApp
                      </label>
                      <input
                        id="subpage-guest-phone"
                        type="tel"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        placeholder="+91 98200 00000"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#F4F6F3] border border-[#D7E4E1] text-sm text-[#252B2D] focus:outline-none focus:border-[#80B8B4]"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subpage-guest-notes"
                      className="block text-xs font-semibold text-[#252B2D] mb-1"
                    >
                      Airport Transfer &amp; Dietary Preferences
                    </label>
                    <input
                      id="subpage-guest-notes"
                      type="text"
                      value={specialNotes}
                      onChange={(e) => setSpecialNotes(e.target.value)}
                      placeholder="Goa airport SUV transfer, Ayurvedic consultation, or dietary notes"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F4F6F3] border border-[#D7E4E1] text-sm text-[#252B2D] focus:outline-none focus:border-[#80B8B4]"
                    />
                  </div>

                  {formError && (
                    <p role="alert" className="text-xs text-red-800 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{formError}</span>
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-full bg-[#252B2D] text-[#F4F6F3] text-xs font-semibold uppercase tracking-[0.16em] hover:bg-[#80B8B4] hover:text-[#252B2D] transition-colors cursor-pointer shadow-sm"
                  >
                    Confirm Reservation Request
                  </button>

                  <p className="flex items-center justify-center gap-1.5 text-[11px] text-[#252B2D]/60 text-center pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#80B8B4] shrink-0" />
                    <span>No immediate card charge · Flexible coastal cancellation</span>
                  </p>
                </form>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
