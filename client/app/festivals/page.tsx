"use client";
import { useState, useEffect, useRef } from "react";

const GOOGLE_FONTS = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Nunito:wght@300;400;600;700&family=Noto+Serif+Devanagari:wght@400;600&display=swap');`;

type FestivalKey = "diwali" | "holi" | "onam" | "eid" | "pongal";

interface Product {
  name: string;
  artisan: string;
  price: string;
  tag: string;
  emoji: string;
}

interface Festival {
  key: FestivalKey;
  name: string;
  hindi: string;
  date: string;
  month: number;
  day: number;
  color: string;
  accent: string;
  light: string;
  dark: string;
  divineBg: string;
  greeting: string;
  tagline: string;
  story: string;
  storyTitle: string;
  symbol: string;
  products: Product[];
  recommendations: string[];
  ritual: string;
}

const FESTIVALS: Festival[] = [
  {
    key: "diwali",
    name: "Diwali",
    hindi: "दीपावली",
    date: "Oct 20, 2025",
    month: 10,
    day: 20,
    color: "#C9891B",
    accent: "#FF6B35",
    light: "#FFF8E7",
    dark: "#7A4F00",
    divineBg: "linear-gradient(135deg, #3D1A00 0%, #7A3500 40%, #C9891B 100%)",
    greeting: "Shubh Deepavali!",
    tagline: "Festival of Lights & Prosperity",
    symbol: "🪔",
    storyTitle: "The Return of Lord Rama",
    story:
      "Diwali marks the triumphant return of Lord Rama to Ayodhya after 14 years of exile and his victory over Ravana. The people of Ayodhya lit thousands of earthen diyas to illuminate his path home. Today, diyas and fireworks light up every home across Bharat.",
    ritual: "Light 5 diyas at sunset — one for each direction and one for the home's heart.",
    products: [
      { name: "Handcrafted Terracotta Diyas", artisan: "Mitti Arts, Jaipur", price: "₹349", tag: "Artisan Pick", emoji: "🏺" },
      { name: "Kaju Katli Gift Box", artisan: "Halwai House, Mathura", price: "₹899", tag: "Bestseller", emoji: "🍬" },
      { name: "Silk Lakshmi Idol", artisan: "Nathdwara Crafts", price: "₹1,299", tag: "Sacred", emoji: "🙏" },
      { name: "Rangoli Stencil Kit", artisan: "Artisans of Rajasthan", price: "₹249", tag: "DIY Special", emoji: "🎨" },
    ],
    recommendations: [
      "Gift sets with dry fruits & diyas from local potters",
      "Organic ghee diyas for pure, aromatic flame",
      "Handwoven Banarasi silk sarees for Lakshmi Puja",
      "Patachitra art prints — traditional Odisha blessings",
    ],
  },
  {
    key: "holi",
    name: "Holi",
    hindi: "होली",
    date: "Mar 14, 2025",
    month: 3,
    day: 14,
    color: "#D44000",
    accent: "#E8A800",
    light: "#FFF3E8",
    dark: "#6B1A00",
    divineBg: "linear-gradient(135deg, #1A006B 0%, #6B0045 40%, #D44000 100%)",
    greeting: "Happy Holi!",
    tagline: "Festival of Colors & Joy",
    symbol: "🎨",
    storyTitle: "Prahlad's Devotion & Spring's Triumph",
    story:
      "Holi commemorates the divine protection of Prahlad from the demoness Holika — good over evil. It also celebrates Radha-Krishna's playful love with colors. The arrival of Vasant (spring) makes every lane of Vrindavan a canvas of pink, yellow, and green.",
    ritual: "Play with natural colors made from marigold, turmeric, and rose petals.",
    products: [
      { name: "Organic Gulal Set (8 colors)", artisan: "Kama Ayurveda, Delhi", price: "₹599", tag: "Skin Safe", emoji: "🌈" },
      { name: "Silver Pichkari (Vintage)", artisan: "Moradabad Metal Arts", price: "₹1,499", tag: "Heirloom", emoji: "💧" },
      { name: "Thandai Masala Premium", artisan: "Chokhi Dhani, Jaipur", price: "₹399", tag: "Festive Drink", emoji: "🥛" },
      { name: "Block-Print Kurta (Festive)", artisan: "Bagru Handblock Printers", price: "₹1,799", tag: "Wear & Play", emoji: "👕" },
    ],
    recommendations: [
      "Natural flower-based colors — zero chemicals, all joy",
      "Matka curd & gujiya from local halwais",
      "White kurtas ready for color canvas moments",
      "Herbal hair oil pre-Holi protection kit",
    ],
  },
  {
    key: "onam",
    name: "Onam",
    hindi: "ओणम्",
    date: "Sep 5, 2025",
    month: 9,
    day: 5,
    color: "#2E7D32",
    accent: "#FFB300",
    light: "#F1F8E9",
    dark: "#003300",
    divineBg: "linear-gradient(135deg, #003300 0%, #1B5E20 40%, #2E7D32 100%)",
    greeting: "Onam Ashamsakal!",
    tagline: "Harvest Festival of Kerala",
    symbol: "🌸",
    storyTitle: "King Mahabali's Annual Return",
    story:
      "King Mahabali, the beloved demon king of Kerala, was pushed to the netherworld by Lord Vamana — but granted one boon: to visit his people once a year. Every Onam, Keralites believe their beloved king walks among them, and so they prepare their homes with Pookalam and Sadya to welcome him back.",
    ritual: "Create a Pookalam (flower rangoli) with 8+ flower varieties at your doorstep.",
    products: [
      { name: "Kasavu Set Mundu (Gold Border)", artisan: "Balaramapuram Weavers", price: "₹2,499", tag: "Traditional", emoji: "🌾" },
      { name: "Aranmula Kannadi (Mirror)", artisan: "Aranmula Metal Craft", price: "₹3,999", tag: "GI Tagged", emoji: "🪞" },
      { name: "Onam Sadya Spice Pack", artisan: "Malabar Spice Garden", price: "₹449", tag: "Authentic", emoji: "🍛" },
      { name: "Handwoven Pattambi Mat", artisan: "Palakkad Weavers Coop", price: "₹899", tag: "Artisan", emoji: "🧺" },
    ],
    recommendations: [
      "Fresh jasmine and marigold for Pookalam",
      "Payasam ingredients — jaggery, coconut, rice",
      "Kathakali mask for home décor blessing",
      "Keralite banana chips & pappadam gift hamper",
    ],
  },
  {
    key: "eid",
    name: "Eid ul-Fitr",
    hindi: "ईद मुबारक",
    date: "Mar 30, 2025",
    month: 3,
    day: 30,
    color: "#0D47A1",
    accent: "#C9891B",
    light: "#E8F0FE",
    dark: "#00205B",
    divineBg: "linear-gradient(135deg, #00205B 0%, #0D47A1 50%, #1565C0 100%)",
    greeting: "Eid Mubarak!",
    tagline: "Festival of Gratitude & Togetherness",
    symbol: "🌙",
    storyTitle: "End of Ramadan's Sacred Journey",
    story:
      "Eid ul-Fitr marks the completion of a month of fasting, prayer, and reflection during Ramadan. Families gather for Eid namaz, exchange gifts, and share seviyan (vermicelli) with neighbors — a tradition of gratitude and community that bridges hearts across Bharat.",
    ritual: "Give Zakat (charity) before Eid prayer and share seviyan with every neighbor.",
    products: [
      { name: "Lucknowi Chikankari Kurta", artisan: "Chikan Craft Collective, Lucknow", price: "₹3,299", tag: "Heritage", emoji: "✨" },
      { name: "Premium Seviyan Gift Pack", artisan: "Old Delhi Mithai Wala", price: "₹699", tag: "Traditional", emoji: "🍜" },
      { name: "Ittar (Attar) Set — Rose & Oud", artisan: "Kannauj Fragrance House", price: "₹1,199", tag: "Pure", emoji: "🌹" },
      { name: "Handmade Meenakari Jewelry Box", artisan: "Jaipur Enamel Artists", price: "₹1,599", tag: "Gifting", emoji: "💎" },
    ],
    recommendations: [
      "Sheer kurtas with Zardozi embroidery for Eid namaz",
      "Handmade Hyderabadi biryani masala set",
      "Mughal-era perfume attars — pure, alcohol-free",
      "Pashmina shawl for elders — warmth & respect",
    ],
  },
  {
    key: "pongal",
    name: "Pongal",
    hindi: "पोंगल",
    date: "Jan 14, 2026",
    month: 1,
    day: 14,
    color: "#BF360C",
    accent: "#F9A825",
    light: "#FFF8E1",
    dark: "#5D0000",
    divineBg: "linear-gradient(135deg, #5D0000 0%, #BF360C 50%, #E64A19 100%)",
    greeting: "Pongal Vazthukal!",
    tagline: "Harvest Thanksgiving of Tamil Nadu",
    symbol: "🌿",
    storyTitle: "Sun God Surya's Gratitude Feast",
    story:
      "Pongal is Tamil Nadu's 4-day harvest festival — a joyful thanksgiving to Surya (the Sun God), cattle, and nature for a bountiful harvest. The word 'Pongal' means 'to boil over' — when the sacred rice dish overflows from the pot, it signals abundance, luck, and a prosperous new year.",
    ritual: "Boil new-harvest rice in an earthen pot with jaggery, let it overflow — shout 'Pongalo Pongal!'",
    products: [
      { name: "Tanjore Painting (Surya Theme)", artisan: "Thanjavur Art Studio", price: "₹4,999", tag: "GI Tagged", emoji: "🖼️" },
      { name: "Kolam Powder Set (Natural)", artisan: "Coimbatore Women Artisans", price: "₹299", tag: "Traditional", emoji: "🌺" },
      { name: "Handmade Jaggery from Kolhapur", artisan: "Sahyadri Farmers Co-op", price: "₹349", tag: "Organic", emoji: "🍯" },
      { name: "Silk Pattu Pavadai for Girls", artisan: "Kanchipuram Silk Weavers", price: "₹2,899", tag: "Kanjivaram", emoji: "👗" },
    ],
    recommendations: [
      "Sugarcane stalks and turmeric plant for Pongal décor",
      "Earthen Pongal pot — handmade by local potters",
      "Sesame & jaggery Ellu Urundai sweet balls",
      "Bull decorated with garlands for Mattu Pongal",
    ],
  },
];

function detectCurrentFestival(): FestivalKey {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  for (const f of FESTIVALS) {
    const diff = Math.abs((f.month - month) * 30 + (f.day - day));
    if (diff <= 20) return f.key;
  }
  return "diwali";
}

function MandalaOrb({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", opacity: 0.12 }}>
      <g transform="translate(100,100)">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <g key={deg} transform={`rotate(${deg})`}>
            <ellipse cx="0" cy="-60" rx="8" ry="24" fill={color} />
            <ellipse cx="0" cy="-90" rx="4" ry="12" fill={color} />
            <circle cx="0" cy="-55" r="4" fill={color} opacity="0.5" />
          </g>
        ))}
        {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((deg) => (
          <g key={deg} transform={`rotate(${deg})`}>
            <ellipse cx="0" cy="-40" rx="5" ry="15" fill={color} />
          </g>
        ))}
        <circle cx="0" cy="0" r="22" fill="none" stroke={color} strokeWidth="2" />
        <circle cx="0" cy="0" r="12" fill={color} opacity="0.6" />
        <circle cx="0" cy="0" r="5" fill={color} />
      </g>
    </svg>
  );
}

function ProductCard({ product, accent, dark }: { product: Product; accent: string; dark: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#FFF8F0" : "#FFFCF5",
        border: `1.5px solid ${hovered ? accent : "#E8DCC8"}`,
        borderRadius: 16,
        padding: "18px 16px",
        transition: "all 0.25s ease",
        transform: hovered ? "translateY(-4px)" : "none",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -18,
          right: -18,
          width: 64,
          height: 64,
          borderRadius: "50%",
          background: `${accent}18`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 28,
        }}
      >
        {product.emoji}
      </div>
      <span
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: accent,
          background: `${accent}18`,
          padding: "3px 10px",
          borderRadius: 20,
          display: "inline-block",
          marginBottom: 10,
          fontFamily: "'Nunito', sans-serif",
        }}
      >
        {product.tag}
      </span>
      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 17,
          fontWeight: 600,
          color: dark,
          margin: "0 0 4px",
          lineHeight: 1.3,
        }}
      >
        {product.name}
      </p>
      <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 12, color: "#A08060", margin: "0 0 12px" }}>
        {product.artisan}
      </p>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 700, color: dark }}>
          {product.price}
        </span>
        <button
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontSize: 12,
            fontWeight: 700,
            color: "#FFF8F0",
            background: accent,
            border: "none",
            borderRadius: 20,
            padding: "6px 16px",
            cursor: "pointer",
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default function BharatFestivalMode() {
  const [active, setActive] = useState<FestivalKey>(detectCurrentFestival());
  const [animating, setAnimating] = useState(false);
  const [visible, setVisible] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  const festival = FESTIVALS.find((f) => f.key === active)!;

  const handleSwitch = (key: FestivalKey) => {
    if (key === active) return;
    setAnimating(true);
    setTimeout(() => {
      setActive(key);
      setAnimating(false);
    }, 320);
  };

  return (
    <>
      <style>{`
        ${GOOGLE_FONTS}
        @keyframes floatOrb { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes fadeSlide { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
        .festival-tab { transition: all 0.2s ease; cursor: pointer; }
        .festival-tab:hover { transform: translateY(-2px); }
        .content-block { animation: fadeSlide 0.4s ease both; }
        .content-block:nth-child(1){animation-delay:0.05s}
        .content-block:nth-child(2){animation-delay:0.12s}
        .content-block:nth-child(3){animation-delay:0.19s}
        .content-block:nth-child(4){animation-delay:0.26s}
        .spin-slow { animation: spin 18s linear infinite; }
        .float-orb { animation: floatOrb 4s ease-in-out infinite; }
        .float-orb2 { animation: floatOrb 5.5s ease-in-out infinite 1.2s; }
      `}</style>

      <div
        style={{
          fontFamily: "'Nunito', sans-serif",
          background: "#FDF6E3",
          minHeight: "100vh",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      >
        {/* HERO HEADER */}
        <div
          style={{
            background: festival.divineBg,
            padding: "48px 24px 56px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative orbs */}
          <div className="float-orb" style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200 }}>
            <MandalaOrb color="#FFFFFF" />
          </div>
          <div className="float-orb2" style={{ position: "absolute", bottom: -60, left: -50, width: 240, height: 240 }}>
            <MandalaOrb color={festival.accent} />
          </div>
          <div className="spin-slow" style={{ position: "absolute", top: "50%", right: 80, width: 120, height: 120, marginTop: -60, opacity: 0.08 }}>
            <MandalaOrb color="#FFD700" />
          </div>

          {/* Badge */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.25)",
                borderRadius: 30,
                padding: "6px 16px",
              }}
            >
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: "#FFE082", textTransform: "uppercase" }}>
                🇮🇳 Auto-Detected · Bharat Festival Mode
              </span>
            </div>
          </div>

          <div style={{ position: "relative", zIndex: 2 }}>
            <div style={{ fontSize: 52, marginBottom: 4, lineHeight: 1 }}>{festival.symbol}</div>
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(38px, 7vw, 64px)",
                fontWeight: 700,
                color: "#FFFDF5",
                margin: "8px 0 4px",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
              }}
            >
              {festival.greeting}
            </h1>
            <p
              style={{
                fontFamily: "'Noto Serif Devanagari', serif",
                fontSize: 22,
                color: festival.accent,
                margin: "0 0 8px",
                opacity: 0.9,
              }}
            >
              {festival.hindi}
            </p>
            <p
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontSize: 15,
                color: "rgba(255,255,255,0.7)",
                margin: 0,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              {festival.tagline}
            </p>
          </div>
        </div>

        {/* FESTIVAL TABS */}
        <div
          style={{
            background: "#FDF6E3",
            borderBottom: "1.5px solid #E8DCC8",
            overflowX: "auto",
            scrollbarWidth: "none",
          }}
        >
          <div style={{ display: "flex", gap: 0, minWidth: "max-content", padding: "0 16px" }}>
            {FESTIVALS.map((f) => {
              const isActive = f.key === active;
              return (
                <button
                  key={f.key}
                  className="festival-tab"
                  onClick={() => handleSwitch(f.key)}
                  style={{
                    fontFamily: "'Nunito', sans-serif",
                    fontWeight: isActive ? 700 : 500,
                    fontSize: 14,
                    color: isActive ? f.color : "#A08060",
                    background: "none",
                    border: "none",
                    borderBottom: isActive ? `3px solid ${f.color}` : "3px solid transparent",
                    padding: "16px 20px 14px",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <span>{f.symbol}</span> {f.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div
          ref={contentRef}
          style={{
            maxWidth: 960,
            margin: "0 auto",
            padding: "32px 20px 60px",
            opacity: animating ? 0 : 1,
            transform: animating ? "translateY(12px)" : "none",
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}
        >
          {/* STORY CARD */}
          <div
            className="content-block"
            style={{
              background: `linear-gradient(135deg, ${festival.light} 0%, #FFFDF5 100%)`,
              border: `1.5px solid ${festival.color}30`,
              borderRadius: 20,
              padding: "28px 28px",
              marginBottom: 28,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -30,
                right: -30,
                width: 140,
                height: 140,
                opacity: 0.07,
              }}
            >
              <MandalaOrb color={festival.color} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: `${festival.color}22`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                }}
              >
                📖
              </div>
              <span
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: festival.color,
                }}
              >
                The Story Behind
              </span>
            </div>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 26,
                fontWeight: 600,
                color: festival.dark,
                margin: "0 0 12px",
                fontStyle: "italic",
              }}
            >
              {festival.storyTitle}
            </h2>
            <p
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontSize: 15,
                color: "#6B5040",
                lineHeight: 1.75,
                margin: "0 0 16px",
              }}
            >
              {festival.story}
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                background: `${festival.accent}18`,
                border: `1px solid ${festival.accent}35`,
                borderRadius: 12,
                padding: "12px 16px",
              }}
            >
              <span style={{ fontSize: 18 }}>✨</span>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 16,
                  fontStyle: "italic",
                  color: festival.dark,
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                {festival.ritual}
              </p>
            </div>
          </div>

          {/* ARTISAN PRODUCTS */}
          <div className="content-block" style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <div>
                <span
                  style={{
                    fontFamily: "'Nunito', sans-serif",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: festival.color,
                  }}
                >
                  🛍️ Curated for {festival.name}
                </span>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 24,
                    fontWeight: 600,
                    color: "#3D2B1F",
                    margin: "4px 0 0",
                  }}
                >
                  Artisan-Made Festival Items
                </h3>
              </div>
              <button
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  fontSize: 12,
                  fontWeight: 700,
                  color: festival.color,
                  background: `${festival.color}14`,
                  border: `1.5px solid ${festival.color}40`,
                  borderRadius: 20,
                  padding: "8px 18px",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                View All →
              </button>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))",
                gap: 16,
              }}
            >
              {festival.products.map((p) => (
                <ProductCard key={p.name} product={p} accent={festival.accent} dark={festival.dark} />
              ))}
            </div>
          </div>

          {/* RECOMMENDATIONS */}
          <div className="content-block" style={{ marginBottom: 28 }}>
            <span
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: festival.color,
                display: "block",
                marginBottom: 6,
              }}
            >
              🌟 Festive Recommendations
            </span>
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 24,
                fontWeight: 600,
                color: "#3D2B1F",
                margin: "0 0 16px",
              }}
            >
              What to Get This {festival.name}
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 }}>
              {festival.recommendations.map((rec, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    background: "#FFFCF5",
                    border: "1.5px solid #E8DCC8",
                    borderRadius: 14,
                    padding: "14px 16px",
                  }}
                >
                  <div
                    style={{
                      minWidth: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: `${festival.color}20`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 700,
                      fontSize: 13,
                      color: festival.color,
                    }}
                  >
                    {i + 1}
                  </div>
                  <p
                    style={{
                      fontFamily: "'Nunito', sans-serif",
                      fontSize: 14,
                      color: "#5C3D2E",
                      margin: 0,
                      lineHeight: 1.55,
                    }}
                  >
                    {rec}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* UPCOMING FESTIVALS STRIP */}
          <div className="content-block">
            <span
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#A08060",
                display: "block",
                marginBottom: 14,
              }}
            >
              📅 Bharat's Festival Calendar 2025–2026
            </span>
            <div style={{ display: "flex", gap: 10, overflowX: "auto", scrollbarWidth: "none", paddingBottom: 4 }}>
              {FESTIVALS.map((f) => (
                <div
                  key={f.key}
                  onClick={() => handleSwitch(f.key)}
                  style={{
                    minWidth: 140,
                    background: f.key === active ? `${f.color}18` : "#FFFCF5",
                    border: `1.5px solid ${f.key === active ? f.color : "#E8DCC8"}`,
                    borderRadius: 14,
                    padding: "14px 16px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  <div style={{ fontSize: 22, marginBottom: 6 }}>{f.symbol}</div>
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 16,
                      fontWeight: 600,
                      color: f.key === active ? f.dark : "#3D2B1F",
                      margin: "0 0 2px",
                    }}
                  >
                    {f.name}
                  </p>
                  <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 11, color: "#A08060", margin: 0 }}>
                    {f.date}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}