export interface RoomItem {
  id: string;
  name: string;
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
  category: 'MIDWEEK' | 'MONSOON & COOL' | 'AYURVEDA';
  description: string;
  extendedDetails: string;
  inclusions: string[];
  minNights: number;
  discountPercent: number;
  recommendedRoomId: string;
  validityNote: string;
}

export const HERO_IMAGE = './src/assets/images/eira_hero_resort_1794900653766.jpg';
export const SWING_DECK_HERO_IMAGE = './src/assets/images/eira_swing_deck_twilight_hero_1794909208579.jpg';
export const DINING_IMAGE = './src/assets/images/eira_dining_restaurant_1794900660211.jpg';
export const REFERENCE_DESIGN_WEBP = './assets/aistudio/7479ca8557aa9f48dfa4d31400645201_61a4e3c2.webp';
export const BRAND_LOGO_PDF = './assets/aistudio/EIRA_logo_83e64182.pdf';

export const ROOMS_DATA: RoomItem[] = [
  {
    id: 'harbour-room',
    name: 'Lagoon Verandah Room',
    category: 'Coastal Courtyard Room',
    shortDescription:
      'Sun-dappled lime-plaster interiors, a hand-carved Malabar teak king bed, and a louvered verandah opening toward the palm-lined estuary.',
    fullDescription:
      'Positioned along the quiet eastern curve of Karwar Cove to catch the first golden light over the backwaters and sea, the Lagoon Verandah Room pairs cool honed stone floors with organic unbleached mulmul cotton drapery and a private timber sit-out above the coconut palms.',
    sizeSqm: 46,
    maxGuests: 2,
    bedType: 'Teak Poster King Bed',
    view: 'East Estuary & Palm Grove',
    nightlyRate: 38000,
    image: './src/assets/images/room_harbour_room_1794900654179.jpg',
    highlights: [
      'Hand-carved Malabar teak bed',
      'Private louvered sea verandah',
      'Organic khadi & mulmul linens',
      'Open-sky rain shower courtyard',
    ],
    amenities: [
      'Private timber verandah facing the lagoon',
      'Handloom organic khadi & mulmul bedding',
      'Deep monolithic stone soaking tub',
      'Cold-pressed vetiver & wild neem bath rituals',
      'Chikmagalur estate coffee & brass tea pantry',
    ],
  },
  {
    id: 'tide-room',
    name: 'Tidewater Pavilion',
    category: 'Oceanfront Villa',
    shortDescription:
      'Contemporary coastal pavilion with floor-to-ceiling teak sliders, woven cane accents, and uninterrupted views of the rolling Arabian Sea.',
    fullDescription:
      'Built just above the high-tide line, the Tidewater Pavilion frames the open Arabian Sea through expansive folding glass and teak screens. Hand-woven seagrass rugs, warm brass lanterns, and a shaded daybed deck invite slow afternoons listening to the surf.',
    sizeSqm: 54,
    maxGuests: 2,
    bedType: 'Canopy King Bed',
    view: 'Direct Arabian Sea Shoreline',
    nightlyRate: 46000,
    image: './src/assets/images/room_tide_room_1794900655154.jpg',
    highlights: [
      'Direct beach footpath access',
      'Floor-to-ceiling teak sliders',
      'Shaded coastal daybed deck',
      'Uninterrupted Arabian Sea views',
    ],
    amenities: [
      'Floor-to-ceiling coastal glazing & louvers',
      'Hand-woven cane & dhurrie textiles',
      'Walk-in monsoon shower with ocean view',
      'Artisanal Studio pottery reading lamps',
      'Private sandy path to the cove beach',
    ],
  },
  {
    id: 'dune-suite',
    name: 'Konkan Dune Suite',
    category: 'Signature Pool Suite',
    shortDescription:
      'Expansive living pavilion with a traditional teak jhoola swing daybed, private plunge pool, and sheer linen curtains billowing in the sea breeze.',
    fullDescription:
      'Overlooking the wild casuarina dunes and the western horizon, the Konkan Dune Suite offers a generous indoor-outdoor living salon, a private temperature-controlled plunge pool, a dining verandah for four, and a serene brass-and-laterite bathing courtyard.',
    sizeSqm: 82,
    maxGuests: 4,
    bedType: 'King Bed + Jhoola Daybed',
    view: 'Casuarina Dunes & Sunset Bay',
    nightlyRate: 68000,
    image: './src/assets/images/room_dune_suite_1794900656688.jpg',
    highlights: [
      'Private heated plunge pool',
      'Traditional teak jhoola swing',
      'Indoor-outdoor living salon',
      'Sunset kokum & spice aperitifs',
    ],
    amenities: [
      'Separate living salon & private plunge pool',
      'Wrap-around Malabar teak sun deck',
      'Sheer handloom linen floor-to-ceiling drapery',
      'Freestanding stone bath & twin brass vanities',
      'Complimentary evening coastal sundowner service',
    ],
  },
  {
    id: 'the-lookout',
    name: 'The Cliffside Haveli',
    category: 'Presidential Sea Sanctuary',
    shortDescription:
      'Perched atop the laterite headland with dramatic 180-degree ocean vistas, a private infinity terrace, and dedicated butler service.',
    fullDescription:
      'Crowning the highest ridge of EIRA, The Cliffside Haveli commands an unbroken 180-degree panorama of the Arabian Sea and golden western sunsets. Features a private infinity-edge lap pool, sunken firepit lounge, hammered-copper outdoor soaking tub, and personal coastal butler.',
    sizeSqm: 118,
    maxGuests: 4,
    bedType: 'Maharaja Canopy King Bed',
    view: '180° Headland & Arabian Sea',
    nightlyRate: 95000,
    image: './src/assets/images/room_the_lookout_1794900658040.jpg',
    highlights: [
      '180° Arabian Sea cliff panorama',
      'Private infinity-edge plunge pool',
      'Outdoor hammered-copper bath',
      'Dedicated butler & in-villa dining',
    ],
    amenities: [
      'Private cliffside infinity pool & firepit deck',
      'Outdoor hammered-copper soaking sanctuary',
      'Dedicated Thamburan host & private chef dining',
      'Bespoke Ayurvedic pillow & incense menu',
      'Private dawn access to the Samudra thermal spa',
    ],
  },
];

export const DINING_SCHEDULE: DiningScheduleItem[] = [
  {
    id: 'breakfast',
    service: 'Morning Harvest',
    hours: '07:30–10:30',
    note: 'Warm lacy appams, coconut milk stew, single-estate Chikmagalur pour-over coffee, and ripe Alphonso & jackfruit.',
    timeSlots: ['07:30', '08:00', '08:30', '09:00', '09:30', '10:00'],
  },
  {
    id: 'lunch',
    service: 'Verandah Grill & Toddy',
    hours: '12:30–15:30',
    note: 'Banana-leaf wrapped pearl spot, heirloom raw mango salads, and chilled kokum & curry-leaf spritzers by the surf.',
    timeSlots: ['12:30', '13:00', '13:30', '14:00', '14:30', '15:00'],
  },
  {
    id: 'dinner',
    service: 'Candlelit Coastal Tasting',
    hours: '19:00–23:00',
    note: 'Seven-course Konkan & Malabar tasting menu cooked over coconut-shell embers from the day-boats’ catch.',
    timeSlots: ['19:00', '19:30', '20:00', '20:30', '21:00', '21:45'],
  },
];

export const SAMPLE_MENU_SECTIONS = [
  {
    course: 'From the Hearth & Estuary (Small Plates)',
    items: [
      {
        title: 'Karwar Rock Oysters & Smoked Kokum Granita — ₹1,850',
        description: 'Hand-dived estuary oysters, green mango mignonette, crushed Tellicherry pepper',
      },
      {
        title: 'Wood-Fired Poi Bread & Cultured Ghee Butter — ₹950',
        description: 'Fermented toddy dough baked in clay ovens, roasted garlic & curry-leaf podi',
      },
    ],
  },
  {
    course: 'From the Fishing Canoes & Spice Garden',
    items: [
      {
        title: 'Chargrilled Pearl Spot (Karimeen Pollichathu) — ₹3,400',
        description: 'Wrapped in scorched plantain leaf with shallots, wild kokum, and cold-pressed coconut oil',
      },
      {
        title: 'Malabar Crab & Roasted Coconut Gassi — ₹4,200',
        description: 'Fresh mud crab simmered in stone-ground coriander, Byadgi chilli, served with red matta rice',
      },
      {
        title: 'Jackfruit & Black Chickpea Tellicherry Roast — ₹2,600',
        description: 'Estate-grown tender jackfruit, freshly harvested green peppercorns, flaky Malabar parotta',
      },
    ],
  },
  {
    course: 'Sweet & Estate Infusions',
    items: [
      {
        title: 'Warm Palm Jaggery & Tender Coconut Payasam — ₹1,450',
        description: 'Slow-reduced heirloom rice, roasted cashews, smoked cardamom ice cream',
      },
      {
        title: 'Spiced Dark Chocolate & Chikmagalur Espresso Tart — ₹1,600',
        description: '70% single-origin South Indian cacao, sea-salt caramel, candied ginger',
      },
    ],
  },
];

export const EXPERIENCES_DATA: ExperienceItem[] = [
  {
    id: 'the-sea-water',
    title: 'Samudra Thalasso Pool',
    subtitle: 'Heated Saltwater Sanctuary & Ayurvedic Steam Pavilion',
    schedule: 'Daily · 06:30–21:00',
    duration: 'Complimentary unhurried access for resident guests',
    description:
      'Carved into the natural laterite cliffside above the Arabian Sea surf, our warm thalassotherapy infinity pool draws filtered ocean water gently heated to 30°C, paired with herbal medicated steam rooms and Kansa wand recovery lounges.',
    details: [
      'Filtered mineral-rich Arabian Sea water warmed to 30°C',
      'Cedar & vetiver herbal steam pavilion and rainwater plunge',
      'Fresh tulsi, ginger & lemongrass infusions served poolside',
    ],
    image: './src/assets/images/exp_sea_water_pool_1794900660601.jpg',
    featured: true,
  },
  {
    id: 'guided-sea-swims',
    title: 'Dawn Cove Swim & Kayaking',
    subtitle: 'Sunrise Arabian Sea Lagoon Crossings',
    schedule: 'Daily at Sunrise · Tide Dependent',
    duration: '75 minutes · Intimate groups of up to 6 guests',
    description:
      'Join our resident coastal watermen at the cove jetty as the first golden light touches the palms. Swim or paddle across the calm, sheltered waters of Karwar Lagoon before returning to warm handloom towels and steaming filter coffee.',
    details: [
      'Guided by certified coastal lifeguards & sea naturalists',
      'Hand-crafted wooden kayaks, tow floats, and dry bags provided',
      'Followed by warm sukku (dry ginger) palm-jaggery elixir on the deck',
    ],
    image: './src/assets/images/exp_guided_sea_swims_1794900662412.jpg',
    featured: false,
  },
  {
    id: 'coast-path-walks',
    title: 'Laterite Cliff & Spice Trail',
    subtitle: 'Headland Groves, Sacred Covelines & Botanical Walks',
    schedule: 'Botanist-Led or Self-Guided · 07:00 & 16:30',
    duration: '2 to 3 hours · Departing from the estate spice gate',
    description:
      'Step through our walled pepper garden onto fourteen kilometres of unspoilt Konkan headland trail. Walk beneath ancient banyan and casuarina trees, discover hidden tide pools, and pause at cliffside viewpoints with a woven tiffin carrier from the kitchen.',
    details: [
      'Hand-illustrated coastal flora & tide maps in every villa',
      'Packed brass tiffin picnic with spiced buttermilk & snacks (₹3,500 for two)',
      'Guided spice-harvesting & birdwatching walks with our estate naturalist',
    ],
    image: './src/assets/images/exp_coast_path_walks_1794900662389.jpg',
    featured: false,
  },
];

export const SEASONAL_OFFERS: SeasonalOffer[] = [
  {
    id: 'the-slow-week',
    title: 'The Unhurried Konkan Week',
    category: 'MIDWEEK',
    description:
      'Stay three nights between Sunday and Thursday and let coastal life unfold at your own pace.',
    extendedDetails:
      'Crafted for travellers seeking the quietest days along the Arabian Sea. Arrive on Sunday afternoon to a chilled tender-coconut welcome, enjoy daily breakfast on your private verandah, and receive a 15% privilege on stays of three nights or more.',
    inclusions: [
      'Three nights accommodation (Sunday through Thursday)',
      'Daily Morning Harvest breakfast for two at The Verandah',
      'Complimentary morning access to the Samudra Thalasso circuit',
      '15% midweek tariff privilege applied automatically in ₹ INR',
    ],
    minNights: 3,
    discountPercent: 15,
    recommendedRoomId: 'harbour-room',
    validityNote: 'Valid Sunday – Thursday across all villas & suites',
  },
  {
    id: 'cold-water-weekend',
    title: 'Arabian Sea Coastal Escape',
    category: 'MONSOON & COOL',
    description:
      'Two guided sunrise lagoon swims, herbal steam sessions, and a long Sunday coastal feast.',
    extendedDetails:
      'Celebrate the crisp sea breezes of the Konkan coast. Spend two or more nights with guided dawn cove swims, restorative sessions in the herbal steam pavilion, and a leisurely five-course Sunday banana-leaf coastal feast.',
    inclusions: [
      'Two guided sunrise lagoon swims or sea kayaking excursions',
      'Reserved herbal steam pavilion & Kansa foot ritual',
      'Long Sunday Konkan seafood & spice-garden lunch for two',
      '10% seasonal weekend tariff privilege in ₹ INR',
    ],
    minNights: 2,
    discountPercent: 10,
    recommendedRoomId: 'tide-room',
    validityNote: 'Available Friday – Monday throughout the season',
  },
  {
    id: 'salt-and-stillness',
    title: 'Prana & Saltwater Immersion',
    category: 'AYURVEDA',
    description:
      'A 90-minute Ayurvedic Abhyanga & Kansa ritual for two, candlelit tasting dinner, and late checkout.',
    extendedDetails:
      'A deeply restorative immersion into EIRA’s Ayurvedic sea spa and coastal kitchen. Includes our signature 90-minute warm herb-infused oil therapy for two, a seven-course candlelit dinner from the evening catch, and guaranteed 2:00 PM late departure.',
    inclusions: [
      '90-minute Ayurvedic Abhyanga & Kansa therapy for two (worth ₹18,000)',
      'Candlelit coastal tasting dinner for two at The Verandah',
      'Guaranteed late checkout until 14:00 & private Dabolim/Mopa airport transfer',
      '12% wellness sanctuary privilege applied to your stay',
    ],
    minNights: 2,
    discountPercent: 12,
    recommendedRoomId: 'dune-suite',
    validityNote: 'Available year-round for two-night minimum stays',
  },
];
