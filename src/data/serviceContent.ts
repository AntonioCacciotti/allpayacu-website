// Content shared across every package within a ServiceGroup, so a new package
// (another duration, another lineage) doesn't require hand-writing its own
// safety/integration/FAQ copy. Day-by-day flow still varies per package via
// buildFlow(), since duration and category both change it.
import type { Package, ServiceGroup } from './packages';

export interface FlowPhase {
  day: string;
  title: string;
  description: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export const SERVICE_ICON: Record<ServiceGroup, string> = {
  'jungle-adventure': '🛶',
  'ayahuasca-ceremony': '🌙',
};

export const SERVICE_TAGLINE: Record<ServiceGroup, string> = {
  'jungle-adventure':
    'River navigation, wildlife and remote-community immersion, guided by twenty years on this stretch of the Amazon.',
  'ayahuasca-ceremony':
    'Held within living indigenous lineage, with full-time safety and integration support.',
};

export function buildFlow(pkg: Package): FlowPhase[] {
  const n = pkg.days;
  const midRange = (startDay: number) => (n > startDay + 1 ? `Days ${startDay}–${n - 1}` : `Day ${startDay}`);

  if (pkg.category === 'ayahuasca-bora' || pkg.category === 'ayahuasca-yagua') {
    return [
      { day: 'Day 1', title: 'Arrival & Orientation', description: 'River transfer from Iquitos, welcome, dietary briefing begins.' },
      { day: 'Day 2', title: 'Settling In', description: 'Jungle walk, plant-medicine introduction, final health check before the first ceremony.' },
      { day: midRange(3), title: 'Ceremony & Integration Cycle', description: 'Ceremonies with the shaman, spaced for rest, each followed by an integration circle.' },
      { day: `Day ${n}`, title: 'Closing & Departure', description: 'Closing blessing, breakfast, river transfer back to Iquitos.' },
    ];
  }

  if (pkg.category === 'jungle-survival') {
    return [
      { day: 'Day 1', title: 'Arrival & Camp Setup', description: 'River transfer, base-camp orientation, tools and safety briefing.' },
      { day: 'Day 2', title: 'Fire & Shelter', description: 'Building shelter and fire from forest materials with the guide team.' },
      { day: midRange(3), title: 'Water, Foraging & Bush-craft', description: 'Sourcing and purifying water, edible and medicinal plant identification, hunting and trapping basics.' },
      { day: `Day ${n}`, title: 'Departure', description: 'Break camp, river transfer back to Iquitos.' },
    ];
  }

  // tours
  return [
    { day: 'Day 1', title: 'Arrival & River Orientation', description: 'River transfer from Iquitos, welcome, first canoe navigation.' },
    { day: midRange(2), title: 'River Navigation & Wildlife', description: 'Wildlife spotting, fishing, and visits to local Amazonian communities.' },
    { day: `Day ${n}`, title: 'Departure', description: 'Final morning activity, breakfast, river transfer back to Iquitos.' },
  ];
}

export const SERVICE_SAFETY: Record<ServiceGroup, string[]> = {
  'ayahuasca-ceremony': [
    'Pre-arrival health questionnaire reviewed before your booking is confirmed.',
    'On-site care led by Ebiula Acubino, a trained nurse, with an emergency medical kit and blood pressure monitor at the lodge.',
    'Every ceremony held with a facilitator, a yoga & meditation guide, and the shaman — a psychotherapist is available on the team for guests who want that layer too.',
    'Guests arrange their own travel insurance before arrival, as with any remote retreat.',
  ],
  'jungle-adventure': [
    'Guide-to-guest ratio kept low; expert guides carry a full first-aid kit and satellite communication.',
    'Technical gear (hammocks, machetes, water filters) is provided — you bring clothing and personal items.',
    'No health screening required beyond general fitness for multi-day trekking.',
    'Guests arrange their own travel insurance before arrival, as with any remote retreat.',
  ],
};

export const SERVICE_INTEGRATION: Record<ServiceGroup, string> = {
  'ayahuasca-ceremony':
    "Integration circles run after every ceremony, not just at the end. Once you're home, a WhatsApp check-in stays open for the weeks that follow — 21-day guests get 30 days of structured post-retreat support.",
  'jungle-adventure':
    "Your guide debriefs the day's skills and wildlife sightings each evening around the fire. After you leave, the team stays reachable on WhatsApp if questions about the trip come up.",
};

export const SERVICE_GALLERY: Record<ServiceGroup, string[]> = {
  'ayahuasca-ceremony': ['Ceremonial maloca', 'Eco-lodge room', 'Integration circle', 'Forest trail'],
  'jungle-adventure': ['River canoe', 'Wildlife spotting', 'Jungle camp', 'Village visit'],
};

export const SERVICE_WHO_FOR: Record<ServiceGroup, string> = {
  'ayahuasca-ceremony':
    'For people who want the ceremony held inside a living indigenous lineage rather than a retreat brand built around one — first-timers and experienced journeyers both, provided you complete the pre-arrival health screening.',
  'jungle-adventure':
    'For travellers who want real jungle time over a resort experience — no prior expedition or survival experience required, just a reasonable level of fitness.',
};

export function buildFacts(pkg: Package): { k: string; v: string }[] {
  if (pkg.category === 'ayahuasca-bora' || pkg.category === 'ayahuasca-yagua') {
    return [
      { k: 'Ceremonies', v: 'Multiple, spaced for rest' },
      { k: 'Lineage', v: pkg.category === 'ayahuasca-bora' ? 'Bora tradition' : 'Yagua tradition' },
      { k: 'Stay', v: 'Eco-lodge, primary forest' },
      { k: 'Access', v: 'By river from Iquitos' },
      { k: 'Group', v: 'Small — ask exact size' },
      { k: 'Diet', v: 'Traditional, provided' },
    ];
  }
  return [
    { k: 'Terrain', v: pkg.category === 'jungle-survival' ? 'Remote jungle & camps' : 'River & primary forest' },
    { k: 'Stay', v: pkg.category === 'jungle-survival' ? 'Jungle camp accommodation' : 'Eco-lodge accommodation' },
    { k: 'Access', v: 'By river from Iquitos' },
    { k: 'Group', v: 'Small — ask exact size' },
    { k: 'Guides', v: 'Expert local guides' },
    { k: 'Fitness', v: 'Moderate — multi-hour trekking' },
  ];
}

export const SERVICE_FAQ: Record<ServiceGroup, FaqItem[]> = {
  'ayahuasca-ceremony': [
    { q: 'Do I need previous ceremony experience?', a: 'No — screening looks at health and preparation, not experience level. First-timers and returning journeyers sit in the same ceremonies.' },
    { q: 'What does the pre-ceremony diet involve?', a: 'Simple traditional diet guidance is sent after booking and followed on-site by the kitchen team — no separate shopping or prep needed on your end.' },
    { q: 'Is this safe for me?', a: 'The screening call checks for conditions and medications (certain antidepressants included) that need to be disclosed before booking is confirmed.' },
    { q: 'How do I book and pay?', a: 'A 30% deposit over WhatsApp or Telegram secures your dates; the balance is settled on arrival. No online payment.' },
  ],
  'jungle-adventure': [
    { q: 'What fitness level do I need?', a: 'Enough to walk multi-hour jungle trails and get in and out of a canoe. Guides adjust pace to the group.' },
    { q: 'What should I pack?', a: 'Lightweight quick-dry clothing, closed shoes, insect protection and a dry bag — a full packing list is sent after booking.' },
    { q: 'Is this suitable for beginners?', a: 'Yes — no prior jungle or survival experience is required for any of these packages.' },
    { q: 'How do I book and pay?', a: 'A 30% deposit over WhatsApp or Telegram secures your dates; the balance is settled on arrival. No online payment.' },
  ],
};
