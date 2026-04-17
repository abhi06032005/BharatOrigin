"use client";

import { useState } from "react";
import {
  motion,
  AnimatePresence,
  type Variants,
  type Transition,
} from "framer-motion";
import { ARTISANS_DATA } from "./artisansData";
import Navbar from "../components/Navbar";

// ─── HELPERS ────────────────────────────────────────────────────────────────────

const easeCurve = [0.22, 1, 0.36, 1] as const;

const baseTransition: Transition = {
  duration: 0.55,
  ease: easeCurve,
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.55,
    delay,
    ease: easeCurve,
  } satisfies Transition,
});

const stagger: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.09,
    },
  },
};

const statCardVariant: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: easeCurve,
    },
  },
};

const productVariant = (index: number): Variants => ({
  initial: { opacity: 0, y: 32 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: index * 0.08,
      ease: easeCurve,
    },
  },
});


// ─── COMPONENTS ─────────────────────────────────────────────────────────────────

function BharatScoreBadge({ score }: { score: number }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        background: "linear-gradient(135deg, #E8621A 0%, #F4A12A 100%)",
        color: "#fff",
        borderRadius: 20,
        padding: "3px 10px 3px 6px",
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: 0.3,
        boxShadow: "0 2px 8px rgba(232,98,26,0.3)",
      }}
    >
      <span style={{ fontSize: 13 }}>🇮🇳</span>
      <span>Bharat {score}</span>
    </div>
  );
}

function VerifiedBadge() {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        background: "rgba(34,197,94,0.12)",
        border: "1px solid rgba(34,197,94,0.3)",
        color: "#16a34a",
        borderRadius: 20,
        padding: "3px 9px",
        fontSize: 10.5,
        fontWeight: 700,
        letterSpacing: 0.4,
      }}
    >
      <span>✓</span> VERIFIED
    </div>
  );
}

function GITagBadge() {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        background: "rgba(99,102,241,0.12)",
        border: "1px solid rgba(99,102,241,0.3)",
        color: "#4f46e5",
        borderRadius: 20,
        padding: "3px 9px",
        fontSize: 10.5,
        fontWeight: 700,
        letterSpacing: 0.4,
      }}
    >
      🏷️ GI-TAG
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span style={{ color: "#F4A12A", fontSize: 12, letterSpacing: -1 }}>
      {"★".repeat(Math.floor(rating))}
      {rating % 1 >= 0.5 ? "½" : ""}
    </span>
  );
}

function ProductCard({ product, index }: { product: (typeof ARTISANS_DATA.products)[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <motion.div
      variants={{
        initial: { opacity: 0, y: 32 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] } },
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        background: "#fff",
        borderRadius: 18,
        overflow: "hidden",
        boxShadow: hovered
          ? `0 20px 48px rgba(0,0,0,0.13), 0 0 0 2px ${product.accent}55`
          : "0 2px 16px rgba(0,0,0,0.07)",
        transition: "box-shadow 0.3s ease",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        position: "relative",
      }}
    >
      {/* Image Area */}
      <div
        style={{
          height: 160,
          background: `linear-gradient(135deg, ${product.accent}22 0%, ${product.accent}44 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 64,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <motion.span
          animate={{ scale: hovered ? 1.12 : 1 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "block" }}
        >
          {product.image}
        </motion.span>

        {/* Discount */}
        <div
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            background: "#E8621A",
            color: "#fff",
            borderRadius: 8,
            padding: "3px 8px",
            fontSize: 11,
            fontWeight: 700,
          }}
        >
          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "16px 18px 18px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <VerifiedBadge />
          {product.giTag && <GITagBadge />}
        </div>

        <div>
          <h3
            style={{
              margin: 0,
              fontSize: 15.5,
              fontWeight: 700,
              color: "#1a1207",
              fontFamily: "'Playfair Display', Georgia, serif",
              lineHeight: 1.3,
            }}
          >
            {product.name}
          </h3>
          <p
            style={{
              margin: "4px 0 0",
              fontSize: 12.5,
              color: "#6b5c45",
              fontFamily: "'Lora', Georgia, serif",
              fontStyle: "italic",
            }}
          >
            {product.story}
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${product.accent}44, ${product.accent}88)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
              flexShrink: 0,
            }}
          >
            👤
          </div>
          <div>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: "#2d1f0e" }}>{product.artisan}</div>
            <div style={{ fontSize: 11, color: "#8a7260" }}>📍 {product.location}</div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <StarRating rating={product.rating} />
          <span style={{ fontSize: 11.5, color: "#8a7260" }}>
            {product.rating} ({product.reviews} reviews)
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
          <div>
            <span
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: "#1a1207",
                fontFamily: "'Playfair Display', Georgia, serif",
              }}
            >
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            <span
              style={{
                fontSize: 12,
                color: "#b0927a",
                textDecoration: "line-through",
                marginLeft: 6,
              }}
            >
              ₹{product.originalPrice.toLocaleString("en-IN")}
            </span>
          </div>
          <BharatScoreBadge score={product.bharatScore} />
        </div>

        <motion.button
          onClick={handleAdd}
          whileTap={{ scale: 0.96 }}
          style={{
            background: added
              ? "linear-gradient(135deg, #22c55e, #16a34a)"
              : `linear-gradient(135deg, ${product.accent}, ${product.accent}cc)`,
            color: "#fff",
            border: "none",
            borderRadius: 12,
            padding: "11px 0",
            fontWeight: 700,
            fontSize: 13,
            cursor: "pointer",
            transition: "background 0.3s ease",
            fontFamily: "'Lora', Georgia, serif",
            letterSpacing: 0.3,
          }}
        >
          {added ? "✓ Added to Cart!" : "Add to Cart"}
        </motion.button>
      </div>
    </motion.div>
  );
}

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────────

export default function ArtisansMarketplace() {
  const { hero, stats, categories, products, values } = ARTISANS_DATA;
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory
    ? products.filter((p) => p.category === activeCategory)
    : products;

  return (
    <>
      <Navbar />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;0,800;1,500&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #FAF5EE;
          min-height: 100vh;
        }

        .artisans-root {
          font-family: 'Lora', Georgia, serif;
          color: #2d1f0e;
          background: #FAF5EE;
          min-height: 100vh;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 22px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        @media (max-width: 900px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 600px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .values-grid { grid-template-columns: 1fr; }
          .products-grid { grid-template-columns: 1fr; }
        }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #f0e8dc; }
        ::-webkit-scrollbar-thumb { background: #c9a87a; border-radius: 4px; }
      `}</style>

      <div className="artisans-root">

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <div
          style={{
            background: "linear-gradient(135deg, #2C1810 0%, #4A2C1A 40%, #6B3A1E 100%)",
            padding: "64px 32px 72px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative background rings */}
          {[300, 500, 700].map((size, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top: "50%",
                right: -size / 3,
                transform: "translateY(-50%)",
                width: size,
                height: size,
                borderRadius: "50%",
                border: "1px solid rgba(244,161,42,0.15)",
                pointerEvents: "none",
              }}
            />
          ))}

          <div style={{ maxWidth: 860, margin: "0 auto", position: "relative", zIndex: 1 }}>
            <motion.div {...fadeUp(0)}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(244,161,42,0.15)",
                  border: "1px solid rgba(244,161,42,0.35)",
                  color: "#F4A12A",
                  borderRadius: 24,
                  padding: "6px 16px",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: 1.2,
                  textTransform: "uppercase" as const,
                  marginBottom: 20,
                  fontFamily: "'Lora', serif",
                }}
              >
                🏺 {hero.badge}
              </div>
            </motion.div>

            <motion.h1
              {...fadeUp(0.1)}
              style={{
                fontSize: "clamp(36px, 6vw, 56px)",
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 800,
                color: "#FDF3E7",
                lineHeight: 1.1,
                marginBottom: 16,
              }}
            >
              {hero.title}
            </motion.h1>

            <motion.p
              {...fadeUp(0.2)}
              style={{
                fontSize: 16.5,
                color: "rgba(253,243,231,0.75)",
                maxWidth: 560,
                lineHeight: 1.7,
                fontFamily: "'Lora', Georgia, serif",
                marginBottom: 28,
              }}
            >
              {hero.subtitle}
            </motion.p>

            <motion.div {...fadeUp(0.3)} style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: "linear-gradient(135deg, #E8621A, #F4A12A)",
                  color: "#fff",
                  borderRadius: 14,
                  padding: "12px 22px",
                  fontSize: 14,
                  fontWeight: 700,
                  boxShadow: "0 6px 24px rgba(232,98,26,0.4)",
                }}
              >
                <span style={{ fontSize: 18 }}>🇮🇳</span>
                Bharat Score: {hero.bharatScore} / 100
              </div>
              <div
                style={{
                  color: "rgba(253,243,231,0.65)",
                  fontSize: 14,
                  fontFamily: "'Lora', Georgia, serif",
                  fontStyle: "italic",
                }}
              >
                {hero.tagline}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── STATS ─────────────────────────────────────────────────────── */}
        <div style={{ maxWidth: 860, margin: "-36px auto 0", padding: "0 24px", position: "relative", zIndex: 10 }}>
          <motion.div
            className="stats-grid"
            variants={stagger}
            initial="initial"
            animate="animate"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                variants={{
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
                }}
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  padding: "20px 18px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  textAlign: "center" as const,
                  border: "1px solid rgba(201,168,122,0.2)",
                }}
              >
                <div style={{ fontSize: 24, marginBottom: 6 }}>{stat.icon}</div>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: "#2C1810",
                    fontFamily: "'Playfair Display', Georgia, serif",
                  }}
                >
                  {stat.value}
                </div>
                <div style={{ fontSize: 11.5, color: "#8a7260", marginTop: 2, fontWeight: 500 }}>{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── CATEGORIES ────────────────────────────────────────────────── */}
        <div style={{ maxWidth: 860, margin: "48px auto 0", padding: "0 24px" }}>
          <motion.h2
            {...fadeUp(0)}
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 26,
              fontWeight: 700,
              color: "#2C1810",
              marginBottom: 18,
            }}
          >
            Browse by Craft
          </motion.h2>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 36 }}>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(null)}
              style={{
                background: activeCategory === null ? "#2C1810" : "#fff",
                color: activeCategory === null ? "#FDF3E7" : "#5c4228",
                border: "1.5px solid",
                borderColor: activeCategory === null ? "#2C1810" : "rgba(201,168,122,0.4)",
                borderRadius: 24,
                padding: "8px 18px",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'Lora', Georgia, serif",
                transition: "all 0.2s ease",
              }}
            >
              All Crafts
            </motion.button>
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat.name === activeCategory ? null : cat.name)}
                style={{
                  background: activeCategory === cat.name ? "#2C1810" : "#fff",
                  color: activeCategory === cat.name ? "#FDF3E7" : "#5c4228",
                  border: "1.5px solid",
                  borderColor: activeCategory === cat.name ? "#2C1810" : "rgba(201,168,122,0.4)",
                  borderRadius: 24,
                  padding: "8px 18px",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "'Lora', Georgia, serif",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span>{cat.icon}</span>
                {cat.name}
                <span
                  style={{
                    fontSize: 10.5,
                    background: activeCategory === cat.name ? "rgba(253,243,231,0.2)" : "rgba(201,168,122,0.15)",
                    borderRadius: 10,
                    padding: "1px 6px",
                    fontWeight: 700,
                  }}
                >
                  {cat.count.toLocaleString("en-IN")}
                </span>
              </motion.button>
            ))}
          </div>

          {/* ── PRODUCTS ────────────────────────────────────────────────── */}
          <motion.div
            className="products-grid"
            variants={stagger}
            initial="initial"
            animate="animate"
            key={activeCategory ?? "all"}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
                color: "#8a7260",
                fontStyle: "italic",
              }}
            >
              No products in this category yet. More artisans joining soon!
            </div>
          )}
        </div>

        {/* ── WHY IT MATTERS ────────────────────────────────────────────── */}
        <div
          style={{
            background: "linear-gradient(135deg, #2C1810 0%, #3D2214 100%)",
            margin: "64px 0 0",
            padding: "56px 24px",
          }}
        >
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <motion.div {...fadeUp(0)} style={{ marginBottom: 36 }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: 2,
                  textTransform: "uppercase" as const,
                  color: "#F4A12A",
                  marginBottom: 10,
                  fontFamily: "'Lora', serif",
                }}
              >
                Why It Matters
              </div>
              <h2
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 30,
                  fontWeight: 800,
                  color: "#FDF3E7",
                  lineHeight: 1.2,
                }}
              >
                Real income for real hands.
              </h2>
            </motion.div>

            <div className="values-grid">
              {values.map((v, i) => (
                <motion.div
                  key={i}
                  {...fadeUp(i * 0.1)}
                  style={{
                    background: "rgba(253,243,231,0.06)",
                    border: "1px solid rgba(244,161,42,0.2)",
                    borderRadius: 16,
                    padding: "24px 22px",
                    display: "flex",
                    gap: 16,
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: "rgba(244,161,42,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 22,
                      flexShrink: 0,
                    }}
                  >
                    {v.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: "#FDF3E7",
                        fontFamily: "'Playfair Display', Georgia, serif",
                        marginBottom: 6,
                      }}
                    >
                      {v.title}
                    </div>
                    <div style={{ fontSize: 13.5, color: "rgba(253,243,231,0.65)", lineHeight: 1.6 }}>{v.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ── FOOTER BAR ────────────────────────────────────────────────── */}
        <div
          style={{
            background: "#1a0e08",
            padding: "20px 32px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span style={{ fontSize: 14, color: "rgba(253,243,231,0.45)", fontFamily: "'Lora', serif" }}>
            🇮🇳 Every purchase directly supports an Indian artisan family.
          </span>
        </div>
      </div>
    </>
  );
}