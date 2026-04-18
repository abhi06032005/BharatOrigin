export type IndianAlternative = {
  name: string;
  brand: string;
  why: string;
  price: string;
  bharat_score: number;
  shop_url: string;         // Amazon/Flipkart/brand link
  image_url: string;
};

export type Product = {
  name: string;
  score: number;
  brand: string;
  owner: string;
  isIndian: boolean;        // NEW — drives the alert UI
  indianShare: number;
  foreignShare: number;
  origin: string;
  category: string;
  ingredients: string;
  sustainability: string;
  founded?: string;
  headquarters?: string;
  revenue?: string;
  employees?: string;
  about?: string;
  alternatives?: IndianAlternative[]; // NEW — shown when isIndian = false
};

export const PRODUCT_DATA: Record<string, Product> = {

  // ── INDIAN PRODUCTS ───────────────────────────────────────────────────────
  "890607779032": {
    name: "Mamaearth Turmeric Facewash",
    score: 92,
    brand: "Honasa Consumer Ltd",
    owner: "Indian Majority Owned",
    isIndian: true,
    indianShare: 78,
    foreignShare: 22,
    origin: "India (Bhiwadi Plant)",
    category: "Personal Care",
    ingredients: "Turmeric, Niacinamide, Rice Water",
    sustainability: "Plastic Positive Brand",
    founded: "2016",
    headquarters: "Gurugram, Haryana",
    revenue: "₹1,900+ Cr",
    employees: "900+",
    about: "Mamaearth is one of India's fastest growing personal care brands focused on toxin-free and natural products.",
  },

  // ── NON-INDIAN PRODUCTS ───────────────────────────────────────────────────

  // Dove Soap — multiple common Indian barcodes
  "8901030866532": {
    name: "Dove Beauty Bar Soap",
    score: 28,
    brand: "Unilever",
    owner: "Foreign Owned (UK/Netherlands)",
    isIndian: false,
    indianShare: 12,
    foreignShare: 88,
    origin: "India (Unilever Regional Plant)",
    category: "Personal Care · Soap",
    ingredients: "Synthetic Surfactants, Sodium Lauryl Sulfate, Fragrance",
    sustainability: "Low — multinational profit outflow",
    founded: "1957",
    headquarters: "London, United Kingdom",
    revenue: "$60B+ (Unilever Group)",
    employees: "1,50,000+ (Global)",
    about: "Dove is a global personal care brand by Unilever PLC. While manufactured in India, profits and IP ownership flow to the UK parent company, contributing to capital outflow.",
    alternatives: [
      {
        name: "Khadi Natural Sandalwood Soap",
        brand: "Khadi Natural",
        why: "100% Ayurvedic, handmade, profit stays in India. Gentle on skin with natural sandalwood.",
        price: "₹65",
        bharat_score: 96,
        shop_url: "https://www.amazon.in/s?k=khadi+natural+sandalwood+soap",
        image_url: "",
      },
      {
        name: "Biotique Bio Honey Gel Soap",
        brand: "Biotique",
        why: "Himalayan herbs, 100% botanical. Indian company, Ayurveda-certified, no SLS.",
        price: "₹75",
        bharat_score: 91,
        shop_url: "https://www.amazon.in/s?k=biotique+honey+soap",
        image_url: "",
      },
      {
        name: "Forest Essentials Mashobra Honey Soap",
        brand: "Forest Essentials",
        why: "Luxury Indian Ayurvedic soap. Pure ghee base, no synthetic chemicals, cold-processed.",
        price: "₹375",
        bharat_score: 95,
        shop_url: "https://www.forestessentialsindia.com/",
        image_url: "",
      },

    ],
  },

  // Dove Shampoo
  "6281006438842": {
    name: "Dove Intense Repair Shampoo",
    score: 30,
    brand: "Unilever",
    owner: "Foreign Owned (UK/Netherlands)",
    isIndian: false,
    indianShare: 18,
    foreignShare: 82,
    origin: "India (Regional Plant)",
    category: "Personal Care · Hair Care",
    ingredients: "Sodium Lauryl Sulfate, Synthetic Fragrance, Silicones",
    sustainability: "Moderate Eco Impact",
    founded: "1957",
    headquarters: "London, United Kingdom",
    revenue: "$60B+ (Unilever Group)",
    employees: "1,00,000+",
    about: "Dove is a global beauty and hygiene brand owned by Unilever, operating in many countries. Capital generated flows to the UK parent company.",
    alternatives: [
      {
        name: "Biotique Bio Kelp Protein Shampoo",
        brand: "Biotique",
        why: "100% botanical extracts, no SLS/parabens. Indian brand, Ayurveda-certified for hair fall.",
        price: "₹249",
        bharat_score: 86,
        shop_url: "https://www.amazon.in/s?k=biotique+bio+kelp+shampoo",
        image_url: "https://m.media-amazon.com/images/I/71QRRCE9H4L._SL1500_.jpg",
      },
      {
        name: "Khadi Natural Herbal Shampoo",
        brand: "Khadi Natural",
        why: "Herbal blend of Bhringraj and Amla. Supports Indian artisan economy.",
        price: "₹195",
        bharat_score: 94,
        shop_url: "https://www.amazon.in/s?k=khadi+natural+herbal+shampoo",
        image_url: "https://m.media-amazon.com/images/I/71x0mf4J5qL._SL1500_.jpg",
      },
      {
        name: "Mamaearth Onion Hair Fall Control Shampoo",
        brand: "Mamaearth",
        why: "Sulfate-free, Onion + Biotin formula. India's fastest-growing toxin-free brand.",
        price: "₹349",
        bharat_score: 82,
        shop_url: "https://www.amazon.in/s?k=mamaearth+onion+shampoo",
        image_url: "https://m.media-amazon.com/images/I/71-9C3lf9SL._SL1500_.jpg",
      },
    ],
  },
};
