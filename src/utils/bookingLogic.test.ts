import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateNights,
  validateStayDates,
  filterAvailableRooms,
  calculateStayQuote,
  formatINR,
  validateEmail,
  validateDiningReservation,
} from './bookingLogic';
import { ROOMS_DATA } from '../data/resortData';

test('calculateNights computes exact night count for valid date ranges', () => {
  assert.equal(calculateNights('2026-11-20', '2026-11-23'), 3);
  assert.equal(calculateNights('2026-11-20', '2026-11-20'), 0);
  assert.equal(calculateNights('2026-11-25', '2026-11-20'), 0);
});

test('validateStayDates enforces arrival before departure and max stay limits', () => {
  const validResult = validateStayDates('2026-12-01', '2026-12-05');
  assert.equal(validResult.valid, true);
  assert.equal(validResult.nights, 4);

  const reversedResult = validateStayDates('2026-12-05', '2026-12-01');
  assert.equal(reversedResult.valid, false);
  assert.ok(reversedResult.error?.includes('at least one night after arrival'));

  const emptyResult = validateStayDates('', '2026-12-05');
  assert.equal(emptyResult.valid, false);
});

test('filterAvailableRooms matches guest capacity and specific room selection', () => {
  const allForTwo = filterAvailableRooms(ROOMS_DATA, 'all', 2, 0);
  assert.equal(allForTwo.length, 4);

  const familyOfFour = filterAvailableRooms(ROOMS_DATA, 'all', 2, 2);
  assert.equal(familyOfFour.length, 2);
  assert.deepEqual(
    familyOfFour.map((r) => r.id),
    ['dune-suite', 'the-lookout']
  );

  const specificLagoon = filterAvailableRooms(ROOMS_DATA, 'harbour-room', 2, 0);
  assert.equal(specificLagoon.length, 1);
  assert.equal(specificLagoon[0].name, 'Lagoon Verandah Room');
});

test('calculateStayQuote computes base subtotal in INR and applies eligible seasonal offer discounts', () => {
  const lagoonRoom = ROOMS_DATA[0]; // ₹38,000/night
  const quoteWithoutOffer = calculateStayQuote(lagoonRoom, 3, 2, 0, null);
  assert.equal(quoteWithoutOffer.subtotal, 114000);
  assert.equal(quoteWithoutOffer.discountAmount, 0);
  assert.equal(quoteWithoutOffer.finalTotal, 114000);
  assert.equal(formatINR(quoteWithoutOffer.finalTotal), '₹1,14,000');

  // Apply 'the-slow-week' (15% off for 3+ nights)
  const quoteWithOffer = calculateStayQuote(lagoonRoom, 3, 2, 0, 'the-slow-week');
  assert.equal(quoteWithOffer.subtotal, 114000);
  assert.equal(quoteWithOffer.discountAmount, 17100);
  assert.equal(quoteWithOffer.finalTotal, 96900);
  assert.equal(quoteWithOffer.appliedOfferTitle, 'The Unhurried Konkan Week');
});

test('validateEmail rejects empty or malformed addresses and accepts valid emails', () => {
  assert.equal(validateEmail('').valid, false);
  assert.equal(validateEmail('not-an-email').valid, false);
  assert.equal(validateEmail('guest@eira-stays.com').valid, true);
});

test('validateDiningReservation verifies all required fields', () => {
  const validRes = validateDiningReservation({
    name: 'Clara Vance',
    email: 'clara@example.com',
    date: '2026-11-24',
    serviceId: 'dinner',
    timeSlot: '19:15',
    guests: 2,
  });
  assert.equal(validRes.valid, true);

  const invalidRes = validateDiningReservation({
    name: '',
    email: 'clara@example.com',
    date: '2026-11-24',
    serviceId: 'dinner',
    timeSlot: '19:15',
    guests: 2,
  });
  assert.equal(invalidRes.valid, false);
});
