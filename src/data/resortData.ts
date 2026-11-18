export interface RoomItem {
  id: string;
  name: string;
  roomNumberLabel: string;
  tagline: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  sizeSqm: number;
  maxGuests: number;
  bedType: string;
  view: string;
  nightlyRate: number;
  image: string;
  highlights: string[];
  amenities: string[];
}

export interface DiningScheduleItem {
  id: string;
  service: string;
  hours: string;
  note: string;
  timeSlots: string[];
}

export interface ExperienceItem {
  id: string;
  title: string;
  subtitle: string;
  schedule: string;
  duration: string;
  description: string;
  details: string[];
  image: string;
  featured?: boolean;
}

export interface SeasonalOffer {
  id: string;
  title: string;
  subtitle: string;
  category: 'MIDWEEK' | 'MONSOON & COOL' | 'AYURVEDA';
  description: string;
  extendedDetails: string;
  inclusions: string[];
  minNights: number;
  discountPercent: number;
  recommendedRoomId: string;
  validityNote: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Our Spaces' | 'Beautiful Stays' | 'Dining Moments' | 'Coastal Experiences' | 'Life at EIRA';
  caption: string;
  image: string;
}

export const HERO_IMAGE = './src/assets/images/eira_hero_resort_1794900653766.jpg';
export const SWING_DECK_HERO_IMAGE = './src/assets/images/eira_swing_deck_twilight_hero_1794909208579.jpg';
export const DINING_IMAGE = './src/assets/images/eira_dining_restaurant_1794900660211.jpg';
export const REFERENCE_DESIGN_WEBP = './assets/aistudio/7479ca8557aa9f48dfa4d31400645201_61a4e3c2.webp';
export const BRAND_LOGO_PDF = './assets/aistudio/EIRA_logo_83e64182.pdf';

export const ROOMS_DATA: RoomItem[] = [
  {
    id: 'harbour-room',
    name: 'The Haven',
    roomNumberLabel: 'Room 01',
    tagline: 'Your peaceful hideaway.',
    category: 'Garden Sanctuary',
    shortDescription: 'Your peaceful hideaway.',
    fullDescription:
      'A warm and inviting retreat with soothing natural interiors and a private timber verandah.',
    sizeSqm: 46,
    maxGuests: 2,
    bedType: 'King Bed',
    view: 'Palm Grove',
    nightlyRate: 38000,
    image: './src/assets/images/room_harbour_room_1794900654179.jpg',
    highlights: ['Private verandah', 'Rain shower courtyard', 'Soothing interiors'],
    amenities: [
      'Private timber verandah',
      'Organic handloom bedding',
      'Stone soaking tub',
      'Artisanal coffee & tea pantry',
    ],
  },
  {
    id: 'tide-room',
    name: 'The Breeze',
    roomNumberLabel: 'Room 02',
    tagline: 'Wake up to wonderful moments.',
    category: 'Seafront Room',
    shortDescription: 'Wake up to wonderful moments.',
    fullDescription:
      'Light, airy, and comfortable — designed for slow mornings and ocean breeze views.',
    sizeSqm: 54,
    maxGuests: 2,
    bedType: 'Canopy King Bed',
    view: 'Arabian Sea',
    nightlyRate: 46000,
    image: './src/assets/images/room_tide_room_1794900655154.jpg',
    highlights: ['Oceanfront deck', 'Coastal sliders', 'Sea breeze views'],
    amenities: [
      'Floor-to-ceiling coastal sliders',
      'Shaded sea daybed deck',
      'Walk-in ocean-view shower',
      'Direct beach footpath',
    ],
  },
  {
    id: 'dune-suite',
    name: 'The Retreat',
    roomNumberLabel: 'Room 03',
    tagline: 'Space to relax. Time to reconnect.',
    category: 'Pool Suite',
    shortDescription: 'Space to relax. Time to reconnect.',
    fullDescription:
      'Spacious comfort and refined design with a private plunge pool and teak swing daybed.',
    sizeSqm: 82,
    maxGuests: 4,
    bedType: 'King Bed + Daybed',
    view: 'Sunset Bay',
    nightlyRate: 68000,
    image: './src/assets/images/room_dune_suite_1794900656688.jpg',
    highlights: ['Private plunge pool', 'Teak jhoola swing', 'Living salon'],
    amenities: [
      'Private heated plunge pool',
      'Indoor-outdoor living salon',
      'Wrap-around teak sun deck',
      'Evening sundowner service',
    ],
  },
  {
    id: 'the-lookout',
    name: 'The Horizon',
    roomNumberLabel: 'Room 04',
    tagline: 'A stay beyond the ordinary.',
    category: 'Ocean Residence',
    shortDescription: 'A stay beyond the ordinary.',
    fullDescription:
      'Elevated coastal living with 180-degree sea views, private infinity pool, and dedicated host.',
    sizeSqm: 118,
    maxGuests: 4,
    bedType: 'Canopy King Bed',
    view: '180° Ocean Horizon',
    nightlyRate: 95000,
    image: './src/assets/images/room_the_lookout_1794900658040.jpg',
    highlights: ['180° sea panorama', 'Private infinity pool', 'Dedicated host'],
    amenities: [
      'Cliffside infinity pool',
      'Outdoor copper soaking bath',
      'Dedicated host & in-villa dining',
      'Private wellness sanctuary access',
    ],
  },
];

export const DINING_SCHEDULE: DiningScheduleItem[] = [
  {
    id: 'breakfast',
    service: 'Fresh Beginnings',
    hours: '07:30–10:30',
    note: 'Comforting morning flavours by the sea.',
    timeSlots: ['07:30', '08:00', '08:30', '09:00', '09:30', '10:00'],
  },
  {
    id: 'lunch',
    service: 'Flavours to Remember',
    hours: '12:30–16:00',
    note: 'Fresh coastal ingredients and local craft.',
    timeSlots: ['12:30', '13:00', '13:30', '14:00', '14:30', '15:00'],
  },
  {
    id: 'dinner',
    service: 'Evenings to Savour',
    hours: '19:00–23:00',
    note: 'Candlelit dinners and unhurried conversations.',
    timeSlots: ['19:00', '19:30', '20:00', '20:30', '21:00', '21:45'],
  },
];

export const SAMPLE_MENU_SECTIONS = [
  {
    course: 'Fresh Beginnings & Small Plates',
    items: [
      {
        title: 'Goan Rock Oysters & Kokum Granita — ₹1,850',
        description: 'Estuary oysters, green mango, Tellicherry pepper',
      },
      {
        title: 'Warm Poi Bread & Cultured Herb Butter — ₹950',
        description: 'Clay-oven baked with roasted garlic & coastal spice',
      },
    ],
  },
  {
    course: 'Flavours to Remember',
    items: [
      {
        title: 'Chargrilled Pearl Spot in Plantain Leaf — ₹3,400',
        description: 'Wild kokum, coastal herbs, cold-pressed coconut oil',
      },
      {
        title: 'Goan Mud Crab & Roasted Coconut Curry — ₹4,200',
        description: 'Stone-ground spices with heirloom red rice',
      },
    ],
  },
  {
    course: 'Evenings to Savour',
    items: [
      {
        title: 'Palm Jaggery & Tender Coconut Tart — ₹1,450',
        description: 'Roasted Goa cashews & cardamom gelato',
      },
      {
        title: 'Single-Origin Dark Chocolate Ganache — ₹1,600',
        description: '70% artisanal cacao & sea-salt caramel',
      },
    ],
  },
];

export const EXPERIENCES_DATA: ExperienceItem[] = [
  {
    id: 'the-sea-water',
    title: "The Water's Edge",
    subtitle: 'Let the waves set your pace.',
    schedule: '01 · Daily by the Shore',
    duration: 'All-day resident access',
    description: 'Spend unhurried hours by the ocean breeze and saltwater infinity pool.',
    details: ['Saltwater infinity pool', 'Shaded timber sea decks'],
    image: './src/assets/images/exp_sea_water_pool_1794900660601.jpg',
    featured: true,
  },
  {
    id: 'guided-sea-swims',
    title: 'Golden Hour Moments',
    subtitle: 'Every sunset tells a story.',
    schedule: '02 · Daily at Dusk',
    duration: '17:30–19:30 · Sunset Deck',
    description: 'Watch the sky turn golden from our hanging swing daybeds by the sea.',
    details: ['Sunset swing deck', 'Coastal acoustic evenings'],
    image: './src/assets/images/eira_swing_deck_twilight_hero_1794909208579.jpg',
    featured: false,
  },
  {
    id: 'coast-path-walks',
    title: 'Discover the Spirit of Goa',
    subtitle: 'A little culture. A lot of character.',
    schedule: '03 · Morning & Afternoon',
    duration: 'Guided or self-paced',
    description: "Explore Goa's heritage streets, spice gardens, cafés, and coastal trails.",
    details: ['Heritage quarter walks', 'Private coastal drives'],
    image: './src/assets/images/exp_coast_path_walks_1794900662389.jpg',
    featured: false,
  },
  {
    id: 'art-of-doing-nothing',
    title: 'The Art of Doing Nothing',
    subtitle: 'Sometimes, doing less means feeling more.',
    schedule: '04 · At Your Own Pace',
    duration: 'No rush, no routine',
    description: 'Leave the everyday behind and rediscover the joy of simply being present.',
    details: ['Quiet reading verandahs', 'Botanical spa rituals'],
    image: './src/assets/images/exp_guided_sea_swims_1794900662412.jpg',
    featured: false,
  },
];

export const SEASONAL_OFFERS: SeasonalOffer[] = [
  {
    id: 'the-slow-week',
    title: 'The Weekend Escape',
    subtitle: 'Two days away. Endless memories.',
    category: 'MIDWEEK',
    description: 'A refreshing getaway surrounded by comfort and calm.',
    extendedDetails:
      'Includes daily breakfast, sunset refreshments on the swing deck, and a 15% stay privilege.',
    inclusions: [
      'Daily breakfast for two',
      'Sunset refreshments on the deck',
      '15% stay privilege',
    ],
    minNights: 3,
    discountPercent: 15,
    recommendedRoomId: 'harbour-room',
    validityNote: '3+ Nights · 15% Privilege',
  },
  {
    id: 'cold-water-weekend',
    title: 'Just the Two of Us',
    subtitle: 'More togetherness. More memories.',
    category: 'MONSOON & COOL',
    description: 'Peaceful mornings and romantic evenings shared together.',
    extendedDetails:
      'Includes a private candlelit dinner for two, in-villa breakfast, and late checkout.',
    inclusions: [
      'Candlelit coastal dinner for two',
      'Private verandah breakfast',
      '10% couple privilege',
    ],
    minNights: 2,
    discountPercent: 10,
    recommendedRoomId: 'tide-room',
    validityNote: '2+ Nights · 10% Privilege',
  },
  {
    id: 'salt-and-stillness',
    title: 'The Extended Escape',
    subtitle: 'Stay longer. Feel better.',
    category: 'AYURVEDA',
    description: 'Slow down, settle in, and make the most of every day.',
    extendedDetails:
      'Includes airport transfers, a coastal tasting dinner, and guaranteed late departure.',
    inclusions: [
      'Complimentary Goa airport transfer',
      'Tasting dinner for two',
      '12% extended stay privilege',
    ],
    minNights: 2,
    discountPercent: 12,
    recommendedRoomId: 'dune-suite',
    validityNote: '2+ Nights · 12% Privilege',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-spaces-1',
    title: 'Coastal Sanctuary',
    category: 'Our Spaces',
    caption: 'Goa, India',
    image: HERO_IMAGE,
  },
  {
    id: 'gal-stays-1',
    title: 'The Haven',
    category: 'Beautiful Stays',
    caption: 'Room 01',
    image: './src/assets/images/room_harbour_room_1794900654179.jpg',
  },
  {
    id: 'gal-stays-2',
    title: 'The Horizon',
    category: 'Beautiful Stays',
    caption: 'Room 04',
    image: './src/assets/images/room_the_lookout_1794900658040.jpg',
  },
  {
    id: 'gal-dining-1',
    title: 'The Verandah',
    category: 'Dining Moments',
    caption: 'Coastal Kitchen',
    image: DINING_IMAGE,
  },
  {
    id: 'gal-coastal-1',
    title: "The Water's Edge",
    category: 'Coastal Experiences',
    caption: 'Saltwater Pool',
    image: './src/assets/images/exp_sea_water_pool_1794900660601.jpg',
  },
  {
    id: 'gal-life-1',
    title: 'Twilight Swing Deck',
    category: 'Life at EIRA',
    caption: 'Golden Hour',
    image: SWING_DECK_HERO_IMAGE,
  },
];
