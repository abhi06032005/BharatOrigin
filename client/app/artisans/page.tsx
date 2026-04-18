'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Star, User, ShoppingBag, ShieldCheck, Tag, Heart } from 'lucide-react';
import { ARTISANS_DATA } from './artisansData';
import Navbar from '../components/Navbar';
import Link from 'next/link';

// ─── HELPERS ────────────────────────────────────────────────────────────────────

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

// ─── COMPONENTS ─────────────────────────────────────────────────────────────────

function BharatScoreBadge({ score }: { score: number }) {
  return (
    <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider shadow-md shadow-orange-500/20">
      <span className="text-xs">🇮🇳</span>
      <span>BS: {score}</span>
    </div>
  );
}

function ProductCard({ product, index }: { product: typeof ARTISANS_DATA.products[0], index: number }) {
  const [added, setAdded] = useState(false);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <motion.div
      variants={staggerItem}
      className="group relative bg-white/80 backdrop-blur-md border border-orange-100/50 rounded-3xl overflow-hidden shadow-lg shadow-orange-900/5 hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-1 transition-all duration-300 flex flex-col"
    >
      {/* Image Area */}
      <div 
        className="relative h-48 w-full flex items-center justify-center overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${product.accent}15 0%, ${product.accent}30 100%)` }}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-7xl drop-shadow-2xl"
        >
          {product.image}
        </motion.div>

        {/* Labels overlay */}
        <div className="absolute top-3 w-full px-3 flex justify-between items-start">
          {discount > 0 && (
            <span className="bg-emerald-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-md">
              {discount}% OFF
            </span>
          )}
          <div className="flex flex-col gap-1.5 items-end ml-auto">
             {product.verified && (
                <span className="bg-white/90 backdrop-blur text-emerald-600 text-[9px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <ShieldCheck className="w-3 h-3" /> Verified
                </span>
             )}
             {product.giTag && (
                <span className="bg-indigo-50/90 backdrop-blur text-indigo-600 border border-indigo-100 text-[9px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <Tag className="w-3 h-3" /> GI Tagged
                </span>
             )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 gap-4">
        {/* Title & Story */}
        <div>
          <h3 className="text-lg font-black text-gray-900 leading-tight line-clamp-1">{product.name}</h3>
          <p className="text-xs font-medium text-gray-500 mt-1 line-clamp-2 italic">"{product.story}"</p>
        </div>

        {/* Artisan Info */}
        <div className="flex items-center gap-3 bg-orange-50/50 p-2.5 rounded-2xl border border-orange-100/50">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-inner"
            style={{ backgroundColor: `${product.accent}25`, color: product.accent }}
          >
            <User className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-gray-900 truncate">{product.artisan}</p>
            <p className="text-[10px] font-semibold text-orange-600 tracking-wider uppercase flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3" /> {product.location}
            </p>
          </div>
        </div>

        {/* Ratings & Price */}
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-xs font-bold text-gray-900">{product.rating}</span>
              <span className="text-[10px] font-medium text-gray-400">({product.reviews})</span>
            </div>
            <BharatScoreBadge score={product.bharatScore} />
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex flex-col">
              <span className="text-xl font-black text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
              <span className="text-[11px] font-bold text-gray-400 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
            </div>
            
            <button
              onClick={handleAdd}
              className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all duration-300 ${
                added 
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' 
                : 'bg-gray-900 text-white hover:bg-orange-600 hover:shadow-xl hover:shadow-orange-500/30 active:scale-95'
              }`}
            >
              {added ? (
                <>✓ Added</>
              ) : (
                <><ShoppingBag className="w-4 h-4" /> Add</>
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────────

export default function ArtisansMarketplace() {
  const { hero, stats, categories, products, values } = ARTISANS_DATA;
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory
    ? products.filter((p) => p.category === activeCategory)
    : products;

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans selection:bg-orange-500/30">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-gradient-to-b from-orange-50 via-amber-50/50 to-transparent">
        
        {/* Background Blobs */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-gradient-to-br from-orange-300/20 to-amber-300/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-gradient-to-tr from-emerald-300/10 to-teal-300/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div {...fadeUp(0)} className="flex items-center justify-center gap-2 mb-6">
            <span className="px-4 py-1.5 rounded-full bg-white border border-orange-200 text-orange-600 text-[11px] font-bold tracking-widest uppercase shadow-sm flex items-center gap-2">
              <span className="relative flex w-2 h-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full w-2 h-2 bg-orange-500"></span>
              </span>
              {hero.badge}
            </span>
          </motion.div>

          <motion.h1 
            {...fadeUp(0.1)} 
            className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 tracking-tight leading-[1.1] mb-6"
          >
            Direct from <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">Artisans</span>
          </motion.h1>

          <motion.p 
            {...fadeUp(0.2)} 
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed mb-10"
          >
            {hero.subtitle}
          </motion.p>

          <motion.div {...fadeUp(0.3)} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="#explore" 
              className="px-8 py-4 rounded-2xl bg-gray-900 text-white font-bold text-sm hover:bg-orange-600 transition-all shadow-xl shadow-gray-900/10 hover:shadow-orange-500/25 active:scale-95"
            >
              Explore Crafts
            </Link>
            <div className="px-6 py-3.5 rounded-2xl bg-white border border-gray-200 text-gray-700 font-semibold text-sm flex items-center gap-2 shadow-sm">
              <span className="text-lg">🇮🇳</span> 
              Zero Middleman Fees
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────────── */}
      <section className="relative z-20 -mt-12 max-w-6xl mx-auto px-6">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-white/40 shadow-xl shadow-gray-200/50 flex flex-col items-center text-center group hover:bg-white transition-colors"
            >
              <div className="w-14 h-14 rounded-2xl bg-orange-50/50 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 group-hover:bg-orange-100/50 transition-all duration-300">
                {stat.icon}
              </div>
              <div className="text-2xl lg:text-3xl font-black text-gray-900 mb-1">{stat.value}</div>
              <div className="text-xs font-bold text-gray-500 tracking-wider uppercase">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── CATEGORIES ────────────────────────────────────────────────── */}
      <section id="explore" className="py-24 max-w-7xl mx-auto px-6">
        <div className="mb-12 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-3">Browse by Craft</h2>
            <p className="text-gray-500 font-medium">Discover generations of authentic Indian artistry.</p>
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-2.5">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-5 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 ${
                activeCategory === null
                  ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/20'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.name === activeCategory ? null : cat.name)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 ${
                  activeCategory === cat.name
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/20 border border-transparent'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-orange-300 hover:text-orange-600'
                }`}
              >
                <span>{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* ── PRODUCTS ────────────────────────────────────────────────── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          key={activeCategory ?? 'all'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-32 bg-white rounded-3xl border border-dashed border-gray-200 mt-6">
            <div className="text-5xl mb-4">🏺</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500 font-medium">More authentic crafts coming to this category soon.</p>
          </div>
        )}
      </section>

      {/* ── WHY IT MATTERS ────────────────────────────────────────────── */}
      <section className="bg-gray-900 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/demo/image/upload/sample.jpg')] opacity-5 bg-cover bg-center mix-blend-overlay" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-orange-500 font-bold tracking-widest uppercase text-sm mb-4 block">Our Promise</span>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Real income for real hands.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-gray-800/50 backdrop-blur border border-gray-700/50 rounded-3xl p-8 hover:bg-gray-800 transition-colors"
              >
                <div className="w-14 h-14 rounded-2xl bg-orange-500/10 text-orange-400 flex items-center justify-center text-3xl mb-6 border border-orange-500/20">
                  {v.icon}
                </div>
                <h3 className="text-xl font-black text-white mb-3">{v.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER BAR ────────────────────────────────────────────────── */}
      <div className="bg-black py-6 text-center border-t border-gray-800">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest flex items-center justify-center gap-2">
          <Heart className="w-3.5 h-3.5 text-red-500" />
          Every purchase directly supports an Indian artisan family
        </p>
      </div>
    </div>
  );
}