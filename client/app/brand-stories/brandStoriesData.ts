import {
  BadgeIndianRupee,
  Heart,
  MapPin,
  Rocket,
  ShoppingBag,
  Sparkles,
} from 'lucide-react';

export interface Brand {
  id: string;
  name: string;
  tagline: string;
  category: string;
  logo: string;
  founder: string;
  founderImage: string;
  origin: string;
  year: number;
  indianOwnership: number;
  story: string;
  mission: string;
  journey: string[];
  shopUrl: string;
  rating: number;
  tags: string[];
}

export const CATEGORIES = [
  { id: 'all', label: 'All Brands', icon: Sparkles },
  { id: 'beauty', label: 'Beauty & Wellness', icon: Heart },
  { id: 'food', label: 'Food & Beverages', icon: BadgeIndianRupee },
  { id: 'fashion', label: 'Fashion & Apparel', icon: ShoppingBag },
  { id: 'tech', label: 'Technology', icon: Rocket },
  { id: 'home', label: 'Home & Living', icon: MapPin },
];

export const BRANDS: Brand[] = [
  {
    id: '1',
    name: 'Forest Essentials',
    tagline: 'Luxurious Ayurveda',
    category: 'beauty',
    logo: '🌿',
    founder: 'Mira Kulkarni',
    founderImage: '👩‍💼',
    origin: 'Rishikesh, Uttarakhand',
    year: 2000,
    indianOwnership: 100,
    story: "Born from the ancient Ayurvedic traditions of Rishikesh, Forest Essentials was founded by Mira Kulkarni who envisioned bringing the wisdom of 5,000-year-old Ayurvedic beauty rituals to the modern world. Each product is handcrafted using time-honored techniques and the purest ingredients sourced from the Himalayas.",
    mission: "To revive traditional Ayurvedic beauty practices and make them accessible worldwide while preserving India's rich heritage of natural wellness.",
    journey: [
      '2000 — Founded in Rishikesh with just 5 products',
      '2005 — Opened first flagship store in Delhi',
      '2010 — Expanded to 50+ stores across India',
      '2015 — International launch in luxury retail',
      '2023 — 200+ products, a global Ayurvedic beauty icon',
    ],
    shopUrl: '/shop?brand=forest-essentials',
    rating: 4.8,
    tags: ['Ayurveda', 'Luxury', 'Natural'],
  },
  {
    id: '2',
    name: 'Paper Boat',
    tagline: 'Drinks and Memories',
    category: 'food',
    logo: '⛵',
    founder: 'Neeraj Kakkar',
    founderImage: '👨‍💼',
    origin: 'Bengaluru, Karnataka',
    year: 2013,
    indianOwnership: 85,
    story: "Paper Boat was born from a deep nostalgia for the drinks our grandmothers made — aam panna, jaljeera, kokum. Neeraj Kakkar and his team at Hector Beverages wanted to bottle the flavors of Indian childhood and share those memories with a new generation.",
    mission: "To bring back traditional Indian beverages using authentic recipes and natural ingredients, one sip at a time.",
    journey: [
      '2013 — Launched with Aam Panna and Jaljeera',
      '2015 — Raised $30M, expanded to 15 flavors',
      '2017 — Reached 100,000+ retail outlets',
      '2020 — Launched healthy snack line',
      "2024 — India's most loved nostalgic beverage brand",
    ],
    shopUrl: '/shop?brand=paper-boat',
    rating: 4.6,
    tags: ['Traditional', 'Nostalgic', 'Natural'],
  },
  {
    id: '3',
    name: 'boAt',
    tagline: 'Plug into Nirvana',
    category: 'tech',
    logo: '🎧',
    founder: 'Aman Gupta & Sameer Mehta',
    founderImage: '👨‍💻',
    origin: 'New Delhi',
    year: 2016,
    indianOwnership: 100,
    story: "boAt disrupted the Indian audio market by offering fashionable, affordable, and high-quality audio products. Aman Gupta, after noticing that Indians were paying premium prices for average audio gear, decided to create a homegrown brand that would be aspirational yet accessible.",
    mission: "To democratize premium audio in India by making world-class sound accessible to every young Indian.",
    journey: [
      '2016 — Started with indestructible Apple cables',
      '2017 — Launched first audio product line',
      "2019 — Became India's #1 earwear brand",
      '2021 — Crossed ₹1,500 Cr revenue',
      '2024 — Expanded to smartwatches and gaming gear',
    ],
    shopUrl: '/shop?brand=boat',
    rating: 4.5,
    tags: ['Audio', 'Youth', 'Affordable'],
  },
  {
    id: '4',
    name: 'FabIndia',
    tagline: 'Celebrate India',
    category: 'fashion',
    logo: '🧵',
    founder: 'John Bissell',
    founderImage: '👔',
    origin: 'New Delhi',
    year: 1960,
    indianOwnership: 90,
    story: "FabIndia connects over 55,000 craft-based rural producers to modern urban markets. What started as an export house for home furnishings has become India's largest private platform for products made from traditional techniques and hand-based processes.",
    mission: "To provide employment to traditional artisans and sustain India's rich craft heritage through modern retail.",
    journey: [
      '1960 — Founded to export home furnishings',
      '1976 — First retail store in Greater Kailash, Delhi',
      '2000 — Expanded into garments and organic food',
      '2010 — 150+ stores, empowering 40,000+ artisans',
      '2024 — A legacy brand synonymous with Indian craftsmanship',
    ],
    shopUrl: '/shop?brand=fabindia',
    rating: 4.7,
    tags: ['Handloom', 'Artisan', 'Heritage'],
  },
];
