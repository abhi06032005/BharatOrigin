export interface ArtisanHero {
  badge: string;
  title: string;
  subtitle: string;
  bharatScore: number;
  tagline: string;
}

export interface ArtisanStat {
  value: string;
  label: string;
  icon: string;
}

export interface ArtisanCategory {
  id: number;
  name: string;
  icon: string;
  count: number;
}

export interface ArtisanProduct {
  id: number;
  name: string;
  artisan: string;
  craft: string;
  location: string;
  price: number;
  originalPrice: number;
  giTag: boolean;
  bharatScore: number;
  rating: number;
  reviews: number;
  image: string;
  accent: string;
  category: string;
  verified: boolean;
  story: string;
}

export interface ArtisanValue {
  icon: string;
  title: string;
  desc: string;
}

export interface ArtisansData {
  hero: ArtisanHero;
  stats: ArtisanStat[];
  categories: ArtisanCategory[];
  products: ArtisanProduct[];
  values: ArtisanValue[];
}

export const ARTISANS_DATA: ArtisansData = {
  hero: {
    badge: "100% Verified Artisans",
    title: "Artisans Shopping",
    subtitle:
      "India's exclusive marketplace where every product carries a soul — made by hand, verified at source, delivered with pride.",
    bharatScore: 100,
    tagline: "Direct income. No middlemen. Pure craft.",
  },
  stats: [
    { value: "12,400+", label: "Verified Artisans", icon: "🏺" },
    { value: "340+", label: "GI-Tagged Products", icon: "🏷️" },
    { value: "28", label: "States Represented", icon: "🗺️" },
    { value: "₹0", label: "Middlemen Fees", icon: "✂️" },
  ],
  categories: [
    { id: 1, name: "Handloom Weaves", icon: "🧵", count: 1840 },
    { id: 2, name: "Pottery & Ceramics", icon: "🏺", count: 920 },
    { id: 3, name: "Block Printing", icon: "🎨", count: 670 },
    { id: 4, name: "Woodcraft", icon: "🪵", count: 530 },
    { id: 5, name: "Metalwork", icon: "⚙️", count: 410 },
    { id: 6, name: "Jewellery", icon: "💍", count: 750 },
  ],
  products: [
    {
      id: 1,
      name: "Banarasi Silk Saree",
      artisan: "Ramesh Vishwakarma",
      craft: "Handloom Weaving",
      location: "Varanasi, UP",
      price: 4200,
      originalPrice: 7500,
      giTag: true,
      bharatScore: 100,
      rating: 4.9,
      reviews: 312,
      image: "🥻",
      accent: "#C17F3A",
      category: "Handloom Weaves",
      verified: true,
      story: "5th generation weaver, crafting since 1978.",
    },
    {
      id: 2,
      name: "Blue Pottery Vase",
      artisan: "Fatima Khanam",
      craft: "Blue Pottery",
      location: "Jaipur, RJ",
      price: 890,
      originalPrice: 1400,
      giTag: true,
      bharatScore: 100,
      rating: 4.8,
      reviews: 178,
      image: "🏺",
      accent: "#3A7EC1",
      category: "Pottery & Ceramics",
      verified: true,
      story: "Award-winning artisan, 22 years of mastery.",
    },
    {
      id: 3,
      name: "Madhubani Painting",
      artisan: "Sunita Devi",
      craft: "Madhubani Art",
      location: "Madhubani, BR",
      price: 2100,
      originalPrice: 3800,
      giTag: true,
      bharatScore: 100,
      rating: 5.0,
      reviews: 95,
      image: "🖼️",
      accent: "#C14B3A",
      category: "Block Printing",
      verified: true,
      story: "National award recipient, rural women collective.",
    },
    {
      id: 4,
      name: "Channapatna Wooden Toy",
      artisan: "Krishnamurthy G.",
      craft: "Lacquer Woodcraft",
      location: "Channapatna, KA",
      price: 480,
      originalPrice: 800,
      giTag: true,
      bharatScore: 100,
      rating: 4.7,
      reviews: 420,
      image: "🪆",
      accent: "#3AC17A",
      category: "Woodcraft",
      verified: true,
      story: "Eco-friendly lacquer, 3rd generation artisan.",
    },
    {
      id: 5,
      name: "Dhokra Brass Figurine",
      artisan: "Lalji Shilpi",
      craft: "Lost-Wax Casting",
      location: "Bastar, CG",
      price: 1650,
      originalPrice: 2800,
      giTag: false,
      bharatScore: 100,
      rating: 4.9,
      reviews: 214,
      image: "🗿",
      accent: "#9C7C3A",
      category: "Metalwork",
      verified: true,
      story: "Ancient Dhokra tradition, tribal artisan family.",
    },
    {
      id: 6,
      name: "Kolhapuri Chappal",
      artisan: "Suresh Kamble",
      craft: "Leather Craft",
      location: "Kolhapur, MH",
      price: 1100,
      originalPrice: 1900,
      giTag: true,
      bharatScore: 100,
      rating: 4.8,
      reviews: 567,
      image: "👡",
      accent: "#8B3AC1",
      category: "Leather",
      verified: true,
      story: "Handstitched using traditional vegetable tanning.",
    },
  ],
  values: [
    {
      icon: "🤝",
      title: "Direct to Doorstep",
      desc: "Artisan ships directly to you. Zero warehousing, zero margin cuts.",
    },
    {
      icon: "✅",
      title: "100 Bharat Score",
      desc: "Every product scores 100 — fully Indian craft, local materials, local hands.",
    },
    {
      icon: "🏷️",
      title: "GI-Tag Integrity",
      desc: "Geographical Indication tags verified against government registry.",
    },
    {
      icon: "📖",
      title: "Craft Story",
      desc: "Every listing carries the artisan's story, technique, and heritage.",
    },
  ],
};
