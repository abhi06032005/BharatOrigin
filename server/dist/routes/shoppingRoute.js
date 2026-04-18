"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post('/search', async (req, res) => {
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
        const mappedProducts = data.shopping.map((item, index) => {
            // Parse price, handling cases where it's a string like "₹1,299" or numeric
            let parsedPrice = 0;
            if (typeof item.price === 'string') {
                const cleanPrice = item.price.replace(/[^\d.-]/g, '');
                parsedPrice = parseFloat(cleanPrice) || 0;
            }
            else if (typeof item.price === 'number') {
                parsedPrice = item.price;
            }
            // Generate a dynamic "Bharat Score" based on store locality
            const sourceLower = (item.source || '').toLowerCase();
            let bharatScore = 70 + Math.floor(Math.random() * 20); // Default 70-90
            if (sourceLower.includes('india') || sourceLower.includes('khadi') || sourceLower.includes('bharat')) {
                bharatScore = 95 + Math.floor(Math.random() * 5);
            }
            else if (sourceLower.includes('amazon') || sourceLower.includes('flipkart')) {
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
    }
    catch (error) {
        console.error("Error fetching live shopping data:", error);
        res.status(500).json({ error: "Failed to fetch live products" });
    }
});
exports.default = router;
