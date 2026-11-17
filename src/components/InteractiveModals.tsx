import React, { useState } from 'react';
import { X, Check, AlertCircle, ArrowRight } from 'lucide-react';
import {
  ROOMS_DATA,
  RoomItem,
  DINING_SCHEDULE,
  SAMPLE_MENU_SECTIONS,
  ExperienceItem,
  SeasonalOffer,
  SEASONAL_OFFERS,
  REFERENCE_DESIGN_WEBP,
  BRAND_LOGO_PDF,
} from '../data/resortData';
import {
  validateStayDates,
  filterAvailableRooms,
  calculateStayQuote,
  formatINR,
  validateEmail,
  validateDiningReservation,
} from '../utils/bookingLogic';
import { BookingSearchState } from './HeroSection';
import { ResilientImage } from './EiraIllustrations';

export interface SubmittedInquiry {
  id: string;
  type: 'stay' | 'dining';
  summary: string;
  guestName: string;
  guestEmail: string;
}

interface AvailabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchState: BookingSearchState;
  onUpdateSearch: (partial: Partial<BookingSearchState>) => void;
  selectedOfferId: string | null;
  onSelectOfferId: (offerId: string | null) => void;
  onConfirmInquiry: (inquiry: SubmittedInquiry) => void;
}

export const AvailabilityModal: React.FC<AvailabilityModalProps> = ({
  isOpen,
  onClose,
  searchState,
  onUpdateSearch,
  selectedOfferId,
  onSelectOfferId,
  onConfirmInquiry,
}) => {
  const [chosenRoomId, setChosenRoomId] = useState<string>(
    searchState.roomId !== 'all' ? searchState.roomId : ROOMS_DATA[0].id
  );
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null);

  if (!isOpen) return null;

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

  const handleInquirySubmit = (e: React.FormEvent) => {
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
    const summary = `${activeRoom.name} · ${searchState.arrive} to ${searchState.depart} (${quote.nights} ${
      quote.nights === 1 ? 'night' : 'nights'
    }) · ${formatINR(quote.finalTotal)}`;

    onConfirmInquiry({
      id: `stay-${Date.now()}`,
      type: 'stay',
      summary,
      guestName: guestName.trim(),
      guestEmail: guestEmail.trim(),
    });

    setConfirmationMessage(
      `Your stay inquiry for ${activeRoom.name} (${searchState.arrive} – ${searchState.depart}) has been sent to our Karwar Cove reservations desk. We will reply to ${guestEmail.trim()} shortly.`
    );
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="availability-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#252B2D]/70 backdrop-blur-xs overflow-y-auto"
    >
      <div className="relative w-full max-w-3xl bg-[#F4F6F3] text-[#252B2D] rounded-[28px] border border-[#D7E4E1] p-6 sm:p-9 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-[#252B2D]/12">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#80B8B4] mb-1">
              EIRA Reservations · Karwar Cove
            </p>
            <h2
              id="availability-modal-title"
              className="font-serif-editorial text-3xl sm:text-4xl font-normal text-[#252B2D]"
            >
              Plan your <em className="italic text-[#80B8B4]">coastal stay</em>
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close availability modal"
            className="w-10 h-10 rounded-full border border-[#252B2D]/20 flex items-center justify-center text-[#252B2D] hover:bg-[#D7E4E1] transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-5 border-b border-[#252B2D]/12">
          <div>
            <label
              htmlFor="modal-arrive"
              className="block text-[10px] font-bold uppercase tracking-[0.16em] text-[#252B2D]/70 mb-1"
            >
              Arrive
            </label>
            <input
              id="modal-arrive"
              type="date"
              value={searchState.arrive}
              onChange={(e) => {
                setConfirmationMessage(null);
                onUpdateSearch({ arrive: e.target.value });
              }}
              className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#D7E4E1] text-sm text-[#252B2D] tabular-nums"
            />
          </div>
          <div>
            <label
              htmlFor="modal-depart"
              className="block text-[10px] font-bold uppercase tracking-[0.16em] text-[#252B2D]/70 mb-1"
            >
              Depart
            </label>
            <input
              id="modal-depart"
              type="date"
              value={searchState.depart}
              min={searchState.arrive}
              onChange={(e) => {
                setConfirmationMessage(null);
                onUpdateSearch({ depart: e.target.value });
              }}
              className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#D7E4E1] text-sm text-[#252B2D] tabular-nums"
            />
          </div>
          <div>
            <label
              htmlFor="modal-offer"
              className="block text-[10px] font-bold uppercase tracking-[0.16em] text-[#252B2D]/70 mb-1"
            >
              Seasonal Offer
            </label>
            <select
              id="modal-offer"
              value={selectedOfferId || ''}
              onChange={(e) => {
                setConfirmationMessage(null);
                onSelectOfferId(e.target.value ? e.target.value : null);
              }}
              className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#D7E4E1] text-sm text-[#252B2D]"
            >
              <option value="">Standard House Rate</option>
              {SEASONAL_OFFERS.map((offer) => (
                <option key={offer.id} value={offer.id}>
                  {offer.title} ({offer.discountPercent}% privilege, {offer.minNights}+ nights)
                </option>
              ))}
            </select>
          </div>
        </div>

        {!dateValidation.valid ? (
          <div className="my-5 p-4 rounded-2xl bg-[#D7E4E1] text-[#252B2D] flex items-center gap-2.5 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{dateValidation.error}</span>
          </div>
        ) : (
          <div className="py-5 space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#252B2D]/70 mb-3">
                Select Room or Suite ({matchingRooms.length} suitable for{' '}
                {searchState.adults + searchState.children}{' '}
                {searchState.adults + searchState.children === 1 ? 'guest' : 'guests'})
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {matchingRooms.map((room) => {
                  const isSelected = room.id === activeRoom.id;
                  return (
                    <button
                      key={room.id}
                      type="button"
                      onClick={() => {
                        setChosenRoomId(room.id);
                        setConfirmationMessage(null);
                      }}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#252B2D] text-[#F4F6F3] border-[#252B2D]'
                          : 'bg-white text-[#252B2D] border-[#D7E4E1] hover:border-[#80B8B4]'
                      }`}
                    >
                      <div className="flex items-baseline justify-between gap-2 mb-1">
                        <span className="font-serif-editorial text-xl">{room.name}</span>
                        <span className="text-xs tabular-nums opacity-85">
                          {formatINR(room.nightlyRate)}/night
                        </span>
                      </div>
                      <p className="text-xs opacity-75">
                        {room.sizeSqm} m² · {room.view}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#D7E4E1]/50 border border-[#D7E4E1] space-y-2 text-sm">
              <div className="flex justify-between tabular-nums">
                <span>
                  {activeRoom.name} × {quote.nights}{' '}
                  {quote.nights === 1 ? 'night' : 'nights'}
                </span>
                <span>{formatINR(quote.subtotal)}</span>
              </div>
              {quote.discountAmount > 0 && (
                <div className="flex justify-between text-[#252B2D]/80 tabular-nums">
                  <span>Seasonal Privilege ({quote.appliedOfferTitle})</span>
                  <span>-{formatINR(quote.discountAmount)}</span>
                </div>
              )}
              <div className="pt-2 border-t border-[#252B2D]/12 flex justify-between items-baseline font-semibold">
                <span>Estimated Stay Total (INR)</span>
                <span className="font-serif-editorial text-2xl tabular-nums">
                  {formatINR(quote.finalTotal)}
                </span>
              </div>
            </div>

            {confirmationMessage ? (
              <div
                role="status"
                className="p-5 rounded-2xl bg-[#252B2D] text-[#F4F6F3] space-y-3"
              >
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Check className="w-4 h-4 text-[#80B8B4]" />
                  <span>Stay Inquiry Received</span>
                </div>
                <p className="text-sm text-[#D7E4E1] leading-relaxed">
                  {confirmationMessage}
                </p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} noValidate className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="stay-guest-name"
                      className="block text-xs font-semibold text-[#252B2D] mb-1"
                    >
                      Full Name
                    </label>
                    <input
                      id="stay-guest-name"
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="Meera Kapoor"
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#D7E4E1] text-sm text-[#252B2D]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="stay-guest-email"
                      className="block text-xs font-semibold text-[#252B2D] mb-1"
                    >
                      Email Address
                    </label>
                    <input
                      id="stay-guest-email"
                      type="email"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      placeholder="meera@example.in"
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#D7E4E1] text-sm text-[#252B2D]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="stay-notes"
                    className="block text-xs font-semibold text-[#252B2D] mb-1"
                  >
                    Arrival &amp; Dietary Notes (Optional)
                  </label>
                  <input
                    id="stay-notes"
                    type="text"
                    value={specialNotes}
                    onChange={(e) => setSpecialNotes(e.target.value)}
                    placeholder="Estimated arrival time, dawn swim interest, or dietary requests"
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#D7E4E1] text-sm text-[#252B2D]"
                  />
                </div>

                {formError && (
                  <p role="alert" className="text-xs text-red-800 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{formError}</span>
                  </p>
                )}

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-3 rounded-full border border-[#252B2D]/25 text-xs font-semibold uppercase tracking-[0.15em] text-[#252B2D] hover:bg-[#D7E4E1] cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="px-7 py-3 rounded-full bg-[#252B2D] text-[#F4F6F3] text-xs font-semibold uppercase tracking-[0.15em] hover:bg-[#80B8B4] hover:text-[#252B2D] transition-colors cursor-pointer"
                  >
                    Request reservation
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

interface RoomDetailModalProps {
  room: RoomItem | null;
  onClose: () => void;
  onBookThisRoom: (room: RoomItem) => void;
}

export const RoomDetailModal: React.FC<RoomDetailModalProps> = ({
  room,
  onClose,
  onBookThisRoom,
}) => {
  if (!room) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="room-detail-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#252B2D]/70 backdrop-blur-xs overflow-y-auto"
    >
      <div className="relative w-full max-w-3xl bg-[#F4F6F3] text-[#252B2D] rounded-[28px] border border-[#D7E4E1] overflow-hidden shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
        <div className="relative h-64 sm:h-80 w-full">
          <ResilientImage
            src={room.image}
            alt={room.name}
            className="w-full h-full"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close room details"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#F4F6F3]/90 text-[#252B2D] flex items-center justify-center hover:bg-[#80B8B4] transition-colors cursor-pointer shadow-md"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 sm:p-9 space-y-6">
          <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-[#252B2D]/12 pb-5">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#80B8B4] mb-1">
                {room.category} · {room.view}
              </p>
              <h2
                id="room-detail-title"
                className="font-serif-editorial text-3xl sm:text-4xl font-normal text-[#252B2D]"
              >
                {room.name}
              </h2>
            </div>
            <div className="text-right">
              <p className="font-serif-editorial text-2xl sm:text-3xl text-[#252B2D] tabular-nums">
                {formatINR(room.nightlyRate)}{' '}
                <span className="text-sm font-sans text-[#252B2D]/70">/ night</span>
              </p>
              <p className="text-xs text-[#252B2D]/65 tabular-nums">
                {room.sizeSqm} m² · {room.bedType} · Up to {room.maxGuests} guests
              </p>
            </div>
          </div>

          <p className="text-sm sm:text-base text-[#252B2D]/85 leading-relaxed">
            {room.fullDescription}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-[#252B2D]/70 mb-3">
                Architectural Highlights
              </h3>
              <ul className="space-y-2 text-sm text-[#252B2D]/85">
                {room.highlights.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span aria-hidden="true" className="text-[#80B8B4]">
                      —
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-[#252B2D]/70 mb-3">
                In-Room Amenities
              </h3>
              <ul className="space-y-2 text-sm text-[#252B2D]/85">
                {room.amenities.map((amenity) => (
                  <li key={amenity} className="flex items-center gap-2">
                    <span aria-hidden="true" className="text-[#80B8B4]">
                      —
                    </span>
                    <span>{amenity}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-5 border-t border-[#252B2D]/12 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-full border border-[#252B2D]/25 text-xs font-semibold uppercase tracking-[0.15em] text-[#252B2D] hover:bg-[#D7E4E1] cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => onBookThisRoom(room)}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#252B2D] text-[#F4F6F3] text-xs font-semibold uppercase tracking-[0.15em] hover:bg-[#80B8B4] hover:text-[#252B2D] transition-colors cursor-pointer"
            >
              <span>Check availability for {room.name}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface DiningModalProps {
  mode: 'reserve' | 'menu' | null;
  onClose: () => void;
  onSwitchMode: (mode: 'reserve' | 'menu') => void;
  onConfirmInquiry: (inquiry: SubmittedInquiry) => void;
}

export const DiningModal: React.FC<DiningModalProps> = ({
  mode,
  onClose,
  onSwitchMode,
  onConfirmInquiry,
}) => {
  const [serviceId, setServiceId] = useState(DINING_SCHEDULE[2].id);
  const [timeSlot, setTimeSlot] = useState(DINING_SCHEDULE[2].timeSlots[1]);
  const [date, setDate] = useState('2026-11-21');
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [confirmedNote, setConfirmedNote] = useState<string | null>(null);

  if (!mode) return null;

  const currentService =
    DINING_SCHEDULE.find((s) => s.id === serviceId) || DINING_SCHEDULE[0];

  const handleDiningSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const check = validateDiningReservation({
      name,
      email,
      date,
      serviceId,
      timeSlot,
      guests,
    });
    if (!check.valid) {
      setError(check.error || 'Please complete all reservation fields.');
      return;
    }
    setError(null);
    onConfirmInquiry({
      id: `dine-${Date.now()}`,
      type: 'dining',
      summary: `${currentService.service} (${timeSlot}) on ${date} for ${guests}`,
      guestName: name.trim(),
      guestEmail: email.trim(),
    });
    setConfirmedNote(
      `Your table request for ${guests} ${guests === 1 ? 'guest' : 'guests'} at ${timeSlot} (${
        currentService.service
      }) on ${date} has been registered with the kitchen.`
    );
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dining-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#252B2D]/70 backdrop-blur-xs overflow-y-auto"
    >
      <div className="relative w-full max-w-2xl bg-[#F4F6F3] text-[#252B2D] rounded-[28px] border border-[#D7E4E1] p-6 sm:p-9 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-[#252B2D]/12">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#80B8B4] mb-1">
              The Spice Verandah at EIRA · 36 Covers
            </p>
            <h2
              id="dining-modal-title"
              className="font-serif-editorial text-3xl sm:text-4xl font-normal text-[#252B2D]"
            >
              {mode === 'menu' ? (
                <>
                  Konkan &amp; Malabar <em className="italic text-[#80B8B4]">tasting menu</em>
                </>
              ) : (
                <>
                  Reserve a <em className="italic text-[#80B8B4]">table</em>
                </>
              )}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dining modal"
            className="w-10 h-10 rounded-full border border-[#252B2D]/20 flex items-center justify-center text-[#252B2D] hover:bg-[#D7E4E1] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2 my-5 p-1 bg-[#D7E4E1] rounded-full w-fit">
          <button
            type="button"
            onClick={() => onSwitchMode('reserve')}
            className={`px-5 py-2 rounded-full text-xs uppercase tracking-[0.14em] font-semibold transition-colors cursor-pointer ${
              mode === 'reserve'
                ? 'bg-[#252B2D] text-[#F4F6F3]'
                : 'text-[#252B2D] hover:bg-[#F4F6F3]/60'
            }`}
          >
            Reserve a table
          </button>
          <button
            type="button"
            onClick={() => onSwitchMode('menu')}
            className={`px-5 py-2 rounded-full text-xs uppercase tracking-[0.14em] font-semibold transition-colors cursor-pointer ${
              mode === 'menu'
                ? 'bg-[#252B2D] text-[#F4F6F3]'
                : 'text-[#252B2D] hover:bg-[#F4F6F3]/60'
            }`}
          >
            Sample menu
          </button>
        </div>

        {mode === 'menu' ? (
          <div className="space-y-7 pt-2">
            {SAMPLE_MENU_SECTIONS.map((sec) => (
              <div key={sec.course} className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-[#80B8B4] border-b border-[#252B2D]/12 pb-2">
                  {sec.course}
                </h3>
                <div className="space-y-3">
                  {sec.items.map((item) => (
                    <div key={item.title}>
                      <p className="font-serif-editorial text-xl text-[#252B2D]">
                        {item.title}
                      </p>
                      <p className="text-xs text-[#252B2D]/70">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="pt-4 border-t border-[#252B2D]/12 flex justify-between items-center">
              <span className="text-xs text-[#252B2D]/65">
                Menus change daily with the morning catch.
              </span>
              <button
                type="button"
                onClick={() => onSwitchMode('reserve')}
                className="px-6 py-2.5 rounded-full bg-[#252B2D] text-[#F4F6F3] text-xs font-semibold uppercase tracking-[0.15em] hover:bg-[#80B8B4] hover:text-[#252B2D] cursor-pointer"
              >
                Book a table
              </button>
            </div>
          </div>
        ) : confirmedNote ? (
          <div role="status" className="p-6 rounded-2xl bg-[#252B2D] text-[#F4F6F3] space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Check className="w-4 h-4 text-[#80B8B4]" />
              <span>Table Request Registered</span>
            </div>
            <p className="text-sm text-[#D7E4E1] leading-relaxed">{confirmedNote}</p>
          </div>
        ) : (
          <form onSubmit={handleDiningSubmit} noValidate className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="dine-service"
                  className="block text-xs font-semibold text-[#252B2D] mb-1"
                >
                  Service
                </label>
                <select
                  id="dine-service"
                  value={serviceId}
                  onChange={(e) => {
                    const next =
                      DINING_SCHEDULE.find((s) => s.id === e.target.value) ||
                      DINING_SCHEDULE[0];
                    setServiceId(next.id);
                    setTimeSlot(next.timeSlots[0]);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D7E4E1] text-sm text-[#252B2D]"
                >
                  {DINING_SCHEDULE.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.service} ({s.hours})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="dine-time"
                  className="block text-xs font-semibold text-[#252B2D] mb-1"
                >
                  Seating Time
                </label>
                <select
                  id="dine-time"
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D7E4E1] text-sm text-[#252B2D] tabular-nums"
                >
                  {currentService.timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="dine-date"
                  className="block text-xs font-semibold text-[#252B2D] mb-1"
                >
                  Date
                </label>
                <input
                  id="dine-date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D7E4E1] text-sm text-[#252B2D] tabular-nums"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="dine-guests"
                  className="block text-xs font-semibold text-[#252B2D] mb-1"
                >
                  Guests
                </label>
                <select
                  id="dine-guests"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D7E4E1] text-sm text-[#252B2D] tabular-nums"
                >
                  {[1, 2, 3, 4, 5, 6, 8].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="dine-name"
                  className="block text-xs font-semibold text-[#252B2D] mb-1"
                >
                  Full Name
                </label>
                <input
                  id="dine-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Clara Vance"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D7E4E1] text-sm text-[#252B2D]"
                />
              </div>
              <div>
                <label
                  htmlFor="dine-email"
                  className="block text-xs font-semibold text-[#252B2D] mb-1"
                >
                  Email Address
                </label>
                <input
                  id="dine-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="clara@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D7E4E1] text-sm text-[#252B2D]"
                />
              </div>
            </div>

            {error && (
              <p role="alert" className="text-xs text-red-800 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{error}</span>
              </p>
            )}

            <div className="pt-3 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 rounded-full border border-[#252B2D]/25 text-xs font-semibold uppercase tracking-[0.15em] text-[#252B2D] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-7 py-3 rounded-full bg-[#252B2D] text-[#F4F6F3] text-xs font-semibold uppercase tracking-[0.15em] hover:bg-[#80B8B4] hover:text-[#252B2D] transition-colors cursor-pointer"
              >
                Confirm table request
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

interface OfferDetailModalProps {
  offer: SeasonalOffer | null;
  onClose: () => void;
  onApplyOfferToStay: (offer: SeasonalOffer) => void;
}

export const OfferDetailModal: React.FC<OfferDetailModalProps> = ({
  offer,
  onClose,
  onApplyOfferToStay,
}) => {
  if (!offer) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="offer-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#252B2D]/70 backdrop-blur-xs overflow-y-auto"
    >
      <div className="relative w-full max-w-xl bg-[#F4F6F3] text-[#252B2D] rounded-[28px] border border-[#D7E4E1] p-6 sm:p-9 shadow-2xl my-8">
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-[#252B2D]/12">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#80B8B4] mb-1">
              Seasonal Offer · {offer.category}
            </p>
            <h2
              id="offer-modal-title"
              className="font-serif-editorial text-3xl sm:text-4xl font-normal text-[#252B2D]"
            >
              {offer.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close offer modal"
            className="w-10 h-10 rounded-full border border-[#252B2D]/20 flex items-center justify-center text-[#252B2D] hover:bg-[#D7E4E1] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="py-6 space-y-5">
          <p className="text-sm sm:text-base text-[#252B2D]/85 leading-relaxed">
            {offer.extendedDetails}
          </p>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-[#252B2D]/70 mb-3">
              Included in Your Stay
            </h3>
            <ul className="space-y-2 text-sm text-[#252B2D]/85">
              {offer.inclusions.map((inc) => (
                <li key={inc} className="flex items-center gap-2">
                  <span aria-hidden="true" className="text-[#80B8B4]">
                    —
                  </span>
                  <span>{inc}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-xs text-[#252B2D]/65 pt-2">{offer.validityNote}</p>
        </div>

        <div className="pt-5 border-t border-[#252B2D]/12 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 rounded-full border border-[#252B2D]/25 text-xs font-semibold uppercase tracking-[0.15em] text-[#252B2D] cursor-pointer"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => onApplyOfferToStay(offer)}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#252B2D] text-[#F4F6F3] text-xs font-semibold uppercase tracking-[0.15em] hover:bg-[#80B8B4] hover:text-[#252B2D] transition-colors cursor-pointer"
          >
            <span>Book with this offer</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

interface ExperienceOrInfoModalProps {
  experience: ExperienceItem | null;
  infoTopic: string | null;
  onClose: () => void;
  onBookStay: () => void;
}

export const ExperienceOrInfoModal: React.FC<ExperienceOrInfoModalProps> = ({
  experience,
  infoTopic,
  onClose,
  onBookStay,
}) => {
  if (!experience && !infoTopic) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="info-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#252B2D]/70 backdrop-blur-xs overflow-y-auto"
    >
      <div className="relative w-full max-w-2xl bg-[#F4F6F3] text-[#252B2D] rounded-[28px] border border-[#D7E4E1] overflow-hidden shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
        {experience ? (
          <>
            <div className="relative h-60 sm:h-72 w-full">
              <ResilientImage
                src={experience.image}
                alt={experience.title}
                className="w-full h-full"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close experience modal"
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#F4F6F3]/90 text-[#252B2D] flex items-center justify-center hover:bg-[#80B8B4] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 sm:p-9 space-y-5">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#80B8B4] mb-1">
                  {experience.schedule} · {experience.duration}
                </p>
                <h2
                  id="info-modal-title"
                  className="font-serif-editorial text-3xl sm:text-4xl font-normal text-[#252B2D]"
                >
                  {experience.title}
                </h2>
              </div>
              <p className="text-sm sm:text-base text-[#252B2D]/85 leading-relaxed">
                {experience.description}
              </p>
              <ul className="space-y-2 text-sm text-[#252B2D]/85 pt-2">
                {experience.details.map((d) => (
                  <li key={d} className="flex items-center gap-2">
                    <span aria-hidden="true" className="text-[#80B8B4]">
                      —
                    </span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-5 border-t border-[#252B2D]/12 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 rounded-full border border-[#252B2D]/25 text-xs font-semibold uppercase tracking-[0.15em] text-[#252B2D] cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onBookStay();
                  }}
                  className="px-7 py-3 rounded-full bg-[#252B2D] text-[#F4F6F3] text-xs font-semibold uppercase tracking-[0.15em] hover:bg-[#80B8B4] hover:text-[#252B2D] transition-colors cursor-pointer"
                >
                  Include in your stay
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="p-6 sm:p-9 space-y-5">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#252B2D]/12">
              <h2
                id="info-modal-title"
                className="font-serif-editorial text-3xl font-normal text-[#252B2D] capitalize"
              >
                {infoTopic?.replace('-', ' ')}
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close information modal"
                className="w-10 h-10 rounded-full border border-[#252B2D]/20 flex items-center justify-center text-[#252B2D] hover:bg-[#D7E4E1] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {infoTopic === 'brand-kit' ? (
              <div className="space-y-4 text-sm text-[#252B2D]/85">
                <p>
                  Explore EIRA&apos;s coastal architectural inspiration, official brand monograph, and the <strong>Lora + Proxima Nova</strong> typography specification.
                </p>
                <div className="rounded-2xl overflow-hidden border border-[#D7E4E1]">
                  <img
                    src="./assets/aistudio/4aaf2c0ea5f8f86038b6f67182f3f07d_9514f484.jpg"
                    alt="Lora and Proxima Nova typography pairing specimen"
                    referrerPolicy="no-referrer"
                    className="w-full h-auto"
                  />
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={BRAND_LOGO_PDF}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 rounded-full bg-[#252B2D] text-[#F4F6F3] text-xs font-semibold uppercase tracking-[0.14em]"
                  >
                    Download Official EIRA Logo Monograph (PDF)
                  </a>
                </div>
                <div className="rounded-2xl overflow-hidden border border-[#D7E4E1] max-h-72 overflow-y-auto">
                  <img
                    src={REFERENCE_DESIGN_WEBP}
                    alt="EIRA hospitality editorial design sheet"
                    referrerPolicy="no-referrer"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            ) : infoTopic === 'getting-here' ? (
              <div className="space-y-3 text-sm text-[#252B2D]/85 leading-relaxed">
                <p>
                  <strong>By Air:</strong> 90 minutes south of Goa Dabolim International Airport (GOI) along the scenic NH66 Konkan coastal highway. Private house SUV transfers (₹6,500 each way) can be arranged upon booking.
                </p>
                <p>
                  <strong>By Rail &amp; Road:</strong> 20 minutes from Karwar Konkan Railway Station. Complimentary EV charging bays and shaded valet parking are available for all resident guests.
                </p>
              </div>
            ) : infoTopic === 'gift-vouchers' ? (
              <div className="space-y-3 text-sm text-[#252B2D]/85 leading-relaxed">
                <p>
                  Printed on handmade Sanganer cotton paper and sealed in brass-embossed envelopes, EIRA gift vouchers (from ₹25,000) may be redeemed toward coastal stays, tasting dinners at The Verandah, or Ayurvedic sea-spa rituals.
                </p>
                <p>
                  Contact our reservations desk at <strong>namaste@eira-sanctuary.in</strong> to arrange bespoke courier dispatch across India.
                </p>
              </div>
            ) : (
              <p className="text-sm text-[#252B2D]/85 leading-relaxed">
                EIRA Stays is committed to unhurried Indian coastal hospitality, ecological stewardship along the Karwar &amp; Konkan shoreline, and full WCAG AA digital and physical accessibility across our property. For inquiries, write to namaste@eira-sanctuary.in.
              </p>
            )}

            <div className="pt-4 border-t border-[#252B2D]/12 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-[#252B2D] text-[#F4F6F3] text-xs font-semibold uppercase tracking-[0.15em] cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
