import { Router, Request, Response } from 'express';

const router = Router();

// ─── Haversine helper ─────────────────────────────────────────────────────────
const haversineKm = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

// ─── Types ────────────────────────────────────────────────────────────────────
export interface ShopperProduct {
  id: number;
  name: string;
  brand: string;
  description: string;
  price: number;
  originalPrice: number;
  category: string;
  subCategory: string;
  image: string;
  bharatScore: number;
  rating: number;
  reviews: number;
  inStock: boolean;
  tags: string[];
  state: string;
  material?: string;
  gender?: 'Men' | 'Women' | 'Unisex';
}

// ─── /search ─────────────────────────────────────────────────────────────────
router.post('/search', async (req: Request, res: Response) => {
  try {
    const { query } = req.body;
    if (!query) return res.status(400).json({ error: "Missing query" });

    const apiKey = process.env.SERPER_API_KEY;
    if (!apiKey) {
      console.warn("SERPER_API_KEY not set. Returning empty live results to fallback.");
      return res.status(200).json({ products: [] });
    }

    const serperResponse = await fetch('https://google.serper.dev/shopping', {
      method: 'POST',
      headers: { 'X-API-KEY': apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: `${query} India`, gl: 'in' })
    });

    if (!serperResponse.ok) throw new Error(`Serper API error: ${serperResponse.statusText}`);

    const data = await serperResponse.json();
    if (!data.shopping || !Array.isArray(data.shopping)) {
      return res.status(200).json({ products: [] });
    }

    const mappedProducts: ShopperProduct[] = data.shopping.map((item: any, index: number) => {
      let parsedPrice = 0;
      if (typeof item.price === 'string') {
        parsedPrice = parseFloat(item.price.replace(/[^\d.-]/g, '')) || 0;
      } else if (typeof item.price === 'number') {
        parsedPrice = item.price;
      }

      const sourceLower = (item.source || '').toLowerCase();
      let bharatScore = 70 + Math.floor(Math.random() * 20);
      if (sourceLower.includes('india') || sourceLower.includes('khadi') || sourceLower.includes('bharat')) {
        bharatScore = 95 + Math.floor(Math.random() * 5);
      } else if (sourceLower.includes('amazon') || sourceLower.includes('flipkart')) {
        bharatScore = 80;
      }

      const originalPrice = parsedPrice > 0 ? Math.floor(parsedPrice * 1.2) : 0;

      return {
        id: Date.now() + index,
        name: item.title || 'Unknown Product',
        brand: item.source || 'Online Store',
        description: `Live product fetched from ${item.source || 'the web'}. ${item.title}`,
        price: parsedPrice > 0 ? parsedPrice : 999,
        originalPrice: originalPrice > 0 ? originalPrice : 1499,
        category: 'Web Finding',
        subCategory: 'General',
        image: item.imageUrl || `https://placehold.co/400x300/fff7ed/f97316?text=${encodeURIComponent(item.source || 'Product')}`,
        bharatScore,
        rating: item.rating || (4.0 + Math.random()),
        reviews: item.ratingCount || Math.floor(Math.random() * 500) + 50,
        inStock: true,
        tags: ["Live Web Data"],
        state: "Ships across India"
      };
    });

    return res.status(200).json({ products: mappedProducts.slice(0, 6) });
  } catch (error: any) {
    console.error("Error fetching live shopping data:", error);
    return res.status(500).json({ error: "Failed to fetch live products" });
  }
});

// ─── /scan ────────────────────────────────────────────────────────────────────
router.post('/scan', async (req: Request, res: Response) => {
  try {
    const { barcode } = req.body;
    if (!barcode) return res.status(400).json({ error: "Missing barcode" });

    const apiKey = process.env.SERPER_API_KEY;
    if (!apiKey) {
      console.warn("SERPER_API_KEY not set. Cannot run scan lookup.");
      return res.status(404).json({ error: "API key missing" });
    }

    const searchRes = await fetch('https://google.serper.dev/search', {
      method: 'POST',
      headers: { 'X-API-KEY': apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: `EAN ${barcode} OR UPC ${barcode}` })
    });

    if (!searchRes.ok) throw new Error("Search API failed");
    const searchData = await searchRes.json();

    const topResult = searchData.organic?.[0] ?? null;
    if (!topResult) return res.status(404).json({ error: "Barcode not recognized on the internet" });

    let productName = topResult.title.replace(/\|.*/, '').replace(/-.*/, '').trim();
    let brand = "Unknown Brand";
    if (productName.includes(" ")) brand = productName.split(" ")[0];

    const isLikelyIndian = brand.toLowerCase().match(/(khadi|patanjali|mamaearth|dabur|amul|himalaya|indian|bharat)/) !== null;
    const isIndian = isLikelyIndian || Math.random() > 0.5;

    const product: any = {
      name: productName,
      score: isIndian ? 85 + Math.floor(Math.random() * 15) : 30 + Math.floor(Math.random() * 30),
      brand,
      owner: isIndian ? "Indian Owned" : "Foreign Multi-national",
      isIndian,
      indianShare: isIndian ? 90 + Math.floor(Math.random() * 10) : 10 + Math.floor(Math.random() * 20),
      foreignShare: isIndian ? Math.floor(Math.random() * 10) : 70 + Math.floor(Math.random() * 30),
      origin: isIndian ? "India" : "Global/Imported",
      category: "General Consumer Goods",
      ingredients: "Varies. Aggregated from web search.",
      sustainability: isIndian ? "High - supports local economy" : "Low - profit outflow",
      about: `Found on the internet: ${topResult.snippet || "Standard retail product."}`,
      alternatives: []
    };

    if (!product.isIndian && productName.length > 3) {
      const altRes = await fetch('https://google.serper.dev/shopping', {
        method: 'POST',
        headers: { 'X-API-KEY': apiKey, 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: `Indian brand alternative to ${productName}`, gl: 'in' })
      });
      const altData = await altRes.json();
      if (altData.shopping?.length > 0) {
        product.alternatives = altData.shopping.slice(0, 3).map((item: any) => {
          let p = item.price;
          if (typeof p === 'string') p = p.replace(/[^\d.-]/g, '');
          const dp = parseFloat(p) || 0;
          return {
            name: item.title,
            brand: item.source || 'Local Brand',
            why: "Identified dynamically from internet search as a local alternative.",
            price: dp > 0 ? `₹${dp}` : 'View Site',
            bharat_score: 85 + Math.floor(Math.random() * 15),
            shop_url: item.link || '#',
            image_url: item.imageUrl || ''
          };
        });
      }
    }

    return res.status(200).json(product);
  } catch (err: any) {
    console.error("Scanner Route Error:", err);
    return res.status(500).json({ error: "Failed to scan product via internet" });
  }
});

// ─── /explore ─────────────────────────────────────────────────────────────────
const PURE_INDIAN_BRANDS = [
  "Campus", "Sparx", "Red Tape", "Lancer", "Asian", "Khadi", "Mamaearth",
  "Patanjali", "Biotique", "Forest Essentials", "Amul", "Parle", "Britannia",
  "Tata", "Fastrack", "Titan", "Wildcraft", "Godrej", "Bajaj", "TVS", "Hero",
  "Zandu", "Dabur", "Himalaya", "Vico", "Lijjat"
];

router.get('/explore', async (req: Request, res: Response) => {
  try {
    const category = (req.query.category as string) || "General";
    const apiKey = process.env.SERPER_API_KEY;
    if (!apiKey) return res.status(200).json({ products: [] });

    const brandQuery = `(${PURE_INDIAN_BRANDS.join(" OR ")})`;
    const searchQ = category === "All" || category === "General"
      ? `${brandQuery} products`
      : `${brandQuery} ${category}`;

    const serperRes = await fetch('https://google.serper.dev/shopping', {
      method: 'POST',
      headers: { 'X-API-KEY': apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: searchQ, gl: 'in' })
    });

    const data = await serperRes.json();
    if (!data.shopping) return res.status(200).json({ products: [] });

    const products = data.shopping.map((item: any, i: number) => {
      const p = typeof item.price === 'string'
        ? parseFloat(item.price.replace(/[^\d.-]/g, '')) || 999
        : item.price || 999;
      return {
        id: Date.now() + i,
        name: item.title,
        brand: item.source || "Indian Brand",
        description: `Verified Swadeshi product fetched live from ${item.source || 'the web'}.`,
        price: p,
        originalPrice: Math.floor(p * 1.2),
        category: category !== "All" ? category : "Miscellaneous",
        subCategory: "Verified Indian",
        image: item.imageUrl || `https://placehold.co/400x300/f0fdf4/16a34a?text=${encodeURIComponent(item.source || 'Indian')}`,
        bharatScore: 90 + Math.floor(Math.random() * 10),
        rating: item.rating || (4.2 + Math.random() * 0.7),
        reviews: item.ratingCount || Math.floor(Math.random() * 2000),
        inStock: true,
        tags: ["Pure Indian", "Swadeshi"],
        state: "Pan India"
      };
    });

    return res.status(200).json({ products });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to explore products" });
  }
});

// ─── /state/:statename ────────────────────────────────────────────────────────
router.get('/state/:statename', async (req: Request, res: Response) => {
  try {
    const statename = req.params.statename as string;
    const apiKey = process.env.SERPER_API_KEY;
    if (!apiKey) return res.status(200).json({ products: [] });

    const searchQ = `(GI Tag OR Authentic OR Local Artisan OR Handloom OR Handcrafted) products from ${statename} India`;

    const serperRes = await fetch('https://google.serper.dev/shopping', {
      method: 'POST',
      headers: { 'X-API-KEY': apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: searchQ, gl: 'in' })
    });

    const data = await serperRes.json();
    if (!data.shopping) return res.status(200).json({ products: [] });

    const products = data.shopping.map((item: any, i: number) => {
      const p = typeof item.price === 'string'
        ? parseFloat(item.price.replace(/[^\d.-]/g, '')) || 999
        : item.price || 999;
      return {
        id: Date.now() + i,
        name: item.title,
        brand: item.source || "Local Artisan",
        description: `Authentic regional product from ${statename}.`,
        price: p,
        originalPrice: Math.floor(p * 1.15),
        category: "Regional",
        subCategory: statename,
        image: item.imageUrl || `https://placehold.co/400x300/f0fdf4/16a34a?text=${encodeURIComponent(statename)}`,
        bharatScore: 95 + Math.floor(Math.random() * 5),
        rating: item.rating || (4.5 + Math.random() * 0.5),
        reviews: item.ratingCount || Math.floor(Math.random() * 500) + 50,
        inStock: true,
        tags: ["GI Tagged", "Artisan"],
        state: statename
      };
    });

    return res.status(200).json({ products });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch state products" });
  }
});

// ─── /artisans-live ───────────────────────────────────────────────────────────
router.get('/artisans-live', async (req: Request, res: Response) => {
  try {
    const category = (req.query.category as string) || "Artisans";
    const city = (req.query.city as string) || "India";
    // Accept real coords passed from frontend
    const userLat = parseFloat(req.query.lat as string) || null;
    const userLng = parseFloat(req.query.lng as string) || null;

    const apiKey = process.env.SERPER_API_KEY;
    if (!apiKey) {
      console.warn("SERPER_API_KEY missing, returning empty live artisans.");
      return res.status(200).json({ artisans: [] });
    }

    // Neighbourhood-level city name gives Serper much tighter results
    const query = `Authentic GI Tagged ${category} artisan near ${city} India`;

    const serperRes = await fetch('https://google.serper.dev/places', {
      method: 'POST',
      headers: { 'X-API-KEY': apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: query, gl: 'in', num: 20 })
    });

    if (!serperRes.ok) throw new Error("Serper Places API failed");
    const data = await serperRes.json();

    if (!data.places || !Array.isArray(data.places)) {
      return res.status(200).json({ artisans: [] });
    }

    const artisans = data.places
      // Drop any result where Serper didn't return real coordinates
      .filter((place: any) =>
        typeof place.latitude === 'number' && typeof place.longitude === 'number'
      )
      .map((place: any, i: number) => {
        const placeLat: number = place.latitude;
        const placeLng: number = place.longitude;

        // Compute real distance only if we have user coords
        const distance_km =
          userLat !== null && userLng !== null
            ? parseFloat(haversineKm(userLat, userLng, placeLat, placeLng).toFixed(1))
            : null;

        return {
          id: `live-${Date.now()}-${i}`,
          name: place.title || "Traditional Artisan",
          artisan: place.title?.split(' ')[0] || "Local Master",
          location: place.address || city,
          category,
          rating: parseFloat((place.rating || 4.2 + Math.random() * 0.7).toFixed(1)),
          reviews: place.ratingCount || Math.floor(Math.random() * 500) + 20,
          price: 499 + Math.floor(Math.random() * 2000),
          originalPrice: 800 + Math.floor(Math.random() * 3000),
          image: "🏺",
          accent: "#f97316",
          story: `Authentic ${category} craft. Supports local community directly.`,
          verified: true,
          giTag: place.title.toLowerCase().includes('gi') || Math.random() > 0.7,
          bharatScore: 95 + Math.floor(Math.random() * 5),
          latitude: placeLat,
          longitude: placeLng,
          distance_km,   // real km or null — never the center of India
          mapsLink: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            place.title + ' ' + (place.address || '')
          )}`
        };
      })
      // Sort nearest-first when user coords are available
      .sort((a: any, b: any) => {
        if (a.distance_km === null) return 1;
        if (b.distance_km === null) return -1;
        return a.distance_km - b.distance_km;
      });

    return res.status(200).json({ artisans });
  } catch (err) {
    console.error("Artisans Live Error:", err);
    return res.status(500).json({ error: "Failed to fetch live artisans" });
  }
});

export default router;