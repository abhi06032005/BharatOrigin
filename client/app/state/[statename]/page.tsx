"use client";
import { PathParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";
import { useParams, useRouter } from "next/navigation";

import { useState, useEffect, useRef, useMemo } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

import { Product, StateData, STATE_DATA, DEMO_STATES } from "./stateData";



// ─── Utilities ────────────────────────────────────────────────────────────────




const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill={i < Math.floor(rating) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ));
};

// ─── Skeleton Loader ──────────────────────────────────────────────────────────

const SkeletonCard = () => (
  <div style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: 16, padding: "1.25rem", overflow: "hidden" }}>
    <div className="shimmer" style={{ height: 160, borderRadius: 10, marginBottom: 16 }} />
    <div className="shimmer" style={{ height: 14, width: "60%", borderRadius: 6, marginBottom: 8 }} />
    <div className="shimmer" style={{ height: 10, width: "40%", borderRadius: 6, marginBottom: 12 }} />
    <div className="shimmer" style={{ height: 22, width: "50%", borderRadius: 6, marginBottom: 12 }} />
    <div className="shimmer" style={{ height: 36, borderRadius: 8 }} />
  </div>
);

// ─── Product Card ─────────────────────────────────────────────────────────────

const ProductCard = ({ product, accentColor, onAdd }: { product: Product; accentColor: string; onAdd: (p: Product) => void }) => {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (!product.inStock || added) return;
    setAdded(true);
    onAdd(product);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div
      style={{
        background: "var(--color-background-primary)",
        border: "0.5px solid var(--color-border-tertiary)",
        borderRadius: 16,
        padding: "1.25rem",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        transition: "transform 0.2s, border-color 0.2s",
        cursor: "default",
        position: "relative",
        opacity: product.inStock ? 1 : 0.65,
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLDivElement).style.borderColor = "var(--color-border-secondary)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLDivElement).style.borderColor = "var(--color-border-tertiary)"; }}
    >
      {/* Category Pill */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span style={{ fontSize: 11, fontWeight: 500, color: "var(--color-text-secondary)", background: "var(--color-background-secondary)", padding: "3px 10px", borderRadius: 20, border: "0.5px solid var(--color-border-tertiary)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
          {product.category}
        </span>
        {product.tag && (
          <span style={{ fontSize: 11, fontWeight: 500, padding: "3px 10px", borderRadius: 20, background: accentColor + "22", color: accentColor, letterSpacing: "0.04em" }}>
            {product.tag}
          </span>
        )}
      </div>

      {/* Product Icon Area */}
      <div style={{ height: 140, background: "var(--color-background-secondary)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 56, height: 56, borderRadius: "50%", background: accentColor + "22", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
        </div>
      </div>

      {/* Name & Description */}
      <div>
        <p style={{ margin: 0, fontSize: 15, fontWeight: 500, color: "var(--color-text-primary)", lineHeight: 1.4 }}>{product.name}</p>
        <p style={{ margin: "5px 0 0", fontSize: 12, color: "var(--color-text-secondary)", lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {product.description}
        </p>
      </div>

      {/* Rating */}
      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
        <span style={{ display: "flex", color: accentColor }}>{renderStars(product.rating)}</span>
        <span style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>{product.rating} ({product.reviews.toLocaleString()})</span>
      </div>

      {/* Price */}
      <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
        <span style={{ fontSize: 18, fontWeight: 500, color: "var(--color-text-primary)" }}>₹{product.price.toLocaleString()}</span>
        {product.originalPrice && (
          <span style={{ fontSize: 13, color: "var(--color-text-tertiary)", textDecoration: "line-through" }}>₹{product.originalPrice.toLocaleString()}</span>
        )}
        {product.originalPrice && (
          <span style={{ fontSize: 12, color: "#059669", fontWeight: 500 }}>
            {Math.round((1 - product.price / product.originalPrice) * 100)}% off
          </span>
        )}
      </div>

      {/* CTA */}
      {!product.inStock ? (
        <div style={{ textAlign: "center", fontSize: 13, color: "var(--color-text-tertiary)", padding: "9px 0", borderRadius: 8, border: "0.5px solid var(--color-border-tertiary)", background: "var(--color-background-secondary)" }}>
          Out of Stock
        </div>
      ) : (
        <button
          onClick={handleAdd}
          style={{
            background: added ? "#059669" : accentColor,
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "9px 0",
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
            width: "100%",
            transition: "background 0.25s, transform 0.1s",
            letterSpacing: "0.02em",
          }}
          onMouseDown={e => (e.currentTarget.style.transform = "scale(0.98)")}
          onMouseUp={e => (e.currentTarget.style.transform = "scale(1)")}
        >
          {added ? "Added to Cart" : "Add to Cart"}
        </button>
      )}
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

interface StateProductsPageProps {
  stateName: string;
}

const StateProductsPage = ({
  stateName,
}: StateProductsPageProps) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] =
    useState<StateData | null>(null);

  const [cart, setCart] = useState<Product[]>(
    []
  );

  const [showCart, setShowCart] =
    useState(false);

  const [filterCategory, setFilterCategory] =
    useState("All");

  useEffect(() => {
    let active = true;
    const fetchStateData = async () => {
      setLoading(true);
      
      const fallback = STATE_DATA[stateName];
      let productsLoaded = false;
      
      // 1. Fetch live regional data
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const res = await fetch(`${apiUrl}/api/shopping/state/${stateName}`);
        if (res.ok) {
          const dataLive = await res.json();
          if (dataLive.products && dataLive.products.length > 0 && active) {
             // We merge live products with fallback metadata
             setData({
               displayName: fallback?.displayName || stateName,
               capital: fallback?.capital || "Multiple Cities",
               region: fallback?.region || "India",
               heroColor: fallback?.heroColor || "#111",
               accentColor: fallback?.accentColor || "#111",
               tagline: fallback?.tagline || `Live fetched regional authentic products.`,
               products: dataLive.products
             });
             setFilterCategory("All");
             setLoading(false);
             productsLoaded = true;
          }
        }
      } catch (err) {
        console.error("Live state fetch failed, falling back", err);
      }
      
      // 2. Fallback to local offline data
      if (active && !productsLoaded) {
        setData(fallback);
        setFilterCategory("All");
        setLoading(false);
      }
    };

    fetchStateData();

    return () => { active = false; };
  }, [stateName]);

  const categories = data
    ? [
        "All",
        ...Array.from(
          new Set(
            data.products.map(
              (p) => p.category
            )
          )
        ),
      ]
    : [];

  const filtered =
    data?.products.filter(
      (p) =>
        filterCategory === "All" ||
        p.category === filterCategory
    ) ?? [];

  const total = cart.reduce(
    (sum, item) => sum + item.price,
    0
  );

  const handleAdd = (product: Product) => {
    setCart((prev) => [...prev, product]);
  };

  return (
    <div className="min-h-screen bg-[#faf8f3]">
      {/* HERO */}
      <section className="px-10 py-10 border-b border-gray-200 bg-white">
        {loading ? (
          <div className="space-y-3 animate-pulse">
            <div className="h-4 w-32 bg-gray-200 rounded" />
            <div className="h-12 w-72 bg-gray-200 rounded" />
            <div className="h-4 w-96 bg-gray-200 rounded" />
          </div>
        ) : (
          <>
            <p className="text-xs uppercase tracking-[0.18em] text-gray-400 font-bold mb-2">
              {data?.region}
            </p>

            <h1 className="text-5xl font-bold text-gray-900 mb-3">
              {data?.displayName}
            </h1>

            <p className="text-gray-600 text-lg max-w-3xl leading-8">
              {data?.tagline}
            </p>
          </>
        )}
      </section>

      {/* FILTER + CART */}
      <section className="sticky top-0 z-30 bg-white border-b border-gray-200 px-10 py-4">
        <div className="flex justify-between gap-5 flex-wrap items-center">
          {/* category */}
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => {
              const active =
                cat === filterCategory;

              return (
                <button
                  key={cat}
                  onClick={() =>
                    setFilterCategory(cat)
                  }
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                    active
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* cart button */}
          <button
            onClick={() =>
              setShowCart(!showCart)
            }
            className="px-5 py-2.5 rounded-xl bg-black text-white text-sm font-semibold shadow-md"
          >
            Cart ({cart.length}) • ₹
            {total.toLocaleString()}
          </button>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="px-10 py-8">
        {!loading && (
          <div className="mb-6 text-sm text-gray-500">
            {filtered.length} products from{" "}
            {data?.displayName}
          </div>
        )}

        {/* FIXED ALIGN GRID */}
        <div className="grid grid-cols-3 gap-6 items-stretch">
          {loading
            ? Array.from({ length: 6 }).map(
                (_, i) => (
                  <SkeletonCard key={i} />
                )
              )
            : filtered.map((product) => (
                <div
                  key={product.id}
                  className="h-full"
                >
                  <ProductCard
                    product={product}
                    accentColor={
                      data?.accentColor ??
                      "#111"
                    }
                    onAdd={handleAdd}
                  />
                </div>
              ))}
        </div>
      </section>

      {/* CART DRAWER */}
      {showCart && (
        <div className="fixed top-0 right-0 h-screen w-95 bg-white shadow-2xl z-50 border-l border-gray-200 flex flex-col">
          {/* top */}
          <div className="p-5 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-bold">
              Your Cart
            </h2>

            <button
              onClick={() =>
                setShowCart(false)
              }
              className="text-gray-500 text-sm"
            >
              Close
            </button>
          </div>

          {/* items */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <p className="text-gray-400 text-sm">
                Cart is empty
              </p>
            ) : (
              cart.map((item, i) => (
                <div
                  key={i}
                  className="border rounded-xl p-4"
                >
                  <h3 className="font-semibold text-gray-900">
                    {item.name}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    ₹
                    {item.price.toLocaleString()}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* bottom */}
          <div className="p-5 border-t border-gray-200">
            <div className="flex justify-between font-semibold mb-4">
              <span>Total</span>
              <span>
                ₹{total.toLocaleString()}
              </span>
            </div>

            <button className="w-full bg-black text-white py-3 rounded-xl font-semibold">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


export default function App() {
  const params = useParams();
  const router = useRouter();

  /* route slug */
  const routeState =
    (params?.statename as string) ||
    "kerala";

  /* normalize for STATE_DATA keys */
  const normalize = (value: string) =>
    value
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "");

  /* slug -> proper name */
  const getStateName = (
    slug: string
  ) => {
    const found = DEMO_STATES.find(
      (state) =>
        normalize(state) ===
        normalize(slug)
    );

    return found || "Kerala";
  };

  const [selectedState, setSelectedState] =
    useState(
      getStateName(routeState)
    );

  const [search, setSearch] =
    useState("");

  /* sync url -> selected state */
  useEffect(() => {
    setSelectedState(
      getStateName(routeState)
    );
  }, [routeState]);

  /* selected state -> url */
  useEffect(() => {
    const slug =
      normalize(selectedState);

    if (
      slug !== normalize(routeState)
    ) {
      router.replace(
        `/state/${slug}`
      );
    }
  }, [
    selectedState,
    routeState,
    router,
  ]);

  /* search filter */
  const filteredStates = useMemo(
    () =>
      DEMO_STATES.filter((state) =>
        state
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
      ),
    [search]
  );

  return (
    <div className="min-h-screen bg-[#faf8f3] flex">
      {/* SIDEBAR */}
      <aside className="w-[280px] min-h-screen sticky top-0 border-r border-gray-200 bg-white px-5 py-7 overflow-y-auto">
        <div className="mb-7">
          <p className="text-[11px] uppercase tracking-[0.18em] text-gray-400 font-bold mb-2">
            Bharat Bazaar
          </p>

          <h2 className="text-3xl font-bold text-gray-900">
            Indian States
          </h2>

          <p className="text-sm text-gray-500 mt-2 leading-6">
            Browse authentic
            products from every
            state of India.
          </p>
        </div>

        {/* search */}
        <input
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          placeholder="Search state..."
          className="w-full mb-5 px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-black"
        />

        {/* states */}
        <div className="space-y-2">
          {filteredStates.map(
            (state) => {
              const active =
                selectedState ===
                state;

              return (
                <button
                  key={state}
                  onClick={() =>
                    setSelectedState(
                      state
                    )
                  }
                  className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-semibold transition-all duration-200 ${
                    active
                      ? "bg-black text-white border-black shadow-md"
                      : "bg-white text-gray-800 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {state}
                </button>
              );
            }
          )}
        </div>
      </aside>

      {/* IMPORTANT FIX */}
      {/* pass normalized key to STATE_DATA */}
      <main className="flex-1 overflow-hidden">
        <StateProductsPage
          stateName={normalize(
            selectedState
          )}
        />
      </main>
    </div>
  );
}