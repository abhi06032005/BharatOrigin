"use client";

import { useState, useRef,  type KeyboardEvent, type MouseEvent } from "react";

type Artisan = {
  name: string;
  craft: string;
  specialty: string;
  distance_km: number;
  why_unique: string;
  buying_options: string;
  maps_link: string;
};

type CityData = {
  overview: string;
  specialties: string[];
  artisans: Artisan[];
};

type CityKey = "Kolhapur" | "Udupi" | "Mangalore" | "Varanasi" | "Jaipur" | "Mysore" | "Haldwani" | "Manali";

type SearchResult = CityData & { city: CityKey };

// Persistent maps links stored in memory (keyed by "city::artisan_name")
const mapsLinksStore: Record<string, string> = {};

const CITY_DB: Record<CityKey, CityData> = {
  Kolhapur: {
    overview: "Kolhapur is a city steeped in royal Maratha heritage and ancient craft traditions. From the iconic Kolhapuri chappals worn across India to its renowned leather artisanship, the city throbs with artisan energy. Its vibrant food craft culture—jaggery, masalas, and temple jewellery—makes it a living museum of western Maharashtra's soul.",
    specialties: ["Kolhapuri Chappals", "Kolhapuri Jaggery", "Kolhapuri Saaj Jewellery", "Leather Handcrafts", "Tambada & Pandhara Rassa Masala"],
    artisans: [
      { name: "Rajaram Kamble", craft: "Leather Chappal Maker", specialty: "Hand-stitched Kolhapuri chappals with vegetal tanning", distance_km: 2.4, why_unique: "5th generation craftsman using century-old buffalo hide techniques; each pair takes 3 days", buying_options: "Visit workshop in Shahupuri / Contact via local bazaar", maps_link: "" },
      { name: "Sulochana Patil", craft: "Saaj Jewellery Artisan", specialty: "Traditional bridal necklaces in oxidised gold", distance_km: 3.8, why_unique: "One of the last women trained in royal Kolhapur court jewellery style", buying_options: "Weekly craft haat near Mahalakshmi temple", maps_link: "" },
      { name: "Dnyanoba Jaggery Co.", craft: "Artisan Jaggery Maker", specialty: "Single-press organic jaggery cones & powder", distance_km: 5.1, why_unique: "Uses traditional iron cauldrons; zero chemicals; GI-tagged process", buying_options: "Farm gate purchase / Local cooperative", maps_link: "" },
      { name: "Vitthal Masale Udhyog", craft: "Masala Spice Blender", specialty: "Hand-ground Tambada & Pandhara Rassa masala", distance_km: 4.3, why_unique: "Stone-ground spices with family recipe over 80 years old", buying_options: "Shop in Mahadwar Road", maps_link: "" },
      { name: "Meera Leather Arts", craft: "Decorative Leather Craft", specialty: "Painted leather bags and wall panels", distance_km: 6.2, why_unique: "Blends Warli tribal motifs with Kolhapuri leather—a rare fusion", buying_options: "Online via Instagram @meeraleatherarts", maps_link: "" },
    ]
  },
  Udupi: {
    overview: "Udupi is the spiritual and cultural heart of coastal Karnataka, where ancient temple traditions breathe life into extraordinary craft forms. Home to intricate wood carvings, majestic Yakshagana dance accessories, and temple brass work passed through priestly lineages, this small city punches far above its weight in artisan heritage.",
    specialties: ["Udupi Wood Carving", "Yakshagana Accessories", "Traditional Clay Pots", "Temple Brass Handicrafts", "Udupi Masala Powders"],
    artisans: [
      { name: "Gopal Sthapati", craft: "Temple Wood Carver", specialty: "Intricate Shilpa Shastra-based door panels & deity frames", distance_km: 1.8, why_unique: "Trained in traditional Vishwakarma craft lineage; work adorns 3 temples in district", buying_options: "Workshop near Krishna Math / Commission orders", maps_link: "" },
      { name: "Manjunath Yaksha Arts", craft: "Yakshagana Costume Maker", specialty: "Handcrafted Yakshagana headgear (Kireetam) and face masks", distance_km: 3.2, why_unique: "Only craftsman in Udupi making performance-grade traditional Yakshagana accessories by hand", buying_options: "Visit studio in Manipal Road / Bulk orders for troupes", maps_link: "" },
      { name: "Sharada Mritkala", craft: "Clay Pottery", specialty: "Unglazed cookware & ritual water pots (Ghatam style)", distance_km: 4.7, why_unique: "Her clay sourced exclusively from Sauparnika river bed; slow-fire kiln method", buying_options: "Roadside stall near Malpe junction", maps_link: "" },
      { name: "Bhat Brass Works", craft: "Temple Brass Craft", specialty: "Deepa stands, Panchapatre, ritual ware for temples", distance_km: 2.9, why_unique: "Supplies brass ware to Sri Krishna Matha; family tradition for 4 generations", buying_options: "Shop in Car Street, Udupi", maps_link: "" },
      { name: "Kamath Masala House", craft: "Traditional Spice Grinding", specialty: "Stone-ground sambar powder, rasam powder & coconut masala", distance_km: 5.5, why_unique: "Recipes unchanged since 1942; uses century-old stone chakki (grinder)", buying_options: "In-store / Ships PAN India", maps_link: "" },
    ]
  },
  Mangalore: {
    overview: "Mangalore is a port city where centuries of trade shaped a unique material culture. Famous for its distinctive terracotta roof tiles that define coastal Karnataka's skyline, Mangalore also nurtures coconut shell artisans, areca leaf craftsmen, and master weavers of Kasavu fabrics. Its craft identity is deeply maritime and earthy.",
    specialties: ["Mangalore Tiles", "Coconut Shell Crafts", "Areca Leaf Utensils", "Kasavu Fabrics", "Spice Blends"],
    artisans: [
      { name: "Pinto Tile Works", craft: "Terracotta Tile Maker", specialty: "Hand-pressed traditional Mangalore roof tiles (GI-tagged)", distance_km: 7.1, why_unique: "One of only 3 remaining tile factories using original Portuguese-era clay moulds", buying_options: "Factory visit in Bajpe / Bulk supply", maps_link: "" },
      { name: "Cleto Shell Crafts", craft: "Coconut Shell Artisan", specialty: "Decorative bowls, lamps and eco-spoons from coconut shells", distance_km: 3.4, why_unique: "Zero-waste process—uses every part of the coconut; supplies to eco-hotels in Goa", buying_options: "Home workshop / Local eco-markets", maps_link: "" },
      { name: "Aruna Areca Arts", craft: "Areca Leaf Craft", specialty: "Biodegradable plates, bowls & food trays from areca palm leaf", distance_km: 5.9, why_unique: "SHG (self-help group) of 12 women; certified by Karnataka Handicrafts", buying_options: "Bulk orders for events / Local cooperative store", maps_link: "" },
      { name: "Hebbar Handlooms", craft: "Kasavu Fabric Weaver", specialty: "Gold-border cotton sarees and dhotis for Kerala-Tulu traditions", distance_km: 4.2, why_unique: "Maintains traditional pit-loom weaving; supplies Brahmin ritual garments across coastal Karnataka", buying_options: "Showroom in Hampankatta", maps_link: "" },
      { name: "Saji's Spice Corner", craft: "Artisan Spice Blender", specialty: "Kori Rotti masala, fish curry powder and coconut milk spices", distance_km: 2.7, why_unique: "Blends roasted on wood-fire; original Tulu community recipes from 1960s", buying_options: "Market stall Bunder Road / Online", maps_link: "" },
    ]
  },
  Varanasi: {
    overview: "Varanasi is the eternal city — one of the oldest living urban centres on Earth. Its craft traditions are inseparable from its spiritual identity. The silk weavers of Banaras create sarees that are woven prayers, while lac toy makers and brass artisans serve both pilgrims and the global luxury market. Every lane hides a master craftsman.",
    specialties: ["Banarasi Sarees", "Zari & Brocade Fabric", "Wooden Lac Toys", "Brass Puja Ware", "Handmade Silk Items"],
    artisans: [
      { name: "Ustad Javed Ansari", craft: "Banarasi Silk Weaver", specialty: "Kadhua weave Banarasi sarees with pure zari", distance_km: 1.5, why_unique: "National Award winner; his kadhua technique has 2,000 weft threads per inch", buying_options: "Pit loom workshop in Madanpura / Commission orders", maps_link: "" },
      { name: "Ram Murti Lacwork", craft: "Wooden Lac Toy Maker", specialty: "Turned wooden toys painted with lac in traditional Varanasi style", distance_km: 3.6, why_unique: "3rd generation craftsman; supplies to Crafts Museum Delhi and UNESCO exhibitions", buying_options: "Showroom near Chowk / Online via Gaatha.com", maps_link: "" },
      { name: "Girija Devi Silk Weaves", craft: "Brocade Fabric Weaver", specialty: "Tissue silk dupattas and shawls with floral meenakari motifs", distance_km: 2.1, why_unique: "Female weaving collective—rare in Banarasi trade; specialises in lightweight tissue brocade", buying_options: "Workshop in Shivala / Direct sale", maps_link: "" },
      { name: "Pandit Brass Emporium", craft: "Temple Brass Caster", specialty: "Lost-wax cast brass idols and ritual implements", distance_km: 4.8, why_unique: "Uses ancient Dhokra-influenced lost-wax casting rare in UP; supplies major temples", buying_options: "Shop near Dashashwamedh Ghat", maps_link: "" },
      { name: "Meera Zari Studio", craft: "Zari Thread Embroiderer", specialty: "Pure gold zari embroidery on silk for bridal wear", distance_km: 3.0, why_unique: "Handspun zari using real gold strips; one of the last studios to not use machine-twisted thread", buying_options: "Studio in Bengali Tola / Commission work", maps_link: "" },
    ]
  },
  Jaipur: {
    overview: "Jaipur — the Pink City — is India's most celebrated craft capital. From the mesmerising blue pottery of Sanganer to the delicate art of Meenakari on gold jewellery, Jaipur's artisans have historically served Mughal courts and Rajput royalty. Today, its craft lanes bustle with block printers, lac bangle makers, and miniature painting masters.",
    specialties: ["Blue Pottery", "Block Printing", "Meenakari Jewellery", "Lac Bangles", "Miniature Paintings"],
    artisans: [
      { name: "Gopal Krishan Khatre", craft: "Blue Pottery Artist", specialty: "Handcrafted Quartz-based blue pottery with Persian motifs", distance_km: 4.5, why_unique: "Padma Shri lineage workshop; uses zero clay—100% quartz paste, rare Jaipur blue pottery tradition", buying_options: "Studio in Sanganer / Ships worldwide", maps_link: "" },
      { name: "Anokhi Block Printers", craft: "Hand Block Printing", specialty: "Sanganeri & Bagru natural dye block printing on cotton", distance_km: 6.3, why_unique: "Uses only vegetable dyes; employs 40+ local craftsmen; export to Europe", buying_options: "Retail in C-Scheme / Online", maps_link: "" },
      { name: "Surendra Meenakari Works", craft: "Meenakari Jeweller", specialty: "Peacock motif enamel work on gold & silver jewellery", distance_km: 2.8, why_unique: "5th generation Soni craftsman; pioneered 5-colour Meenakari on white gold", buying_options: "Johari Bazaar showroom", maps_link: "" },
      { name: "Kishori Lac Arts", craft: "Lac Bangle Maker", specialty: "Traditional lac bangles with mirrorwork and gold foil inlay", distance_km: 3.1, why_unique: "Handrolled lac on iron mandrels — one of the few artisans not using machine pressing", buying_options: "Maniharon ka Rasta, old city", maps_link: "" },
      { name: "Ramdev Miniature Studio", craft: "Miniature Painter", specialty: "Mughal and Rajput court scenes on camel bone & silk", distance_km: 5.0, why_unique: "Uses squirrel-hair brushes and stone-ground natural pigments; state award winner", buying_options: "Galerie in Tripolia Bazaar / Commission", maps_link: "" },
    ]
  },
  Mysore: {
    overview: "Mysore — the City of Palaces — radiates a quiet, refined craft culture rooted in Wadiyar royal patronage. Its silk is legendary, its sandalwood carvings divine, and its incense industry globally renowned. Mysore artisans blend devotion with technical mastery, producing crafts that are simultaneously sacred objects and high art.",
    specialties: ["Mysore Silk", "Sandalwood Carving", "Agarbatti Craft", "Rosewood Inlay", "Ganjifa Art"],
    artisans: [
      { name: "Karnataka Silk Industries (Master Weaver Block)", craft: "Silk Weaver", specialty: "Pure Mysore crepe silk sarees with zari borders", distance_km: 2.2, why_unique: "GI-tagged Mysore silk; government master weavers use original Jacquard looms from 1912", buying_options: "Showroom in Mananthody Road / Online", maps_link: "" },
      { name: "Shivanna Sandal Arts", craft: "Sandalwood Carver", specialty: "Miniature temple gopurams and deity figures in sandalwood", distance_km: 3.7, why_unique: "Uses Mysore-region red sandalwood (Raktha Chandan); carves without power tools", buying_options: "Workshop near Mysore Zoo / Devaraja Market", maps_link: "" },
      { name: "Agarbatti Artisan Collective", craft: "Incense Stick Maker", specialty: "Hand-rolled Jasmine, Sandalwood & Vetiver agarbattis", distance_km: 4.9, why_unique: "Traditional rolling method; uses locally sourced bamboo sticks and natural resin binders", buying_options: "Cooperative store in Lakshmipuram", maps_link: "" },
      { name: "Rosewood Inlay Masters", craft: "Inlay Wood Artisan", specialty: "Rosewood boxes with ivory-style plastic and bone inlay", distance_km: 5.6, why_unique: "Maintains ethical inlay craft using synthetic ivory post-1992 ban—indistinguishable from original", buying_options: "Shop in Sayyaji Rao Road", maps_link: "" },
      { name: "Ganjifa Art Revival Studio", craft: "Ganjifa Card Painter", specialty: "Circular playing cards hand-painted with Dashavatara themes", distance_km: 6.8, why_unique: "One of only 2 Ganjifa artists in Karnataka; hand-paints 96-card sets on cloth", buying_options: "Home studio visits by appointment", maps_link: "" },
    ]
  },
  Haldwani: {
    overview: "Haldwani, the gateway to the Kumaon Himalayas, is a crossroads where mountain craft traditions meet modern accessibility. Nestled at the foothills, it serves as the distribution hub for Aipan ritual folk art, ringaal bamboo work, and the ethereal rhododendron (Buransh) craft products that flow down from higher altitudes.",
    specialties: ["Aipan Art", "Ringaal Bamboo Craft", "Buransh Products", "Woollen Shawls", "Copperware"],
    artisans: [
      { name: "Kamla Devi Aipan Studio", craft: "Aipan Folk Art Painter", specialty: "Ritual Aipan paintings on paper and fabric for festivals", distance_km: 2.6, why_unique: "Trained by her grandmother; only artisan creating Aipan on silk—a rare modern adaptation", buying_options: "Home workshop / Sold at Uttarakhand Utsav fairs", maps_link: "" },
      { name: "Ringaal Craft Collective", craft: "Bamboo Weaver", specialty: "Traditional Ringaal baskets, furniture and storage ware", distance_km: 5.4, why_unique: "SHG from Bindukhatta village; uses high-altitude Ringaal bamboo harvested sustainably", buying_options: "Local cooperative / NABARD craft fair", maps_link: "" },
      { name: "Buransh Naturals", craft: "Herbal Product Artisan", specialty: "Rhododendron squash, jam, wine and dried flower crafts", distance_km: 3.9, why_unique: "Sources flowers from 2,000m altitude Kumaon forests; no preservatives; GI process underway", buying_options: "Kaladhungi Road stall / Instagram direct", maps_link: "" },
      { name: "Pahadi Bunai Centre", craft: "Woollen Shawl Weaver", specialty: "Hand-spun Merino-Pashmina blend shawls with Kumaoni border", distance_km: 4.2, why_unique: "Women's weaving centre; sheep herded at Munsiyari; entire supply chain within 200km", buying_options: "Showroom near Bus Stand", maps_link: "" },
      { name: "Tamra Kala Copper Works", craft: "Copperware Smith", specialty: "Handbeaten copper kalash, thali sets and water vessels", distance_km: 6.7, why_unique: "Uses traditional hammering on wooden forms; copper sourced from Almora smelters", buying_options: "Shop in Bhotia Parao market", maps_link: "" },
    ]
  },
  Manali: {
    overview: "Manali is more than a hill station — it is the living loom of Himachal Pradesh's textile heritage. The Kullu Valley's master weavers produce shawls of extraordinary warmth and geometric beauty. Alongside textiles, wooden toy carvers, herbal oil distillers, and pattu fabric artists make Manali a year-round artisan destination.",
    specialties: ["Kullu Shawls", "Pattu Weaving", "Woollen Caps & Gloves", "Wooden Toys & Artifacts", "Herbal & Natural Oils"],
    artisans: [
      { name: "Shanta Devi Kullu Shawls", craft: "Kullu Shawl Weaver", specialty: "GI-tagged Kullu shawls with traditional geometric dhar border", distance_km: 3.3, why_unique: "Uses backstrap loom (khaddi); her shawls featured in Crafts of India book by Kamaladevi Chattopadhyay", buying_options: "Home loom / Dhungri market stall", maps_link: "" },
      { name: "Ramesh Pattu Weaves", craft: "Pattu Fabric Artisan", specialty: "Heavy woollen Pattu fabric for traditional Himachali dress", distance_km: 5.2, why_unique: "Only weaver in Manali maintaining the patta loom (4-shaft ground loom) for pattu production", buying_options: "Workshop in Old Manali / Supply to local tailors", maps_link: "" },
      { name: "Himachali Knitwear Women's Co-op", craft: "Hand-Knitted Woollens", specialty: "Traditional patterned caps, socks, and fingerless gloves", distance_km: 2.0, why_unique: "150+ women artisans; patterns unique to different Kullu villages—a wearable tribal map", buying_options: "Mall Road stalls / Online via HimKraft", maps_link: "" },
      { name: "Deodar Wood Craft Studio", craft: "Deodar Wood Carver", specialty: "Hand-carved walking sticks, temple miniatures and animal figures", distance_km: 4.6, why_unique: "Uses sustainably fallen Deodar cedar—the sacred wood of Himachal; carves without power tools", buying_options: "Studio near Hadimba Temple", maps_link: "" },
      { name: "Alpine Herb Oils", craft: "Herbal Oil Distiller", specialty: "Steam-distilled Lavender, Thyme and Pine needle essential oils", distance_km: 7.3, why_unique: "Wild-crafted from Rohtang Pass meadows; one of only 2 certified distilleries in HP", buying_options: "Farm store / Ships PAN India", maps_link: "" },
    ]
  }
};

const CITIES: CityKey[] = Object.keys(CITY_DB) as CityKey[];

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