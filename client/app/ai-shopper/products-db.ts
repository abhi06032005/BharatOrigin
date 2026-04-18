// ─── AI Shopper Product Database ─────────────────────────────────────────────
// Hard-coded Indian brand products for the AI Personal Shopper feature

export interface ShopperProduct {
  id: number;
  name: string;
  brand: string;
  description: string;
  price: number;
  originalPrice: number;
  category: string;
  subCategory: string;
  image: string;
  bharatScore: number;
  rating: number;
  reviews: number;
  inStock: boolean;
  tags: string[];
  state: string;
  material?: string;
  gender?: 'Men' | 'Women' | 'Unisex';
}

const PRODUCTS: ShopperProduct[] = [
  // ─── Footwear ────────────────────────────────────────────────────────────────
  {
    id: 101,
    name: "Campus Oxyfit Running Shoes",
    brand: "Campus",
    description: "Lightweight mesh running shoes with memory foam insole. Perfect for daily jogs and workouts.",
    price: 1499,
    originalPrice: 2499,
    category: "Footwear",
    subCategory: "Running Shoes",
    image: "https://res.cloudinary.com/dry9radjq/image/upload/v1776536601/lateral-min_cf53a3c7-3512-4188-bf6a-8927180f450e_shttkk.webp",
    bharatScore: 82,
    rating: 4.3,
    reviews: 2847,
    inStock: true,
    tags: ["Bestseller", "Lightweight"],
    state: "Uttar Pradesh",
    material: "Mesh & EVA",
    gender: "Men"
  },
  {
    id: 102,
    name: "Sparx SM-9019 Sports Shoes",
    brand: "Sparx",
    description: "Durable phylon sole sports shoes with breathable upper. Great for casual and sportswear.",
    price: 899,
    originalPrice: 1399,
    category: "Footwear",
    subCategory: "Sports Shoes",
    image: "https://res.cloudinary.com/demo/image/upload/shoes.jpg",
    bharatScore: 78,
    rating: 4.1,
    reviews: 5623,
    inStock: true,
    tags: ["Budget Friendly"],
    state: "Delhi",
    material: "Synthetic & Phylon",
    gender: "Men"
  },
  {
    id: 103,
    name: "Bata Comfit Women's Sandals",
    brand: "Bata",
    description: "Premium comfort sandals with cushioned footbed. Elegant design for office and casual wear.",
    price: 1299,
    originalPrice: 1799,
    category: "Footwear",
    subCategory: "Sandals",
    image: "https://res.cloudinary.com/demo/image/upload/accessories-bag.jpg",
    bharatScore: 75,
    rating: 4.2,
    reviews: 1893,
    inStock: true,
    tags: ["Comfort Fit"],
    state: "West Bengal",
    material: "Leather & PU",
    gender: "Women"
  },
  {
    id: 104,
    name: "Woodland Khaki Sneakers",
    brand: "Woodland",
    description: "Rugged outdoor sneakers with genuine leather upper and anti-skid rubber sole.",
    price: 1899,
    originalPrice: 3295,
    category: "Footwear",
    subCategory: "Sneakers",
    image: "https://res.cloudinary.com/demo/image/upload/face_top.jpg",
    bharatScore: 85,
    rating: 4.5,
    reviews: 3412,
    inStock: true,
    tags: ["Premium", "Outdoor"],
    state: "Uttar Pradesh",
    material: "Genuine Leather",
    gender: "Men"
  },
  {
    id: 105,
    name: "Liberty Gliders Walking Shoes",
    brand: "Liberty",
    description: "Ultra-light walking shoes with air cushion technology. Designed for all-day comfort.",
    price: 1199,
    originalPrice: 1799,
    category: "Footwear",
    subCategory: "Walking Shoes",
    image: "https://res.cloudinary.com/demo/image/upload/samples/ecommerce/analog-classic.jpg",
    bharatScore: 80,
    rating: 4.0,
    reviews: 1267,
    inStock: true,
    tags: ["Light Weight"],
    state: "Haryana",
    material: "Synthetic Mesh",
    gender: "Unisex"
  },
  {
    id: 106,
    name: "Kolhapuri Chappal Premium",
    brand: "Kolhapuri Artisans",
    description: "Genuine handcrafted leather Kolhapuri footwear with vegetable-tanned leather and brass buckle.",
    price: 1499,
    originalPrice: 2000,
    category: "Footwear",
    subCategory: "Traditional",
    image: "https://res.cloudinary.com/demo/image/upload/samples/ecommerce/leather-bag-gray.jpg",
    bharatScore: 95,
    rating: 4.7,
    reviews: 876,
    inStock: true,
    tags: ["GI Tagged", "Handmade"],
    state: "Maharashtra",
    material: "Vegetable Tanned Leather",
    gender: "Men"
  },
  {
    id: 107,
    name: "Red Tape Casual Loafers",
    brand: "Red Tape",
    description: "Modern casual loafers with premium suede finish and memory foam cushioning.",
    price: 1599,
    originalPrice: 2999,
    category: "Footwear",
    subCategory: "Loafers",
    image: "https://res.cloudinary.com/demo/image/upload/samples/ecommerce/shoes.png",
    bharatScore: 72,
    rating: 4.2,
    reviews: 2134,
    inStock: true,
    tags: ["Premium", "Formal"],
    state: "Haryana",
    material: "Suede Leather",
    gender: "Men"
  },

  // ─── Clothing ────────────────────────────────────────────────────────────────
  {
    id: 201,
    name: "Fabindia Cotton Kurta",
    brand: "FabIndia",
    description: "Handwoven cotton kurta with natural indigo dye. Breathable fabric perfect for Indian summers.",
    price: 1899,
    originalPrice: 2800,
    category: "Clothing",
    subCategory: "Kurta",
    image: "https://res.cloudinary.com/demo/image/upload/shoes.jpg",
    bharatScore: 91,
    rating: 4.6,
    reviews: 987,
    inStock: true,
    tags: ["Organic", "Handwoven"],
    state: "Rajasthan",
    material: "Handloom Cotton",
    gender: "Men"
  },
  {
    id: 202,
    name: "Allen Solly Chinos",
    brand: "Allen Solly",
    description: "Slim-fit stretchable chinos with wrinkle-free finish. Smart casual essential.",
    price: 1499,
    originalPrice: 2499,
    category: "Clothing",
    subCategory: "Trousers",
    image: "https://res.cloudinary.com/demo/image/upload/accessories-bag.jpg",
    bharatScore: 68,
    rating: 4.3,
    reviews: 3456,
    inStock: true,
    tags: ["Formal"],
    state: "Karnataka",
    material: "Cotton Blend",
    gender: "Men"
  },
  {
    id: 203,
    name: "W Women's Anarkali Kurti",
    brand: "W (TCNS)",
    description: "Elegant Anarkali kurti with block-printed design. Flowy silhouette with golden lace border.",
    price: 1799,
    originalPrice: 2599,
    category: "Clothing",
    subCategory: "Kurti",
    image: "https://res.cloudinary.com/demo/image/upload/face_top.jpg",
    bharatScore: 84,
    rating: 4.5,
    reviews: 2178,
    inStock: true,
    tags: ["Ethnic", "Bestseller"],
    state: "Rajasthan",
    material: "Rayon",
    gender: "Women"
  },
  {
    id: 204,
    name: "Khadi India White Shirt",
    brand: "Khadi India",
    description: "Pure khadi hand-spun cotton shirt. Supporting Indian village artisans with every purchase.",
    price: 1299,
    originalPrice: 1800,
    category: "Clothing",
    subCategory: "Shirt",
    image: "https://res.cloudinary.com/demo/image/upload/samples/ecommerce/analog-classic.jpg",
    bharatScore: 97,
    rating: 4.4,
    reviews: 645,
    inStock: true,
    tags: ["Swadeshi", "Handspun"],
    state: "Gujarat",
    material: "Pure Khadi",
    gender: "Unisex"
  },

  // ─── Electronics & Accessories ───────────────────────────────────────────────
  {
    id: 301,
    name: "boAt Airdopes 141",
    brand: "boAt",
    description: "True wireless earbuds with 42H playtime, ENx noise cancellation, and ASAP charge. IPX4 rated.",
    price: 1299,
    originalPrice: 4490,
    category: "Electronics",
    subCategory: "Earbuds",
    image: "https://res.cloudinary.com/demo/image/upload/samples/ecommerce/leather-bag-gray.jpg",
    bharatScore: 76,
    rating: 4.1,
    reviews: 45231,
    inStock: true,
    tags: ["Bestseller", "IPX4"],
    state: "Maharashtra",
    gender: "Unisex"
  },
  {
    id: 302,
    name: "Noise ColorFit Pro 4",
    brand: "Noise",
    description: "Smart watch with 1.72\" TruView display, Bluetooth calling, and 7-day battery life.",
    price: 1999,
    originalPrice: 5999,
    category: "Electronics",
    subCategory: "Smartwatch",
    image: "https://res.cloudinary.com/demo/image/upload/samples/ecommerce/shoes.png",
    bharatScore: 73,
    rating: 4.0,
    reviews: 12456,
    inStock: true,
    tags: ["Smart Tech"],
    state: "Delhi",
    gender: "Unisex"
  },
  {
    id: 303,
    name: "Fire-Boltt Phoenix Ultra",
    brand: "Fire-Boltt",
    description: "Premium smartwatch with AMOLED display, always-on display, and 120+ sports modes.",
    price: 1799,
    originalPrice: 8999,
    category: "Electronics",
    subCategory: "Smartwatch",
    image: "https://res.cloudinary.com/demo/image/upload/shoes.jpg",
    bharatScore: 70,
    rating: 4.2,
    reviews: 8934,
    inStock: true,
    tags: ["AMOLED"],
    state: "Delhi",
    gender: "Unisex"
  },

  // ─── Beauty & Personal Care ──────────────────────────────────────────────────
  {
    id: 401,
    name: "Mamaearth Vitamin C Face Serum",
    brand: "Mamaearth",
    description: "Natural vitamin C serum with turmeric extract. Brightens skin and reduces dark spots.",
    price: 599,
    originalPrice: 999,
    category: "Beauty",
    subCategory: "Skincare",
    image: "https://res.cloudinary.com/demo/image/upload/accessories-bag.jpg",
    bharatScore: 82,
    rating: 4.3,
    reviews: 34567,
    inStock: true,
    tags: ["Natural", "Toxin Free"],
    state: "Haryana",
    gender: "Unisex"
  },
  {
    id: 402,
    name: "Forest Essentials Soundarya Cream",
    brand: "Forest Essentials",
    description: "Luxury Ayurvedic night cream with 24K gold and Saffron. Rejuvenates and firms skin overnight.",
    price: 1950,
    originalPrice: 2875,
    category: "Beauty",
    subCategory: "Skincare",
    image: "https://res.cloudinary.com/demo/image/upload/face_top.jpg",
    bharatScore: 93,
    rating: 4.7,
    reviews: 2341,
    inStock: true,
    tags: ["Luxury", "Ayurvedic"],
    state: "Delhi",
    material: "Natural Ingredients",
    gender: "Women"
  },
  {
    id: 403,
    name: "Biotique Bio Kelp Shampoo",
    brand: "Biotique",
    description: "Protein-rich kelp shampoo for falling hair. 100% botanical extracts, no SLS/parabens.",
    price: 249,
    originalPrice: 399,
    category: "Beauty",
    subCategory: "Hair Care",
    image: "https://res.cloudinary.com/demo/image/upload/samples/ecommerce/analog-classic.jpg",
    bharatScore: 86,
    rating: 4.1,
    reviews: 8765,
    inStock: true,
    tags: ["Organic", "SLS Free"],
    state: "Himachal Pradesh",
    gender: "Unisex"
  },

  // ─── Home & Kitchen ──────────────────────────────────────────────────────────
  {
    id: 501,
    name: "Milton Thermosteel Flask 1L",
    brand: "Milton",
    description: "Double-walled vacuum insulated flask. Keeps hot for 24 hrs and cold for 48 hrs.",
    price: 799,
    originalPrice: 1449,
    category: "Home",
    subCategory: "Kitchen",
    image: "https://res.cloudinary.com/demo/image/upload/samples/ecommerce/leather-bag-gray.jpg",
    bharatScore: 88,
    rating: 4.4,
    reviews: 15678,
    inStock: true,
    tags: ["Bestseller"],
    state: "Gujarat",
    material: "Stainless Steel",
    gender: "Unisex"
  },
  {
    id: 502,
    name: "Prestige Iris 750W Mixer Grinder",
    brand: "Prestige",
    description: "750W copper motor mixer grinder with 3 SS jars. Anti-slip feet and speed control.",
    price: 1999,
    originalPrice: 3695,
    category: "Home",
    subCategory: "Appliances",
    image: "https://res.cloudinary.com/demo/image/upload/samples/ecommerce/shoes.png",
    bharatScore: 90,
    rating: 4.5,
    reviews: 9876,
    inStock: true,
    tags: ["Premium", "Copper Motor"],
    state: "Karnataka",
    material: "Stainless Steel & ABS",
    gender: "Unisex"
  },

  // ─── Bags & Accessories ──────────────────────────────────────────────────────
  {
    id: 601,
    name: "Wildcraft Meteor Backpack 35L",
    brand: "Wildcraft",
    description: "Adventure-ready backpack with rain cover, laptop sleeve, and breathable back panel.",
    price: 1649,
    originalPrice: 2499,
    category: "Accessories",
    subCategory: "Backpack",
    image: "https://res.cloudinary.com/demo/image/upload/shoes.jpg",
    bharatScore: 81,
    rating: 4.3,
    reviews: 5432,
    inStock: true,
    tags: ["Outdoor", "Rain Cover"],
    state: "Karnataka",
    material: "Polyester",
    gender: "Unisex"
  },
  {
    id: 602,
    name: "Hidesign Leather Messenger Bag",
    brand: "Hidesign",
    description: "Handcrafted vegetable-tanned leather messenger bag. Classic design with brass hardware.",
    price: 3999,
    originalPrice: 5995,
    category: "Accessories",
    subCategory: "Bags",
    image: "https://res.cloudinary.com/demo/image/upload/accessories-bag.jpg",
    bharatScore: 92,
    rating: 4.6,
    reviews: 1234,
    inStock: true,
    tags: ["Premium", "Handcrafted"],
    state: "Tamil Nadu",
    material: "Genuine Leather",
    gender: "Unisex"
  },
  {
    id: 603,
    name: "Titan Karishma Analog Watch",
    brand: "Titan",
    description: "Classic analog watch with stainless steel case and leather strap. Day-date display.",
    price: 1895,
    originalPrice: 2495,
    category: "Accessories",
    subCategory: "Watch",
    image: "https://res.cloudinary.com/demo/image/upload/face_top.jpg",
    bharatScore: 89,
    rating: 4.5,
    reviews: 7654,
    inStock: true,
    tags: ["Classic", "Bestseller"],
    state: "Karnataka",
    material: "Stainless Steel & Leather",
    gender: "Men"
  },
  {
    id: 604,
    name: "Fastrack Reflex Fitness Band",
    brand: "Fastrack",
    description: "Slim fitness band with heart rate monitor, sleep tracker, and 10-day battery.",
    price: 1495,
    originalPrice: 2495,
    category: "Electronics",
    subCategory: "Fitness Band",
    image: "https://res.cloudinary.com/demo/image/upload/samples/ecommerce/analog-classic.jpg",
    bharatScore: 83,
    rating: 4.0,
    reviews: 4321,
    inStock: true,
    tags: ["Fitness"],
    state: "Karnataka",
    gender: "Unisex"
  },

  // ─── Food & Beverages ────────────────────────────────────────────────────────
  {
    id: 701,
    name: "Organic India Tulsi Green Tea",
    brand: "Organic India",
    description: "Premium blend of organic tulsi and green tea. Rich in antioxidants. 25 infusion bags.",
    price: 199,
    originalPrice: 325,
    category: "Food",
    subCategory: "Beverages",
    image: "https://res.cloudinary.com/demo/image/upload/samples/ecommerce/leather-bag-gray.jpg",
    bharatScore: 94,
    rating: 4.6,
    reviews: 12345,
    inStock: true,
    tags: ["Organic", "Health"],
    state: "Uttar Pradesh",
    gender: "Unisex"
  },
  {
    id: 702,
    name: "Paper Boat Aam Panna (Pack of 6)",
    brand: "Paper Boat",
    description: "Traditional Indian raw mango drink. No artificial flavors or preservatives. Nostalgic taste.",
    price: 180,
    originalPrice: 240,
    category: "Food",
    subCategory: "Beverages",
    image: "https://res.cloudinary.com/demo/image/upload/samples/ecommerce/shoes.png",
    bharatScore: 79,
    rating: 4.4,
    reviews: 8765,
    inStock: true,
    tags: ["Nostalgic", "Natural"],
    state: "Karnataka",
    gender: "Unisex"
  },
];

export default PRODUCTS;

// ─── AI Matching Logic ───────────────────────────────────────────────────────

export interface MatchResult {
  product: ShopperProduct;
  relevanceScore: number;
  matchReasons: string[];
}

// Filler words to ignore during keyword matching
const FILLER_WORDS = new Set([
  'need', 'want', 'looking', 'find', 'show', 'get', 'buy', 'search',
  'best', 'good', 'nice', 'great', 'top', 'awesome',
  'indian', 'india', 'bharat', 'desi', 'swadeshi', 'local',
  'please', 'can', 'you', 'the', 'for', 'and', 'with', 'from',
  'some', 'any', 'like', 'something', 'recommend', 'suggest',
  'under', 'below', 'above', 'less', 'more', 'than', 'budget',
  'upto', 'max', 'min', 'price', 'range', 'cheap', 'affordable',
  'premium', 'luxury', 'quality', 'branded', 'brand',
]);

// Category detection — each entry has keywords, and subcategory-level keywords
const CATEGORY_RULES: {
  category: string;
  keywords: string[];
  subKeywords: Record<string, string[]>;
  excludeIf?: string[]; // don't match this category if these words present
}[] = [
    {
      category: 'Footwear',
      keywords: ['shoe', 'shoes', 'footwear', 'sneaker', 'sneakers', 'chappal', 'chappals',
        'sandal', 'sandals', 'loafer', 'loafers', 'juta', 'joota', 'boots', 'slipper', 'slippers',
        'running shoes', 'sports shoes', 'walking shoes', 'casual shoes', 'formal shoes'],
      subKeywords: {
        'Running Shoes': ['running', 'jog', 'jogging', 'gym', 'workout'],
        'Sports Shoes': ['sports', 'athletic', 'sporty'],
        'Sneakers': ['sneaker', 'sneakers', 'casual'],
        'Sandals': ['sandal', 'sandals', 'open toe'],
        'Loafers': ['loafer', 'loafers', 'slip on', 'formal'],
        'Traditional': ['chappal', 'chappals', 'kolhapuri', 'traditional', 'ethnic', 'handmade'],
        'Walking Shoes': ['walking', 'comfort', 'daily wear'],
      },
    },
    {
      category: 'Clothing',
      keywords: ['clothes', 'clothing', 'kurta', 'kurtas', 'shirt', 'shirts', 'kurti', 'kurtis',
        'chinos', 'trousers', 'pants', 'dress', 'dresses', 'apparel', 'kapde',
        'ethnic wear', 'western wear', 'traditional wear', 'outfit', 'outfits',
        'anarkali', 'khadi', 'saree', 'dupatta'],
      subKeywords: {
        'Kurta': ['kurta', 'kurtas', 'ethnic', 'traditional'],
        'Kurti': ['kurti', 'kurtis', 'anarkali', 'ethnic wear'],
        'Shirt': ['shirt', 'shirts', 'formal', 'khadi'],
        'Trousers': ['chinos', 'trousers', 'pants'],
      },
      excludeIf: ['shoe', 'shoes', 'footwear'], // "ethnic wear" shouldn't also match shoes
    },
    {
      category: 'Electronics',
      keywords: ['earbuds', 'earphones', 'earphone', 'headphone', 'headphones', 'tws',
        'smartwatch', 'smart watch', 'fitness band', 'fitness tracker',
        'gadget', 'gadgets', 'tech', 'electronics', 'wireless', 'bluetooth',
        'boat', 'noise', 'fire-boltt', 'fireboltt', 'fastrack'],
      subKeywords: {
        'Earbuds': ['earbuds', 'earphone', 'earphones', 'tws', 'wireless', 'headphone', 'headphones', 'boat', 'audio', 'music'],
        'Smartwatch': ['smartwatch', 'smart watch', 'watch', 'noise', 'fire-boltt', 'fireboltt'],
        'Fitness Band': ['fitness band', 'fitness tracker', 'band', 'fastrack'],
      },
      excludeIf: ['analog watch', 'leather strap', 'titan'], // distinguish from Accessories watches
    },
    {
      category: 'Beauty',
      keywords: ['beauty', 'skincare', 'skin care', 'serum', 'cream', 'moisturizer',
        'shampoo', 'hair care', 'haircare', 'face wash', 'cosmetic', 'cosmetics',
        'makeup', 'grooming', 'ayurvedic cream', 'face', 'glow',
        'mamaearth', 'biotique', 'forest essentials'],
      subKeywords: {
        'Skincare': ['skincare', 'skin care', 'serum', 'cream', 'moisturizer', 'face', 'glow', 'brightening'],
        'Hair Care': ['shampoo', 'hair', 'haircare', 'hair care', 'conditioner'],
      },
    },
    {
      category: 'Home',
      keywords: ['home', 'kitchen', 'flask', 'bottle', 'mixer', 'grinder', 'utensil', 'utensils',
        'appliance', 'appliances', 'cooking', 'thermos', 'steel', 'cookware',
        'milton', 'prestige'],
      subKeywords: {
        'Kitchen': ['flask', 'bottle', 'thermos', 'steel', 'milton', 'water'],
        'Appliances': ['mixer', 'grinder', 'blender', 'prestige', 'appliance', 'appliances', 'cooking'],
      },
    },
    {
      category: 'Accessories',
      keywords: ['bag', 'bags', 'backpack', 'backpacks', 'wallet', 'wallets', 'belt',
        'accessory', 'accessories', 'messenger bag', 'laptop bag', 'trekking',
        'titan', 'hidesign', 'wildcraft', 'analog watch', 'leather bag',
        'handbag', 'purse', 'sling bag'],
      subKeywords: {
        'Backpack': ['backpack', 'backpacks', 'trekking', 'hiking', 'wildcraft', 'rucksack', 'travel bag'],
        'Bags': ['bag', 'bags', 'messenger', 'laptop bag', 'hidesign', 'leather bag', 'handbag', 'purse', 'sling'],
        'Watch': ['titan', 'analog watch', 'wrist watch', 'classic watch'],
      },
    },
    {
      category: 'Food',
      keywords: ['food', 'tea', 'green tea', 'drink', 'drinks', 'beverage', 'beverages',
        'snack', 'snacks', 'masala', 'spice', 'spices', 'organic tea',
        'paper boat', 'organic india', 'chai', 'coffee'],
      subKeywords: {
        'Beverages': ['tea', 'green tea', 'drink', 'drinks', 'chai', 'coffee', 'beverage', 'paper boat', 'aam panna'],
      },
    },
  ];

// Tag-based intent detection
const INTENT_TAGS: Record<string, { tags: string[]; categories?: string[] }> = {
  'gift': { tags: ['Bestseller', 'Premium', 'Handmade', 'GI Tagged', 'Classic'] },
  'gifts': { tags: ['Bestseller', 'Premium', 'Handmade', 'GI Tagged', 'Classic'] },
  'organic': { tags: ['Organic', 'Natural', 'Toxin Free', 'SLS Free', 'Ayurvedic'], categories: ['Beauty', 'Food'] },
  'natural': { tags: ['Organic', 'Natural', 'Toxin Free', 'SLS Free', 'Ayurvedic'], categories: ['Beauty', 'Food'] },
  'handmade': { tags: ['Handmade', 'Handcrafted', 'Handspun', 'Handwoven', 'GI Tagged'] },
  'traditional': { tags: ['GI Tagged', 'Handmade', 'Ethnic', 'Swadeshi'], categories: ['Footwear', 'Clothing'] },
  'ethnic': { tags: ['Ethnic', 'GI Tagged', 'Handmade', 'Swadeshi'], categories: ['Clothing', 'Footwear'] },
  'fitness': { tags: ['Fitness', 'Lightweight', 'Light Weight'], categories: ['Electronics', 'Footwear'] },
  'ayurvedic': { tags: ['Ayurvedic', 'Organic', 'Natural'], categories: ['Beauty'] },
  'eco': { tags: ['Organic', 'Eco', 'Natural'] },
  'cheap': { tags: ['Budget Friendly'] },
  'affordable': { tags: ['Budget Friendly'] },
  'premium': { tags: ['Premium', 'Luxury'] },
  'luxury': { tags: ['Premium', 'Luxury'] },
};

// Gender keywords
const GENDER_KEYWORDS: Record<string, string[]> = {
  'Men': ['men', "men's", 'man', 'male', 'gents', 'boys', 'boy', 'masculine'],
  'Women': ['women', "women's", 'woman', 'female', 'ladies', 'lady', 'girls', 'girl', 'feminine'],
};

export function findMatchingProducts(query: string): MatchResult[] {
  const q = query.toLowerCase().trim();
  const qWords = q.split(/\s+/);

  // ── 1. Extract price constraints ────────────────────────────────────────────
  const priceMatch = q.match(/(?:under|below|less than|max|upto|up to|budget)\s*₹?\s*(\d+)/i);
  const minPriceMatch = q.match(/(?:above|over|more than|min|minimum|atleast|at least)\s*₹?\s*(\d+)/i);
  const maxPrice = priceMatch ? parseInt(priceMatch[1]) : null;
  const minPrice = minPriceMatch ? parseInt(minPriceMatch[1]) : null;

  // ── 2. Detect categories (with conflict resolution) ─────────────────────────
  let detectedCategories: string[] = [];
  const categoryScores: Record<string, number> = {};

  for (const rule of CATEGORY_RULES) {
    // Check if this category should be excluded
    if (rule.excludeIf && rule.excludeIf.some(ex => q.includes(ex))) continue;

    let catScore = 0;
    // Multi-word keywords first (higher priority)
    const multiWordKws = rule.keywords.filter(kw => kw.includes(' '));
    const singleWordKws = rule.keywords.filter(kw => !kw.includes(' '));

    for (const kw of multiWordKws) {
      if (q.includes(kw)) catScore += 20; // multi-word matches are very strong
    }
    for (const kw of singleWordKws) {
      // Use word boundary check to avoid partial matches
      const regex = new RegExp(`\\b${kw}\\b`, 'i');
      if (regex.test(q)) catScore += 10;
    }

    if (catScore > 0) {
      categoryScores[rule.category] = catScore;
    }
  }

  // Pick the strongest category matches
  const sortedCats = Object.entries(categoryScores).sort(([, a], [, b]) => b - a);
  if (sortedCats.length > 0) {
    const topScore = sortedCats[0][1];
    // Only include categories with score >= 50% of top score
    detectedCategories = sortedCats
      .filter(([, s]) => s >= topScore * 0.5)
      .map(([c]) => c);
  }

  // ── 3. Detect subcategory preferences ───────────────────────────────────────
  const detectedSubCategories: string[] = [];
  for (const rule of CATEGORY_RULES) {
    if (!detectedCategories.includes(rule.category)) continue;
    for (const [subCat, subKws] of Object.entries(rule.subKeywords)) {
      if (subKws.some(kw => q.includes(kw))) {
        detectedSubCategories.push(subCat);
      }
    }
  }

  // ── 4. Detect gender ───────────────────────────────────────────────────────
  let genderPref: string | null = null;
  for (const [gender, keywords] of Object.entries(GENDER_KEYWORDS)) {
    if (keywords.some(kw => {
      const regex = new RegExp(`\\b${kw}\\b`, 'i');
      return regex.test(q);
    })) {
      genderPref = gender;
    }
  }

  // ── 5. Detect intent tags ──────────────────────────────────────────────────
  let intentTags: string[] = [];
  let intentCategories: string[] = [];
  for (const [keyword, intent] of Object.entries(INTENT_TAGS)) {
    if (q.includes(keyword)) {
      intentTags.push(...intent.tags);
      if (intent.categories) intentCategories.push(...intent.categories);
    }
  }
  intentTags = [...new Set(intentTags)];

  // If intent suggests categories and we haven't detected any, use them
  if (detectedCategories.length === 0 && intentCategories.length > 0) {
    detectedCategories = [...new Set(intentCategories)];
  }

  // ── 6. Extract meaningful search words (excluding fillers) ─────────────────
  const meaningfulWords = qWords.filter(w =>
    w.length > 2 &&
    !FILLER_WORDS.has(w) &&
    !/^\d+$/.test(w) && // skip pure numbers
    !w.startsWith('₹')
  );

  // ── 7. Detect specific brand requests ──────────────────────────────────────
  const allBrands = [...new Set(PRODUCTS.map(p => p.brand.toLowerCase()))];
  const requestedBrands = allBrands.filter(brand =>
    brand.split(/\s+/).some(bw => bw.length > 2 && q.includes(bw))
  );

  // ── 8. Score each product ──────────────────────────────────────────────────
  const hasCategoryFilter = detectedCategories.length > 0;
  const hasSubCategoryFilter = detectedSubCategories.length > 0;

  const results: MatchResult[] = PRODUCTS.map(product => {
    let score = 0;
    const reasons: string[] = [];

    // ▸ Hard price filter
    if (maxPrice && product.price > maxPrice) return null;
    if (minPrice && product.price < minPrice) return null;

    // ▸ Category match (STRICT — this is now a hard filter when category is detected)
    if (hasCategoryFilter) {
      if (detectedCategories.includes(product.category)) {
        score += 40;
      } else {
        return null; // Hard exclude non-matching categories
      }
    }

    // ▸ Subcategory boost
    if (hasSubCategoryFilter) {
      if (detectedSubCategories.includes(product.subCategory)) {
        score += 25;
        reasons.push(`Exact match: ${product.subCategory}`);
      } else {
        score -= 5; // Small penalty for wrong sub-category within the right category
      }
    }

    // ▸ Gender match
    if (genderPref) {
      if (product.gender === genderPref) {
        score += 15;
        reasons.push(`Perfect for ${genderPref}`);
      } else if (product.gender === 'Unisex') {
        score += 8;
        reasons.push('Suitable for everyone');
      } else {
        score -= 25; // Strong penalty for wrong gender
      }
    }

    // ▸ Brand match
    const brandLower = product.brand.toLowerCase();
    if (requestedBrands.length > 0) {
      if (requestedBrands.some(rb => brandLower.includes(rb) || rb.includes(brandLower))) {
        score += 35;
        reasons.push(`Matches brand "${product.brand}"`);
      }
    }

    // ▸ Intent tag match
    if (intentTags.length > 0) {
      const matchedTags = product.tags.filter(t => intentTags.includes(t));
      if (matchedTags.length > 0) {
        score += matchedTags.length * 8;
        reasons.push(`${matchedTags[0]} product`);
      }
    }

    // ▸ Meaningful word matches (name, subcategory, material)
    const nameL = product.name.toLowerCase();
    const descL = product.description.toLowerCase();
    const subCatL = product.subCategory.toLowerCase();
    const materialL = (product.material || '').toLowerCase();

    for (const w of meaningfulWords) {
      if (nameL.includes(w)) score += 10;
      if (subCatL.includes(w)) score += 12;
      if (materialL.includes(w)) score += 6;
      // Only slight boost for description matches to avoid noise
      if (descL.includes(w) && !nameL.includes(w)) score += 2;
    }

    // ▸ Price value scoring (only when budget is specified)
    if (maxPrice) {
      const priceRatio = product.price / maxPrice;
      if (priceRatio <= 0.5) {
        score += 5;
        reasons.push("Great value — well within budget");
      } else if (priceRatio <= 0.8) {
        score += 10;
        reasons.push("Sweet spot pricing");
      } else {
        score += 3;
        reasons.push("Within your budget");
      }
    }

    // ▸ Quality signals (small tiebreakers)
    if (product.bharatScore >= 90) {
      score += 4;
      if (reasons.length === 0 || !reasons.some(r => r.includes('Bharat')))
        reasons.push(`High Bharat Score: ${product.bharatScore}`);
    } else if (product.bharatScore >= 80) {
      score += 2;
    }

    if (product.rating >= 4.5) {
      score += 3;
      reasons.push(`Highly rated: ${product.rating}★`);
    }

    if (product.reviews > 10000) {
      score += 2;
      reasons.push("Very popular choice");
    } else if (product.reviews > 3000) {
      score += 1;
    }

    // ▸ Discount tiebreaker
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    if (discount >= 40) {
      score += 4;
      reasons.push(`${discount}% off — amazing deal!`);
    } else if (discount >= 25) {
      score += 2;
      reasons.push(`${discount}% off`);
    }

    // Ensure at least one reason
    if (reasons.length === 0) {
      reasons.push(`Available from ${product.brand}`);
    }

    return { product, relevanceScore: score, matchReasons: reasons };
  }).filter((r): r is MatchResult => r !== null && r.relevanceScore > 0)
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, 6);

  // ── 9. Fallback: if no results and we had a budget, show top-rated in budget ─
  if (results.length === 0 && maxPrice) {
    const inBudget = PRODUCTS
      .filter(p => p.price <= maxPrice && p.inStock)
      .sort((a, b) => b.rating - a.rating || b.bharatScore - a.bharatScore)
      .slice(0, 6)
      .map(product => ({
        product,
        relevanceScore: 10,
        matchReasons: [`Top-rated within ₹${maxPrice.toLocaleString('en-IN')}`],
      }));
    return inBudget;
  }

  // ── 10. Fallback: generic "gifts" or no category — top products ────────────
  if (results.length === 0 && !hasCategoryFilter) {
    const topPicks = PRODUCTS
      .filter(p => p.inStock)
      .sort((a, b) => b.bharatScore - a.bharatScore + (b.rating - a.rating) * 5)
      .slice(0, 6)
      .map(product => ({
        product,
        relevanceScore: 5,
        matchReasons: ['Top-rated Indian brand product'],
      }));
    return topPicks;
  }

  return results;
}

// ─── Suggestion Chips ────────────────────────────────────────────────────────

export const SUGGESTION_CHIPS = [
  "Need Indian shoes under ₹2000",
  "Best earbuds under ₹1500",
  "Ethnic wear for women",
  "Smartwatch under ₹2000",
  "Organic skincare products",
  "Gifts under ₹1000",
  "Khadi shirts for men",
  "Backpack for trekking",
  "Kitchen appliances under ₹2000",
  "Handmade leather bag",
];

// ─── AI Response Templates ───────────────────────────────────────────────────

export function generateAIResponse(query: string, results: MatchResult[]): string {
  if (results.length === 0) {
    return `I couldn't find exact matches for "${query}" in our Indian brands collection right now. Try searching for categories like shoes, kurtas, earbuds, skincare, or kitchen items — all from proudly Indian brands! 🇮🇳`;
  }

  const q = query.toLowerCase();
  const priceMatch = q.match(/(?:under|below|less than|max|upto|up to|budget)\s*₹?\s*(\d+)/i);
  const budget = priceMatch ? `₹${parseInt(priceMatch[1]).toLocaleString('en-IN')}` : null;

  const topBrands = [...new Set(results.map(r => r.product.brand))].slice(0, 3).join(', ');
  const categories = [...new Set(results.map(r => r.product.category))];
  const avgScore = Math.round(results.reduce((s, r) => s + r.product.bharatScore, 0) / results.length);
  const cheapest = Math.min(...results.map(r => r.product.price));
  const priciest = Math.max(...results.map(r => r.product.price));

  let response = '';

  // Contextual opening based on what was asked
  if (categories.length === 1) {
    const cat = categories[0];
    const catEmoji: Record<string, string> = {
      'Footwear': '👟', 'Clothing': '👔', 'Electronics': '🎧',
      'Beauty': '✨', 'Home': '🏠', 'Accessories': '🎒', 'Food': '🍵',
    };
    response += `${catEmoji[cat] || '🛍️'} `;
  }

  response += `Found **${results.length} products** from Indian brands like **${topBrands}**`;
  if (budget) response += ` within your budget of **${budget}**`;
  response += `.`;

  // Price range info
  if (results.length > 1 && cheapest !== priciest) {
    response += ` Prices range from **₹${cheapest.toLocaleString('en-IN')}** to **₹${priciest.toLocaleString('en-IN')}**.`;
  }

  // Bharat Score info
  response += ` Average Bharat Score: **${avgScore}/100** 🇮🇳`;

  response += `\n\nHere are my top picks for you:`;

  return response;
}
