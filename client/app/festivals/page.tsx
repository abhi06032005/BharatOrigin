'use client';

import { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';

import { FestivalKey, FestivalProduct, FestivalTheme, Festival, CartItem, FESTIVALS } from "./festivalsData";


// ─── Helpers ──────────────────────────────────────────────────────────────────

const Stars = ({ rating, reviews }: { rating: number; reviews: number }) => (
  <div className="flex items-center gap-1">
    {Array.from({ length: 5 }, (_, i) => (
      <svg key={i} width="12" height="12" viewBox="0 0 24 24"
        fill={i < Math.floor(rating) ? 'currentColor' : 'none'}
        stroke="currentColor" strokeWidth="2" className="text-amber-400">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ))}
    <span className="text-xs text-gray-500 ml-0.5">{rating} ({reviews.toLocaleString()})</span>
  </div>
);

// ─── Product Card ─────────────────────────────────────────────────────────────

const FestivalProductCard = ({
  product,
  onAdd,
  cartQty,
  theme,
}: {
  product: FestivalProduct;
  onAdd: (p: FestivalProduct) => void;
  cartQty: number;
  theme: FestivalTheme;
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
      className="glass rounded-[32px] border border-white/60 p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/10 hover:border-orange-300 relative overflow-hidden"
      style={{ opacity: product.inStock ? 1 : 0.6 }}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/40 blur-2xl rounded-full" />

      {/* Top row: tag */}
      <div className="flex items-start justify-end gap-3 relative z-10 w-full min-h-[40px]">
        {product.tag && (
          <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-400 to-amber-500 text-white shadow-sm self-start mt-2">
            {product.tag}
          </span>
        )}
      </div>

      {/* Discount badge */}
      {discount > 0 && product.inStock && (
        <span className="self-start text-white text-[10px] font-black tracking-widest px-2.5 py-1 rounded bg-orange-600 uppercase shadow-sm relative z-10">
          {discount}% OFF
        </span>
      )}

      {/* Artisan */}
      <p className="text-[11px] font-bold text-orange-600 uppercase tracking-widest relative z-10 mt-1">
        {product.artisan}
      </p>

      {/* Name */}
      <p className="text-lg font-black text-slate-900 leading-snug relative z-10 mb-1">{product.name}</p>

      {/* Stars */}
      <div className="relative z-10">
        <Stars rating={product.rating} reviews={product.reviews} />
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-2 relative z-10 mt-2">
        <span className="text-2xl font-black text-emerald-600">₹{product.price.toLocaleString('en-IN')}</span>
        <span className="text-sm font-bold text-slate-400 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
      </div>

      {/* CTA */}
      <div className="mt-2 relative z-10">
      {!product.inStock ? (
        <div className="text-center text-sm text-slate-400 font-bold py-3.5 rounded-2xl border border-slate-200/50 bg-slate-50/50 uppercase tracking-widest">
          Out of Stock
        </div>
      ) : cartQty > 0 && !added ? (
        <div className="text-center text-sm font-black tracking-widest text-emerald-700 py-3.5 rounded-2xl border border-emerald-200/50 bg-emerald-50/50 uppercase shadow-sm">
          {cartQty} in cart
        </div>
      ) : (
        <button
          onClick={handleAdd}
          className={`w-full py-4 rounded-2xl text-sm font-black tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95 ${
            added
              ? 'bg-emerald-500 text-white shadow-emerald-500/20'
              : 'bg-slate-900 text-white hover:bg-black hover:shadow-slate-900/20'
          }`}
        >
          {added ? 'Added ✓' : 'Add to Cart '}
        </button>
      )}
      </div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function FestivalsPage() {
  const [activeFestival, setActiveFestival] = useState<FestivalKey>('independence_day');
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price_asc' | 'price_desc' | 'rating'>('featured');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  const festival = FESTIVALS.find(f => f.key === activeFestival)!;
  const allTags = useMemo(() => ['All', ...Array.from(new Set(festival.products.map(p => p.tag)))], [festival]);

  // ── Cart helpers ──────────────────────────────────────────────────────────

  const addToCart = (product: FestivalProduct) => {
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

  // ── Filtered products ─────────────────────────────────────────────────────

  const filtered = useMemo(() => {
    let list = festival.products;
    if (selectedTag !== 'All') list = list.filter(p => p.tag === selectedTag);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.artisan.toLowerCase().includes(q));
    }
    switch (sortBy) {
      case 'price_asc': return [...list].sort((a, b) => a.price - b.price);
      case 'price_desc': return [...list].sort((a, b) => b.price - a.price);
      case 'rating': return [...list].sort((a, b) => b.rating - a.rating);
      default: return list;
    }
  }, [festival, selectedTag, search, sortBy]);

  // Event handler for switching festivals
  const switchFestival = (key: FestivalKey) => {
    setActiveFestival(key);
    setSelectedTag('All');
    setSearch('');
  };

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="aurora-bg" />
      <div className="indian-pattern-overlay" />
      <div className="rangoli-corner rangoli-corner--tl" />
      <div className="rangoli-corner rangoli-corner--br" />

      <Navbar />

      <div className="flex mt-20">

      {/* ── LEFT SIDEBAR ────────────────────────────────────────────── */}
      <aside className="w-[280px] min-h-screen sticky top-0 border-r border-orange-200/40 glass-warm px-5 py-7 overflow-y-auto flex-shrink-0 z-10">

        {/* Header */}
        <div className="mb-7">
          <p className="text-[11px] uppercase tracking-[0.18em] font-bold mb-2 text-orange-600">
            🇮🇳 Cultural Commerce
          </p>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Festivals</h2>
          <p className="text-sm text-slate-600 font-medium mt-2 leading-6 flex items-center">
            Artisan-made festive essentials for every celebration across Bharat.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-5">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full px-4 py-4 pr-10 rounded-2xl glass border border-orange-200/50 text-sm outline-none focus:ring-4 focus:ring-orange-400/20 focus:border-orange-400 transition font-medium"
          />
          <svg className="absolute right-3 top-4 text-slate-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
        </div>

        {/* Festivals list */}
        <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400 font-bold mb-3">Festivals ({FESTIVALS.length})</p>
        <div className="space-y-1.5 mb-7">
          {FESTIVALS.map(f => {
            const active = f.key === activeFestival;
            return (
              <button
                key={f.key}
                onClick={() => switchFestival(f.key)}
                className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-semibold transition-all duration-150 flex items-center justify-between ${
                  active
                  ? 'bg-slate-900 text-white border-slate-900 shadow-lg scale-105'
                  : 'bg-white/50 text-slate-700 border-orange-200/40 hover:bg-white hover:border-orange-300'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>{f.symbol}</span> {f.name}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${active ? 'bg-white/20 text-white' : 'bg-orange-100 text-orange-600'}`}>
                  {f.products.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Filter: Tags */}
        <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400 font-bold mb-3">Product Tags</p>
        <div className="space-y-1.5">
          {allTags.map(tag => {
            const active = tag === selectedTag;
            return (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-semibold transition-all duration-150 flex items-center gap-2.5 ${
                  active
                  ? 'bg-slate-900 text-white border-slate-900 shadow-lg scale-105'
                  : 'bg-white/50 text-slate-700 border-orange-200/40 hover:bg-white hover:border-orange-300'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </aside>

      {/* ── MAIN CONTENT ────────────────────────────────────────────── */}
      <main className="flex-1 overflow-hidden relative z-10">

        {/* Hero strip */}
        <section className="px-10 py-12 border-b border-orange-200/40 glass-warm">
          <div className="flex items-start gap-4">
            <span className="text-6xl p-4 bg-white rounded-3xl shadow-sm border border-orange-100">{festival.symbol}</span>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] font-bold mb-2 text-orange-600">
                {festival.tagline}
              </p>
              <h1 className="text-5xl lg:text-6xl font-black text-slate-900 mb-2 tracking-tight">{festival.name}</h1>
              <p className="text-sm font-bold text-slate-500 mb-1">📅 {festival.date} · {festival.daysLeft}</p>
            </div>
          </div>

          {/* Story section */}
          <div className="mt-8 p-6 rounded-3xl border border-white/60 shadow-lg glass">
            <p className="text-base text-slate-700 leading-relaxed font-medium mb-4">{festival.story}</p>
            <div className="flex items-start gap-3 rounded-2xl p-4 border border-orange-200/40 bg-white/50">
              <span className="text-xl">✨</span>
              <p className="text-sm italic font-bold text-slate-800 self-center">{festival.ritual}</p>
            </div>
          </div>
        </section>

        {/* Sort + filter bar */}
        <section className="sticky top-0 z-30 glass border-b border-orange-200/40 px-10 py-4 shadow-sm backdrop-blur-md">
          <div className="flex justify-between gap-5 flex-wrap items-center">
            {/* Sort pills */}
            <div className="flex gap-2 flex-wrap">
              {([
                { value: 'featured', label: 'Featured' },
                { value: 'price_asc', label: 'Price ↑' },
                { value: 'price_desc', label: 'Price ↓' },
                { value: 'rating', label: 'Top Rated' },
              ] as const).map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setSortBy(opt.value)}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all shadow-sm border ${
                    sortBy === opt.value
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-600 hover:bg-orange-50 border-orange-200/50 hover:text-orange-600'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Cart button */}
            <button
              onClick={() => setShowCart(true)}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-black tracking-wider shadow-lg shadow-orange-500/20 flex items-center gap-2 hover:scale-105 transition-transform"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
              </svg>
              CART ({cartCount}) • ₹{cartTotal.toLocaleString('en-IN')}
            </button>
          </div>
        </section>

        {/* Results */}
        <section className="px-10 py-8 relative z-10">
          <div className="mb-6 text-sm text-slate-500 font-bold">
            {filtered.length} product{filtered.length !== 1 ? 's' : ''}
            {search ? ` for "${search}"` : ''}
            {selectedTag !== 'All' ? ` tagged "${selectedTag}"` : ''}
          </div>

          {/* Product Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch">
              {filtered.map(product => (
                <div key={product.id} className="h-full">
                  <FestivalProductCard
                    product={product}
                    onAdd={addToCart}
                    cartQty={getCartQty(product.id)}
                    theme={{
                      primary: '#f97316',
                      primaryText: '#fff',
                      cardBg: '#fff',
                      pageBg: '#fef3c7'
                    }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center glass-warm rounded-[40px] border border-orange-200/40">
              <span className="text-5xl mb-4 opacity-50">🔍</span>
              <p className="text-xl font-black text-slate-800 mb-1">No products found</p>
              <p className="text-sm font-medium text-slate-500">Try adjusting your search or filters</p>
              <button
                onClick={() => { setSearch(''); setSelectedTag('All'); }}
                className="mt-6 px-6 py-3 rounded-2xl bg-slate-900 text-white text-sm font-bold tracking-wider hover:bg-black transition-all shadow-lg"
              >
                CLEAR ALL FILTERS
              </button>
            </div>
          )}

          {/* Recommendations */}
          <div className="mt-12 glass border border-orange-200/50 p-8 rounded-[32px]">
            <p className="text-[11px] uppercase tracking-[0.18em] font-bold mb-5 flex items-center gap-2 text-slate-900">
              <span className="text-xl">🌟</span> The Curated List
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {festival.recommendations.map((rec, i) => (
                <div key={i} className="flex items-start gap-4 p-5 rounded-2xl border border-orange-200/40 bg-white/60 hover:bg-white transition-colors">
                  <span className="flex-shrink-0 w-8 h-8 rounded-xl text-sm font-black flex items-center justify-center bg-gradient-to-br from-orange-400 to-amber-500 text-white shadow-sm">
                    {i + 1}
                  </span>
                  <p className="text-sm text-slate-700 font-medium leading-relaxed">{rec}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ── CART DRAWER ─────────────────────────────────────────────── */}
      {showCart && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowCart(false)} />
          <div className="relative w-[400px] h-screen glass-warm shadow-2xl border-l border-orange-200/50 flex flex-col pt-16">
            {/* Header */}
            <div className="p-6 border-b border-orange-200/40 flex justify-between items-center bg-white/40">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Your Cart</h2>
                <p className="text-xs font-bold text-orange-600 tracking-wide mt-1 uppercase">{cartCount} item{cartCount !== 1 ? 's' : ''}</p>
              </div>
              <button onClick={() => setShowCart(false)} className="text-slate-400 hover:text-orange-600 text-sm font-bold transition p-2 hover:bg-orange-100/50 rounded-xl">
                ✕ Close
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3 bg-white/20">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center pb-10">
                  <span className="text-5xl mb-4 opacity-50">🛍️</span>
                  <p className="text-xl font-black text-slate-800 mb-1">Your cart is empty</p>
                  <p className="text-sm font-medium text-slate-500">Add festive products to get started</p>
                </div>
              ) : (
                cartItems.map(item => (
                  <div key={item.id} className="glass rounded-2xl p-4 flex gap-4 border border-white/60 shadow-sm hover:shadow-md transition-shadow">
                    <span className="text-4xl flex-shrink-0 p-2 bg-white rounded-xl shadow-sm">{item.emoji}</span>
                    <div className="flex-1 min-w-0 py-1">
                      <p className="text-base font-black text-slate-900 truncate">{item.name}</p>
                      <p className="text-xs font-bold text-orange-500 mt-0.5">{item.artisan}</p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 rounded-lg border border-orange-200/40 bg-white text-slate-600 text-sm font-black flex items-center justify-center hover:bg-orange-50 transition">−</button>
                          <span className="text-sm font-black text-slate-900 min-w-[24px] text-center">{item.quantity}</span>
                          <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 rounded-lg border border-orange-200/40 bg-white text-slate-600 text-sm font-black flex items-center justify-center hover:bg-orange-50 transition">+</button>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-base font-black text-emerald-600">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                          <button onClick={() => removeFromCart(item.id)} className="text-slate-300 hover:text-red-500 transition p-2 hover:bg-red-50 rounded-lg">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
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
              <div className="p-6 border-t border-orange-200/40 bg-white/80 backdrop-blur-xl">
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm text-slate-500 font-bold">
                    <span>Subtotal</span>
                    <span className="text-slate-900">₹{cartTotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-500 font-bold">
                    <span>Delivery</span>
                    <span className="text-emerald-500">FREE</span>
                  </div>
                  <div className="flex justify-between font-black text-xl pt-4 border-t border-slate-200/60 text-slate-900 mt-2">
                    <span>Total</span>
                    <span className="text-orange-500">₹{cartTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>
                <button className="w-full py-4 rounded-2xl font-black tracking-widest transition-all shadow-xl hover:scale-[1.01] active:scale-95 bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-orange-500/20">
                  CHECKOUT NOW →
                </button>
                <button onClick={() => setCartItems([])} className="w-full mt-3 text-xs font-bold text-slate-400 hover:text-red-500 py-2 transition tracking-wider uppercase">
                  Clear cart
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
