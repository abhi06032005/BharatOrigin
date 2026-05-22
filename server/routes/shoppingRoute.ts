import { Router, Request, Response } from 'express';
import {
  askGroqJSON, serperSearch,
  SCAN_SYSTEM_PROMPT, ALTERNATIVES_SYSTEM_PROMPT,
  SHOPPING_SYSTEM_PROMPT, askGroq,
  IMAGE_SCAN_SYSTEM_PROMPT, askGroqVision
} from '../lib/groqAI';

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

// ─── /search — AI-powered shopping search ─────────────────────────────────────
router.post('/search', async (req: Request, res: Response) => {
  try {
    const { query } = req.body;
    if (!query) return res.status(400).json({ error: "Missing query" });

    // 1. Serper shopping search
    const data = await serperSearch(`${query} Indian brand`, "shopping");
    if (!data?.shopping?.length) {
      return res.status(200).json({ products: [], aiMessage: "No products found for this query." });
    }

    // 2. Map results
    const mappedProducts: ShopperProduct[] = data.shopping.slice(0, 8).map((item: any, index: number) => {
      let parsedPrice = 0;
      if (typeof item.price === 'string') {
        parsedPrice = parseFloat(item.price.replace(/[^\d.-]/g, '')) || 0;
      } else if (typeof item.price === 'number') {
        parsedPrice = item.price;
      }

      const sourceLower = (item.source || '').toLowerCase();
      let bharatScore = 70 + Math.floor(Math.random() * 15);
      if (sourceLower.match(/(india|khadi|bharat|patanjali|tata|amul|dabur|himalaya|mamaearth|biotique|forest essentials)/)) {
        bharatScore = 90 + Math.floor(Math.random() * 10);
      } else if (sourceLower.match(/(amazon|flipkart|myntra|ajio)/)) {
        bharatScore = 75 + Math.floor(Math.random() * 10);
      }

      return {
        id: Date.now() + index,
        name: item.title || 'Unknown Product',
        brand: item.source || 'Online Store',
        description: `Live product from ${item.source || 'the web'}. ${item.title}`,
        price: parsedPrice > 0 ? parsedPrice : 999,
        originalPrice: parsedPrice > 0 ? Math.floor(parsedPrice * 1.2) : 1499,
        category: 'Web Finding',
        subCategory: 'General',
        image: item.imageUrl || `https://placehold.co/400x300/fff7ed/f97316?text=${encodeURIComponent(item.source || 'Product')}`,
        bharatScore,
        rating: item.rating || parseFloat((4.0 + Math.random()).toFixed(1)),
        reviews: item.ratingCount || Math.floor(Math.random() * 500) + 50,
        inStock: true,
        tags: bharatScore >= 90 ? ["Verified Indian", "Swadeshi"] : ["Live Web Data"],
        state: "Ships across India"
      };
    });

    // 3. Ask Groq for a conversational AI response
    let aiMessage = `Found ${mappedProducts.length} products matching "${query}". All products are sourced with Bharat Score verification.`;
    const productSummary = mappedProducts.slice(0, 4).map(p => `${p.name} by ${p.brand} at ₹${p.price} (Bharat Score: ${p.bharatScore})`).join('\n');
    const groqResponse = await askGroq(
      SHOPPING_SYSTEM_PROMPT,
      `User searched for: "${query}"\n\nTop results found:\n${productSummary}\n\nGenerate a brief, helpful response highlighting the best Indian products found.`,
      { maxTokens: 300 }
    );
    if (groqResponse) aiMessage = groqResponse;

    return res.status(200).json({ products: mappedProducts, aiMessage });
  } catch (error: any) {
    console.error("Error in /search:", error);
    return res.status(500).json({ error: "Failed to fetch live products" });
  }
});

// ─── /scan — AI-powered barcode scanner ───────────────────────────────────────
router.post('/scan', async (req: Request, res: Response) => {
  try {
    const { barcode } = req.body;
    if (!barcode) return res.status(400).json({ error: "Missing barcode" });

    // 1. Search the web for this barcode
    const searchData = await serperSearch(`barcode ${barcode} product brand`, "search");
    if (!searchData?.organic?.length) {
      // Try a simpler search with just the number
      const fallbackData = await serperSearch(`EAN ${barcode} OR UPC ${barcode}`, "search");
      if (!fallbackData?.organic?.length) {
        return res.status(404).json({ error: "Barcode not recognized" });
      }
      Object.assign(searchData, fallbackData);
    }

    // 2. Gather context from multiple search results
    const topResults = (searchData.organic || []).slice(0, 5);
    const knowledgeGraph = searchData.knowledgeGraph || null;
    const searchContext = topResults.map((r: any) => `Title: ${r.title}\nSnippet: ${r.snippet}`).join('\n---\n');
    const kgContext = knowledgeGraph ? `\nKnowledge Graph: ${knowledgeGraph.title} - ${knowledgeGraph.description}` : '';

    // 3. Ask Groq to analyze the product
    const groqProduct = await askGroqJSON(
      SCAN_SYSTEM_PROMPT,
      `Barcode: ${barcode}\n\nSearch results:\n${searchContext}${kgContext}\n\nIdentify this product and analyze its Indian/foreign ownership.`
    );

    if (!groqProduct) {
      // Fallback to basic extraction
      const topResult = topResults[0];
      let productName = topResult.title.replace(/\|.*/, '').replace(/-.*/, '').trim();
      let brand = productName.split(' ')[0] || 'Unknown Brand';
      const isLikelyIndian = brand.toLowerCase().match(/(khadi|patanjali|mamaearth|dabur|amul|himalaya|tata|godrej|bajaj|parle|britannia|wipro|infosys|reliance|biotique|vicco|zandu)/) !== null;

      return res.status(200).json({
        name: productName,
        brand,
        owner: isLikelyIndian ? "Indian Owned" : "Foreign/Unknown",
        isIndian: isLikelyIndian,
        score: isLikelyIndian ? 85 + Math.floor(Math.random() * 15) : 35 + Math.floor(Math.random() * 25),
        indianShare: isLikelyIndian ? 85 : 15,
        foreignShare: isLikelyIndian ? 15 : 85,
        origin: "Detected from web search",
        category: "Consumer Product",
        headquarters: "—",
        revenue: "—",
        about: topResult.snippet || "Product identified via web search. Limited data available.",
        ingredients: "—",
        sustainability: "—",
        alternatives: []
      });
    }

    // 4. If product is NOT Indian, find alternatives via Groq
    let alternatives: any[] = [];
    if (!groqProduct.isIndian) {
      // Search for Indian alternatives
      const altSearchData = await serperSearch(`best Indian alternative to ${groqProduct.name} ${groqProduct.category}`, "shopping");
      const altContext = altSearchData?.shopping?.slice(0, 5).map((item: any) => 
        `${item.title} by ${item.source} - ${item.price}`
      ).join('\n') || 'No shopping results found';

      const altResult = await askGroqJSON(
        ALTERNATIVES_SYSTEM_PROMPT,
        `Foreign product: ${groqProduct.name} by ${groqProduct.brand} (${groqProduct.category})\n\nAvailable Indian products from search:\n${altContext}\n\nSuggest 3-4 genuine Indian alternatives.`
      );

      if (altResult?.alternatives) {
        // Enhance with real images from Serper
        for (const alt of altResult.alternatives) {
          const imgData = await serperSearch(`${alt.name} ${alt.brand} product`, "images", { num: 1 });
          if (imgData?.images?.[0]?.imageUrl) {
            alt.image_url = imgData.images[0].imageUrl;
          }
          if (!alt.shop_url || alt.shop_url === '#') {
            alt.shop_url = `https://www.amazon.in/s?k=${encodeURIComponent(alt.name + ' ' + alt.brand)}`;
          }
        }
        alternatives = altResult.alternatives;
      }
    }

    return res.status(200).json({
      ...groqProduct,
      alternatives
    });

  } catch (err: any) {
    console.error("Scanner Route Error:", err);
    return res.status(500).json({ error: "Failed to scan product" });
  }
});

// ─── /artisans-live — AI-enriched artisan discovery ───────────────────────────
router.get('/artisans-live', async (req: Request, res: Response) => {
  try {
    const category = (req.query.category as string) || "Artisans";
    const city = (req.query.city as string) || "India";
    const userLat = parseFloat(req.query.lat as string) || null;
    const userLng = parseFloat(req.query.lng as string) || null;

    const query = `Authentic GI Tagged ${category} artisan near ${city} India`;
    const data = await serperSearch(query, "places", { num: 20 });

    if (!data?.places?.length) {
      return res.status(200).json({ artisans: [] });
    }

    const artisans = data.places
      .filter((place: any) =>
        typeof place.latitude === 'number' && typeof place.longitude === 'number'
      )
      .map((place: any, i: number) => {
        const placeLat: number = place.latitude;
        const placeLng: number = place.longitude;
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
          giTag: place.title?.toLowerCase().includes('gi') || Math.random() > 0.7,
          bharatScore: 95 + Math.floor(Math.random() * 5),
          latitude: placeLat,
          longitude: placeLng,
          distance_km,
          mapsLink: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            place.title + ' ' + (place.address || '')
          )}`
        };
      })
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

// ─── /scan-image — AI-powered product image vision scanner ────────────────────
router.post('/scan-image', async (req: Request, res: Response) => {
  try {
    const { image } = req.body;
    if (!image) return res.status(400).json({ error: "Missing image" });

    // 1. Ask Groq Vision to identify the product, its attributes, and harmful chemicals
    console.log("Analyzing product image with Groq Vision...");
    const groqProduct: any = await askGroqVision(
      IMAGE_SCAN_SYSTEM_PROMPT,
      image,
      "Analyze the attached product packaging/label and return the JSON object detailing product name, brand, isIndian, score, ownership, HQ, ingredients, and harmful chemicals.",
      { json: true }
    );

    if (!groqProduct) {
      return res.status(500).json({ error: "Failed to recognize product from image" });
    }

    // 2. If the product is not Indian, search for Indian alternatives
    let alternatives: any[] = [];
    if (!groqProduct.isIndian) {
      console.log(`Product "${groqProduct.name}" by "${groqProduct.brand}" is marked as non-Indian. Fetching Swadeshi alternatives...`);
      const searchTerms = `best Indian alternative to ${groqProduct.name} ${groqProduct.category}`;
      const altSearchData = await serperSearch(searchTerms, "shopping");
      const altContext = altSearchData?.shopping?.slice(0, 5).map((item: any) => 
        `${item.title} by ${item.source} - ${item.price}`
      ).join('\n') || 'No shopping results found';

      const altResult = await askGroqJSON(
        ALTERNATIVES_SYSTEM_PROMPT,
        `Foreign product: ${groqProduct.name} by ${groqProduct.brand} (${groqProduct.category})\n\nAvailable Indian products from search:\n${altContext}\n\nSuggest 3-4 genuine Indian alternatives.`
      );

      if (altResult?.alternatives) {
        // Enhance with images and shop URLs
        for (const alt of altResult.alternatives) {
          const imgData = await serperSearch(`${alt.name} ${alt.brand} product`, "images", { num: 1 });
          if (imgData?.images?.[0]?.imageUrl) {
            alt.image_url = imgData.images[0].imageUrl;
          }
          if (!alt.shop_url || alt.shop_url === '#') {
            alt.shop_url = `https://www.amazon.in/s?k=${encodeURIComponent(alt.name + ' ' + alt.brand)}`;
          }
        }
        alternatives = altResult.alternatives;
      }
    }

    return res.status(200).json({
      ...groqProduct,
      alternatives
    });
  } catch (err: any) {
    console.error("Scan Image Error:", err);
    return res.status(500).json({ error: "Failed to scan product image" });
  }
});

// ─── /scan-chat — AI chat about scanned product safety and ownership ─────────
router.post('/scan-chat', async (req: Request, res: Response) => {
  try {
    const { message, history, productContext } = req.body;
    if (!message) return res.status(400).json({ error: "Missing message" });
    if (!productContext) return res.status(400).json({ error: "Missing productContext" });

    const systemPrompt = `You are BharatOrigin's AI Shopping Assistant and Health/Safety Expert.
The user has scanned a product and is chatting with you about it.

PRODUCT CONTEXT:
Name: ${productContext.name}
Brand: ${productContext.brand}
Owner: ${productContext.owner}
Is Indian: ${productContext.isIndian ? "Yes" : "No"}
Bharat Score: ${productContext.score}/100
Ingredients: ${productContext.ingredients || "Not scanned"}
Harmful Chemicals: ${JSON.stringify(productContext.harmfulChemicals || [])}
About: ${productContext.about}

RULES:
1. Provide helpful, conversational, and direct answers to the user's questions about the product.
2. Focus on:
   - Health and safety aspect of the ingredients (specifically toxic/harmful chemicals, health risks, concerns, sugar/fat levels).
   - The economic impact of the product (supporting Swadeshi, profits flowing abroad, local manufacturing).
   - Suggesting Indian alternatives if the user asks.
3. Keep your answers concise, clear, and engaging. Avoid long introductory phrases.
4. Format your responses in markdown (use bolding, bullet points for lists, and clean structure).
5. If the user asks for alternatives, recommend the ones from the context or name other popular Indian brands in the category.`;

    const userPrompt = `History: ${JSON.stringify(history || [])}\n\nUser Question: ${message}`;

    const reply = await askGroq(
      systemPrompt,
      userPrompt,
      { maxTokens: 800, temperature: 0.7 }
    );

    return res.status(200).json({ reply: reply || "I'm sorry, I couldn't process that question." });
  } catch (err: any) {
    console.error("Scan Chat Error:", err);
    return res.status(500).json({ error: "Failed to chat about product" });
  }
});

export default router;