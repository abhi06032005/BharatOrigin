'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Bot, User, Send, ShoppingBag, Star } from 'lucide-react';
import Link from 'next/link';
import { aiFeatures, demoMessages } from './RetailFeatureData';

// ── Mock product cards shown in the demo UI ──────────────────────────────────
const DEMO_PRODUCTS = [
  {
    brand: 'Mamaearth',
    name: 'Vitamin C Face Serum',
    price: '₹599',
    original: '₹999',
    score: 82,
    tag: '40% OFF',
    color: 'from-orange-400 to-amber-500',
  },
  {
    brand: 'Biotique',
    name: 'Bio Kelp Shampoo',
    price: '₹249',
    original: '₹399',
    score: 86,
    tag: 'Organic',
    color: 'from-emerald-400 to-teal-500',
  },
  {
    brand: 'Forest Essentials',
    name: 'Soundarya Night Cream',
    price: '₹1,950',
    original: '₹2,875',
    score: 93,
    tag: 'Premium',
    color: 'from-violet-400 to-purple-500',
  },
];

const COLOR_MAP: Record<string, { bg: string; text: string; glow: string; border: string }> = {
  orange: {
    bg: 'bg-orange-50',
    text: 'text-orange-600',
    glow: 'shadow-orange-500/20',
    border: 'border-orange-100',
  },
  emerald: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-600',
    glow: 'shadow-emerald-500/20',
    border: 'border-emerald-100',
  },
  amber: {
    bg: 'bg-amber-50',
    text: 'text-amber-600',
    glow: 'shadow-amber-500/20',
    border: 'border-amber-100',
  },
};

export default function AIProductDiscoverySection() {
  const [activeStep, setActiveStep] = useState(0);
  const [showProducts, setShowProducts] = useState(false);

  // Cycle active feature on mount for animation effect
  React.useEffect(() => {
    const t = setInterval(() => setActiveStep(s => (s + 1) % aiFeatures.length), 2800);
    return () => clearInterval(t);
  }, []);

  React.useEffect(() => {
    const t = setTimeout(() => setShowProducts(true), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative py-28 px-6 overflow-hidden">
      {/* ── Ambient Glows ─────────────────────────────────────────────── */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-orange-500/8 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-violet-500/8 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">

        {/* ── Section Label ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-orange-50 border border-orange-100 text-orange-600 text-[11px] font-black tracking-[0.2em] uppercase mb-6">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" /> AI-Powered
          </span>
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-[0.95] tracking-tight">
            Shop Indian,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400">
              Intelligently.
            </span>
          </h2>
          <p className="mt-6 text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Tell our AI what you're looking for in plain words. It finds the best{' '}
            <span className="text-slate-900 font-bold">verified Indian alternatives</span> — ranked by
            origin, quality, and Bharat Score™.
          </p>
        </motion.div>

        {/* ── Main Content Grid ──────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 items-start">

          {/* LEFT: Feature list ─────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-5 lg:pt-4"
          >
            {aiFeatures.map((feat, i) => {
              const c = COLOR_MAP[feat.color];
              const isActive = activeStep === i;
              return (
                <motion.div
                  key={i}
                  onClick={() => setActiveStep(i)}
                  animate={isActive ? { scale: 1.02 } : { scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className={`relative flex items-start gap-5 p-6 rounded-3xl border cursor-pointer transition-all duration-300 ${
                    isActive
                      ? `bg-white shadow-xl ${c.glow} shadow-lg ${c.border}`
                      : 'bg-white/40 border-transparent hover:bg-white/80'
                  }`}
                >
                  {/* Active indicator bar */}
                  {isActive && (
                    <motion.div
                      layoutId="feat-bar"
                      className={`absolute left-0 top-4 bottom-4 w-1 rounded-full ${c.bg.replace('bg-', 'bg-').replace('-50', '-400')}`}
                      style={{ background: feat.color === 'orange' ? '#f97316' : feat.color === 'emerald' ? '#10b981' : '#f59e0b' }}
                    />
                  )}
                  <div className={`w-14 h-14 rounded-2xl ${isActive ? c.bg : 'bg-slate-50'} ${c.text} flex items-center justify-center shrink-0 transition-colors duration-300 shadow-sm`}>
                    {feat.icon}
                  </div>
                  <div>
                    <h3 className="text-slate-900 font-black text-base mb-1">{feat.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{feat.desc}</p>
                  </div>
                </motion.div>
              );
            })}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="pt-4"
            >
              <Link
                href="/ai-shopper"
                className="group inline-flex items-center gap-3 px-10 py-5 rounded-[1.5rem] bg-slate-900 text-white font-black tracking-widest text-[11px] uppercase hover:bg-orange-500 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/25"
              >
                Try AI Shopper
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </motion.div>

          {/* RIGHT: Live AI Chat Demo ──────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Chat window */}
            <div className="relative bg-white rounded-[2rem] shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden">

              {/* Window chrome */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center shadow-md shadow-orange-500/25">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900">AI Personal Shopper</p>
                    <p className="text-[9px] text-emerald-500 font-bold uppercase tracking-widest">● Live</p>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  {['bg-red-400', 'bg-yellow-400', 'bg-green-400'].map((c, i) => (
                    <div key={i} className={`w-2.5 h-2.5 rounded-full ${c} opacity-70`} />
                  ))}
                </div>
              </div>

              {/* Chat body */}
              <div className="p-6 space-y-4 min-h-[200px]">
                {/* User message */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                  className="flex justify-end gap-2 items-end"
                >
                  <div className="bg-slate-900 text-white text-sm font-medium px-4 py-3 rounded-2xl rounded-br-md max-w-[80%] leading-relaxed">
                    Looking for organic skincare under ₹1000
                  </div>
                  <div className="w-7 h-7 rounded-lg bg-slate-200 flex items-center justify-center shrink-0">
                    <User className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                </motion.div>

                {/* AI message */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  viewport={{ once: true }}
                  className="flex gap-2 items-end"
                >
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center shrink-0 shadow-md">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="space-y-2 max-w-[85%]">
                    <div className="bg-orange-50 border border-orange-100 text-slate-700 text-sm font-medium px-4 py-3 rounded-2xl rounded-bl-md leading-relaxed">
                      Found <strong className="text-slate-900">3 products</strong> from Mamaearth &amp; Biotique.{' '}
                      Average Bharat Score: <strong className="text-orange-600">84/100</strong> 🇮🇳
                    </div>
                    {/* Follow-up chips */}
                    <div className="flex gap-2 flex-wrap pt-1">
                      {['Show premium picks', 'Under ₹500 only'].map((chip) => (
                        <span key={chip} className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-[11px] font-bold text-slate-500 cursor-pointer hover:border-orange-300 hover:text-orange-600 transition-all">
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Product Cards Preview */}
              <AnimatePresence>
                {showProducts && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="px-6 pb-5 grid grid-cols-3 gap-3 overflow-hidden"
                  >
                    {DEMO_PRODUCTS.map((p, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * i }}
                        className="group relative bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                      >
                        {/* Gradient colour bar */}
                        <div className={`h-1.5 w-full bg-gradient-to-r ${p.color}`} />
                        <div className="p-3">
                          <span className="text-[8px] font-black uppercase tracking-widest text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded-full">
                            {p.brand}
                          </span>
                          <p className="text-[11px] font-bold text-slate-800 mt-1.5 leading-tight line-clamp-2">{p.name}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-sm font-black text-slate-900">{p.price}</span>
                            <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                              BS {p.score}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Fake input bar */}
              <div className="px-6 pb-6">
                <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 text-sm flex-1">Ask anything about Indian products...</span>
                  <div className="w-8 h-8 rounded-xl bg-orange-500 flex items-center justify-center shadow-md shadow-orange-500/25">
                    <Send className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-5 -right-5 bg-white rounded-2xl shadow-xl border border-slate-100 px-4 py-3 hidden sm:block"
            >
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Bharat Score</p>
              <p className="text-2xl font-black text-orange-500">84<span className="text-sm text-slate-400">/100</span></p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}