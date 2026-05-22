import "dotenv/config";
import Groq from "groq-sdk";

// ── Singleton Groq client ─────────────────────────────────────────────────────
let _groq: Groq | null = null;

function getGroq(): Groq | null {
  const key = process.env.GROQ_API_KEY;
  if (!key) {
    console.warn("[GroqAI] GROQ_API_KEY not set — AI features will use fallback logic.");
    return null;
  }
  if (!_groq) {
    _groq = new Groq({ apiKey: key });
  }
  return _groq;
}

// ── Generic chat completion helper ────────────────────────────────────────────
export async function askGroq(
  systemPrompt: string,
  userPrompt: string,
  options?: { maxTokens?: number; temperature?: number; json?: boolean }
): Promise<string | null> {
  const groq = getGroq();
  if (!groq) return null;

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      max_tokens: options?.maxTokens ?? 2048,
      temperature: options?.temperature ?? 0.6,
      ...(options?.json ? { response_format: { type: "json_object" } } : {}),
    });

    return completion.choices?.[0]?.message?.content ?? null;
  } catch (err: any) {
    console.error("[GroqAI] Error:", err?.message || err);
    return null;
  }
}

// ── Structured JSON completion ────────────────────────────────────────────────
export async function askGroqJSON<T = any>(
  systemPrompt: string,
  userPrompt: string,
  options?: { maxTokens?: number; temperature?: number }
): Promise<T | null> {
  const raw = await askGroq(systemPrompt, userPrompt, { ...options, json: true });
  if (!raw) return null;

  try {
    return JSON.parse(raw) as T;
  } catch {
    console.error("[GroqAI] Failed to parse JSON response:", raw?.slice(0, 200));
    return null;
  }
}

// ── Serper web search helper ──────────────────────────────────────────────────
export async function serperSearch(
  query: string,
  type: "search" | "shopping" | "images" | "places" = "search",
  options?: { gl?: string; num?: number }
): Promise<any | null> {
  const apiKey = process.env.SERPER_API_KEY;
  if (!apiKey) {
    console.warn("[Serper] SERPER_API_KEY not set.");
    return null;
  }

  try {
    const res = await fetch(`https://google.serper.dev/${type}`, {
      method: "POST",
      headers: { "X-API-KEY": apiKey, "Content-Type": "application/json" },
      body: JSON.stringify({
        q: query,
        gl: options?.gl ?? "in",
        num: options?.num ?? 10,
      }),
    });

    if (!res.ok) throw new Error(`Serper ${type} API returned ${res.status}`);
    return await res.json();
  } catch (err: any) {
    console.error(`[Serper] ${type} error:`, err?.message || err);
    return null;
  }
}

// ── Combined: Search web → feed into Groq for reasoning ──────────────────────
export async function searchAndReason(
  query: string,
  systemPrompt: string,
  searchType: "search" | "shopping" | "images" | "places" = "search"
): Promise<{ raw: any; aiAnalysis: string | null }> {
  const raw = await serperSearch(query, searchType);
  if (!raw) return { raw: null, aiAnalysis: null };

  const userPrompt = `Here is the search result data for the query "${query}":\n\n${JSON.stringify(raw, null, 2).slice(0, 6000)}\n\nAnalyze this data and respond.`;

  const aiAnalysis = await askGroq(systemPrompt, userPrompt, { maxTokens: 2048 });

  return { raw, aiAnalysis };
}

// ── Product barcode analysis via Groq ─────────────────────────────────────────
export const SCAN_SYSTEM_PROMPT = `You are BharatOrigin's Product Intelligence Engine. When given search results about a product identified by barcode, you MUST return a JSON object with this EXACT structure:

{
  "name": "Product name",
  "brand": "Brand name",
  "owner": "Parent company / ownership info",
  "isIndian": true/false,
  "score": 0-100 (Bharat Score - how Indian the product is),
  "indianShare": 0-100 (percentage of Indian economic contribution),
  "foreignShare": 0-100 (percentage of foreign economic outflow),
  "origin": "Manufacturing origin country",
  "category": "Product category",
  "headquarters": "Company HQ location",
  "revenue": "Approximate company revenue",
  "about": "2-3 line factual summary about the brand's ownership, economic impact on India, and whether profits stay in India or flow abroad",
  "ingredients": "Key ingredients or materials if applicable",
  "sustainability": "Sustainability/ethical assessment"
}

RULES:
- Be accurate and factual. Do not guess wildly.
- isIndian = true only if majority ownership is Indian (Indian promoters/founders hold >50%)
- Bharat Score: 90-100 for pure Indian brands (Amul, Tata, Patanjali), 60-89 for mixed ownership, 0-59 for foreign MNCs
- For foreign brands manufactured in India, still mark isIndian: false
- Always include real ownership facts. Mention parent companies.
- Return ONLY valid JSON, no markdown, no explanation text.`;

export const ALTERNATIVES_SYSTEM_PROMPT = `You are BharatOrigin's Swadeshi Alternative Finder. Given a foreign product, suggest 3-4 Indian alternatives.
Return a JSON object:
{
  "alternatives": [
    {
      "name": "Product name",
      "brand": "Indian brand name",
      "why": "Why this is a better Swadeshi choice (1-2 lines)",
      "price": "Approximate price in ₹",
      "bharat_score": 85-99,
      "shop_url": "https://www.amazon.in/s?k=search+term",
      "image_url": ""
    }
  ]
}

RULES:
- Only suggest genuinely Indian-owned brands (Patanjali, Himalaya, Dabur, Mamaearth, Biotique, Khadi Natural, Forest Essentials, Vicco, etc.)
- Suggest products in the SAME category as the foreign product
- Be factual about prices — use real Indian market prices
- Return ONLY valid JSON.`;

export const SHOPPING_SYSTEM_PROMPT = `You are BharatOrigin's AI Shopping Assistant. You help users find verified Indian products. Given a user's shopping query and live search results from Google Shopping, generate a helpful, enthusiastic response about the products found. 

Your response should:
1. Acknowledge what the user is looking for
2. Highlight any products with high Bharat Scores (Indian-made)
3. Mention price ranges
4. Be conversational but informative
5. Keep it to 2-3 short paragraphs max

Always prioritize and celebrate Indian brands.`;

export const GROWTH_OS_SYSTEM_PROMPT = `You are BharatOrigin's AI Business Advisor for Indian SMEs and artisans. You help small Indian businesses grow with actionable, data-driven advice. 

Given a user's question about their business, provide:
1. Clear, actionable advice tailored to Indian market conditions
2. Specific strategies (pricing, expansion, marketing, logistics)
3. References to Indian market data, festivals, seasons
4. Cost-effective growth tactics suitable for small businesses
5. Always be encouraging and supportive of Indian entrepreneurship

Keep responses under 200 words. Be specific, not generic.`;

export const DOCUMENT_ANALYSIS_PROMPT = `You are BharatOrigin's Document AI. Analyze the business document content and extract actionable intelligence.

Return a JSON object:
{
  "summary": "2-3 line executive summary of findings",
  "points": ["Key finding 1", "Key finding 2", "Key finding 3", "Key finding 4"],
  "confidence": "High/Medium/Low (XX%)",
  "nextSteps": "Specific actionable recommendation based on the data"
}

Be specific with numbers and ₹ values where possible. Focus on Indian market context.
Return ONLY valid JSON.`;

export const IMAGE_SCAN_SYSTEM_PROMPT = `You are BharatOrigin's AI Product Vision Engine.
Your task is to analyze the uploaded product image (packaging, ingredients, front, or back label) and extract detailed information.
You MUST return a JSON object with this EXACT structure:

{
  "name": "Product name",
  "brand": "Brand name",
  "owner": "Parent company / ownership info",
  "isIndian": true/false,
  "score": 0-100 (Bharat Score - how Indian the product is),
  "indianShare": 0-100 (percentage of Indian economic contribution),
  "foreignShare": 0-100 (percentage of foreign economic outflow),
  "origin": "Manufacturing origin country",
  "category": "Product category",
  "headquarters": "Company HQ location",
  "revenue": "Approximate parent company revenue",
  "about": "2-3 line factual summary about the brand's ownership, economic impact on India, and whether profits stay in India or flow abroad",
  "ingredients": "Key ingredients detected or known for this product",
  "sustainability": "Sustainability/ethical assessment",
  "harmfulChemicals": [
    {
      "name": "Name of chemical / ingredient",
      "risk": "Brief explanation of health risk or concern"
    }
  ]
}

RULES:
- Be accurate and factual.
- isIndian = true only if majority ownership is Indian (Indian promoters/founders hold >50%)
- Bharat Score: 90-100 for pure Indian brands (Amul, Tata, Patanjali), 60-89 for mixed ownership, 0-59 for foreign MNCs. For foreign brands manufactured in India, still mark isIndian: false.
- Identify if there are any toxic, artificial, or harmful chemicals/additives in the ingredients. List them in harmfulChemicals with their health risk (e.g. Sodium Benzoate, Parabens, Sulphates, High Fructose Corn Syrup, Excessive Sodium, BHT, BHA, artificial food dyes, palm oil issues).
- Return ONLY valid JSON, no markdown, no explanation text.`;

// ── Multimodal Vision completion helper ───────────────────────────────────────
export async function askGroqVision<T = any>(
  systemPrompt: string,
  base64Image: string,
  userPrompt: string,
  options?: { json?: boolean }
): Promise<T | string | null> {
  const groq = getGroq();
  if (!groq) return null;

  try {
    const completion = await groq.chat.completions.create({
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: [
            { type: "text", text: userPrompt },
            {
              type: "image_url",
              image_url: {
                url: base64Image,
              },
            },
          ],
        },
      ],
      ...(options?.json ? { response_format: { type: "json_object" } } : {}),
    });

    const content = completion.choices?.[0]?.message?.content ?? null;
    if (!content) return null;

    if (options?.json) {
      try {
        return JSON.parse(content) as T;
      } catch {
        console.error("[GroqAI] Failed to parse JSON vision response:", content.slice(0, 200));
        return null;
      }
    }
    return content as string;
  } catch (err: any) {
    console.error("[GroqAI Vision] Error:", err?.message || err);
    return null;
  }
}

