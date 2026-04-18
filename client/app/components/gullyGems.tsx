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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className={`group relative bg-white/80 backdrop-blur-sm border ${c.border} rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-1 transition-all duration-300`}
    >
      {/* Gradient top strip */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${c.gradient}`} />
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${c.gradient} flex items-center justify-center text-white text-lg font-black shadow-lg flex-shrink-0`}>
              {artisan.name[0]}
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-[15px] leading-snug">{artisan.name}</h3>
              <span className={`inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full mt-1 ${c.tag}`}>
                {artisan.craft}
              </span>
            </div>
          </div>
          <button onClick={() => setLiked(!liked)} className="p-2 rounded-xl hover:bg-rose-50 transition-colors flex-shrink-0">
            <Heart className={`w-4 h-4 transition-all ${liked ? "fill-rose-500 text-rose-500" : "text-gray-300"}`} />
          </button>
        </div>
        {/* Location + Distance + Score */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="flex items-center gap-1 text-xs text-slate-500 font-semibold">
            <MapPin className="w-3 h-3 text-orange-400" /> {artisan.city}, {artisan.region}
          </span>
          <span className="text-slate-300">·</span>
          <span className="flex items-center gap-1 text-xs font-bold text-slate-500 bg-white px-2 py-0.5 rounded-lg border border-slate-200">
            <Navigation className="w-3 h-3 text-emerald-500" />
            {artisan.distance_km} km away
          </span>
          <span className={`ml-auto text-[10px] font-black px-2.5 py-1 rounded-full border ${bsMeta.bg} ${bsMeta.text} ${bsMeta.border}`}>
            BS {artisan.bharat_score}
          </span>
        </div>
        {/* Specialty */}
        <p className="text-sm text-slate-600 leading-relaxed mb-4">{artisan.specialty}</p>
        {/* CTA buttons */}
        <div className="flex gap-2 mb-2">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex-1 flex items-center justify-center gap-2 text-xs font-bold py-2.5 rounded-xl text-white ${c.btn} transition-all active:scale-95 shadow-sm`}
          >
            <ExternalLink className="w-3.5 h-3.5" /> View on Maps
          </a>
          <button
            onClick={() => setExpanded(!expanded)}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 bg-white border border-slate-200 hover:border-orange-300 hover:text-orange-600 transition-all flex items-center gap-1.5"
          >
            {expanded ? <><ChevronUp className="w-3 h-3" /> Less</> : <><ChevronDown className="w-3 h-3" /> More</>}
          </button>
        </div>
        {/* Expandable section */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-4 space-y-3 border-t border-slate-100">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">✨ Why Unique</p>
                  <p className="text-sm text-slate-700 leading-relaxed">{artisan.why_unique}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">🛍️ Buying Options</p>
                  <p className="text-sm text-slate-700 leading-relaxed">{artisan.buying_options}</p>
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
      animate={{ opacity: [0, 1, 0.6, 0], scale: [0, 1.2, 1, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, delay }}
    >
      <div className="relative">
        <div className="w-3 h-3 bg-amber-400 rounded-full shadow-[0_0_12px_rgba(251,191,36,0.8)]" />
        <motion.div
          className="absolute -inset-2 border border-amber-400/40 rounded-full"
          animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay }}
        />
        <div className="absolute left-4 -top-1 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-orange-100 px-2 py-1 text-[9px] font-bold text-slate-700 whitespace-nowrap">
          {label}
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
  // ── Quick search for Nitte (hardcoded coords from seed.ts) ────────────────
  const quickSearchNitte = () => {
    setUserLocation({ lat: 13.1812, lng: 74.9351, name: "Nitte" });
    fetchNearby(13.1812, 74.9351, radius);
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-warm border border-amber-200/50 text-amber-700 text-xs font-bold tracking-widest uppercase mb-6 shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Hyperlocal Discovery Engine
            </motion.div>
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight mb-6">
              Discover<br />
              <span className="text-gradient-saffron">Gully Gems</span>
            </h1>
            <p className="text-lg text-slate-600 font-medium leading-relaxed mb-8 max-w-lg">
              Find authentic Indian artisans{" "}
              <span className="text-slate-900 font-bold">near your location</span>.
              Powered by real-time geolocation and our verified artisan database spanning all of India.
            </p>
            {/* Stat chips */}
            <div className="flex flex-wrap gap-6 mb-10">
              {[
                { icon: <Users className="w-4 h-4" />, val: "40+", label: "Verified Artisans" },
                { icon: <Globe className="w-4 h-4" />, val: "9+", label: "Cities Covered" },
                { icon: <ShieldCheck className="w-4 h-4" />, val: "100%", label: "Origin Verified" },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-2.5"
                >
                  <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">{s.icon}</div>
                  <div>
                    <p className="font-black text-slate-900 leading-none text-lg">{s.val}</p>
                    <p className="text-xs text-slate-400 font-semibold">{s.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleLocate}
                disabled={locating}
                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold tracking-wider rounded-2xl hover:shadow-xl hover:shadow-orange-500/30 transition-all duration-300 group disabled:opacity-60"
              >
                {locating ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Detecting location...</>
                ) : (
                  <><Navigation className="w-5 h-5 group-hover:scale-110 transition-transform" /> USE MY LOCATION</>
                )}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={quickSearchNitte}
                className="flex items-center gap-2 px-6 py-4 glass-warm font-bold text-amber-800 tracking-wider rounded-2xl border border-orange-200/50 hover:bg-white/80 transition-all duration-300"
              >
                <MapPin className="w-4 h-4" /> SEARCH NEAR NITTE
              </motion.button>
            </div>
            {/* Location detected */}
            <AnimatePresence>
              {userLocation && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 flex items-center gap-2.5 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-2xl px-4 py-2.5 w-fit"
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                  <span className="font-semibold">Located: <span className="font-black">{userLocation.name}</span></span>
                  <span className="text-emerald-500 text-xs">({userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)})</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          {/* Right: Radar Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-[380px] h-[380px]">
              {/* Radar base */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-900 to-slate-800 shadow-2xl border border-slate-700/50 overflow-hidden">
                {[80, 58, 38, 22].map((s, i) => (
                  <div key={i} className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-500/15"
                    style={{ width: `${s}%`, height: `${s}%` }} />
                ))}
                {/* Sweep */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0"
                  style={{ background: "conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(251,146,60,0.3) 30deg, transparent 60deg)" }}
                />
                {/* Center */}
                <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-orange-500/20 border-2 border-orange-400/60 flex items-center justify-center z-10">
                  <MapPin className="w-4 h-4 text-orange-400" />
                </div>
                {/* Crosshairs */}
                <div className="absolute inset-0 flex items-center justify-center"><div className="w-full h-px bg-amber-500/10" /></div>
                <div className="absolute inset-0 flex items-center justify-center"><div className="h-full w-px bg-amber-500/10" /></div>
                {/* Pings */}
                <RadarPing delay={0.4} top="18%" left="58%" label="Silk Weaver" />
                <RadarPing delay={0.9} top="60%" left="22%" label="Pottery Artisan" />
                <RadarPing delay={1.5} top="72%" left="65%" label="Spice Maker" />
                <RadarPing delay={0.7} top="30%" left="38%" label="Wood Carver" />
                <RadarPing delay={1.2} top="48%" left="74%" label="Brass Worker" />
              </div>
              {/* Floating gems card */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -right-4 glass-warm rounded-2xl p-4 border border-orange-200/40 shadow-xl"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Diamond className="w-4 h-4 text-amber-500" />
                  <p className="text-xs font-black text-slate-900">{artisans.length > 0 ? `${artisans.length} Gems Found` : "Scanning..."}</p>
                </div>
                <p className="text-[10px] text-orange-600 font-bold tracking-wider">
                  {userLocation ? `NEAR ${userLocation.name.toUpperCase()}` : "AWAITING LOCATION..."}
                </p>
              </motion.div>
              {/* Floating score card */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -top-4 -left-4 glass rounded-xl p-3 border border-white/60 shadow-lg"
              >
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Radius</p>
                <p className="text-2xl font-black text-gradient-saffron">{radius}km</p>
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