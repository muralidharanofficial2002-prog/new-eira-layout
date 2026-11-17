import { RoomItem, SEASONAL_OFFERS } from '../data/resortData';

export interface DateValidationResult {
  valid: boolean;
  error?: string;
  nights: number;
}

export interface StayQuoteResult {
  nights: number;
  baseNightlyRate: number;
  extraGuestFeePerNight: number;
  subtotal: number;
  discountAmount: number;
  finalTotal: number;
  appliedOfferTitle?: string;
}

/**
 * Calculates the number of nights between two YYYY-MM-DD date strings.
 */
export function calculateNights(arriveDate: string, departDate: string): number {
  if (!arriveDate || !departDate) return 0;
  const start = new Date(`${arriveDate}T00:00:00Z`);
  const end = new Date(`${departDate}T00:00:00Z`);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return 0;
  const diffMs = end.getTime() - start.getTime();
  const nights = Math.round(diffMs / (1000 * 60 * 60 * 24));
  return nights > 0 ? nights : 0;
}

/**
 * Validates arrival and departure dates.
 */
export function validateStayDates(arriveDate: string, departDate: string): DateValidationResult {
  if (!arriveDate || !departDate) {
    return {
      valid: false,
      error: 'Please select both an arrival and departure date.',
      nights: 0,
    };
  }

  const start = new Date(`${arriveDate}T00:00:00Z`);
  const end = new Date(`${departDate}T00:00:00Z`);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return {
      valid: false,
      error: 'Please enter valid calendar dates.',
      nights: 0,
    };
  }

  if (end.getTime() <= start.getTime()) {
    return {
      valid: false,
      error: 'Departure date must be at least one night after arrival.',
      nights: 0,
    };
  }

  const nights = calculateNights(arriveDate, departDate);
  if (nights > 30) {
    return {
      valid: false,
      error: 'For stays longer than 30 nights, please contact our house team directly.',
      nights,
    };
  }

  return {
    valid: true,
    nights,
  };
}

/**
 * Filters rooms that can accommodate the requested guest count and optional room preference.
 */
export function filterAvailableRooms(
  rooms: RoomItem[],
  selectedRoomId: string,
  adults: number,
  children: number
): RoomItem[] {
  const totalGuests = Math.max(1, adults + children);
  return rooms.filter((room) => {
    const fitsGuests = room.maxGuests >= totalGuests;
    const matchesRoom =
      !selectedRoomId || selectedRoomId === 'all' || room.id === selectedRoomId;
    return fitsGuests && matchesRoom;
  });
}

/**
 * Formats a numeric amount in Indian Rupees (INR) using the Indian numbering system (e.g., ₹38,000).
 */
export function formatINR(amount: number): string {
  return `₹${Math.round(amount).toLocaleString('en-IN')}`;
}

/**
 * Calculates the stay quote for a given room, night count, guest count, and optional offer.
 */
export function calculateStayQuote(
  room: RoomItem,
  nights: number,
  adults: number,
  children: number,
  offerId?: string | null
): StayQuoteResult {
  const validNights = Math.max(1, nights);
  const totalGuests = Math.max(1, adults + children);
  const extraGuests = Math.max(0, totalGuests - 2);
  const extraGuestFeePerNight = extraGuests * 6500;

  const subtotal = (room.nightlyRate + extraGuestFeePerNight) * validNights;

  let discountAmount = 0;
  let appliedOfferTitle: string | undefined;

  if (offerId) {
    const offer = SEASONAL_OFFERS.find((o) => o.id === offerId);
    if (offer && validNights >= offer.minNights) {
      discountAmount = Math.round((subtotal * offer.discountPercent) / 100);
      appliedOfferTitle = offer.title;
    }
  }

  return {
    nights: validNights,
    baseNightlyRate: room.nightlyRate,
    extraGuestFeePerNight,
    subtotal,
    discountAmount,
    finalTotal: Math.max(0, subtotal - discountAmount),
    appliedOfferTitle,
  };
}

/**
 * Validates an email address for newsletter and reservation forms.
 */
export function validateEmail(email: string): { valid: boolean; error?: string } {
  const trimmed = (email || '').trim();
  if (!trimmed) {
    return { valid: false, error: 'Please enter your email address.' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(trimmed)) {
    return { valid: false, error: 'Please enter a valid email address (e.g. name@domain.com).' };
  }
  return { valid: true };
}

/**
 * Validates a dining reservation submission.
 */
export function validateDiningReservation(input: {
  name: string;
  email: string;
  date: string;
  serviceId: string;
  timeSlot: string;
  guests: number;
}): { valid: boolean; error?: string } {
  if (!input.name || input.name.trim().length < 2) {
    return { valid: false, error: 'Please provide your full name for the table reservation.' };
  }
  const emailCheck = validateEmail(input.email);
  if (!emailCheck.valid) {
    return emailCheck;
  }
  if (!input.date) {
    return { valid: false, error: 'Please choose a dining date.' };
  }
  if (!input.serviceId || !input.timeSlot) {
    return { valid: false, error: 'Please select a dining service and seating time.' };
  }
  if (input.guests < 1 || input.guests > 12) {
    return { valid: false, error: 'Online table reservations are available for 1 to 12 guests.' };
  }
  return { valid: true };
}
