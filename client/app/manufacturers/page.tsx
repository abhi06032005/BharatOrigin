'use client';

import { useState, useMemo } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

import { Manufacturer, MANUFACTURERS, CATEGORIES } from './manufacturersData';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const Stars = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1">
    {Array.from({ length: 5 }, (_, i) => (
      <svg key={i} width="12" height="12" viewBox="0 0 24 24"
        fill={i < Math.floor(rating) ? 'currentColor' : 'none'}
        stroke="currentColor" strokeWidth="2" className="text-amber-400">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ))}
    <span className="text-xs text-gray-500 ml-0.5">{rating}</span>
  </div>
);

const IndiaBar = ({ pct }: { pct: number }) => (
  <div>
    <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1">
      <span>Indian Raw Material</span>
      <span className="text-green-600">{pct}%</span>
    </div>
    <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
      <div className="h-full bg-green-500 rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
    </div>
  </div>
);

interface CartItem extends Manufacturer {
  quantity: number;
}

// ─── Manufacturer Card ────────────────────────────────────────────────────────

const ManufacturerCard = ({
  m,
  onDetail,
  onAdd,
  isInCart,
}: {
  m: Manufacturer;
  onDetail: () => void;
  onAdd: () => void;
  isInCart: boolean;
}) => {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (added) return;
    setAdded(true);
    onAdd();
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col gap-3 transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-gray-300">

      {/* Top: emoji + badges */}
      <div className="flex items-start justify-between">
        <span className="text-4xl">{m.emoji}</span>
        <div className="flex gap-1.5">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-green-50 text-green-700 border border-green-200">
            ✓ {m.indiaPct}% India
          </span>
          {m.exportReady && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
              🌍 Export
            </span>
          )}
        </div>
      </div>

      {/* Category */}
      <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-400 bg-gray-100 px-2.5 py-0.5 rounded-full border border-gray-200 self-start">
        {m.category}
      </span>

      {/* Product name */}
      <p className="text-[15px] font-semibold text-gray-900 leading-snug line-clamp-2">{m.product}</p>

      {/* Manufacturer */}
      <p className="text-xs font-semibold text-amber-600">🏭 {m.name}</p>

      {/* Location */}
      <p className="text-[11px] text-gray-400 font-semibold">📍 {m.location}, {m.state} · Est. {m.founded} · {m.employees} staff</p>

      {/* Features (Consolidated) */}
      <div className="flex flex-wrap gap-1.5">
        {m.features.slice(0, 3).map(f => (
          <span key={f} className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-50 text-gray-600 border border-gray-200">
            {f}
          </span>
        ))}
      </div>

      {/* India raw material bar */}
      <IndiaBar pct={m.raw} />

      {/* Rating + orders */}
      <div className="flex items-center justify-between">
        <Stars rating={m.rating} />
        <span className="text-[10px] text-gray-400 font-bold">{m.ordersCompleted.toLocaleString()} orders</span>
      </div>

      <div className="h-px bg-gray-100" />

      {/* Price + MOQ */}
      <div className="flex items-end justify-between">
        <div>
          <span className="text-lg font-bold text-gray-900">₹{m.price.toLocaleString('en-IN')}</span>
          <span className="text-xs text-gray-400 ml-1">{m.unit}</span>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-green-50 text-green-700 border border-green-200">
          MOQ {m.moq.toLocaleString()} {m.moqUnit}
        </span>
      </div>

      {/* Info pills */}
      <div className="flex gap-1.5 flex-wrap">
        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-600 border border-gray-200">GST {m.gst}</span>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-600 border border-gray-200">HSN {m.hsn}</span>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-600 border border-gray-200">⏱ {m.leadTime}</span>
      </div>

      {/* CTAs */}
      <div className="flex gap-2 mt-1">
        <button
          onClick={handleAdd}
          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
            added || isInCart
              ? 'bg-green-600 text-white'
              : 'bg-gray-900 text-white hover:bg-gray-700 active:scale-[0.98]'
          }`}
        >
          {added ? 'Added ✓' : isInCart ? 'In RFQ Cart' : '+ Add to RFQ'}
        </button>
        <button
          onClick={onDetail}
          className="px-4 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
        >
          Details
        </button>
      </div>
    </div>
  );
};

// ─── Detail Modal ─────────────────────────────────────────────────────────────

const DetailModal = ({ m, onClose, onAdd, isInCart }: { m: Manufacturer; onClose: () => void; onAdd: () => void; isInCart: boolean }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
    <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
    <div
      onClick={e => e.stopPropagation()}
      className="relative bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200"
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-200 flex gap-4">
        <span className="text-5xl flex-shrink-0">{m.emoji}</span>
        <div className="flex-1 min-w-0">
          <p className="text-lg font-bold text-gray-900 leading-snug mb-1">{m.product}</p>
          <p className="text-sm font-semibold text-amber-600 mb-2">🏭 {m.name}</p>
          <div className="flex flex-wrap gap-1.5">
            {m.features.map(f => (
              <span key={f} className="text-[10px] font-bold px-2 py-0.5 rounded bg-green-50 text-green-700 border border-green-200">{f}</span>
            ))}
          </div>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-sm font-semibold p-2 hover:bg-gray-100 rounded-lg flex-shrink-0 self-start transition">
          ✕
        </button>
      </div>

      <div className="p-6 space-y-6">
        {/* Story */}
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-gray-400 font-bold mb-2">The Story</p>
          <p className="text-sm text-gray-600 leading-relaxed italic">{m.story}</p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3">
          {[
            ['Founded', m.founded],
            ['Employees', m.employees.toLocaleString()],
            ['Annual Capacity', m.annualCapacity],
            ['Lead Time', m.leadTime],
            ['Contact', m.contactPerson],
            ['Phone', m.phone],
          ].map(([k, v]) => (
            <div key={String(k)} className="p-3 rounded-xl border border-gray-200 bg-gray-50">
              <p className="text-[10px] uppercase tracking-wide text-gray-400 font-bold mb-0.5">{k}</p>
              <p className="text-sm font-semibold text-gray-900">{v}</p>
            </div>
          ))}
        </div>

        {/* Speciality */}
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-gray-400 font-bold mb-2">Speciality</p>
          <p className="text-sm text-gray-600">{m.speciality}</p>
        </div>

        {/* License */}
        <div className="p-4 rounded-xl border border-amber-200 bg-amber-50 flex items-start gap-3">
          <span className="text-xl">📜</span>
          <div>
            <p className="text-[10px] uppercase tracking-wide text-gray-400 font-bold mb-0.5">{m.licenseType}</p>
            <p className="text-sm font-bold text-amber-700">{m.license}</p>
          </div>
        </div>

        {/* Address */}
        <p className="text-sm text-gray-500">📍 {m.address}</p>

        {/* India depth */}
        <div className="p-4 rounded-xl border border-gray-200 bg-gray-50">
          <div className="flex items-center gap-4 mb-2">
            <span className="text-3xl font-bold text-amber-600">{m.indiaPct}%</span>
            <div>
              <p className="text-sm text-gray-600"><span className="text-green-600 font-bold">{m.raw}%</span> Indian raw material</p>
              <p className="text-xs text-gray-400">{m.rawNote}</p>
            </div>
          </div>
          <IndiaBar pct={m.raw} />
        </div>

        {/* Pricing */}
        <div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-2xl font-bold text-gray-900">₹{m.price.toLocaleString('en-IN')}</span>
            <span className="text-sm text-gray-400">{m.unit}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-lg bg-green-50 text-green-700 border border-green-200">📦 MOQ: {m.moq.toLocaleString()} {m.moqUnit}</span>
            <span className="text-xs font-bold px-3 py-1 rounded-lg bg-gray-100 text-gray-600 border border-gray-200">GST {m.gst}</span>
            <span className="text-xs font-bold px-3 py-1 rounded-lg bg-gray-100 text-gray-600 border border-gray-200">HSN {m.hsn}</span>
          </div>
          <p className="text-xs text-gray-400 mt-2">Payment: {m.paymentTerms}</p>
        </div>

        {/* CTA */}
        <button
          onClick={onAdd}
          className={`w-full py-3 rounded-xl text-sm font-semibold transition-all ${
            isInCart ? 'bg-green-600 text-white' : 'bg-gray-900 text-white hover:bg-gray-700'
          }`}
        >
          {isInCart ? '✓ In RFQ Cart' : '🛒 Add to RFQ Cart'}
        </button>
      </div>
    </div>
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ManufacturersPage() {
  const [activeCat, setActiveCat] = useState('All');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'relevance' | 'price_asc' | 'price_desc' | 'rating' | 'india_pct'>('relevance');
  const [f100, setF100] = useState(false);
  const [fExport, setFExport] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [modal, setModal] = useState<Manufacturer | null>(null);

  // ── Cart helpers ──────────────────────────────────────────────────────────

  const addToCart = (m: Manufacturer) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === m.id);
      if (ex) return prev.map(i => i.id === m.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...m, quantity: 1 }];
    });
  };

  const updateQty = (id: string, delta: number) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i).filter(i => i.quantity > 0));
  };

  const removeFromCart = (id: string) => setCart(prev => prev.filter(i => i.id !== id));

  const cartTotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);
  const isInCart = (id: string) => cart.some(i => i.id === id);

  // ── Category counts ───────────────────────────────────────────────────────

  const categoryCounts = useMemo(() => {
    const c: Record<string, number> = { All: MANUFACTURERS.length };
    MANUFACTURERS.forEach(m => { c[m.category] = (c[m.category] ?? 0) + 1; });
    return c;
  }, []);

  // ── Filtering ─────────────────────────────────────────────────────────────

  const filtered = useMemo(() => {
    let list = MANUFACTURERS;
    if (activeCat !== 'All') list = list.filter(m => m.category === activeCat);
    if (f100) list = list.filter(m => m.indiaPct === 100);
    if (fExport) list = list.filter(m => m.exportReady);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(m => m.name.toLowerCase().includes(q) || m.product.toLowerCase().includes(q) || m.state.toLowerCase().includes(q) || m.location.toLowerCase().includes(q));
    }
    switch (sortBy) {
      case 'price_asc': return [...list].sort((a, b) => a.price - b.price);
      case 'price_desc': return [...list].sort((a, b) => b.price - a.price);
      case 'rating': return [...list].sort((a, b) => b.rating - a.rating);
      case 'india_pct': return [...list].sort((a, b) => b.indiaPct - a.indiaPct);
      default: return list;
    }
  }, [activeCat, search, sortBy, f100, fExport]);

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#faf8f3] flex">

      {/* ── LEFT SIDEBAR ────────────────────────────────────────────── */}
      <aside className="w-[280px] min-h-screen sticky top-0 border-r border-gray-200 bg-white px-5 py-7 overflow-y-auto flex-shrink-0">

        {/* Header */}
        <div className="mb-7">
          <p className="text-[11px] uppercase tracking-[0.18em] text-gray-400 font-bold mb-2">
            🇮🇳 B2B Wholesale
          </p>
          <h2 className="text-3xl font-bold text-gray-900">Manufacturers</h2>
          <p className="text-sm text-gray-500 mt-2 leading-6">
            Verified Indian manufacturers with MSME, BIS & AYUSH licenses.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-5">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search manufacturers..."
            className="w-full px-4 py-3 pr-10 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
          />
          <svg className="absolute right-3 top-3.5 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
        </div>

        {/* Categories */}
        <p className="text-[11px] uppercase tracking-[0.18em] text-gray-400 font-bold mb-3">Categories</p>
        <div className="space-y-1.5 mb-7">
          <button
            onClick={() => setActiveCat('All')}
            className={`w-full text-left px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-150 flex items-center justify-between ${
              activeCat === 'All'
                ? 'bg-gray-900 text-white border-gray-900 shadow-sm'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <ShoppingBag size={16} />
              <span>All Manufacturers</span>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${activeCat === 'All' ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>
              {categoryCounts['All'] ?? 0}
            </span>
          </button>

          {CATEGORIES.map(cat => {
            const active = cat.id === activeCat;
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCat(cat.id)}
                className={`w-full text-left px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-150 flex items-center justify-between ${
                  active
                    ? 'bg-gray-900 text-white border-gray-900 shadow-sm'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={16} />
                  <span>{cat.label}</span>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${active ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>
                  {categoryCounts[cat.id] ?? 0}
                </span>
              </button>
            );
          })}
        </div>

        {/* Filters */}
        <p className="text-[11px] uppercase tracking-[0.18em] text-gray-400 font-bold mb-3">Filters</p>
        <div className="space-y-1.5">
          {[
            { label: '100% Made in India', active: f100, toggle: () => setF100(v => !v) },
            { label: 'Export Ready', active: fExport, toggle: () => setFExport(v => !v) },
          ].map(opt => (
            <button
              key={opt.label}
              onClick={opt.toggle}
              className={`w-full text-left px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-150 flex items-center gap-2.5 ${
                opt.active
                  ? 'bg-gray-900 text-white border-gray-900 shadow-sm'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
              }`}
            >
              <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${opt.active ? 'bg-white' : 'bg-green-500'}`} />
              {opt.label}
            </button>
          ))}
        </div>
      </aside>

      {/* ── MAIN CONTENT ────────────────────────────────────────────── */}
      <main className="flex-1 overflow-hidden">

        {/* Hero strip */}
        <section className="px-10 py-10 border-b border-gray-200 bg-white">
          <p className="text-xs uppercase tracking-[0.18em] text-gray-400 font-bold mb-2">Verified Partners</p>
          <h1 className="text-5xl font-bold text-gray-900 mb-3">
            {activeCat === 'All' ? 'All Manufacturers' : activeCat}
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl leading-8">
            Licensed Indian manufacturers, cooperatives, and artisan clusters — with full supply chain transparency and bulk pricing.
          </p>
        </section>

        {/* Sort + Cart bar */}
        <section className="sticky top-0 z-30 bg-white border-b border-gray-200 px-10 py-4">
          <div className="flex justify-between gap-5 flex-wrap items-center">
            <div className="flex gap-2 flex-wrap">
              {([
                { value: 'relevance', label: 'Relevance' },
                { value: 'price_asc', label: 'Price ↑' },
                { value: 'price_desc', label: 'Price ↓' },
                { value: 'rating', label: 'Top Rated' },
                { value: 'india_pct', label: '% India Made' },
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

            <button
              onClick={() => setShowCart(true)}
              className="px-5 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-semibold shadow-md flex items-center gap-2 hover:bg-gray-700 transition relative"
            >
              🛒 RFQ Cart ({cartCount}) • ₹{cartTotal.toLocaleString('en-IN')}
            </button>
          </div>
        </section>

        {/* Results */}
        <section className="px-10 py-8">
          <div className="mb-6 text-sm text-gray-500">
            {filtered.length} manufacturer{filtered.length !== 1 ? 's' : ''}
            {search ? ` for "${search}"` : ''}
            {activeCat !== 'All' ? ` in ${activeCat}` : ''}
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-3 gap-6 items-stretch">
              {filtered.map(m => (
                <div key={m.id} className="h-full">
                  <ManufacturerCard
                    m={m}
                    onDetail={() => setModal(m)}
                    onAdd={() => addToCart(m)}
                    isInCart={isInCart(m.id)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="text-lg font-semibold text-gray-700 mb-1">No manufacturers found</p>
              <p className="text-sm text-gray-400">Try adjusting your search or filters</p>
              <button
                onClick={() => { setSearch(''); setActiveCat('All'); setF100(false); setFExport(false); }}
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
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setShowCart(false)} />
          <div className="relative w-[380px] h-screen bg-white shadow-2xl border-l border-gray-200 flex flex-col">
            {/* Header */}
            <div className="p-5 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-900">RFQ Cart</h2>
                <p className="text-xs text-gray-400 mt-0.5">{cartCount} item{cartCount !== 1 ? 's' : ''} · Bulk Quote Request</p>
              </div>
              <button onClick={() => setShowCart(false)} className="text-gray-400 hover:text-gray-700 text-sm font-semibold transition p-2 hover:bg-gray-100 rounded-lg">
                ✕ Close
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center pb-10">
                  <span className="text-5xl mb-4">📦</span>
                  <p className="text-base font-semibold text-gray-700 mb-1">Your RFQ cart is empty</p>
                  <p className="text-sm text-gray-400">Add manufacturers to request a bulk quote</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="border border-gray-200 rounded-xl p-4 flex gap-3">
                    <span className="text-3xl flex-shrink-0">{item.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{item.product}</p>
                      <p className="text-xs text-amber-600 font-semibold mt-0.5">{item.name}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <button onClick={() => updateQty(item.id, -1)} className="w-7 h-7 rounded-lg border border-gray-200 text-gray-600 text-sm font-bold flex items-center justify-center hover:bg-gray-50 transition">−</button>
                          <span className="text-sm font-bold text-gray-900 min-w-[20px] text-center">{item.quantity}</span>
                          <button onClick={() => updateQty(item.id, 1)} className="w-7 h-7 rounded-lg border border-gray-200 text-gray-600 text-sm font-bold flex items-center justify-center hover:bg-gray-50 transition">+</button>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-gray-900">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                          <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-500 transition p-1">
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
            {cart.length > 0 && (
              <div className="p-5 border-t border-gray-200">
                <div className="flex justify-between text-sm text-gray-500 mb-1.5">
                  <span>Estimated Total</span>
                  <span className="font-semibold text-gray-900">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <p className="text-xs text-gray-400 mb-4">Exclusive of GST · Final pricing after supplier confirmation</p>
                <div className="flex justify-between font-bold text-lg mb-4 pt-3 border-t border-gray-100">
                  <span>Total</span>
                  <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <button className="w-full bg-gray-900 text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-gray-700 transition active:scale-[0.99]">
                  Send Bulk RFQ to Suppliers →
                </button>
                <button onClick={() => setCart([])} className="w-full mt-2 text-xs text-gray-400 hover:text-red-500 py-1 transition">
                  Clear cart
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── DETAIL MODAL ─────────────────────────────────────────────── */}
      {modal && (
        <DetailModal
          m={modal}
          onClose={() => setModal(null)}
          onAdd={() => addToCart(modal)}
          isInCart={isInCart(modal.id)}
        />
      )}
    </div>
  );
}