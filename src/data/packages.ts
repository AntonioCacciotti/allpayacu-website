export type Category = 'tours' | 'jungle-survival' | 'ayahuasca-bora' | 'ayahuasca-yagua' | 'addons';
export type PricingType = 'per-person' | 'per-session' | 'per-activity';

export interface Package {
  id: string;
  slug: string;
  name: string;
  category: Category;
  categoryLabel: string;
  duration: string;
  days: number;
  nights: number;
  price: number;
  pricingType: PricingType;
  shortDescription: string;
  description: string;
  highlights: string[];
  included: string[];
  featured: boolean;
}

export interface AddOn {
  id: string;
  slug: string;
  name: string;
  category: 'addons';
  price: number;
  pricingType: 'per-session' | 'per-activity';
  description: string;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  tours: 'Amazon Tours',
  'jungle-survival': 'Jungle Survival',
  'ayahuasca-bora': 'Ayahuasca – Bora',
  'ayahuasca-yagua': 'Ayahuasca – Yagua',
  addons: 'Add-ons & Activities',
};

// The 3 revenue lines the business is organised around (see investor deck).
// Venue rental is not a `Package` — it has its own content in `venueRental.ts`.
export type ServiceGroup = 'jungle-adventure' | 'ayahuasca-ceremony';

export const CATEGORY_TO_GROUP: Record<Exclude<Category, 'addons'>, ServiceGroup> = {
  tours: 'jungle-adventure',
  'jungle-survival': 'jungle-adventure',
  'ayahuasca-bora': 'ayahuasca-ceremony',
  'ayahuasca-yagua': 'ayahuasca-ceremony',
};

export const GROUP_LABELS: Record<ServiceGroup, string> = {
  'jungle-adventure': 'Jungle Adventure',
  'ayahuasca-ceremony': 'Ayahuasca Ceremony',
};

export const GROUP_DISCOUNT_THRESHOLD = 5;
export const GROUP_DISCOUNT_NOTE =
  'Travelling with 5 or more people? Contact us for a customised group offer — we tailor programs and pricing for larger groups.';
export const CUSTOMIZE_NOTE =
  'All packages can be tailored to your needs — contact our team on WhatsApp or Telegram to customise your itinerary.';
export const WHATSAPP_NUMBER = '+51965893257';
export const TELEGRAM_USERNAME = 'allpayacu';

export const packages: Package[] = [
  // ── Amazon Tours ──────────────────────────────────────────────────────────
  {
    id: 'tour-3d',
    slug: 'amazon-tour-3d-2n',
    name: 'Amazon Explorer',
    category: 'tours',
    categoryLabel: 'Amazon Tours',
    duration: '3D/2N',
    days: 3,
    nights: 2,
    price: 200,
    pricingType: 'per-person',
    shortDescription: 'A first taste of the Amazon — river navigation, wildlife spotting, and authentic village life.',
    description:
      'Dive into the heart of the Peruvian Amazon on this 3-day immersive experience. Navigate the mighty river systems, spot exotic wildlife including monkeys and pink river dolphins, and connect with local Amazonian culture.',
    highlights: [
      'River navigation by motorised canoe',
      'Wildlife spotting — monkeys, birds, pink river dolphins',
      'Visit to a local Amazonian community',
      'Night walk in the jungle',
      'Traditional Amazonian meals included',
    ],
    included: ['Eco-lodge accommodation', 'All meals', 'Expert guides', 'River transport', 'Entry fees'],
    featured: true,
  },
  {
    id: 'tour-4d',
    slug: 'amazon-tour-4d-3n',
    name: 'Amazon Immersion',
    category: 'tours',
    categoryLabel: 'Amazon Tours',
    duration: '4D/3N',
    days: 4,
    nights: 3,
    price: 400,
    pricingType: 'per-person',
    shortDescription: 'Deeper into the jungle — fishing, medicinal plants, and more time with local communities.',
    description:
      'Go deeper into the Amazon with an extended journey that adds fishing excursions, jungle hikes, and more time with local communities to the core experience.',
    highlights: [
      'Everything in the 3D/2N package',
      'Traditional fishing excursion',
      'Jungle medicinal plants walk',
      'Village cultural visit',
      'Hammock camp experience',
    ],
    included: ['Eco-lodge accommodation', 'All meals', 'Expert guides', 'River transport', 'Entry fees'],
    featured: false,
  },
  {
    id: 'tour-5d',
    slug: 'amazon-tour-5d-4n',
    name: 'Rivers & Wildlife',
    category: 'tours',
    categoryLabel: 'Amazon Tours',
    duration: '5D/4N',
    days: 5,
    nights: 4,
    price: 800,
    pricingType: 'per-person',
    shortDescription: 'Five days on the river systems — piranha fishing, caiman spotting, and remote jungle camps.',
    description:
      'Explore the Amazonian river systems in depth across five days. From piranha fishing at dusk to spotting caimans by torchlight, every day brings a new encounter with the living jungle.',
    highlights: [
      'Piranha fishing at sunset',
      'Caiman spotting night excursion',
      'Remote jungle camping',
      'River dolphins encounter',
      'Traditional cooking class',
    ],
    included: ['Eco-lodge + jungle camp accommodation', 'All meals', 'Expert guides', 'River transport', 'Camping gear'],
    featured: true,
  },
  {
    id: 'tour-6d',
    slug: 'amazon-tour-6d-5n',
    name: 'Deep Amazon',
    category: 'tours',
    categoryLabel: 'Amazon Tours',
    duration: '6D/5N',
    days: 6,
    nights: 5,
    price: 1600,
    pricingType: 'per-person',
    shortDescription: 'Six days deep in the Amazon — remote communities, jungle skills, and untouched nature.',
    description:
      'Venture into the most remote reaches of our Amazon territory over six days. This journey takes you far from the tourist trails and into living ecosystems rarely visited by outsiders.',
    highlights: [
      'Remote Amazonian community visit',
      'Traditional hunting and gathering techniques',
      'Medicinal plants in-depth workshop',
      'Night canoe on black water rivers',
      'Wildlife photography session',
    ],
    included: ['All accommodation', 'All meals', 'Expert guides', 'River transport', 'Cultural activities'],
    featured: false,
  },
  {
    id: 'tour-7d',
    slug: 'amazon-tour-7d-6n',
    name: 'The Amazon Journey',
    category: 'tours',
    categoryLabel: 'Amazon Tours',
    duration: '7D/6N',
    days: 7,
    nights: 6,
    price: 2100,
    pricingType: 'per-person',
    shortDescription: 'Our signature week-long journey — the full Amazon experience from river to canopy.',
    description:
      'Our most complete standard tour. Seven days immersed in the Amazon ecosystem, combining river adventures, wildlife encounters, cultural exchanges, and jungle skills into one transformative week.',
    highlights: [
      'Full river navigation program',
      'Multiple wildlife encounters',
      'Indigenous community cultural exchange',
      'Jungle survival skills introduction',
      'Traditional ceremony observation',
      'Solo jungle meditation time',
    ],
    included: ['Premium eco-lodge + jungle camp accommodation', 'All meals', 'All guided activities', 'River transport', 'Cultural visits'],
    featured: true,
  },
  {
    id: 'tour-8d',
    slug: 'amazon-tour-8d-7n',
    name: 'Amazon Master',
    category: 'tours',
    categoryLabel: 'Amazon Tours',
    duration: '8D/7N',
    days: 8,
    nights: 7,
    price: 2220,
    pricingType: 'per-person',
    shortDescription: 'Eight days for those who want to see it all — the definitive Amazon experience.',
    description:
      'The most comprehensive Amazon tour we offer. Eight days and seven nights give enough time to go slow, go deep, and let the jungle work on you at its own pace.',
    highlights: [
      'Everything in the 7D/6N journey',
      'Additional remote river expedition',
      'Extended community immersion',
      'Plant medicine introduction (non-ceremonial)',
      'Full free day for personal exploration',
    ],
    included: ['Premium accommodation', 'All meals', 'All activities', 'River transport', 'Full cultural program'],
    featured: false,
  },

  // ── Jungle Survival ───────────────────────────────────────────────────────
  {
    id: 'survival-7d',
    slug: 'jungle-survival-7d-6n',
    name: 'Jungle Survival',
    category: 'jungle-survival',
    categoryLabel: 'Jungle Survival',
    duration: '7D/6N',
    days: 7,
    nights: 6,
    price: 4000,
    pricingType: 'per-person',
    shortDescription: 'One week of real jungle survival skills — shelter, fire, water, and food from the forest.',
    description:
      'Guided by May Arriaga Chávez and local Yagua specialists, this intensive program teaches you to survive and thrive in the Amazon. Not a simulation — real jungle, real skills, real respect for the forest.',
    highlights: [
      'Shelter construction from forest materials',
      'Fire-making using traditional Amazonian methods',
      'Water sourcing and purification in the jungle',
      'Edible and medicinal plant identification',
      'Hunting and trapping basics (responsible practice)',
      'River crossing and navigation techniques',
    ],
    included: ['Jungle accommodation', 'All meals (some foraged)', 'Expert survival guides', 'Safety equipment', 'First aid support'],
    featured: true,
  },
  {
    id: 'survival-14d',
    slug: 'jungle-survival-14d-13n',
    name: 'Deep Jungle Survival',
    category: 'jungle-survival',
    categoryLabel: 'Jungle Survival',
    duration: '14D/13N',
    days: 14,
    nights: 13,
    price: 5000,
    pricingType: 'per-person',
    shortDescription: 'Two weeks — full immersion into Amazonian survival and indigenous bush-craft traditions.',
    description:
      'The extended survival program goes beyond skills into deep relationship with the jungle. By the end of two weeks, you will have navigated, camped, foraged, and survived in one of the most biodiverse places on Earth.',
    highlights: [
      'Everything in the 7D/6N survival program',
      'Solo night in the jungle (guided safety perimeter)',
      'River raft construction and navigation',
      'Extended foraging and plant knowledge',
      'Indigenous bush-craft mastery',
    ],
    included: ['All jungle accommodation', 'All meals', 'Expert survival guides', 'Safety & medical support', 'Completion certificate'],
    featured: false,
  },

  // ── Ayahuasca – Bora ──────────────────────────────────────────────────────
  {
    id: 'aya-bora-7d',
    slug: 'ayahuasca-bora-7d-6n',
    name: 'Bora Ceremony – 7 Days',
    category: 'ayahuasca-bora',
    categoryLabel: 'Ayahuasca – Bora',
    duration: '7D/6N',
    days: 7,
    nights: 6,
    price: 4000,
    pricingType: 'per-person',
    shortDescription: 'A week-long Bora ceremonial retreat — traditional ayahuasca in an indigenous-guided container.',
    description:
      'Held within Bora tradition, this retreat offers a profoundly authentic ceremonial experience deep in the Peruvian Amazon. Our shaman Abelardo Campos guides each ceremony with decades of lineage knowledge.',
    highlights: [
      'Multiple ayahuasca ceremonies with Shaman Abelardo',
      'Pre-ceremony preparation and diet guidance',
      'Integration circles after each ceremony',
      'Jungle walks connecting plant knowledge to ceremony',
      'One-on-one session with the shaman',
      'Eco-lodge accommodation in primary forest',
    ],
    included: ['Eco-lodge accommodation', 'Traditional diet meals', 'All ceremonies', 'Integration support', 'River transport'],
    featured: true,
  },
  {
    id: 'aya-bora-14d',
    slug: 'ayahuasca-bora-14d-13n',
    name: 'Bora Ceremony – 14 Days',
    category: 'ayahuasca-bora',
    categoryLabel: 'Ayahuasca – Bora',
    duration: '14D/13N',
    days: 14,
    nights: 13,
    price: 6000,
    pricingType: 'per-person',
    shortDescription: 'Two weeks in Bora tradition — deeper work, more ceremony, and extended integration.',
    description:
      'The 14-day program allows the process to unfold at its natural pace. More time between ceremonies for rest and integration, more jungle immersion, and deeper relationship with the plant and the shaman.',
    highlights: [
      'Extended ceremony program (up to 6 ceremonies)',
      'Daily integration group circles',
      'Plant medicine diet (dieta) option available',
      'Medicinal plant knowledge immersion',
      'River and wildlife excursions between ceremonies',
      'Closing ceremony and departure blessing',
    ],
    included: ['Eco-lodge accommodation', 'All meals (traditional diet)', 'All ceremonies', 'Daily integration support', 'River transport'],
    featured: false,
  },
  {
    id: 'aya-bora-21d',
    slug: 'ayahuasca-bora-21d-20n',
    name: 'Bora Ceremony – 21 Days',
    category: 'ayahuasca-bora',
    categoryLabel: 'Ayahuasca – Bora',
    duration: '21D/20N',
    days: 21,
    nights: 20,
    price: 8000,
    pricingType: 'per-person',
    shortDescription: 'The complete Bora ceremonial path — three weeks for those called to go all the way.',
    description:
      'Three weeks in the jungle with Shaman Abelardo. This is for those who feel a deep call to the medicine and want to give it enough time. The full dieta, extensive ceremony work, and complete jungle immersion.',
    highlights: [
      'Full ceremonial program (8–10 ceremonies)',
      'Complete traditional plant diet (dieta)',
      'Master plant work in addition to ayahuasca',
      'Daily one-on-one integration sessions',
      'Extended jungle and river immersion',
      'Closing ceremony and return blessing',
    ],
    included: [
      'All accommodation',
      'All traditional meals',
      'Full ceremony program',
      'Daily support',
      'River transport',
      'Post-retreat follow-up call',
    ],
    featured: false,
  },

  // ── Ayahuasca – Yagua ─────────────────────────────────────────────────────
  {
    id: 'aya-yagua-7d',
    slug: 'ayahuasca-yagua-7d-6n',
    name: 'Yagua Ceremony – 7 Days',
    category: 'ayahuasca-yagua',
    categoryLabel: 'Ayahuasca – Yagua',
    duration: '7D/6N',
    days: 7,
    nights: 6,
    price: 4000,
    pricingType: 'per-person',
    shortDescription: 'Rooted in Yagua tradition — an indigenous-owned, authentically held ceremonial retreat.',
    description:
      'Allpayacu is indigenous-owned and rooted in Yagua tradition. This retreat is held in the living ceremonial lineage of the Yagua people — a distinct and deeply powerful experience that stands apart from any other offer in the Amazon.',
    highlights: [
      'Yagua ceremonies with indigenous guidance',
      'Indigenous-owned and operated space',
      'Safety-first approach with thorough preparation',
      'Pre-ceremony health screening and consultation',
      'Integration circles after each ceremony',
      'Jungle immersion with May Arriaga Chávez',
    ],
    included: ['Eco-lodge accommodation', 'Traditional diet meals', 'All ceremonies', 'Integration support', 'River transport'],
    featured: true,
  },
  {
    id: 'aya-yagua-14d',
    slug: 'ayahuasca-yagua-14d-13n',
    name: 'Yagua Ceremony – 14 Days',
    category: 'ayahuasca-yagua',
    categoryLabel: 'Ayahuasca – Yagua',
    duration: '14D/13N',
    days: 14,
    nights: 13,
    price: 6000,
    pricingType: 'per-person',
    shortDescription: 'Two weeks in Yagua tradition — the medicine, the jungle, the river, and deep integration.',
    description:
      'Fourteen days held in Yagua tradition gives the medicine time to work at its own rhythm. Extended ceremony, daily integration, and deep immersion in the Amazon landscape that gave birth to this tradition.',
    highlights: [
      'Extended Yagua ceremony program',
      'Traditional dieta guidance',
      'Daily integration group circles',
      'River and wildlife days between ceremonies',
      'Cultural immersion with Yagua community',
      'Post-retreat follow-up support',
    ],
    included: ['Eco-lodge accommodation', 'All meals', 'All ceremonies', 'Integration support', 'River transport'],
    featured: false,
  },
  {
    id: 'aya-yagua-21d',
    slug: 'ayahuasca-yagua-21d-20n',
    name: 'Yagua Ceremony – 21 Days',
    category: 'ayahuasca-yagua',
    categoryLabel: 'Ayahuasca – Yagua',
    duration: '21D/20N',
    days: 21,
    nights: 20,
    price: 8000,
    pricingType: 'per-person',
    shortDescription: 'Three weeks in Yagua tradition — the deepest ceremonial path we offer.',
    description:
      "For those who are truly called. Three weeks immersed in Yagua tradition, with the full ceremonial program, complete plant diet, and total Amazon immersion. The name Allpayacu — earth and water — holds the essence of what this journey offers.",
    highlights: [
      'Full Yagua ceremonial program (8–10 ceremonies)',
      'Complete traditional dieta',
      'Master plant work',
      'Daily individual integration sessions',
      'Community and cultural participation',
      'River, jungle, and wildlife immersion',
      '30-day post-retreat integration support',
    ],
    included: [
      'All accommodation',
      'All traditional meals',
      'Full ceremony program',
      'All support',
      'River transport',
      '30-day post-retreat support',
    ],
    featured: false,
  },
];

export const addOns: AddOn[] = [
  {
    id: 'addon-fishing',
    slug: 'fishing',
    name: 'Fishing Excursion',
    category: 'addons',
    price: 30,
    pricingType: 'per-activity',
    description: 'Traditional Amazonian fishing on the river — including piranha fishing at sunset.',
  },
  {
    id: 'addon-wildlife-photography',
    slug: 'wildlife-photography',
    name: 'Wildlife Photography Session',
    category: 'addons',
    price: 50,
    pricingType: 'per-activity',
    description: 'Expert-guided wildlife photography session at the best spots for Amazon fauna.',
  },
  {
    id: 'addon-kambo',
    slug: 'kambo',
    name: 'Kambo Ceremony',
    category: 'addons',
    price: 100,
    pricingType: 'per-session',
    description: 'Traditional Kambo (frog medicine) ceremony — a powerful cleansing and immunostimulant practice.',
  },
];

export function getPackageBySlug(slug: string): Package | undefined {
  return packages.find((p) => p.slug === slug);
}

export function getPackagesByCategory(category: Category): Package[] {
  return packages.filter((p) => p.category === category);
}

export function getFeaturedPackages(): Package[] {
  return packages.filter((p) => p.featured);
}

export function getPackagesByGroup(group: ServiceGroup): Package[] {
  return packages.filter((p) => p.category !== 'addons' && CATEGORY_TO_GROUP[p.category] === group);
}
