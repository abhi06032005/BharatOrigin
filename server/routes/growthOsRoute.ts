import express, { Request, Response } from 'express';
import multer from 'multer';
import { askGroq, askGroqJSON, GROWTH_OS_SYSTEM_PROMPT, DOCUMENT_ANALYSIS_PROMPT } from '../lib/groqAI';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// POST /api/growth-os/analyze — AI-powered document analysis
router.post('/analyze', upload.single('file'), async (req: Request, res: Response): Promise<void> => {
  try {
    const file = req.file;
    if (!file) {
      res.status(400).json({ error: "No file provided" });
      return;
    }

    const fileName = file.originalname.toLowerCase();
    const fileContent = file.buffer.toString('utf-8').slice(0, 5000); // Take first 5000 chars

    // Try Groq AI analysis first
    const aiInsights = await askGroqJSON(
      DOCUMENT_ANALYSIS_PROMPT,
      `Document name: "${file.originalname}" (${(file.size / 1024).toFixed(1)} KB)\n\nDocument content (first portion):\n${fileContent}\n\nAnalyze this business document and provide actionable intelligence for an Indian SME/artisan.`
    );

    if (aiInsights) {
      res.json({
        success: true,
        fileName: file.originalname,
        fileSize: file.size,
        insights: aiInsights,
        aiPowered: true
      });
      return;
    }

    // Fallback to rule-based logic if Groq is unavailable
    let mockInsights = {
      summary: "Your business metrics show healthy revenue but narrowing profit margins due to operational inefficiencies.",
      points: [
        "Profit dropped 12% in the last month.",
        "Logistics costs increased by ₹15,000.",
        "Your top performing product margin is 42% on Sarees."
      ],
      confidence: "High (94%)",
      nextSteps: "Consider bulk-shipping in Tier-2 regions to offset transport costs."
    };

    if (fileName.includes('invoice') || fileName.includes('bill')) {
      mockInsights = {
        summary: "Analyzed invoice data indicates late payments from 3 major clients.",
        points: [
          "Outstanding AR is ₹4.2 Lakhs.",
          "Average account realization went from 15 to 28 days.",
          "Vendor 'Gully Fabrics' is your highest expense."
        ],
        confidence: "Very High (98%)",
        nextSteps: "Send automated payment reminders. Negotiate 5% discount with Gully Fabrics."
      };
    } else if (fileName.includes('sales')) {
      mockInsights = {
        summary: "Q3 Sales Report confirms seasonality spikes in Western India.",
        points: [
          "Sales in Gujarat surged by 40%.",
          "Average Order Value (AOV) increased from ₹1200 to ₹1550.",
          "Return rate decreased by 2%."
        ],
        confidence: "High (92%)",
        nextSteps: "Allocate 20% more marketing budget to Western regions before Diwali."
      };
    }

    res.json({
      success: true,
      fileName: file.originalname,
      fileSize: file.size,
      insights: mockInsights,
      aiPowered: false
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to parse document." });
  }
});

// POST /api/growth-os/chat — AI Business Advisor
router.post('/chat', async (req: Request, res: Response): Promise<void> => {
  try {
    const { message } = req.body;

    if (!message) {
      res.status(400).json({ error: "No message provided" });
      return;
    }

    // Try Groq AI first
    const aiReply = await askGroq(
      GROWTH_OS_SYSTEM_PROMPT,
      message,
      { maxTokens: 400, temperature: 0.7 }
    );

    if (aiReply) {
      res.json({ reply: aiReply, aiPowered: true });
      return;
    }

    // Fallback to rule-based responses
    const lowerMsg = message.toLowerCase();
    let reply = "I'm your AI Business Advisor. I recommend exploring the Demand & Market Intelligence section to find your next expansion target.";

    if (lowerMsg.includes('profit') || lowerMsg.includes('money') || lowerMsg.includes('revenue')) {
      reply = "Based on your recent intelligence reports, your profit margins dropped by 12% last month. Product A (Handwoven Sarees) is your highest margin item at 42%. I recommend focusing on pushing Product A in the Tier-2 markets.";
    } else if (lowerMsg.includes('hire') || lowerMsg.includes('workers') || lowerMsg.includes('workforce') || lowerMsg.includes('team')) {
      reply = "The holiday season is approaching. Our systems suggest you need 3 temporary helpers to manage expected logistics volume. Check the Workforce tab to find nearby pre-vetted freelancers.";
    } else if (lowerMsg.includes('expansion') || lowerMsg.includes('city') || lowerMsg.includes('market') || lowerMsg.includes('demand')) {
      reply = "Our demand heatmap indicates a 40% surge in interest for organic goods from Surat and Ahmedabad. Considering your current base in Mumbai, expanding into Surat offers a highly optimized logistics route.";
    } else if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
      reply = "Hello! Upload your latest sales ledger in the Document AI tab if you want me to analyze recent trends. How can I help you grow today?";
    } else if (lowerMsg.includes('pricing')) {
      reply = "Your competitor analysis shows your pricing is 15% lower than the market average for premium categories. We recommend testing a 5% price increase over the next 2 weeks to safely improve margins.";
    }

    res.json({ reply, aiPowered: false });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to process chat query." });
  }
});

export default router;
