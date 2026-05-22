import "dotenv/config";
import Groq from "groq-sdk";

async function listModels() {
  const key = process.env.GROQ_API_KEY;
  if (!key) {
    console.error("GROQ_API_KEY not set");
    return;
  }
  const groq = new Groq({ apiKey: key });
  try {
    const list = await groq.models.list();
    console.log("Available models:");
    for (const m of list.data) {
      console.log(`- ${m.id} (owned by: ${m.owned_by})`);
    }
  } catch (err) {
    console.error("Error listing models:", err);
  }
}

listModels();
