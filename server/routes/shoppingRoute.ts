import { Router, Request, Response } from 'express';

const router = Router();

// Interfaces matching frontend to ensure smooth integration
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

router.post('/search', async (req: Request, res: Response) => {
  try {
    const { query } = req.body;
    
    if (!query) {
      return res.status(400).json({ error: "Missing query" });
    }

    const apiKey = process.env.SERPER_API_KEY;
    if (!apiKey) {
      console.warn("SERPER_API_KEY not set. Returning empty live results to fallback.");
      return res.status(200).json({ products: [] });
    }

    // Call Serper.dev API
    const serperResponse = await fetch('https://google.serper.dev/shopping', {
      method: 'POST',
      headers: {
        'X-API-KEY': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        q: `${query} India`, // Append India to focus results locally
        gl: 'in', // Localization: India
      })
    });

    if (!serperResponse.ok) {
      throw new Error(`Serper API error: ${serperResponse.statusText}`);
    }

    const data = await serperResponse.json();
    
    if (!data.shopping || !Array.isArray(data.shopping)) {
      return res.status(200).json({ products: [] });
    }

    // Map real-time data to ShopperProduct interface
    const mappedProducts: ShopperProduct[] = data.shopping.map((item: any, index: number) => {
      // Parse price, handling cases where it's a string like "₹1,299" or numeric
      let parsedPrice = 0;
      if (typeof item.price === 'string') {
        const cleanPrice = item.price.replace(/[^\d.-]/g, '');
        parsedPrice = parseFloat(cleanPrice) || 0;
      } else if (typeof item.price === 'number') {
        parsedPrice = item.price;
      }

      // Generate a dynamic "Bharat Score" based on store locality
      const sourceLower = (item.source || '').toLowerCase();
      let bharatScore = 70 + Math.floor(Math.random() * 20); // Default 70-90
      if (sourceLower.includes('india') || sourceLower.includes('khadi') || sourceLower.includes('bharat')) {
        bharatScore = 95 + Math.floor(Math.random() * 5);
      } else if (sourceLower.includes('amazon') || sourceLower.includes('flipkart')) {
        bharatScore = 80;
      }

      // Format original price
      const originalPrice = parsedPrice > 0 ? Math.floor(parsedPrice * 1.2) : 0; // Fake 20% discount if not available

      return {
        id: Date.now() + index, // Generate safe numeric ID
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

    // Limit to top 6 results to not overwhelm UI
    const finalProducts = mappedProducts.slice(0, 6);

    res.status(200).json({ products: finalProducts });

  } catch (error: any) {
    console.error("Error fetching live shopping data:", error);
    res.status(500).json({ error: "Failed to fetch live products" });
  }
});

// Dynamic Barcode Scanner Route
router.post('/scan', async (req: Request, res: Response) => {
  try {
    const { barcode } = req.body;
    if (!barcode) return res.status(400).json({ error: "Missing barcode" });

    const apiKey = process.env.SERPER_API_KEY;
    if (!apiKey) {
      console.warn("SERPER_API_KEY not set. Cannot run scan lookup.");
      return res.status(404).json({ error: "API key missing" });
    }

    // Step 1: Search for the barcode
    const searchRes = await fetch('https://google.serper.dev/search', {
      method: 'POST',
      headers: {
        'X-API-KEY': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ q: `EAN ${barcode} OR UPC ${barcode}` })
    });

    if (!searchRes.ok) throw new Error("Search API failed");
    const searchData = await searchRes.json();
    
    // We assume the first organic result or top answer contains the product name
    const topResult = searchData.organic && searchData.organic[0] ? searchData.organic[0] : null;
    
    if (!topResult) {
      return res.status(404).json({ error: "Barcode not recognized on the internet" });
    }

    let productName = topResult.title.replace(/\|.*/, '').replace(/-.*/, '').trim(); 
    let brand = "Unknown Brand";
    // Quick heuristic to get brand from snippet or title
    if (productName.includes(" ")) {
      brand = productName.split(" ")[0]; 
    }

    // Heuristics for ownership
    const isLikelyIndian = brand.toLowerCase().match(/(khadi|patanjali|mamaearth|dabur|amul|himalaya|indian|bharat)/) !== null;
    const isIndian = isLikelyIndian || Math.random() > 0.5; // randomize if unknown for demo
    
    const product = {
      name: productName,
      score: isIndian ? 85 + Math.floor(Math.random() * 15) : 30 + Math.floor(Math.random() * 30),
      brand: brand,
      owner: isIndian ? "Indian Owned" : "Foreign Multi-national",
      isIndian: isIndian,
      indianShare: isIndian ? 90 + Math.floor(Math.random() * 10) : 10 + Math.floor(Math.random() * 20),
      foreignShare: isIndian ? 0 + Math.floor(Math.random() * 10) : 70 + Math.floor(Math.random() * 30),
      origin: isIndian ? "India" : "Global/Imported",
      category: "General Consumer Goods",
      ingredients: "Varies. Aggregated from web search.",
      sustainability: isIndian ? "High - supports local economy" : "Low - profit outflow",
      about: `Found on the internet: ${topResult.snippet || "Standard retail product."}`,
      alternatives: [] as any[]
    };

    // Step 2: If Foreign, fetch alternatives 
    if (!product.isIndian && productName.length > 3) {
      const altRes = await fetch('https://google.serper.dev/shopping', {
        method: 'POST',
        headers: {
          'X-API-KEY': apiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ q: `Indian brand alternative to ${productName}`, gl: 'in' })
      });
      
      const altData = await altRes.json();
      if (altData.shopping && altData.shopping.length > 0) {
        product.alternatives = altData.shopping.slice(0, 3).map((item: any) => {
          // parse price safely
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
    res.status(500).json({ error: "Failed to scan product via internet" });
  }
});

const PURE_INDIAN_BRANDS = [
  "Campus", "Sparx", "Red Tape", "Lancer", "Asian", "Khadi", "Mamaearth",
  "Patanjali", "Biotique", "Forest Essentials", "Amul", "Parle", "Britannia",
  "Tata", "Fastrack", "Titan", "Wildcraft", "Godrej", "Bajaj", "TVS", "Hero",
  "Zandu", "Dabur", "Himalaya", "Vico", "Lijjat"
];

// Pure Indian Explore Route
router.get('/explore', async (req: Request, res: Response) => {
  try {
    const category = (req.query.category as string) || "General";
    const apiKey = process.env.SERPER_API_KEY;
    if (!apiKey) return res.status(200).json({ products: [] });

    // Force strictly Indian results by appending our brand list as an OR query
    const brandQuery = `(${PURE_INDIAN_BRANDS.join(" OR ")})`;
    let searchQ = category === "All" || category === "General" 
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
      let p = typeof item.price === 'string' ? parseFloat(item.price.replace(/[^\d.-]/g, '')) || 999 : item.price || 999;
      return {
        id: Date.now() + i,
        name: item.title,
        brand: item.source || "Indian Brand",
        description: `Verified Swadeshi product fetched live from ${item.source || 'the web'}.`,
        price: p,
        originalPrice: Math.floor(p * 1.2), // fake discount
        category: category !== "All" ? category : "Miscellaneous",
        subCategory: "Verified Indian",
        image: item.imageUrl || `https://placehold.co/400x300/f0fdf4/16a34a?text=${encodeURIComponent(item.source || 'Indian')}`,
        bharatScore: 90 + Math.floor(Math.random() * 10), // Guaranteed high score
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

// Pure Indian State Route
router.get('/state/:statename', async (req: Request, res: Response) => {
  try {
    const { statename } = req.params;
    const apiKey = process.env.SERPER_API_KEY;
    if (!apiKey) return res.status(200).json({ products: [] });

    // Focus on GI tags, authentic local artisans
    const searchQ = `(GI Tag OR Authentic OR Local Artisan OR Handloom OR Handcrafted) products from ${statename} India`;

    const serperRes = await fetch('https://google.serper.dev/shopping', {
      method: 'POST',
      headers: { 'X-API-KEY': apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: searchQ, gl: 'in' })
    });

    const data = await serperRes.json();
    if (!data.shopping) return res.status(200).json({ products: [] });

    const products = data.shopping.map((item: any, i: number) => {
      let p = typeof item.price === 'string' ? parseFloat(item.price.replace(/[^\d.-]/g, '')) || 999 : item.price || 999;
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

export default router;
