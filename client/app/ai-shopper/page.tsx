'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  Sparkles, Send, ShoppingBag, Star, MapPin, ArrowLeft, Tag,
  MessageSquare, Zap, Heart, TrendingUp, Package, ChevronRight,
  Bot, User, X, Plus, Minus, Trash2
} from 'lucide-react';
import Link from 'next/link';
import PRODUCTS, {
  findMatchingProducts,
  generateAIResponse,
  SUGGESTION_CHIPS,
  type MatchResult,
  type ShopperProduct,
} from './products-db';

// ─── Types ────────────────────────────────────────────────────────────────────

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  results?: MatchResult[];
  timestamp: Date;
}

interface CartItem extends ShopperProduct {
  quantity: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const getBharatMeta = (score: number) => {
  if (score < 50) return { color: '#EF4444', bg: '#FEF2F2', text: '#DC2626', label: 'Low' };
  if (score < 75) return { color: '#F59E0B', bg: '#FFFBEB', text: '#D97706', label: 'Mid' };
  return { color: '#22C55E', bg: '#F0FDF4', text: '#16A34A', label: 'High' };
};

const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

// ─── Component ────────────────────────────────────────────────────────────────

export default function AIShopperPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [addedIds, setAddedIds] = useState<Set<number>>(new Set());
  const [showWelcome, setShowWelcome] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, isTyping, scrollToBottom]);

  // ── Cart Logic ─────────────────────────────────────────────────────────────

  const addToCart = (product: ShopperProduct) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...product, quantity: 1 }];
    });
    setAddedIds(prev => new Set(prev).add(product.id));
    setTimeout(() => setAddedIds(prev => { const n = new Set(prev); n.delete(product.id); return n; }), 2000);
  };

  const updateCartQty = (id: number, delta: number) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i).filter(i => i.quantity > 0));
  };

  const removeFromCart = (id: number) => setCart(prev => prev.filter(i => i.id !== id));
  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  // ── Chat Logic ─────────────────────────────────────────────────────────────

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    setShowWelcome(false);
    setInput('');

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);

    setIsTyping(true);

    try {
      // Use environment variable for backend URL if hosted, fallback to localhost for local dev
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/shopping/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: text })
      });
      
      let finalResults: MatchResult[] = [];
      const data = await response.json();

      if (response.ok && data.products && data.products.length > 0) {
        // Map to MatchResult structure
        finalResults = data.products.map((p: ShopperProduct) => ({
          product: p,
          relevanceScore: 100,
          matchReasons: ['Live Internet Match']
        }));
      } else {
        throw new Error("Empty or failed response from live API");
      }

      // Use AI-generated message from Groq backend, fallback to local generator
      const aiContent = data.aiMessage || generateAIResponse(text, finalResults);

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiContent,
        results: finalResults,
        timestamp: new Date(),
      };
      
      setIsTyping(false);
      setMessages(prev => [...prev, aiMsg]);

    } catch (err) {
      console.warn("Live search failed, falling back to local DB...", err);
      // Fallback to local offline cache
      await delay(800);
      const results = findMatchingProducts(text);
      const aiContent = generateAIResponse(text, results);

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiContent,
        results,
        timestamp: new Date(),
      };
      setIsTyping(false);
      setMessages(prev => [...prev, aiMsg]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleChipClick = (chip: string) => {
    sendMessage(chip);
  };

  // ─── Product Card (inline in chat) ─────────────────────────────────────────

  const ProductCard = ({ result, index }: { result: MatchResult; index: number }) => {
    const { product, matchReasons } = result;
    const meta = getBharatMeta(product.bharatScore);
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    const isAdded = addedIds.has(product.id);
    const inCart = cart.find(i => i.id === product.id);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: index * 0.1, duration: 0.4, ease: 'easeOut' }}
        className="group relative bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}
      >
        {/* Image */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
            priority={index < 3}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                `https://placehold.co/400x300/fff7ed/f97316?text=${encodeURIComponent(product.brand)}`;
            }}
          />
          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {discount > 0 && (
            <span className="absolute top-3 left-3 bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg">
              {discount}% OFF
            </span>
          )}
          {product.tags[0] && (
            <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-800 text-[10px] font-bold px-2.5 py-1 rounded-full border border-gray-200/50">
              {product.tags[0]}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col gap-2.5">
          {/* Brand & Location */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
              {product.brand}
            </span>
            <span className="flex items-center gap-1 text-[10px] text-gray-400">
              <MapPin className="w-3 h-3" />
              {product.state}
            </span>
          </div>

          {/* Name */}
          <h4 className="text-sm font-bold text-gray-900 leading-snug line-clamp-2">
            {product.name}
          </h4>

          {/* Description */}
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
            {product.description}
          </p>

          {/* Rating & Bharat Score */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-xs font-bold text-gray-800">{product.rating}</span>
              <span className="text-[10px] text-gray-400">({product.reviews.toLocaleString()})</span>
            </div>
            <span
              className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: meta.bg, color: meta.text }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: meta.color }} />
              BS: {product.bharatScore}
            </span>
          </div>

          {/* Match Reason */}
          {matchReasons[0] && (
            <p className="text-[10px] text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg font-medium flex items-center gap-1">
              <Zap className="w-3 h-3" />
              {matchReasons[0]}
            </p>
          )}

          {/* Price & CTA */}
          <div className="flex items-center justify-between pt-1 mt-auto">
            <div>
              <span className="text-lg font-black text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
              <span className="text-xs text-gray-400 line-through ml-2">₹{product.originalPrice.toLocaleString('en-IN')}</span>
            </div>
            {inCart && !isAdded ? (
              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-2 rounded-xl border border-amber-200">
                {inCart.quantity} in cart
              </span>
            ) : (
              <button
                onClick={() => addToCart(product)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${isAdded
                  ? 'bg-emerald-500 text-white scale-95'
                  : 'bg-gray-900 text-white hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/20 active:scale-95'
                  }`}
              >
                {isAdded ? '✓ Added' : 'Add to Cart'}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(165deg, #FFF8F0 0%, #FEF3E2 40%, #FFF5EB 100%)' }}>

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/70 border-b border-orange-100/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-400 hover:text-gray-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest hidden sm:inline">Back</span>
            </Link>
            <div className="w-px h-6 bg-gray-200 hidden sm:block" />
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-400 flex items-center justify-center shadow-lg shadow-orange-500/25">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white" />
              </div>
              <div>
                <h1 className="text-base font-black text-gray-900 tracking-tight">AI Personal Shopper</h1>
                <p className="text-[10px] font-semibold text-emerald-600 uppercase tracking-widest">● Online — Powered by BharatOrigin</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowCart(true)}
            className="relative flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gray-900 text-white text-sm font-bold hover:bg-gray-700 transition-all hover:shadow-lg active:scale-[0.97]"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Cart</span>
            {cartCount > 0 && (
              <motion.span
                key={cartCount}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 text-white text-[11px] font-black rounded-full flex items-center justify-center shadow-lg"
              >
                {cartCount}
              </motion.span>
            )}
          </button>
        </div>
      </header>

      {/* ── Main Chat Area ──────────────────────────────────────────────── */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 flex flex-col">

        {/* Welcome Screen */}
        <AnimatePresence>
          {showWelcome && messages.length === 0 && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
              className="flex-1 flex flex-col items-center justify-center text-center px-4 py-12"
            >
              {/* Hero icon */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="relative mb-8"
              >
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-400 flex items-center justify-center shadow-2xl shadow-orange-500/30">
                  <Sparkles className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-400 rounded-xl flex items-center justify-center shadow-lg">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              </motion.div>

              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3 tracking-tight">
                Namaste!
              </h2>
              <p className="text-lg text-gray-500 max-w-lg mb-2 leading-relaxed">
                I'm your <span className="font-bold text-orange-600">AI Personal Shopper</span> — tell me what you need,
                and I'll find the best Indian products for you.
              </p>
              <p className="text-sm text-gray-400 mb-10">
                Just type naturally — like talking to a friend who knows every Indian brand!
              </p>

              {/* Feature pills */}
              <div className="flex flex-wrap justify-center gap-3 mb-10">
                {[
                  { icon: <TrendingUp className="w-3.5 h-3.5" />, text: '100% Indian Brands' },
                  { icon: <Package className="w-3.5 h-3.5" />, text: 'Bharat Score™ Verified' },
                  { icon: <Heart className="w-3.5 h-3.5" />, text: 'Smart Recommendations' },
                  { icon: <Zap className="w-3.5 h-3.5" />, text: 'Budget Aware' },
                ].map((f, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-orange-100/50 text-xs font-semibold text-gray-600 shadow-sm"
                  >
                    <span className="text-orange-500">{f.icon}</span>
                    {f.text}
                  </motion.div>
                ))}
              </div>

              {/* Suggestion Chips */}
              <div className="w-full max-w-2xl">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                  Try asking...
                </p>
                <div className="flex flex-wrap justify-center gap-2.5">
                  {SUGGESTION_CHIPS.slice(0, 6).map((chip, i) => (
                    <motion.button
                      key={chip}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.08 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleChipClick(chip)}
                      className="px-4 py-2.5 rounded-2xl border border-orange-200/60 bg-white/90 backdrop-blur-sm text-sm font-semibold text-gray-700 hover:border-orange-400 hover:text-orange-700 hover:shadow-md hover:shadow-orange-500/10 transition-all cursor-pointer"
                    >
                      {chip}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Messages */}
        <div className="flex-1 space-y-6 pb-4">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {/* Assistant Avatar */}
              {msg.role === 'assistant' && (
                <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-md shadow-orange-500/20 mt-1">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              )}

              <div className={`max-w-[85%] ${msg.role === 'user' ? 'order-first' : ''}`}>
                {/* Text Bubble */}
                <div
                  className={`px-5 py-3.5 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                    ? 'bg-gray-900 text-white rounded-br-md ml-auto'
                    : 'bg-white border border-gray-100 text-gray-700 rounded-bl-md shadow-sm'
                    }`}
                >
                  {msg.content.split('\n').map((line, i) => (
                    <p key={i} className={i > 0 ? 'mt-2' : ''}>
                      {line.split(/(\*\*.*?\*\*)/).map((part, j) =>
                        part.startsWith('**') && part.endsWith('**')
                          ? <strong key={j} className={msg.role === 'user' ? 'text-orange-300' : 'text-gray-900'}>{part.slice(2, -2)}</strong>
                          : <span key={j}>{part}</span>
                      )}
                    </p>
                  ))}
                </div>

                {/* Product Results Grid */}
                {msg.results && msg.results.length > 0 && (
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {msg.results.map((result, i) => (
                      <ProductCard key={result.product.id} result={result} index={i} />
                    ))}
                  </div>
                )}

                {/* Follow-up chips after results */}
                {msg.results && msg.results.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-4 flex flex-wrap gap-2"
                  >
                    {['Show me cheaper options', 'Any premium picks?', 'More like these'].map((chip) => (
                      <button
                        key={chip}
                        onClick={() => handleChipClick(chip)}
                        className="px-3.5 py-2 rounded-xl border border-gray-200 bg-white/80 text-xs font-semibold text-gray-600 hover:border-orange-300 hover:text-orange-700 transition-all"
                      >
                        {chip}
                      </button>
                    ))}
                  </motion.div>
                )}

                {/* Timestamp */}
                <p className={`text-[10px] text-gray-300 mt-1.5 ${msg.role === 'user' ? 'text-right' : ''}`}>
                  {msg.timestamp.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>

              {/* User Avatar */}
              {msg.role === 'user' && (
                <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-gray-200 flex items-center justify-center mt-1">
                  <User className="w-4 h-4 text-gray-500" />
                </div>
              )}
            </motion.div>
          ))}

          {/* Typing Indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex gap-3 items-start"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-md shadow-orange-500/20">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="px-5 py-4 rounded-2xl rounded-bl-md bg-white border border-gray-100 shadow-sm">
                  <div className="flex gap-1.5">
                    {[0, 1, 2].map(i => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full bg-orange-400"
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-xs text-gray-400 mt-3">Finding the best picks...</span>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion chips when conversation has started */}
        {messages.length > 0 && messages.length < 3 && !isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-2 mb-4 px-1"
          >
            {SUGGESTION_CHIPS.slice(3, 7).map((chip) => (
              <button
                key={chip}
                onClick={() => handleChipClick(chip)}
                className="px-3.5 py-2 rounded-xl border border-gray-200/80 bg-white/60 backdrop-blur-sm text-xs font-semibold text-gray-500 hover:border-orange-300 hover:text-orange-700 hover:bg-white transition-all"
              >
                {chip}
              </button>
            ))}
          </motion.div>
        )}

        {/* ── Input Bar ─────────────────────────────────────────────────── */}
        <div className="sticky bottom-0 pb-4 pt-2">
          <form
            onSubmit={handleSubmit}
            className="relative flex items-center gap-3 p-2 pl-5 rounded-2xl bg-white/90 backdrop-blur-xl border border-orange-200/40 shadow-xl shadow-gray-900/5 focus-within:border-orange-400 focus-within:shadow-orange-500/10 transition-all duration-300"
          >
            <MessageSquare className="w-5 h-5 text-gray-300 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder='Try: "Need Indian shoes under ₹2000"'
              className="flex-1 py-3 text-sm text-gray-800 placeholder:text-gray-400 outline-none bg-transparent"
              disabled={isTyping}
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${input.trim() && !isTyping
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/25 hover:shadow-lg hover:shadow-orange-500/30 hover:scale-[1.02] active:scale-95'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>
          <p className="text-center text-[10px] text-gray-300 mt-2">
            AI recommendations are based on your query — all products are from verified Indian brands.
          </p>
        </div>
      </main>

      {/* ── Cart Drawer ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {showCart && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex justify-end"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
              onClick={() => setShowCart(false)}
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="relative w-full max-w-[420px] h-screen bg-white border-l border-gray-100 shadow-2xl flex flex-col"
            >
              {/* Cart Header */}
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-black text-gray-900">Your Cart</h2>
                  <p className="text-xs text-gray-400 mt-0.5">{cartCount} item{cartCount !== 1 ? 's' : ''} • All Indian brands</p>
                </div>
                <button
                  onClick={() => setShowCart(false)}
                  className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center pb-16">
                    <div className="w-20 h-20 rounded-3xl bg-gray-50 flex items-center justify-center mb-4">
                      <ShoppingBag className="w-8 h-8 text-gray-300" />
                    </div>
                    <p className="text-base font-bold text-gray-700 mb-1">Your cart is empty</p>
                    <p className="text-sm text-gray-400">Ask the AI to find products for you!</p>
                  </div>
                ) : (
                  cart.map(item => {
                    const meta = getBharatMeta(item.bharatScore);
                    return (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex gap-4 p-4 rounded-2xl border border-gray-100 bg-gray-50/50"
                      >
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="64px"
                            className="object-cover object-center"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src =
                                `https://placehold.co/100x100/fff7ed/f97316?text=${encodeURIComponent(item.brand)}`;
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold uppercase tracking-wider text-orange-600">{item.brand}</p>
                          <p className="text-sm font-bold text-gray-900 truncate">{item.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span
                              className="text-[9px] font-bold px-1.5 py-0.5 rounded"
                              style={{ background: meta.bg, color: meta.text }}
                            >
                              BS:{item.bharatScore}
                            </span>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => updateCartQty(item.id, -1)}
                                className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition"
                              >
                                <Minus className="w-3 h-3 text-gray-600" />
                              </button>
                              <span className="text-sm font-black text-gray-900 min-w-[20px] text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateCartQty(item.id, 1)}
                                className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition"
                              >
                                <Plus className="w-3 h-3 text-gray-600" />
                              </button>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-black text-gray-900">
                                ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                              </span>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-gray-300 hover:text-red-500 transition p-1"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </div>

              {/* Cart Footer */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-gray-100 bg-white">
                  <div className="flex justify-between text-sm text-gray-500 mb-1.5">
                    <span>Subtotal</span>
                    <span className="font-bold text-gray-900">₹{cartTotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 mb-4">
                    <span>Delivery</span>
                    <span className="font-bold text-emerald-600">FREE</span>
                  </div>
                  <div className="flex justify-between font-black text-lg mb-5 pt-3 border-t border-gray-100">
                    <span>Total</span>
                    <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                  </div>
                  <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-sm shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/30 hover:scale-[1.01] transition-all active:scale-[0.99]">
                    Checkout → Support Indian Brands
                  </button>
                  <button
                    onClick={() => setCart([])}
                    className="w-full mt-2 text-xs text-gray-400 hover:text-red-500 py-2 transition"
                  >
                    Clear cart
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
