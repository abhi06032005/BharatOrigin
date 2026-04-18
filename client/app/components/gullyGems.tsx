"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Navigation, Search, MapPin, Diamond, Star,
  ChevronDown, ChevronUp, ExternalLink, Edit3, Check, X,
  Loader2, Zap, Users, Globe, Camera, Phone, ArrowRight,
  ShieldCheck, Heart
} from "lucide-react";
import Navbar from "../components/Navbar";
// ─── Types matching backend response ─────────────────────────────────────────
interface BackendArtisan {
  id: number;
  name: string;
  craft: string;
  city: string;
  region: string;
  specialty: string;
  why_unique: string;
  buying_options: string;
  bharat_score: number;
  latitude: number;
  longitude: number;
  distance_km: number;
}
interface NearbyResponse {
  success: boolean;
  userLat: number;
  userLng: number;
  radiusKm: number;
  total: number;
  artisans: BackendArtisan[];
  error?: string;
}
// ─── Constants ───────────────────────────────────────────────────────────────
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const CARD_COLORS = [
  { gradient: "from-orange-500 to-amber-500", bg: "bg-orange-50/80", border: "border-orange-200/60", tag: "bg-orange-100 text-orange-700", btn: "bg-orange-500 hover:bg-orange-600", dot: "bg-orange-400" },
  { gradient: "from-emerald-500 to-teal-500", bg: "bg-emerald-50/80", border: "border-emerald-200/60", tag: "bg-emerald-100 text-emerald-700", btn: "bg-emerald-500 hover:bg-emerald-600", dot: "bg-emerald-400" },
  { gradient: "from-violet-500 to-purple-500", bg: "bg-violet-50/80", border: "border-violet-200/60", tag: "bg-violet-100 text-violet-700", btn: "bg-violet-500 hover:bg-violet-600", dot: "bg-violet-400" },
  { gradient: "from-rose-500 to-pink-500", bg: "bg-rose-50/80", border: "border-rose-200/60", tag: "bg-rose-100 text-rose-700", btn: "bg-rose-500 hover:bg-rose-600", dot: "bg-rose-400" },
  { gradient: "from-sky-500 to-cyan-500", bg: "bg-sky-50/80", border: "border-sky-200/60", tag: "bg-sky-100 text-sky-700", btn: "bg-sky-500 hover:bg-sky-600", dot: "bg-sky-400" },
];
const getBharatMeta = (score: number) => {
  if (score >= 90) return { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" };
  if (score >= 75) return { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" };
  return { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200" };
};
// ─── Artisan Card ────────────────────────────────────────────────────────────
function ArtisanCard({ artisan, index }: { artisan: BackendArtisan; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const c = CARD_COLORS[index % CARD_COLORS.length];
  const bsMeta = getBharatMeta(artisan.bharat_score);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${artisan.latitude},${artisan.longitude}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={`group relative bg-white/60 backdrop-blur-md border ${c.border} rounded-[2rem] overflow-hidden hover:shadow-2xl hover:shadow-orange-500/15 transition-all duration-500`}
    >
      {/* Premium Glow Effect */}
      <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${c.gradient} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-700`} />

      {/* Header Accent Line */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${c.gradient}`} />

      <div className="p-6">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${c.gradient} flex items-center justify-center text-white text-xl font-black shadow-[0_8px_20px_-4px_rgba(0,0,0,0.1)] flex-shrink-0 group-hover:scale-110 transition-transform duration-500`}>
              {artisan.name[0]}
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-lg leading-tight tracking-tight group-hover:text-orange-600 transition-colors duration-300">
                {artisan.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase ${c.tag}`}>
                  {artisan.craft}
                </span>
                <span className="flex items-center gap-1 text-[10px] font-black text-slate-400">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> TOP RATED
                </span>
              </div>
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={() => setLiked(!liked)}
            className={`p-2.5 rounded-2xl transition-all duration-300 ${liked ? "bg-rose-50 border-rose-100" : "bg-slate-50 border-slate-100"} border`}
          >
            <Heart className={`w-4 h-4 transition-all ${liked ? "fill-rose-500 text-rose-500" : "text-slate-300"}`} />
          </motion.button>
        </div>

        {/* Location & Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-slate-50/50 rounded-2xl p-3 border border-slate-100 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shadow-sm">
              <MapPin className="w-4 h-4 text-orange-500" />
            </div>
            <div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Location</p>
              <p className="text-[11px] font-bold text-slate-700 truncate max-w-[80px]">{artisan.city}</p>
            </div>
          </div>
          <div className="bg-emerald-50/30 rounded-2xl p-3 border border-emerald-100/50 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shadow-sm">
              <Navigation className="w-4 h-4 text-emerald-500" />
            </div>
            <div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Distance</p>
              <p className="text-[11px] font-bold text-slate-700">{artisan.distance_km} km</p>
            </div>
          </div>
        </div>

        {/* Specialty & Bharat Score */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs text-slate-600 font-medium italic pr-4">
            "{artisan.specialty}"
          </p>
          <div className={`flex-shrink-0 flex flex-col items-center justify-center w-12 h-12 rounded-full border-2 ${bsMeta.border} ${bsMeta.bg} shadow-sm`}>
            <p className="text-[8px] font-black text-slate-400 leading-none mb-0.5">S-RANK</p>
            <p className={`text-sm font-black ${bsMeta.text}`}>{artisan.bharat_score}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex-[2] flex items-center justify-center gap-2.5 text-xs font-black py-3.5 rounded-2xl text-white ${c.btn} shadow-lg shadow-orange-500/20 active:scale-95 transition-all duration-300`}
          >
            <Globe className="w-4 h-4" /> NAVIGATE
          </a>
          <button
            onClick={() => setExpanded(!expanded)}
            className={`flex-1 flex items-center justify-center rounded-2xl border transition-all duration-300 ${expanded ? "bg-slate-900 border-slate-900 text-white" : "bg-white border-slate-200 text-slate-600 hover:border-orange-300"}`}
          >
            {expanded ? <X className="w-4 h-4" /> : <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />}
          </button>
        </div>

        {/* Detailed Info */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-6 mt-6 border-t border-dashed border-slate-200 space-y-5">
                <div className="relative">
                  <div className="absolute left-0 top-0 w-1 h-full bg-amber-400 rounded-full" />
                  <div className="pl-4">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                      <Zap className="w-3 h-3 text-amber-500" /> WHY UNIQUE
                    </p>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {artisan.why_unique}
                    </p>
                  </div>
                </div>
                <div className="bg-orange-50/50 rounded-2xl p-4 border border-orange-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">GET IT NOW</p>
                  <p className="text-xs text-orange-900 font-bold leading-relaxed">
                    {artisan.buying_options}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── Radar Ping ──────────────────────────────────────────────────────────────
function RadarPing({ delay, top, left, label }: { delay: number; top: string; left: string; label: string }) {
  return (
    <motion.div
      className="absolute"
      style={{ top, left }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 1, 0.8, 0], scale: [0, 1.1, 1, 0] }}
      transition={{ duration: 4, repeat: Infinity, delay }}
    >
      <div className="relative group cursor-crosshair">
        <div className="w-2.5 h-2.5 bg-orange-500 rounded-full ring-4 ring-orange-500/20 shadow-[0_0_15px_rgba(249,115,22,0.6)]" />
        <motion.div
          className="absolute -inset-3 border-2 border-orange-500/30 rounded-full"
          animate={{ scale: [1, 2.8], opacity: [0.8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, delay }}
        />
        <div className="absolute left-6 -top-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-slate-900 text-white rounded-lg shadow-2xl px-3 py-1.5 text-[10px] font-black whitespace-nowrap border border-white/20">
            {label.toUpperCase()}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
// ─── Main Page ───────────────────────────────────────────────────────────────
export default function GullyGemsPage() {
  const [artisans, setArtisans] = useState<BackendArtisan[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState("");
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number; name: string } | null>(null);
  const [radius, setRadius] = useState(50);
  const [searchCity, setSearchCity] = useState("");
  const [filterCraft, setFilterCraft] = useState("All");
  // ── Fetch artisans from backend ───────────────────────────────────────────
  const fetchNearby = useCallback(async (lat: number, lng: number, radiusKm: number) => {
    setIsLoading(true);
    setError("");
    setArtisans([]);
    try {
      const res = await fetch(`${API_BASE}/api/artisans/nearby?lat=${lat}&lng=${lng}&radius=${radiusKm}&limit=40`);
      const data: NearbyResponse = await res.json();
      if (data.success) {
        setArtisans(data.artisans);
        if (data.artisans.length === 0) {
          setError(`No artisans found within ${radiusKm} km. Try increasing the radius.`);
        }
      } else {
        setError(data.error || "Failed to fetch nearby artisans.");
      }
    } catch {
      setError("Cannot reach the server. Make sure the backend is running on port 5000.");
    }
    setIsLoading(false);
  }, []);
  // ── Geolocation ───────────────────────────────────────────────────────────
  const handleLocate = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }
    setLocating(true);
    setError("");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        // Reverse geocode for display name
        let cityName = "Your Location";
        try {
          const geo = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&zoom=10`,
            { headers: { "Accept-Language": "en" } }
          );
          const geoData = await geo.json();
          const addr = geoData.address ?? {};
          cityName = addr.city || addr.town || addr.village || addr.county || addr.state || "Your Location";
        } catch {
          // keep default name
        }
        setUserLocation({ lat: latitude, lng: longitude, name: cityName });
        setLocating(false);
        fetchNearby(latitude, longitude, radius);
      },
      () => {
        setLocating(false);
        setError("Location access denied. Please allow location access or use manual search.");
      },
      { timeout: 10000 }
    );
  }, [fetchNearby, radius]);
  // ── Explore All (Removed Nitte hardcoded search) ──────────────────────────
  const exploreAll = () => {
    // Optional: could default to center of India or just fetch all
    if (userLocation) {
        fetchNearby(userLocation.lat, userLocation.lng, 500); // Massive radius to see everything
    } else {
        fetchNearby(20.5937, 78.9629, 3000); // Center of India, huge radius
    }
  };
  // ── Filter crafts ─────────────────────────────────────────────────────────
  const craftTypes = ["All", ...Array.from(new Set(artisans.map(a => a.craft)))];
  const filtered = filterCraft === "All" ? artisans : artisans.filter(a => a.craft === filterCraft);
  // ── Radius change ─────────────────────────────────────────────────────────
  const handleRadiusChange = (newRadius: number) => {
    setRadius(newRadius);
    if (userLocation) {
      fetchNearby(userLocation.lat, userLocation.lng, newRadius);
    }
  };
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Aurora Background */}
      <div className="aurora-bg" />
      <div className="indian-pattern-overlay" />
      <div className="rangoli-corner rangoli-corner--tl" />
      <div className="rangoli-corner rangoli-corner--br" />
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 relative z-10">
        {/* ── Hero Section ──────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center mb-16">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl glass border border-amber-200/50 text-amber-800 text-[10px] font-black tracking-[0.2em] uppercase mb-8 shadow-sm"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,1)]" />
              </span>
              HYPERLOCAL ARTISAN RADAR
            </motion.div>

            <h1 className="text-6xl md:text-7xl xl:text-8xl font-black text-slate-900 leading-[0.95] tracking-tighter mb-8">
              Discover<br />
              <span className="text-gradient-saffron drop-shadow-sm">Gully Gems</span>
            </h1>

            <p className="text-xl text-slate-600 font-medium leading-relaxed mb-10 max-w-xl">
              Authentic Indian craftsmanship, <span className="text-slate-900 font-black">located near you</span>. 
              Our AI-powered radar identifies verified artisans within your immediate vicinity.
            </p>

            {/* Stat chips - More Premium Style */}
            <div className="flex flex-wrap gap-8 mb-12">
              {[
                { icon: <Users className="w-5 h-5 text-orange-500" />, val: "150+", label: "Elite Artisans" },
                { icon: <Globe className="w-5 h-5 text-emerald-500" />, val: "Pan-India", label: "Network Coverage" },
                { icon: <ShieldCheck className="w-5 h-5 text-indigo-500" />, val: "O-V2", label: "Origin Verified" },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="relative group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-lg shadow-slate-200/50 flex items-center justify-center transition-transform group-hover:rotate-6">
                      {s.icon}
                    </div>
                    <div>
                      <p className="font-black text-slate-900 leading-none text-xl">{s.val}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{s.label}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons - Premium Redesign */}
            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -12px rgba(249, 115, 22, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLocate}
                disabled={locating}
                className="flex items-center gap-4 px-10 py-5 bg-slate-900 text-white font-black tracking-widest rounded-[1.5rem] transition-all duration-300 group disabled:opacity-60 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative flex items-center gap-4">
                    {locating ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> SCANNING SATELLITES...</>
                    ) : (
                    <><Navigation className="w-5 h-5 group-hover:rotate-45 transition-transform duration-500" /> ACTIVATE GPS RADAR</>
                    )}
                </span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={exploreAll}
                className="flex items-center gap-3 px-8 py-5 glass-warm font-black text-slate-700 tracking-widest rounded-[1.5rem] border border-orange-200/50 hover:bg-white/90 transition-all duration-300"
              >
                <Search className="w-5 h-5 text-orange-400" /> EXPLORE ALL GEMS
              </motion.button>
            </div>

            {/* Location Status Badge */}
            <AnimatePresence>
              {userLocation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-8 flex items-center gap-3 text-[11px] text-emerald-800 bg-emerald-50/80 backdrop-blur-sm border border-emerald-100 rounded-2xl px-5 py-3 w-fit shadow-sm"
                >
                  <div className="flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </div>
                  <span className="font-bold uppercase tracking-widest">
                    Live Lock: <span className="text-emerald-600 font-black">{userLocation.name.toUpperCase()}</span>
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right: Premium Radar Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.1, ease: "circOut" }}
            className="hidden lg:flex items-center justify-center p-8"
          >
            <div className="relative w-[440px] h-[440px]">
              {/* Complex Radar Base */}
              <div className="absolute inset-0 rounded-full bg-slate-900 shadow-[0_32px_80px_-20px_rgba(15,23,42,0.4)] border-4 border-slate-800 overflow-hidden group">
                {/* Visual Rings */}
                {[90, 70, 50, 30, 10].map((s, i) => (
                  <div key={i} className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-500/10"
                    style={{ width: `${s}%`, height: `${s}%` }} />
                ))}
                
                {/* Scanning Sweep */}
                <div className="absolute inset-0 animate-radar origin-center"
                  style={{ background: "conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(249,115,22,0.15) 20deg, transparent 45deg)" }}
                />
                
                {/* Secondary Sweep (faster) */}
                <div className="absolute inset-0 animate-radar origin-center"
                   style={{ 
                    animationDuration: '4s',
                    background: "conic-gradient(from 200deg at 50% 50%, transparent 0deg, rgba(16,185,129,0.05) 10deg, transparent 30deg)" 
                   }}
                />

                {/* HUD Elements */}
                <div className="absolute top-[15%] left-[15%] text-[8px] font-black text-amber-500/40 tracking-[0.3em]">SEC_01_NAV</div>
                <div className="absolute bottom-[15%] right-[15%] text-[8px] font-black text-amber-500/40 tracking-[0.3em]">SENS_MAX</div>

                {/* Center Point */}
                <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center z-20">
                  <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(249,115,22,1)]" />
                </div>

                {/* Active Pings */}
                <RadarPing delay={0.4} top="22%" left="62%" label="Pottery Hub" />
                <RadarPing delay={1.2} top="65%" left="25%" label="Silk Weaver" />
                <RadarPing delay={1.8} top="40%" left="75%" label="Brass Foundry" />
                <RadarPing delay={0.8} top="35%" left="30%" label="Handloom" />
                <RadarPing delay={2.5} top="75%" left="60%" label="Wood Craft" />
              </div>

              {/* Floating Performance Indicator */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 glass-dark rounded-2xl p-4 border border-white/10 shadow-2xl z-30"
              >
                 <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-1">Radar Sensitivity</p>
                 <div className="flex items-end gap-1 h-3">
                    {[0.4, 0.7, 1, 0.6, 0.9].map((h, i) => (
                        <motion.div 
                            key={i}
                            className="w-1 bg-amber-500/80 rounded-full"
                            animate={{ height: [`${h*100}%`, `${(1-h)*100}%`, `${h*100}%`] }}
                            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
                        />
                    ))}
                 </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
        {/* ── Controls Bar ──────────────────────────────────────────── */}
        {userLocation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-warm rounded-3xl border border-orange-200/50 shadow-xl p-5 mb-10"
          >
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              {/* Radius selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Radius:</span>
                {[10, 25, 50, 100].map(r => (
                  <button
                    key={r}
                    onClick={() => handleRadiusChange(r)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${radius === r
                        ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white border-transparent shadow-md"
                        : "bg-white/80 text-slate-600 border-orange-200 hover:border-orange-400"
                      }`}
                  >
                    {r} km
                  </button>
                ))}
              </div>
              {/* Craft filter */}
              {artisans.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Craft:</span>
                  {craftTypes.slice(0, 6).map(craft => (
                    <button
                      key={craft}
                      onClick={() => setFilterCraft(craft)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border flex-shrink-0 ${filterCraft === craft
                          ? "bg-slate-900 text-white border-slate-900"
                          : "bg-white/80 text-slate-600 border-orange-200 hover:border-orange-400"
                        }`}
                    >
                      {craft}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
        {/* ── Error ─────────────────────────────────────────────────── */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-8 bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-start gap-3"
            >
              <span className="text-xl flex-shrink-0">⚠️</span>
              <div>
                <p className="text-rose-700 font-semibold text-sm">{error}</p>
                {error.includes("backend") && (
                  <p className="text-rose-400 text-xs mt-1">Run <code className="bg-rose-100 px-1 rounded">cd server && pnpm dev</code> to start it.</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* ── Loading State ─────────────────────────────────────────── */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 gap-5"
          >
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 rounded-full border-4 border-orange-100" />
              <div className="absolute inset-0 rounded-full border-4 border-orange-500 border-t-transparent animate-spin" />
              <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl">💎</div>
            </div>
            <div className="text-center">
              <p className="text-slate-900 font-black text-xl">Discovering artisans near {userLocation?.name}...</p>
              <p className="text-slate-400 text-sm mt-1">Searching within {radius} km radius</p>
            </div>
            <div className="flex gap-2">
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-orange-400 rounded-full"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </div>
          </motion.div>
        )}
        {/* ── Empty State (no search yet) ──────────────────────────── */}
        {!userLocation && !isLoading && !error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-5"
          >
            {[
              { icon: "📍", val: "GPS", label: "Auto Location", sub: "Uses your device GPS" },
              { icon: "🧑‍🎨", val: "40+", label: "Artisans in Database", sub: "Across 9 cities" },
              { icon: "🗺️", val: "Real-time", label: "Distance Calc", sub: "Haversine geospatial" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 + i * 0.1 }}
                className="glass-warm rounded-3xl p-6 border border-orange-200/40 shadow-sm text-center"
              >
                <div className="text-3xl mb-3">{s.icon}</div>
                <div className="font-black text-slate-900 text-2xl">{s.val}</div>
                <div className="font-bold text-slate-700 text-sm mt-1">{s.label}</div>
                <div className="text-xs text-slate-400 mt-0.5">{s.sub}</div>
              </motion.div>
            ))}
          </motion.div>
        )}
        {/* ── Results Grid ──────────────────────────────────────────── */}
        {!isLoading && filtered.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Results header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-black text-slate-900">
                  {filtered.length} Artisan{filtered.length !== 1 ? "s" : ""} Found
                </h2>
                <p className="text-sm text-slate-500 font-medium mt-0.5">
                  Near {userLocation?.name} · Within {radius} km
                  {filterCraft !== "All" && ` · ${filterCraft}`}
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-emerald-600 font-bold bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                Live from Database
              </div>
            </div>
            {/* Cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((artisan, i) => (
                <ArtisanCard key={artisan.id} artisan={artisan} index={i} />
              ))}
            </div>
          </motion.div>
        )}
        {/* ── Footer ────────────────────────────────────────────────── */}
        <div className="mt-20 text-center pt-8 border-t border-orange-100/60">
          <div className="flex items-center justify-center gap-2 text-slate-400 text-xs font-semibold">
            <Diamond className="w-3.5 h-3.5 text-amber-400" />
            <span>Gully Gems · Hyperlocal Artisan Discovery · Powered by Geolocation + PostgreSQL</span>
          </div>
        </div>
      </div>
    </div>
  );
}