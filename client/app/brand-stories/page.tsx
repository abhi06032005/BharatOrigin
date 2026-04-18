"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import {
  ArrowLeft,
  ArrowRight,
  BadgeIndianRupee,
  ExternalLink,
  Flag,
  Heart,
  MapPin,
  Rocket,
  Search,
  ShoppingBag,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
  X,
  Store
} from "lucide-react";

import { Brand, BRANDS, CATEGORIES } from "./brandStoriesData";
import Navbar from "../components/Navbar";


const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBrands = BRANDS.filter((brand) => {
    const matchesCategory =
      selectedCategory === "all" || brand.category === selectedCategory;
    const matchesSearch =
      brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      brand.founder.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative min-h-screen text-slate-900 pb-20">
      {/* Global Backgrounds from globals.css */}
      <div className="aurora-bg" />
      <div className="indian-pattern-overlay" />
      <div className="rangoli-corner rangoli-corner--tl" />
      <div className="rangoli-corner rangoli-corner--br" />

      <Navbar />

      <AnimatePresence mode="wait">
        {selectedBrand ? (
          <motion.div
            key="brand-detail"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.4 }}
            className="relative z-10"
          >
            {/* Minimal Back Header */}
            <header className="sticky top-0 z-50 pt-4 px-4 pointer-events-none">
              <div className="mx-auto max-w-7xl">
                <div className="pointer-events-auto inline-flex items-center gap-6 glass-warm rounded-full px-4 py-2 border border-orange-200/40 shadow-lg">
                  <button
                    onClick={() => setSelectedBrand(null)}
                    className="flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-bold text-slate-600 transition-colors hover:bg-orange-100 hover:text-orange-600"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Brands
                  </button>
                  <div className="h-4 border-l border-orange-200" />
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500 pr-2 uppercase tracking-wide">
                    <Flag className="h-4 w-4 text-orange-500" />
                    {selectedBrand.indianOwnership}% Indian Owned
                  </div>
                </div>
              </div>
            </header>

            {/* Hero Profile Section */}
            <section className="relative px-6 pt-12 pb-16 mx-auto max-w-7xl">
              <div className="glass-warm rounded-[40px] border border-orange-200/40 p-8 md:p-12 shadow-2xl overflow-hidden relative">

                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-400/20 blur-[80px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/4" />

                <div className="flex flex-col items-start gap-8 md:flex-row md:items-center relative z-10">
                  <div className="flex h-32 w-32 items-center justify-center rounded-3xl bg-white shadow-xl shadow-orange-500/10 border border-orange-100 text-6xl">
                    {selectedBrand.logo}
                  </div>
                  <div className="flex-1">
                    <div className="mb-4 flex flex-wrap gap-2">
                      {selectedBrand.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-white border border-orange-200 px-3 py-1 text-xs font-bold text-orange-600 tracking-wide uppercase shadow-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight">
                      {selectedBrand.name}
                    </h1>
                    <p className="mt-2 text-xl font-bold text-gradient-warm">
                      {selectedBrand.tagline}
                    </p>
                    <div className="mt-6 flex flex-wrap items-center gap-6 text-sm font-semibold text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4 text-orange-400" /> {selectedBrand.origin}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Star className="h-4 w-4 text-amber-400 fill-amber-400" />{" "}
                        {selectedBrand.rating} Rating
                      </span>
                      <span className="flex items-center gap-1.5">
                        <TrendingUp className="h-4 w-4 text-emerald-500" /> Established {selectedBrand.year}
                      </span>
                    </div>
                  </div>
                  <a
                    href={selectedBrand.shopUrl}
                    className="flex flex-col items-center justify-center gap-2 rounded-3xl bg-slate-900 px-8 py-6 font-bold tracking-wider text-white shadow-lg transition-transform hover:scale-105 group"
                  >
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="h-5 w-5 text-orange-400" />
                      EXPLORE & SHOP
                    </div>
                    <span className="text-xs text-slate-400 font-medium group-hover:text-white transition-colors">Direct from brand</span>
                  </a>
                </div>
              </div>
            </section>

            {/* Content Grid */}
            <div className="mx-auto max-w-7xl px-6 pb-20">
              <div className="grid gap-8 lg:grid-cols-12">

                {/* Left Column: Story */}
                <div className="lg:col-span-8 space-y-8">
                  <div className="rounded-[32px] glass border border-white/60 p-10 shadow-lg">
                    <h2 className="mb-6 flex items-center gap-3 text-3xl font-black text-slate-900">
                      <div className="p-2 bg-orange-100 rounded-xl text-orange-500"><Sparkles className="h-6 w-6" /></div>
                      The Origin Story
                    </h2>
                    <p className="leading-relaxed text-lg text-slate-600 font-medium whitespace-pre-line">
                      {selectedBrand.story}
                    </p>
                  </div>

                  <div className="rounded-[32px] glass border border-white/60 p-10 shadow-lg">
                    <h2 className="mb-6 flex items-center gap-3 text-3xl font-black text-slate-900">
                      <div className="p-2 bg-emerald-100 rounded-xl text-emerald-500"><Target className="h-6 w-6" /></div>
                      The Mission
                    </h2>
                    <p className="leading-relaxed text-lg text-slate-600 font-medium">
                      {selectedBrand.mission}
                    </p>
                  </div>

                  <div className="rounded-[32px] glass border border-white/60 p-10 shadow-lg">
                    <h2 className="mb-8 flex items-center gap-3 text-3xl font-black text-slate-900">
                      <div className="p-2 bg-indigo-100 rounded-xl text-indigo-500"><TrendingUp className="h-6 w-6" /></div>
                      The Journey
                    </h2>
                    <div className="relative space-y-8 pl-8 before:absolute before:left-[11px] before:top-2 before:h-[calc(100%-16px)] before:w-1 before:bg-gradient-to-b before:from-orange-400 before:to-transparent before:rounded-full">
                      {selectedBrand.journey.map((milestone, i) => (
                        <div key={i} className="relative flex items-center gap-6">
                          <div className="absolute -left-[35.5px] h-6 w-6 rounded-full border-[4px] border-white bg-orange-400 shadow-md" />
                          <p className="text-lg font-bold text-slate-700">
                            {milestone}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Meta Info */}
                <div className="lg:col-span-4 space-y-8">
                  <div className="rounded-[32px] glass border border-white/60 p-8 shadow-lg">
                    <h3 className="mb-6 flex items-center gap-3 text-xl font-black text-slate-900 tracking-tight">
                      <div className="p-2 bg-rose-100 rounded-xl text-rose-500"><Users className="h-5 w-5" /></div>
                      The Visionary
                    </h3>
                    <div className="flex items-center gap-4">
                      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-sm border border-slate-100 text-4xl">
                        {selectedBrand.founderImage}
                      </div>
                      <div>
                        <p className="font-black text-xl text-slate-900">
                          {selectedBrand.founder}
                        </p>
                        <p className="text-sm font-bold text-orange-500 uppercase tracking-wide mt-1">
                          Founder
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[32px] glass border border-white/60 p-8 shadow-lg">
                    <h3 className="mb-8 font-black text-xl text-slate-900 tracking-tight">
                      Brand Index
                    </h3>
                    <div className="space-y-6">
                      <div>
                        <div className="mb-2 flex justify-between text-sm">
                          <span className="font-bold text-slate-500">Ownership</span>
                          <span className="font-black text-emerald-600">
                            {selectedBrand.indianOwnership}% Indian
                          </span>
                        </div>
                        <div className="h-3 overflow-hidden rounded-full bg-slate-200 shadow-inner">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${selectedBrand.indianOwnership}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 p-4 rounded-2xl bg-white/50 border border-white backdrop-blur-sm">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Root Origin</span>
                        <span className="font-bold text-slate-800">{selectedBrand.origin}</span>
                      </div>
                      <div className="flex flex-col gap-1 p-4 rounded-2xl bg-white/50 border border-white backdrop-blur-sm">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Inception Year</span>
                        <span className="font-bold text-slate-800">{selectedBrand.year}</span>
                      </div>
                    </div>
                  </div>

                  {/* Shop CTA Box */}
                  <div className="rounded-[32px] glass-warm border border-orange-200/40 p-10 shadow-2xl text-center relative overflow-hidden flex flex-col items-center">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-400/20 blur-2xl rounded-full" />

                    <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-orange-500 mb-6 shadow-md border border-orange-100">
                      <ShoppingBag size={32} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">Buy Authentic</h3>
                    <p className="text-slate-600 font-medium mb-8">Purchase directly from {selectedBrand.name}'s verified catalog.</p>

                    <a
                      href={selectedBrand.shopUrl}
                      className="w-full flex items-center justify-center gap-2 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white px-6 py-4 font-bold tracking-wider shadow-lg hover:shadow-xl transition-all"
                    >
                      SHOP NOW <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="brand-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10"
          >
            {/* Nav Header */}
            <header className="pt-8 px-6 mb-12">
              <div className="mx-auto flex max-w-7xl flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-md border border-orange-100 flex items-center justify-center text-orange-500">
                    <Flag size={24} />
                  </div>
                  <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Brand Stories</h1>
                    <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">The Makers of India</span>
                  </div>
                </div>

                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-orange-400" />
                  <input
                    type="text"
                    placeholder="Search visionary brands..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full md:w-80 rounded-2xl glass-warm border border-orange-200/50 py-4 pl-12 pr-10 text-sm font-bold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-400/20 transition-all shadow-sm"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-800"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </div>
            </header>

            <div className="mx-auto max-w-7xl px-6 pb-20">

              {/* Category Filter */}
              <div className="mb-12 flex flex-wrap gap-3">
                {CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const active = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold transition-all shadow-sm ${active
                          ? "bg-slate-900 text-white shadow-xl scale-105"
                          : "glass border border-white/60 text-slate-600 hover:bg-white hover:text-slate-900"
                        }`}
                    >
                      <Icon className={`h-4 w-4 ${active ? 'text-orange-400' : 'text-slate-400'}`} />
                      {cat.label}
                    </button>
                  );
                })}
              </div>

              {/* Brand Grid */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredBrands.map((brand, i) => (
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={brand.id}
                    onClick={() => setSelectedBrand(brand)}
                    className="group flex flex-col items-start rounded-[32px] glass-warm border border-orange-200/40 p-8 text-left transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/10 cursor-pointer relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/40 blur-2xl rounded-full" />

                    <div className="mb-6 flex w-full items-start justify-between relative z-10">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-md border border-orange-100 text-4xl group-hover:scale-110 transition-transform duration-300">
                        {brand.logo}
                      </div>
                      <div className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-black tracking-wider text-emerald-600 shadow-sm border border-emerald-100">
                        <Flag className="h-3 w-3" />
                        {brand.indianOwnership}%
                      </div>
                    </div>

                    <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-1 relative z-10">
                      {brand.name}
                    </h3>
                    <p className="text-sm font-bold text-orange-600 relative z-10">
                      {brand.tagline}
                    </p>

                    <div className="mt-4 flex items-center gap-2 text-xs font-bold text-slate-500 relative z-10">
                      <Users className="h-4 w-4 text-slate-400" /> {brand.founder}
                      <span className="mx-1 text-slate-300">•</span>
                      <span>{brand.year}</span>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2 relative z-10">
                      {brand.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="rounded-lg bg-white/60 border border-white/80 px-2.5 py-1 text-[10px] font-black uppercase text-slate-600">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-8 flex w-full items-center justify-between text-sm font-black text-slate-400 group-hover:text-orange-500 transition-colors relative z-10">
                      READ STORY
                      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                        <ArrowRight className="h-4 w-4 text-orange-600" />
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              {filteredBrands.length === 0 && (
                <div className="flex flex-col items-center justify-center py-32 text-center glass rounded-[40px]">
                  <Search className="mb-6 h-16 w-16 text-slate-300" />
                  <p className="text-2xl font-black text-slate-800">
                    No brands found
                  </p>
                  <p className="mt-2 text-slate-500 font-medium">
                    Try checking a different category or search term.
                  </p>
                </div>
              )}

              {/* ── Call to Action: List Your Brand ── */}
              <div className="mt-20">
                <div className="rounded-[40px] bg-gradient-to-br from-slate-900 to-slate-800 p-10 md:p-16 relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-10">
                  <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/20 blur-[100px] rounded-full pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/20 blur-[100px] rounded-full pointer-events-none" />

                  <div className="relative z-10 max-w-2xl text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold tracking-widest uppercase mb-6 shadow-sm backdrop-blur-md">
                      <Store size={14} className="text-orange-400" /> Merchant Onboarding
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4 tracking-tight">
                      Are you building an <br />
                      <span className="text-gradient-saffron">Indian Heritage Brand?</span>
                    </h2>
                    <p className="text-lg text-slate-300 font-medium">
                      Join the Bharat Origin ecosystem. Let us tell your story and connect you directly with over 50,000 conscious consumers looking for authentic roots.
                    </p>
                  </div>

                  <div className="relative z-10 shrink-0">
                    <button className="px-10 py-5 rounded-2xl bg-white text-slate-900 font-black tracking-wider hover:bg-orange-100 hover:scale-105 transition-all shadow-xl flex items-center gap-3">
                      ONBOARD YOUR BRAND <ArrowRight className="w-5 h-5 text-orange-500" />
                    </button>
                    <p className="text-center text-slate-400 text-xs font-bold mt-4 uppercase tracking-widest">Takes 5 minutes</p>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
