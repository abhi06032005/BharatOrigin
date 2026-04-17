'use client';

import { useState, useMemo } from 'react';

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
      className="border border-gray-200 rounded-2xl p-5 flex flex-col gap-3 transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-gray-300"
      style={{ opacity: product.inStock ? 1 : 0.6, backgroundColor: theme.cardBg }}
    >
      {/* Top row: emoji + tag */}
      <div className="flex items-start justify-between gap-2">
        <span className="text-3xl">{product.emoji}</span>
        {product.tag && (
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full" style={{ backgroundColor: theme.primary, color: theme.primaryText }}>
            {product.tag}
          </span>
        )}
      </div>

      {/* Discount badge */}
      {discount > 0 && product.inStock && (
        <span className="self-start text-white text-[10px] font-bold px-2 py-0.5 rounded" style={{ backgroundColor: theme.primary }}>
          {discount}% OFF
        </span>
      )}

      {/* Artisan */}
      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
        🏺 {product.artisan}
      </p>

      {/* Name */}
      <p className="text-[15px] font-semibold text-gray-900 leading-snug">{product.name}</p>

      {/* Stars */}
      <Stars rating={product.rating} reviews={product.reviews} />

      {/* Price */}
      <div className="flex items-baseline gap-2">
        <span className="text-lg font-bold" style={{ color: theme.primary }}>₹{product.price.toLocaleString('en-IN')}</span>
        <span className="text-sm text-gray-400 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
      </div>

      {/* CTA */}
      {!product.inStock ? (
        <div className="text-center text-sm text-gray-400 py-2 rounded-xl border border-gray-200 bg-gray-50">
          Out of Stock
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
              ? 'text-white'
              : 'text-white hover:opacity-90 active:scale-[0.98]'
          }`}
          style={{ backgroundColor: added ? '#16A34A' : theme.primary, color: theme.primaryText }}
        >
          {added ? 'Added ✓' : 'Add to Cart'}
        </button>
      )}
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
    <div className="min-h-screen flex transition-colors duration-300" style={{ backgroundColor: festival.theme.pageBg }}>

      {/* ── LEFT SIDEBAR ────────────────────────────────────────────── */}
      <aside className="w-[280px] min-h-screen sticky top-0 border-r border-gray-200 px-5 py-7 overflow-y-auto flex-shrink-0 transition-colors duration-300" style={{ backgroundColor: festival.theme.cardBg }}>

        {/* Header */}
        <div className="mb-7">
          <p className="text-[11px] uppercase tracking-[0.18em] font-bold mb-2" style={{ color: festival.theme.primary }}>
            🇮🇳 Cultural Commerce
          </p>
          <h2 className="text-3xl font-bold text-gray-900">Festivals</h2>
          <p className="text-sm text-gray-500 mt-2 leading-6">
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
            className="w-full px-4 py-3 pr-10 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:border-transparent transition"
            style={{ '--tw-ring-color': festival.theme.primary } as React.CSSProperties}
          />
          <svg className="absolute right-3 top-3.5 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
        </div>

        {/* Festivals list */}
        <p className="text-[11px] uppercase tracking-[0.18em] text-gray-400 font-bold mb-3">Festivals ({FESTIVALS.length})</p>
        <div className="space-y-1.5 mb-7">
          {FESTIVALS.map(f => {
            const active = f.key === activeFestival;
            return (
              <button
                key={f.key}
                onClick={() => switchFestival(f.key)}
                className={`w-full text-left px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-150 flex items-center justify-between ${
                  !active && 'hover:bg-gray-50'
                }`}
                style={active ? {
                  backgroundColor: festival.theme.primary,
                  color: festival.theme.primaryText,
                  borderColor: festival.theme.primary
                } : {
                  backgroundColor: festival.theme.cardBg,
                  color: '#374151',
                  borderColor: '#e5e7eb'
                }}
              >
                <span className="flex items-center gap-2">
                  <span>{f.symbol}</span> {f.name}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${active ? 'bg-white/20' : 'bg-gray-100 text-gray-500'}`} style={active ? {color: festival.theme.primaryText} : undefined}>
                  {f.products.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Filter: Tags */}
        <p className="text-[11px] uppercase tracking-[0.18em] text-gray-400 font-bold mb-3">Product Tags</p>
        <div className="space-y-1.5">
          {allTags.map(tag => {
            const active = tag === selectedTag;
            return (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`w-full text-left px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-150 flex items-center gap-2.5 ${
                  !active && 'hover:bg-gray-50'
                }`}
                style={active ? {
                  backgroundColor: festival.theme.primary,
                  color: festival.theme.primaryText,
                  borderColor: festival.theme.primary
                } : {
                  backgroundColor: festival.theme.cardBg,
                  color: '#374151',
                  borderColor: '#e5e7eb'
                }}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </aside>

      {/* ── MAIN CONTENT ────────────────────────────────────────────── */}
      <main className="flex-1 overflow-hidden">

        {/* Hero strip */}
        <section className="px-10 py-10 border-b border-gray-200 transition-colors duration-300" style={{ backgroundColor: festival.theme.cardBg }}>
          <div className="flex items-start gap-4">
            <span className="text-5xl">{festival.symbol}</span>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] font-bold mb-1" style={{ color: festival.theme.primary }}>
                {festival.tagline}
              </p>
              <h1 className="text-5xl font-bold text-gray-900 mb-2">{festival.name}</h1>
              <p className="text-sm text-gray-500 mb-1">📅 {festival.date} · {festival.daysLeft}</p>
            </div>
          </div>

          {/* Story section */}
          <div className="mt-6 p-5 rounded-2xl border transition-colors duration-300" style={{ backgroundColor: festival.theme.pageBg, borderColor: festival.theme.primary + '30' }}>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">{festival.story}</p>
            <div className="flex items-start gap-2 rounded-xl p-3 border" style={{ backgroundColor: festival.theme.cardBg, borderColor: festival.theme.primary + '40' }}>
              <span>✨</span>
              <p className="text-sm italic font-medium" style={{ color: festival.theme.primary }}>{festival.ritual}</p>
            </div>
          </div>
        </section>

        {/* Sort + filter bar */}
        <section className="sticky top-0 z-30 border-b border-gray-200 px-10 py-4 transition-colors duration-300" style={{ backgroundColor: festival.theme.cardBg }}>
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
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    sortBy === opt.value ? '' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  style={sortBy === opt.value ? { backgroundColor: festival.theme.primary, color: festival.theme.primaryText } : {}}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Cart button */}
            <button
              onClick={() => setShowCart(true)}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold shadow-md flex items-center gap-2 transition hover:opacity-90"
              style={{ backgroundColor: festival.theme.primary, color: festival.theme.primaryText }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
              </svg>
              Cart ({cartCount}) • ₹{cartTotal.toLocaleString('en-IN')}
            </button>
          </div>
        </section>

        {/* Results */}
        <section className="px-10 py-8">
          <div className="mb-6 text-sm text-gray-500 font-medium">
            {filtered.length} product{filtered.length !== 1 ? 's' : ''}
            {search ? ` for "${search}"` : ''}
            {selectedTag !== 'All' ? ` tagged "${selectedTag}"` : ''}
          </div>

          {/* Product Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-3 gap-6 items-stretch">
              {filtered.map(product => (
                <div key={product.id} className="h-full">
                  <FestivalProductCard
                    product={product}
                    onAdd={addToCart}
                    cartQty={getCartQty(product.id)}
                    theme={festival.theme}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="text-lg font-semibold text-gray-700 mb-1">No products found</p>
              <p className="text-sm text-gray-400">Try adjusting your search or filters</p>
              <button
                onClick={() => { setSearch(''); setSelectedTag('All'); }}
                className="mt-5 px-5 py-2.5 rounded-xl text-sm font-semibold transition hover:opacity-90"
                style={{ backgroundColor: festival.theme.primary, color: festival.theme.primaryText }}
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Recommendations */}
          <div className="mt-12">
            <p className="text-[11px] uppercase tracking-[0.18em] font-bold mb-3" style={{ color: festival.theme.primary }}>
              🌟 Recommendations for {festival.name}
            </p>
            <div className="grid grid-cols-2 gap-3">
              {festival.recommendations.map((rec, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-gray-200" style={{ backgroundColor: festival.theme.cardBg }}>
                  <span className="flex-shrink-0 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center" style={{ backgroundColor: festival.theme.pageBg, color: festival.theme.primary }}>
                    {i + 1}
                  </span>
                  <p className="text-sm text-gray-600">{rec}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ── CART DRAWER ─────────────────────────────────────────────── */}
      {showCart && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setShowCart(false)} />
          <div className="relative w-[380px] h-screen shadow-2xl border-l border-gray-200 flex flex-col transition-colors duration-300" style={{ backgroundColor: festival.theme.cardBg }}>
            {/* Header */}
            <div className="p-5 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Your Cart</h2>
                <p className="text-xs text-gray-500 mt-0.5">{cartCount} item{cartCount !== 1 ? 's' : ''}</p>
              </div>
              <button onClick={() => setShowCart(false)} className="text-gray-400 hover:text-gray-700 text-sm font-semibold transition p-2 hover:bg-gray-100 rounded-lg">
                ✕ Close
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3" style={{ backgroundColor: festival.theme.pageBg }}>
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center pb-10">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke={festival.theme.primary} strokeWidth="1.2" className="mb-4 opacity-50">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
                  </svg>
                  <p className="text-base font-semibold text-gray-700 mb-1">Your cart is empty</p>
                  <p className="text-sm text-gray-500">Add festive products to get started</p>
                </div>
              ) : (
                cartItems.map(item => (
                  <div key={item.id} className="border border-gray-200 rounded-xl p-4 flex gap-3" style={{ backgroundColor: festival.theme.cardBg }}>
                    <span className="text-3xl flex-shrink-0">{item.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{item.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.artisan}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <button onClick={() => updateQty(item.id, -1)} className="w-7 h-7 rounded-lg border border-gray-200 text-gray-600 text-sm font-bold flex items-center justify-center hover:bg-gray-50 transition">−</button>
                          <span className="text-sm font-bold text-gray-900 min-w-[20px] text-center">{item.quantity}</span>
                          <button onClick={() => updateQty(item.id, 1)} className="w-7 h-7 rounded-lg border border-gray-200 text-gray-600 text-sm font-bold flex items-center justify-center hover:bg-gray-50 transition">+</button>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold" style={{ color: festival.theme.primary }}>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                          <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 transition p-1">
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
              <div className="p-5 border-t border-gray-200">
                <div className="flex justify-between text-sm text-gray-600 mb-1.5">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-4">
                  <span>Delivery</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
                <div className="flex justify-between font-bold text-lg mb-4 pt-3 border-t border-gray-100">
                  <span>Total</span>
                  <span style={{ color: festival.theme.primary }}>₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <button className="w-full py-3.5 rounded-xl font-semibold text-sm transition hover:opacity-90 active:scale-[0.99]" style={{ backgroundColor: festival.theme.primary, color: festival.theme.primaryText }}>
                  Checkout →
                </button>
                <button onClick={() => setCartItems([])} className="w-full mt-2 text-xs text-gray-400 hover:text-red-500 py-1 transition">
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
