"use client";

import { useState, useRef,  type KeyboardEvent, type MouseEvent } from "react";
import { Artisan, CityData, CityKey, CITY_DB, CITIES, type SearchResult } from "./gullyGemsData";

// Session store for map links edited by the user
const mapsLinksStore: Record<string, string> = {};


function CityBadge({ city, selected, onClick }: { city: CityKey; selected: boolean; onClick: (city: CityKey) => void; }) {
  return (
    <button
      onClick={() => onClick(city)}
      className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 border-2 ${
        selected
          ? "bg-amber-500 text-white border-amber-500 shadow-lg scale-105"
          : "bg-white text-amber-700 border-amber-200 hover:border-amber-400 hover:bg-amber-50"
      }`}
    >
      {city}
    </button>
  );
}

function ArtisanCard({ artisan, index, storeKey }: { artisan: Artisan; index: number; storeKey: string; }) {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [mapsUrl, setMapsUrl] = useState<string>(mapsLinksStore[storeKey] || artisan.maps_link || "");
  const [editing, setEditing] = useState<boolean>(false);
  const [inputVal, setInputVal] = useState<string>(mapsUrl);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const colors = [
    { bg: "bg-rose-50", accent: "bg-rose-500", border: "border-rose-200", tag: "bg-rose-100 text-rose-700", mapBtn: "bg-rose-500 hover:bg-rose-600", editBorder: "border-rose-300 focus:ring-rose-200" },
    { bg: "bg-amber-50", accent: "bg-amber-500", border: "border-amber-200", tag: "bg-amber-100 text-amber-700", mapBtn: "bg-amber-500 hover:bg-amber-600", editBorder: "border-amber-300 focus:ring-amber-200" },
    { bg: "bg-emerald-50", accent: "bg-emerald-500", border: "border-emerald-200", tag: "bg-emerald-100 text-emerald-700", mapBtn: "bg-emerald-500 hover:bg-emerald-600", editBorder: "border-emerald-300 focus:ring-emerald-200" },
    { bg: "bg-violet-50", accent: "bg-violet-500", border: "border-violet-200", tag: "bg-violet-100 text-violet-700", mapBtn: "bg-violet-500 hover:bg-violet-600", editBorder: "border-violet-300 focus:ring-violet-200" },
    { bg: "bg-sky-50", accent: "bg-sky-500", border: "border-sky-200", tag: "bg-sky-100 text-sky-700", mapBtn: "bg-sky-500 hover:bg-sky-600", editBorder: "border-sky-300 focus:ring-sky-200" },
  ];
  const c = colors[index % colors.length];

  const handleToggle = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  const handleEditClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setInputVal(mapsUrl);
    setEditing(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleSave = (e?: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement>) => {
    e?.stopPropagation();
    const trimmed = inputVal.trim();
    setMapsUrl(trimmed);
    mapsLinksStore[storeKey] = trimmed;
    setEditing(false);
  };

  const handleOpenMaps = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (mapsUrl) window.open(mapsUrl, "_blank", "noopener,noreferrer");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") { setEditing(false); setInputVal(mapsUrl); }
  };

  return (
    <div className={`rounded-2xl border-2 ${c.border} ${c.bg} overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300`}>
      {/* Card Header — clickable to expand */}
      <div className="p-5 cursor-pointer" onClick={handleToggle}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-xl ${c.accent} flex items-center justify-center text-white text-lg font-bold shrink-0`}>
              {artisan.name[0]}
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-base leading-tight">{artisan.name}</h3>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${c.tag} mt-1 inline-block`}>
                {artisan.craft}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0">
            <span className="text-xs font-bold text-gray-500 bg-white px-2 py-1 rounded-lg border border-gray-200">
              📍 {artisan.distance_km} km
            </span>
            <span className="text-xs text-gray-400">{expanded ? "▲ less" : "▼ more"}</span>
          </div>
        </div>

        <p className="text-sm text-gray-600 mt-3 font-medium">{artisan.specialty}</p>
      </div>

      {/* Google Maps Row — always visible */}
      <div className="px-5 pb-4" onClick={(e) => e.stopPropagation()}>
        {editing ? (
          <div className="flex gap-2 items-center">
            <input
              ref={inputRef}
              type="url"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Paste Google Maps link here..."
              className={`flex-1 text-xs px-3 py-2 rounded-xl border-2 ${c.editBorder} bg-white focus:outline-none focus:ring-2 text-gray-700 placeholder-gray-300`}
            />
            <button
              onClick={handleSave}
              className={`text-xs font-bold px-3 py-2 rounded-xl text-white ${c.mapBtn} transition-colors shrink-0`}
            >
              Save
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setEditing(false); setInputVal(mapsUrl); }}
              className="text-xs font-bold px-3 py-2 rounded-xl text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors shrink-0"
            >
              ✕
            </button>
          </div>
        ) : mapsUrl ? (
          <div className="flex gap-2 items-center">
            <button
              onClick={handleOpenMaps}
              className={`flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-xl text-white ${c.mapBtn} transition-all active:scale-95 shadow-sm flex-1 justify-center`}
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>
              </svg>
              Open in Google Maps
            </button>
            <button
              onClick={handleEditClick}
              title="Edit link"
              className="text-xs px-3 py-2 rounded-xl text-gray-400 hover:text-gray-600 bg-white border border-gray-200 hover:border-gray-300 transition-all shrink-0"
            >
              ✏️
            </button>
          </div>
        ) : (
          <button
            onClick={handleEditClick}
            className="w-full flex items-center justify-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl border-2 border-dashed border-gray-300 text-gray-400 hover:border-gray-400 hover:text-gray-500 bg-white hover:bg-gray-50 transition-all"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>
            </svg>
            + Add Google Maps link
          </button>
        )}
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="px-5 pb-5 space-y-3 border-t border-gray-200 pt-4">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">✨ Why Unique</p>
            <p className="text-sm text-gray-700">{artisan.why_unique}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">🛍️ Buying Options</p>
            <p className="text-sm text-gray-700">{artisan.buying_options}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function ProductChip({ product, index }: { product: string; index: number }) {
  const colors = [
    "bg-rose-100 text-rose-700 border-rose-200",
    "bg-amber-100 text-amber-700 border-amber-200",
    "bg-emerald-100 text-emerald-700 border-emerald-200",
    "bg-sky-100 text-sky-700 border-sky-200",
    "bg-violet-100 text-violet-700 border-violet-200",
    "bg-orange-100 text-orange-700 border-orange-200",
    "bg-teal-100 text-teal-700 border-teal-200",
  ];
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold border ${colors[index % colors.length]}`}>
      <span>🏺</span> {product}
    </span>
  );
}

function JSONViewer({ data }: { data: unknown }) {
  const [copied, setCopied] = useState<boolean>(false);
  const jsonStr = JSON.stringify(data, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border-2 border-gray-200 bg-gray-50 overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 bg-gray-800">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <span className="text-gray-400 text-xs font-mono">artisans.json</span>
        <button
          onClick={handleCopy}
          className="text-xs text-gray-300 hover:text-white transition-colors bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-md"
        >
          {copied ? "✓ Copied!" : "Copy JSON"}
        </button>
      </div>
      <pre className="p-5 text-xs text-emerald-700 overflow-auto max-h-72 font-mono leading-relaxed">
        {jsonStr}
      </pre>
    </div>
  );
}

function AIResponseSection({ city, data, isLoading }: { city: string | null; data: SearchResult | null; isLoading: boolean; }) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-amber-200" />
          <div className="absolute inset-0 rounded-full border-4 border-amber-500 border-t-transparent animate-spin" />
        </div>
        <p className="text-amber-600 font-semibold text-lg animate-pulse">Discovering hidden gems in {city}...</p>
        <p className="text-gray-400 text-sm">Searching hyperlocal artisan network</p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* City Overview */}
      <div className="relative rounded-3xl bg-linear-to-br from-amber-400 via-orange-400 to-rose-400 p-0.5 shadow-xl">
        <div className="rounded-3xl bg-white p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center text-xl">
              🏛️
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-gray-800">{city}</h2>
              <p className="text-xs text-amber-600 font-semibold uppercase tracking-wider">City Craft Overview</p>
            </div>
          </div>
          <p className="text-gray-600 leading-relaxed text-sm">{data.overview}</p>
        </div>
      </div>

      {/* Specialty Products */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🏺</span>
          <h3 className="text-lg font-extrabold text-gray-800">Regional Specialties</h3>
          <span className="ml-auto text-xs bg-amber-100 text-amber-700 font-bold px-2 py-1 rounded-full">
            {data.specialties.length} products
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {data.specialties.map((p, i) => (
            <ProductChip key={i} product={p} index={i} />
          ))}
        </div>
      </div>

      {/* Artisans Grid */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🧑‍🎨</span>
          <h3 className="text-lg font-extrabold text-gray-800">Hidden Artisans</h3>
          <span className="ml-auto text-xs bg-emerald-100 text-emerald-700 font-bold px-2 py-1 rounded-full">
            Within 10 km
          </span>
        </div>
        <div className="grid gap-4 sm:grid-cols-1">
          {data.artisans.map((artisan, i) => (
            <ArtisanCard key={i} artisan={artisan} index={i} storeKey={`${city}::${artisan.name}`} />
          ))}
        </div>
      </div>

     
    </div>
  );
}

export default function GullyGems() {
  const [inputCity, setInputCity] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [result, setResult] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [aiMode, setAiMode] = useState<boolean>(false);
  const [aiResult, setAiResult] = useState<SearchResult | null>(null);
  const [error, setError] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSearch = async (cityName?: string) => {
    const city = (cityName?.trim() || inputCity.trim()).trim();
    if (!city) return;

    setSelectedCity(city);
    setError("");
    setResult(null);
    setAiResult(null);
    setIsLoading(true);

    // Check preloaded DB first
    const dbMatch = (Object.keys(CITY_DB) as CityKey[]).find(
      (k) => k.toLowerCase() === city.toLowerCase()
    );

    if (dbMatch) {
      await new Promise((r) => setTimeout(r, 900)); // Simulated delay
      setResult({ city: dbMatch, ...CITY_DB[dbMatch] });
      setIsLoading(false);
    } else {
      // Call Claude API for unknown cities
      setAiMode(true);
      try {
        const response = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "claude-sonnet-4-20250514",
            max_tokens: 1000,
            system: `You are Gully Gems AI. When given a city name, return ONLY a valid JSON object (no markdown, no explanation) with this exact structure:
{
  "city": "",
  "overview": "2-3 lines about craft culture & heritage",
  "artisans": [
    {
      "name": "",
      "craft": "",
      "specialty": "",
      "distance_km": 0,
      "why_unique": "",
      "buying_options": ""
    }
  ],
  "specialties": []
}
Return 5 artisans and 5-8 specialties. Focus on hyperlocal artisans within 5-10 km. Be specific and authentic.`,
            messages: [{ role: "user", content: `City: ${city}` }],
          }),
        });
        const responseData = (await response.json()) as { content?: Array<{ text?: string }> };
        const text = Array.isArray(responseData.content) ? responseData.content.map((b) => b.text || "").join("") : "";
        const clean = text.replace(/```json|```/g, "").trim();
        const parsed = JSON.parse(clean);
        setAiResult(parsed);
        setResult(parsed);
      } catch (e) {
        setError(`Could not find artisan data for "${city}". Try one of our featured cities below.`);
      }
      setIsLoading(false);
    }
  };

  const handleCityBadge = (city: CityKey) => {
    setInputCity(city);
    handleSearch(city);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-rose-50">
      {/* Header */}
      <div className="bg-white border-b-2 border-amber-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-amber-400 to-rose-500 flex items-center justify-center text-xl shadow-md">
              💎
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-gray-900 leading-none">Gully Gems</h1>
              <p className="text-xs text-amber-600 font-semibold">Hyperlocal Artisan Discovery Engine</p>
            </div>
            <div className="ml-auto">
              <span className="text-xs bg-emerald-100 text-emerald-700 font-bold px-2.5 py-1 rounded-full border border-emerald-200">
                AI Powered
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Hero */}
        <div className="text-center py-4">
          <h2 className="text-3xl font-extrabold text-gray-800 leading-tight">
            Discover Hidden
            <span className="bg-linear-to-r from-amber-500 to-rose-500 bg-clip-text text-transparent"> Artisans</span>
          </h2>
          <p className="text-gray-500 mt-2 text-sm">Find authentic craftspeople within 5–10 km of any city in India</p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🔍</span>
              <input
                ref={inputRef}
                type="text"
                value={inputCity}
                onChange={(e) => setInputCity(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Enter a city name... e.g. Udupi, Jaipur, Varanasi"
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl border-2 border-amber-200 bg-white text-gray-800 font-medium placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition-all text-sm shadow-sm"
              />
            </div>
            <button
              onClick={() => handleSearch()}
              className="px-5 py-3.5 bg-linear-to-br from-amber-500 to-orange-500 text-white font-bold rounded-2xl hover:from-amber-600 hover:to-orange-600 active:scale-95 transition-all shadow-lg shadow-amber-200 text-sm"
            >
              Search
            </button>
          </div>
        </div>

        {/* Featured Cities */}
        <div>
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-3">Featured Cities</p>
          <div className="flex flex-wrap gap-2">
            {CITIES.map((city) => (
              <CityBadge
                key={city}
                city={city}
                selected={selectedCity === city}
                onClick={handleCityBadge}
              />
            ))}
          </div>
        </div>

        {/* Stats Banner */}
        {!result && !isLoading && (
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: "🏘️", label: "8+ Cities", sub: "Preloaded" },
              { icon: "🧑‍🎨", label: "40+ Artisans", sub: "Documented" },
              { icon: "🌐", label: "AI Extended", sub: "Any City" },
            ].map((s, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 text-center border-2 border-amber-100 shadow-sm">
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="font-extrabold text-gray-800 text-sm">{s.label}</div>
                <div className="text-xs text-gray-400">{s.sub}</div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 text-center">
            <p className="text-red-600 font-semibold text-sm">{error}</p>
          </div>
        )}

        {/* Results */}
        <AIResponseSection city={selectedCity} data={result} isLoading={isLoading} />

        {/* Footer */}
        <div className="text-center py-4 border-t-2 border-amber-100">
          <p className="text-xs text-gray-400">
            💎 Gully Gems · Celebrating India's Hidden Artisans · Data from ODOP, TRIFED & Artisan Communities
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}