// Content for the standalone /venue-rental page — inquiry-only, no pricing
// calculator, since rate depends on group size, season and length of stay.
import type { FaqItem } from './serviceContent';

export const venueRental = {
  icon: '🏡',
  bedsToday: 14,
  bedsExpanded: 28,
  minStay: '1 week',
  bookingUnit: 'Full-lodge, per week',
  included: [
    'Full lodge — private bungalows, shared rooms, chill-out hammock areas',
    'Kitchen and cooking staff for your group',
    'Ceremonial maloca, if your program needs one',
    'River transport and lodge access',
  ],
  whoFor: [
    'Yoga teachers running their own retreat week',
    'Coaches and wellness facilitators',
    'Groups who bring their own guests and program',
    'Anyone wanting Amazon infrastructure without owning it',
  ],
  gallery: ['Bungalow interior', 'Chill-out hammock area', 'Dining space', 'Lodge from the river'],
  faq: [
    { q: 'Can we bring our own facilitators and program?', a: 'Yes — you run the retreat, we run the lodge. Bring your own teachers, schedule and guests.' },
    { q: 'Is catering included?', a: 'Yes, a cooking team is included in every full-lodge booking; dietary needs can be arranged in advance.' },
    { q: 'What is the minimum booking length?', a: 'Most bookings run a full week, though shorter stays can be discussed depending on the season.' },
    { q: 'How is pricing worked out?', a: 'Rate depends on group size, season and length of stay — send your dates on WhatsApp or Telegram and we quote directly.' },
  ] satisfies FaqItem[],
};
