'use client';
import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import productsData from './products.json';
import brandProductsData from './brand-products.json';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  image: string;
  category: string;
  state: string;
  bharatScore: number;
  rating: number;
  reviews: number;
  inStock: boolean;
  tag: string;
}

interface CartItem extends Product {
  quantity: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const getBharatScoreMeta = (score: number) => {
  if (score < 50) return { dot: '#EF4444', bg: '#FEF2F2', text: '#DC2626', label: 'Low' };
  if (score < 75) return { dot: '#F59E0B', bg: '#FFFBEB', text: '#D97706', label: 'Mid' };
  return { dot: '#22C55E', bg: '#F0FDF4', text: '#16A34A', label: 'High' };
};

const ALL_CATEGORIES = ['All', ...Array.from(new Set((productsData as Product[]).map(p => p.category)))];

// ─── Reverse Amazon: Foreign Brand → Indian Alternative Mapping ───────────────

interface ForeignBrandMatch {
  foreign: string;
  country: string;
  logo: string; // emoji
  category: string;
  indianBrands: {
    name: string;
    why: string;
    categories: string[]; // matching product categories in our DB
    searchTerms: string[]; // terms to filter products
  }[];
  funFact: string;
}

const FOREIGN_BRAND_MAP: ForeignBrandMatch[] = [
  // ── Footwear ──
  {
    foreign: 'nike',
    country: 'USA',
    logo: '🇺🇸',
    category: 'Footwear',
    indianBrands: [
      { name: 'Campus', why: '50M+ shoes sold yearly, India\'s #1 sports shoe brand', categories: ['Footwear'], searchTerms: ['campus'] },
      { name: 'Woodland', why: 'Premium leather & outdoor shoes, proudly Indian since 1992', categories: ['Footwear'], searchTerms: ['woodland'] },
      { name: 'Sparx', why: 'Budget sports shoes with 10K+ stores across India', categories: ['Footwear'], searchTerms: ['sparx'] },
      { name: 'Liberty', why: 'India\'s largest footwear company, 6000 Cr+ revenue', categories: ['Footwear'], searchTerms: ['liberty'] },
    ],
    funFact: '₹25,000 Cr leaves India annually for foreign shoe brands. Indian brands offer same quality at 40-60% less!',
  },
  {
    foreign: 'adidas',
    country: 'Germany',
    logo: '🇩🇪',
    category: 'Footwear',
    indianBrands: [
      { name: 'Campus', why: 'India\'s fastest growing sports shoe brand', categories: ['Footwear'], searchTerms: ['campus'] },
      { name: 'Red Tape', why: 'Premium casual & sports shoes, global Indian brand', categories: ['Footwear'], searchTerms: ['red tape'] },
      { name: 'Sparx', why: 'Affordable sporty shoes loved by 10M+ Indians', categories: ['Footwear'], searchTerms: ['sparx'] },
    ],
    funFact: 'Campus Shoes grew 40% YoY, proving Indians prefer quality homegrown brands!',
  },
  {
    foreign: 'puma',
    country: 'Germany',
    logo: '🇩🇪',
    category: 'Footwear',
    indianBrands: [
      { name: 'Campus', why: 'Trendy designs rivaling global brands', categories: ['Footwear'], searchTerms: ['campus'] },
      { name: 'Woodland', why: 'Adventure-ready shoes with genuine leather', categories: ['Footwear'], searchTerms: ['woodland'] },
      { name: 'Liberty', why: 'Comfort-first walking & running shoes', categories: ['Footwear'], searchTerms: ['liberty'] },
    ],
    funFact: 'Liberty Shoes employs 6000+ Indian artisans and exports to 25 countries!',
  },
  {
    foreign: 'reebok',
    country: 'USA',
    logo: '🇺🇸',
    category: 'Footwear',
    indianBrands: [
      { name: 'Campus', why: 'Performance running shoes at half the price', categories: ['Footwear'], searchTerms: ['campus'] },
      { name: 'Red Tape', why: 'Premium athleisure at Indian prices', categories: ['Footwear'], searchTerms: ['red tape'] },
    ],
    funFact: 'Red Tape started in Agra and now sells in 20+ countries worldwide!',
  },
  {
    foreign: 'skechers',
    country: 'USA',
    logo: '🇺🇸',
    category: 'Footwear',
    indianBrands: [
      { name: 'Liberty Gliders', why: 'Air cushion tech walking shoes, ultra-comfortable', categories: ['Footwear'], searchTerms: ['liberty'] },
      { name: 'Campus', why: 'Memory foam insoles, lightweight daily shoes', categories: ['Footwear'], searchTerms: ['campus'] },
    ],
    funFact: 'Liberty Gliders uses the same air-cushion tech at 50% lower price!',
  },
  // ── Clothing ──
  {
    foreign: 'zara',
    country: 'Spain',
    logo: '🇪🇸',
    category: 'Clothing',
    indianBrands: [
      { name: 'FabIndia', why: 'Handloom garments supporting 40,000+ artisans', categories: ['Textiles'], searchTerms: ['fabindia', 'handwoven', 'handloom'] },
      { name: 'W (TCNS)', why: 'Ethnic-fusion designer wear for modern India', categories: ['Textiles'], searchTerms: ['kurta', 'kurti'] },
      { name: 'Khadi India', why: 'Gandhiji\'s legacy — pure hand-spun, sustainable fashion', categories: ['Textiles'], searchTerms: ['khadi'] },
    ],
    funFact: 'FabIndia is India\'s largest private platform for handloom products, with 300+ stores!',
  },
  {
    foreign: 'h&m',
    country: 'Sweden',
    logo: '🇸🇪',
    category: 'Clothing',
    indianBrands: [
      { name: 'FabIndia', why: 'Sustainable fashion from Indian artisans', categories: ['Textiles'], searchTerms: ['fabindia', 'handwoven'] },
      { name: 'Allen Solly', why: 'Smart casuals by the Aditya Birla Group', categories: ['Textiles'], searchTerms: ['allen'] },
    ],
    funFact: 'India\'s textile industry employs 45M+ people — every Indian brand purchase creates local jobs!',
  },
  {
    foreign: 'uniqlo',
    country: 'Japan',
    logo: '🇯🇵',
    category: 'Clothing',
    indianBrands: [
      { name: 'Khadi India', why: 'Hand-spun cotton shirts — breathable & sustainable', categories: ['Textiles'], searchTerms: ['khadi'] },
      { name: 'FabIndia', why: 'Minimalist Indian designs with quality fabrics', categories: ['Textiles'], searchTerms: ['fabindia'] },
    ],
    funFact: 'Khadi sales crossed ₹1.15 Lakh Cr in 2023 — the silent Swadeshi revolution!',
  },
  // ── Electronics ──
  {
    foreign: 'apple',
    country: 'USA',
    logo: '🇺🇸',
    category: 'Electronics',
    indianBrands: [
      { name: 'boAt', why: 'India\'s #1 audio brand, ₹3000 Cr revenue, 50% market share', categories: ['Technology'], searchTerms: ['boat'] },
      { name: 'Noise', why: '#1 Indian smartwatch brand with BT calling', categories: ['Technology'], searchTerms: ['noise'] },
      { name: 'Fire-Boltt', why: 'AMOLED smartwatches at disruptive prices', categories: ['Technology'], searchTerms: ['fire-boltt'] },
    ],
    funFact: 'boAt overtook Apple & Samsung in wearables market share in India!',
  },
  {
    foreign: 'samsung',
    country: 'South Korea',
    logo: '🇰🇷',
    category: 'Electronics',
    indianBrands: [
      { name: 'boAt', why: 'Earbuds, speakers & wearables — India\'s own tech brand', categories: ['Technology'], searchTerms: ['boat'] },
      { name: 'Noise', why: 'Smart wearables with 10M+ devices sold', categories: ['Technology'], searchTerms: ['noise'] },
    ],
    funFact: 'Noise and boAt together hold 50%+ of India\'s wearables market!',
  },
  {
    foreign: 'sony',
    country: 'Japan',
    logo: '🇯🇵',
    category: 'Electronics',
    indianBrands: [
      { name: 'boAt', why: 'Crystal Bionic Sound, designed in India for Indian ears', categories: ['Technology'], searchTerms: ['boat'] },
    ],
    funFact: 'boAt was bootstrapped by two Indians and became a ₹3000 Cr brand in just 8 years!',
  },
  {
    foreign: 'jbl',
    country: 'USA',
    logo: '🇺🇸',
    category: 'Electronics',
    indianBrands: [
      { name: 'boAt', why: '42H playtime earbuds + ENx noise cancellation', categories: ['Technology'], searchTerms: ['boat'] },
    ],
    funFact: 'boAt sold 75M+ devices in India — more than JBL & Sony combined in the Indian market!',
  },
  // ── Beauty ──
  {
    foreign: 'loreal',
    country: 'France',
    logo: '🇫🇷',
    category: 'Beauty',
    indianBrands: [
      { name: 'Forest Essentials', why: 'Luxury Ayurvedic skincare with 24K gold formulas', categories: ['Wellness', 'Beauty & Wellness'], searchTerms: ['forest essentials'] },
      { name: 'Mamaearth', why: 'Toxin-free, certified safe, ₹2000 Cr brand', categories: ['Wellness'], searchTerms: ['mamaearth'] },
      { name: 'Biotique', why: '100% botanical extracts, no SLS/parabens', categories: ['Wellness'], searchTerms: ['biotique'] },
    ],
    funFact: 'Forest Essentials uses ancient Ayurvedic recipes (5000+ years old) that L\'Oréal can never replicate!',
  },
  {
    foreign: 'dove',
    country: 'UK',
    logo: '🇬🇧',
    category: 'Beauty',
    indianBrands: [
      { name: 'Mamaearth', why: 'Made Safe certified, 100% toxin-free personal care', categories: ['Wellness'], searchTerms: ['mamaearth'] },
      { name: 'Biotique', why: 'Himalayan botanical expertise, zero chemicals', categories: ['Wellness'], searchTerms: ['biotique'] },
    ],
    funFact: 'Mamaearth became India\'s first unicorn in personal care — proving India can build world-class beauty brands!',
  },
  // ── Food & Beverages ──
  {
    foreign: 'coca cola',
    country: 'USA',
    logo: '🇺🇸',
    category: 'Food',
    indianBrands: [
      { name: 'Paper Boat', why: 'Nostalgic Indian drinks with zero artificial flavors', categories: ['Food & Spices', 'Food & Beverages'], searchTerms: ['paper boat'] },
    ],
    funFact: 'Paper Boat\'s Aam Panna outsells cola drinks in many Indian airports!',
  },
  {
    foreign: 'pepsi',
    country: 'USA',
    logo: '🇺🇸',
    category: 'Food',
    indianBrands: [
      { name: 'Paper Boat', why: 'Traditional Indian beverages — Aam Panna, Jaljeera & more', categories: ['Food & Spices', 'Food & Beverages'], searchTerms: ['paper boat'] },
    ],
    funFact: 'India has 50+ traditional beverages that no foreign brand can replicate!',
  },
  {
    foreign: 'starbucks',
    country: 'USA',
    logo: '🇺🇸',
    category: 'Food',
    indianBrands: [
      { name: 'Organic India', why: 'Premium organic teas from Lucknow, exported to 40 countries', categories: ['Food & Spices'], searchTerms: ['organic', 'tea'] },
    ],
    funFact: 'India produces 1.4B kg of tea/year — Darjeeling tea is called the Champagne of Teas worldwide!',
  },
  // ── Home ──
  {
    foreign: 'ikea',
    country: 'Sweden',
    logo: '🇸🇪',
    category: 'Home',
    indianBrands: [
      { name: 'FabIndia', why: 'Hand-crafted home décor by Indian artisans', categories: ['Home & Living', 'Pottery', 'Handicrafts'], searchTerms: ['fabindia', 'handcraft'] },
      { name: 'Milton', why: 'India\'s #1 home & kitchen brand', categories: ['Home & Living'], searchTerms: ['milton'] },
    ],
    funFact: 'India\'s handicraft exports are worth ₹37,000 Cr+ — artisan-made is the real luxury!',
  },
  // ── Bags ──
  {
    foreign: 'gucci',
    country: 'Italy',
    logo: '🇮🇹',
    category: 'Bags',
    indianBrands: [
      { name: 'Hidesign', why: 'Handcrafted leather bags from Pondicherry, exported to 25 countries', categories: ['Handicrafts'], searchTerms: ['hidesign', 'leather'] },
    ],
    funFact: 'Hidesign\'s vegetable-tanned leather bags are handcrafted in Pondicherry and sold in 25+ countries!',
  },
  {
    foreign: 'louis vuitton',
    country: 'France',
    logo: '🇫🇷',
    category: 'Bags',
    indianBrands: [
      { name: 'Hidesign', why: 'Award-winning handcrafted leather luxury at honest prices', categories: ['Handicrafts'], searchTerms: ['hidesign', 'leather'] },
    ],
    funFact: 'Hidesign won the "Best Leather Product" at Semaine du Cuir Paris — beating European brands!',
  },
  // ── Watches ──
  {
    foreign: 'casio',
    country: 'Japan',
    logo: '🇯🇵',
    category: 'Watches',
    indianBrands: [
      { name: 'Titan', why: 'India\'s #1 watch brand by Tata Group, 60% market share', categories: ['Jewelry'], searchTerms: ['titan'] },
      { name: 'Fastrack', why: 'Youth-focused watches & wearables by Titan', categories: ['Jewelry', 'Technology'], searchTerms: ['fastrack'] },
    ],
    funFact: 'Titan is the 5th largest watch manufacturer in the world — a Tata Group company!',
  },
  {
    foreign: 'fossil',
    country: 'USA',
    logo: '🇺🇸',
    category: 'Watches',
    indianBrands: [
      { name: 'Titan', why: 'Karishma, Raga, Edge — iconic collections loved for decades', categories: ['Jewelry'], searchTerms: ['titan'] },
    ],
    funFact: 'Titan sells a watch every 2 seconds in India!',
  },
];

function detectForeignBrand(query: string): ForeignBrandMatch | null {
  if (!query || query.length < 2) return null;
  const q = query.toLowerCase().trim();
  return FOREIGN_BRAND_MAP.find(b => {
    // Exact match or the search starts with / contains the foreign brand
    return q === b.foreign || q.includes(b.foreign) || b.foreign.includes(q);
  }) || null;
}

// ─── Star Rating ──────────────────────────────────────────────────────────────

const Stars = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1">
    {Array.from({ length: 5 }, (_, i) => (
      <svg key={i} width="12" height="12" viewBox="0 0 24 24"
        fill={i < Math.floor(rating) ? 'currentColor' : 'none'}
        stroke="currentColor" strokeWidth="2" className="text-amber-400">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ))}
    <span className="text-xs text-gray-500 ml-0.5">{rating} ({(productsData as Product[]).find(p => p.rating === rating)?.reviews?.toLocaleString() ?? ''})</span>
  </div>
);

// ─── Bharat Score Badge ───────────────────────────────────────────────────────

const BharatScoreBadge = ({ score }: { score: number }) => {
  const meta = getBharatScoreMeta(score);
  return (
    <span
      style={{ background: meta.bg, color: meta.text }}
      className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
    >
      <span style={{ background: meta.dot }} className="w-2 h-2 rounded-full inline-block flex-shrink-0" />
      Bharat Score: {score}
    </span>
  );
};

// ─── Product Card ─────────────────────────────────────────────────────────────

const ProductCard = ({
  product,
  onAdd,
  cartQty,
}: {
  product: Product;
  onAdd: (p: Product) => void;
  cartQty: number;
}) => {
  const [added, setAdded] = useState(false);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleAdd = () => {
    if (!product.inStock || added) return;
    setAdded(true);
    onAdd(product);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div
      className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col gap-3 transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-gray-300"
      style={{ opacity: product.inStock ? 1 : 0.6, position: 'relative' }}
    >
      {/* Top row: category + tag */}
      <div className="flex items-start justify-between gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-400 bg-gray-100 px-2.5 py-0.5 rounded-full border border-gray-200">
          {product.category}
        </span>
        {product.tag && (
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-gray-900 text-white">
            {product.tag}
          </span>
        )}
      </div>

      {/* Product image */}
      <div className="relative h-40 bg-gray-50 rounded-xl overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={e => {
            (e.currentTarget as HTMLImageElement).src =
              `https://placehold.co/400x300/f9fafb/d1d5db?text=${encodeURIComponent(product.name.split(' ').slice(0, 2).join('+'))}`;
          }}
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="text-xs font-bold text-gray-500 tracking-widest uppercase">Out of Stock</span>
          </div>
        )}
        {discount > 0 && product.inStock && (
          <span className="absolute top-2 left-2 bg-green-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
            {discount}% OFF
          </span>
        )}
      </div>

      {/* State */}
      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
        📍 {product.state}
      </p>

      {/* Name + description */}
      <div>
        <p className="text-[15px] font-semibold text-gray-900 leading-snug">{product.name}</p>
        <p className="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-2">{product.description}</p>
      </div>

      {/* Stars */}
      <Stars rating={product.rating} />

      {/* Bharat Score */}
      <BharatScoreBadge score={product.bharatScore} />

      {/* Price */}
      <div className="flex items-baseline gap-2">
        <span className="text-lg font-bold text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
        <span className="text-sm text-gray-400 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
      </div>

      {/* CTA */}
      {!product.inStock ? (
        <div className="text-center text-sm text-gray-400 py-2 rounded-xl border border-gray-200 bg-gray-50">
          Unavailable
        </div>
      ) : cartQty > 0 && !added ? (
        <div className="text-center text-sm font-semibold text-amber-700 py-2 rounded-xl border border-amber-200 bg-amber-50">
          {cartQty} in cart
        </div>
      ) : (
        <button
          onClick={handleAdd}
          className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
            added
              ? 'bg-green-600 text-white'
              : 'bg-gray-900 text-white hover:bg-gray-700 active:scale-[0.98]'
          }`}
        >
          {added ? 'Added ✓' : 'Add to Cart'}
        </button>
      )}
    </div>
  );
};

// ─── Skeleton Card ────────────────────────────────────────────────────────────

const SkeletonCard = () => (
  <div className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col gap-3 animate-pulse">
    <div className="h-4 w-24 bg-gray-200 rounded-full" />
    <div className="h-40 bg-gray-100 rounded-xl" />
    <div className="h-3 w-20 bg-gray-200 rounded" />
    <div className="h-4 w-3/4 bg-gray-200 rounded" />
    <div className="h-3 w-full bg-gray-100 rounded" />
    <div className="h-5 w-1/2 bg-gray-200 rounded-full" />
    <div className="h-6 w-1/3 bg-gray-200 rounded" />
    <div className="h-10 bg-gray-200 rounded-xl" />
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────

function ShopContent() {
  const searchParams = useSearchParams();
  const brandQuery = searchParams.get('brand');
  const products = [...(productsData as Product[]), ...(brandProductsData as Product[])];

  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedScore, setSelectedScore] = useState<'all' | 'green' | 'orange' | 'red'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price_asc' | 'price_desc' | 'rating' | 'bharat_score'>('featured');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [swadeshiDismissed, setSwadeshiDismissed] = useState(false);

  // ── Reverse Amazon: detect foreign brand ─────────────────────────────────
  const foreignBrandMatch = useMemo(() => {
    if (swadeshiDismissed) return null;
    return detectForeignBrand(search);
  }, [search, swadeshiDismissed]);

  // Reset dismiss when search changes
  useEffect(() => {
    setSwadeshiDismissed(false);
  }, [search]);

  useEffect(() => {
    setIsLoading(true);
    const t = setTimeout(() => setIsLoading(false), 1500); // Fake load time
    return () => clearTimeout(t);
  }, [brandQuery]);

  // ── Cart helpers ──────────────────────────────────────────────────────────

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQty = (id: number, delta: number) => {
    setCartItems(prev =>
      prev.map(i => i.id === id ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i)
        .filter(i => i.quantity > 0)
    );
  };

  const removeFromCart = (id: number) => setCartItems(prev => prev.filter(i => i.id !== id));

  const cartTotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const getCartQty = (id: number) => cartItems.find(i => i.id === id)?.quantity ?? 0;

  // ── Category counts ───────────────────────────────────────────────────────

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: products.length };
    products.forEach(p => { counts[p.category] = (counts[p.category] ?? 0) + 1; });
    return counts;
  }, [products]);

  // ── Filtered products ─────────────────────────────────────────────────────

  const filtered = useMemo(() => {
    let list = products;
    if (brandQuery) {
      const q = brandQuery.toLowerCase().replace('-', ' ');
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.tag.toLowerCase().includes(q)
      );
    }
    if (selectedCategory !== 'All') list = list.filter(p => p.category === selectedCategory);
    if (selectedScore === 'green') list = list.filter(p => p.bharatScore >= 75);
    else if (selectedScore === 'orange') list = list.filter(p => p.bharatScore >= 50 && p.bharatScore < 75);
    else if (selectedScore === 'red') list = list.filter(p => p.bharatScore < 50);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.state.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    switch (sortBy) {
      case 'price_asc': return [...list].sort((a, b) => a.price - b.price);
      case 'price_desc': return [...list].sort((a, b) => b.price - a.price);
      case 'rating': return [...list].sort((a, b) => b.rating - a.rating);
      case 'bharat_score': return [...list].sort((a, b) => b.bharatScore - a.bharatScore);
      default: return list;
    }
  }, [products, selectedCategory, selectedScore, search, sortBy, brandQuery]);

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#faf8f3] flex">

      {/* ── LEFT SIDEBAR ────────────────────────────────────────────── */}
      <aside className="w-[280px] min-h-screen sticky top-0 border-r border-gray-200 bg-white px-5 py-7 overflow-y-auto flex-shrink-0">

        {/* Header */}
        <div className="mb-7">
          <p className="text-[11px] uppercase tracking-[0.18em] text-gray-400 font-bold mb-2">
            Bharat Bazaar
          </p>
          <h2 className="text-3xl font-bold text-gray-900">Shop</h2>
          <p className="text-sm text-gray-500 mt-2 leading-6">
            Authentic Indian products from artisans across every state.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-5">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full px-4 py-3 pr-10 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
          />
          <svg className="absolute right-3 top-3.5 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
        </div>

        {/* Categories */}
        <p className="text-[11px] uppercase tracking-[0.18em] text-gray-400 font-bold mb-3">Categories</p>
        <div className="space-y-1.5 mb-7">
          {ALL_CATEGORIES.map(cat => {
            const active = cat === selectedCategory;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`w-full text-left px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-150 flex items-center justify-between ${
                  active
                    ? 'bg-gray-900 text-white border-gray-900 shadow-sm'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${active ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>
                  {categoryCounts[cat] ?? 0}
                </span>
              </button>
            );
          })}
        </div>

        {/* Bharat Score Filter */}
        <p className="text-[11px] uppercase tracking-[0.18em] text-gray-400 font-bold mb-3">Bharat Score</p>
        <div className="space-y-1.5">
          {([
            { key: 'all', label: 'All Scores', dot: '#6B7280' },
            { key: 'green', label: '75+ (High)', dot: '#22C55E' },
            { key: 'orange', label: '50–74 (Mid)', dot: '#F59E0B' },
            { key: 'red', label: 'Below 50 (Low)', dot: '#EF4444' },
          ] as const).map(opt => {
            const active = opt.key === selectedScore;
            return (
              <button
                key={opt.key}
                onClick={() => setSelectedScore(opt.key)}
                className={`w-full text-left px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-150 flex items-center gap-2.5 ${
                  active
                    ? 'bg-gray-900 text-white border-gray-900 shadow-sm'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ background: active ? '#fff' : opt.dot }}
                />
                {opt.label}
              </button>
            );
          })}
        </div>
      </aside>

      {/* ── MAIN CONTENT ────────────────────────────────────────────── */}
      <main className="flex-1 overflow-hidden">

        {/* Hero strip */}
        <section className="px-10 py-10 border-b border-gray-200 bg-white">
          <p className="text-xs uppercase tracking-[0.18em] text-gray-400 font-bold mb-2">
            {brandQuery ? `Brand Collection: ${brandQuery.replace('-', ' ')}` : 'Authentic India'}
          </p>
          <h1 className="text-5xl font-bold text-gray-900 mb-3 capitalize">
            {brandQuery ? brandQuery.replace('-', ' ') : (selectedCategory === 'All' ? 'All Products' : selectedCategory)}
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl leading-8">
            Handpicked items directly from Indian artisans and manufacturers — verified, authentic, and carrying their Bharat Score.
          </p>
        </section>

        {/* Sort + Filter Bar */}
        <section className="sticky top-0 z-30 bg-white border-b border-gray-200 px-10 py-4">
          <div className="flex justify-between gap-5 flex-wrap items-center">
            {/* Sort pills */}
            <div className="flex gap-2 flex-wrap">
              {([
                { value: 'featured', label: 'Featured' },
                { value: 'price_asc', label: 'Price ↑' },
                { value: 'price_desc', label: 'Price ↓' },
                { value: 'rating', label: 'Top Rated' },
                { value: 'bharat_score', label: 'Bharat Score' },
              ] as const).map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setSortBy(opt.value)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    sortBy === opt.value
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Cart button */}
            <button
              onClick={() => setShowCart(true)}
              className="px-5 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-semibold shadow-md flex items-center gap-2 hover:bg-gray-700 transition relative"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
              </svg>
              Cart ({cartCount}) • ₹{cartTotal.toLocaleString('en-IN')}
            </button>
          </div>
        </section>

        {/* ── 🇮🇳 SWADESHI SWITCH BANNER (Reverse Amazon) ───────────── */}
        {foreignBrandMatch && !isLoading && (
          <section className="px-10 pt-8 pb-2">
            <div
              className="relative overflow-hidden rounded-2xl border-2 border-orange-200"
              style={{
                background: 'linear-gradient(135deg, #FFF7ED 0%, #FFFBEB 40%, #FEF3C7 100%)',
                animation: 'fadeSlideIn 0.4s ease-out',
              }}
            >
              {/* Decorative top bar */}
              <div className="h-1.5 w-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />

              <div className="p-6 sm:p-8">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 via-white to-green-600 flex items-center justify-center text-2xl shadow-lg shadow-orange-500/20 flex-shrink-0">
                      🔄
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-black uppercase tracking-widest text-orange-600 bg-orange-100 px-2.5 py-0.5 rounded-full">
                          🇮🇳 Swadeshi Switch
                        </span>
                        <span className="text-[10px] font-bold text-gray-400">
                          Reverse Amazon™
                        </span>
                      </div>
                      <h3 className="text-xl font-black text-gray-900">
                        Searching for <span className="text-red-500 line-through decoration-2">{foreignBrandMatch.foreign.charAt(0).toUpperCase() + foreignBrandMatch.foreign.slice(1)}</span>?
                        <span className="text-orange-600 ml-2">Try Indian! 💪</span>
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        <span className="font-bold capitalize">{foreignBrandMatch.foreign}</span> is a {foreignBrandMatch.logo} {foreignBrandMatch.country} brand.
                        We found <span className="font-bold text-orange-700">{foreignBrandMatch.indianBrands.length} Indian alternatives</span> with equal or better quality.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSwadeshiDismissed(true)}
                    className="text-gray-400 hover:text-gray-600 transition p-1 rounded-lg hover:bg-white/60 flex-shrink-0"
                    title="Dismiss"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Indian Brand Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {foreignBrandMatch.indianBrands.map((ib, i) => (
                    <button
                      key={ib.name}
                      onClick={() => {
                        setSearch(ib.searchTerms[0]);
                        setSwadeshiDismissed(true);
                      }}
                      className="group text-left p-4 rounded-xl bg-white/80 border border-orange-100 hover:border-orange-300 hover:shadow-lg hover:shadow-orange-500/10 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white text-xs font-black shadow">
                          {ib.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-black text-gray-900 group-hover:text-orange-700 transition-colors">{ib.name}</p>
                          <p className="text-[10px] font-bold text-orange-500 uppercase tracking-wider">🇮🇳 Indian Brand</p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed">{ib.why}</p>
                      <div className="mt-3 flex items-center gap-1.5 text-[10px] font-bold text-orange-600 group-hover:text-orange-700">
                        <span>Shop {ib.name}</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-x-0.5 transition-transform">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Fun Fact + CTA */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-orange-200/50">
                  <div className="flex items-start gap-2 flex-1">
                    <span className="text-lg flex-shrink-0">💡</span>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      <span className="font-bold">Did you know?</span> {foreignBrandMatch.funFact}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSearch(foreignBrandMatch.indianBrands[0].searchTerms[0]);
                      setSwadeshiDismissed(true);
                    }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-bold shadow-md shadow-orange-500/20 hover:shadow-lg hover:shadow-orange-500/30 hover:scale-[1.02] active:scale-95 transition-all flex-shrink-0"
                  >
                    <span>🇮🇳</span>
                    Switch to Swadeshi
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Results count */}
        <section className="px-10 py-8">
          <div className="mb-6 text-sm text-gray-500">
            {isLoading ? 'Fetching verified products...' : `${filtered.length} product${filtered.length !== 1 ? 's' : ''}`}
            {search && !isLoading ? ` for "${search}"` : ''}
            {selectedCategory !== 'All' && !isLoading ? ` in ${selectedCategory}` : ''}
          </div>

          {/* Product Grid */}
          {isLoading ? (
            <div className="grid grid-cols-3 gap-6 items-stretch">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-full">
                   <SkeletonCard />
                </div>
              ))}
            </div>
          ) : filtered.length > 0 ? (
            <div className="grid grid-cols-3 gap-6 items-stretch">
              {filtered.map(product => (
                <div key={product.id} className="h-full">
                  <ProductCard
                    product={product}
                    onAdd={addToCart}
                    cartQty={getCartQty(product.id)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="1.2" className="mb-4">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <p className="text-lg font-semibold text-gray-700 mb-1">No products found</p>
              <p className="text-sm text-gray-400">Try adjusting your search or filters</p>
              <button
                onClick={() => { setSearch(''); setSelectedCategory('All'); setSelectedScore('all'); }}
                className="mt-5 px-5 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-700 transition"
              >
                Clear all filters
              </button>
            </div>
          )}
        </section>
      </main>

      {/* ── CART DRAWER ─────────────────────────────────────────────── */}
      {showCart && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setShowCart(false)}
          />

          {/* Drawer */}
          <div className="relative w-[380px] h-screen bg-white shadow-2xl border-l border-gray-200 flex flex-col">
            {/* Header */}
            <div className="p-5 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Your Cart</h2>
                <p className="text-xs text-gray-400 mt-0.5">{cartCount} item{cartCount !== 1 ? 's' : ''}</p>
              </div>
              <button
                onClick={() => setShowCart(false)}
                className="text-gray-400 hover:text-gray-700 text-sm font-semibold transition p-2 hover:bg-gray-100 rounded-lg"
              >
                ✕ Close
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center pb-10">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="1.2" className="mb-4">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
                  </svg>
                  <p className="text-base font-semibold text-gray-700 mb-1">Your cart is empty</p>
                  <p className="text-sm text-gray-400">Add products to get started</p>
                </div>
              ) : (
                cartItems.map(item => (
                  <div key={item.id} className="border border-gray-200 rounded-xl p-4 flex gap-3">
                    {/* Thumb */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded-lg bg-gray-50 flex-shrink-0"
                      onError={e => {
                        (e.currentTarget as HTMLImageElement).src =
                          `https://placehold.co/100x100/f9fafb/d1d5db?text=${encodeURIComponent(item.name.split(' ')[0])}`;
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{item.name}</p>
                      <div className="mt-1 mb-2">
                        <BharatScoreBadge score={item.bharatScore} />
                      </div>
                      <div className="flex items-center justify-between">
                        {/* Qty controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQty(item.id, -1)}
                            className="w-7 h-7 rounded-lg border border-gray-200 text-gray-600 text-sm font-bold flex items-center justify-center hover:bg-gray-50 transition"
                          >−</button>
                          <span className="text-sm font-bold text-gray-900 min-w-[20px] text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQty(item.id, 1)}
                            className="w-7 h-7 rounded-lg border border-gray-200 text-gray-600 text-sm font-bold flex items-center justify-center hover:bg-gray-50 transition"
                          >+</button>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-gray-900">
                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-300 hover:text-red-500 transition p-1"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-5 border-t border-gray-200">
                <div className="flex justify-between text-sm text-gray-500 mb-1.5">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 mb-4">
                  <span>Delivery</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
                <div className="flex justify-between font-bold text-lg mb-4 pt-3 border-t border-gray-100">
                  <span>Total</span>
                  <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <button className="w-full bg-gray-900 text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-gray-700 transition active:scale-[0.99]">
                  Checkout →
                </button>
                <button
                  onClick={() => setCartItems([])}
                  className="w-full mt-2 text-xs text-gray-400 hover:text-red-500 py-1 transition"
                >
                  Clear cart
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
       <div className="min-h-screen bg-[#faf8f3] flex items-center justify-center flex-col gap-4">
         <div className="w-10 h-10 border-4 border-gray-900 border-t-transparent rounded-full animate-spin" />
         <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">Loading Shop...</p>
       </div>
    }>
      <ShopContent />
    </Suspense>
  )
}
