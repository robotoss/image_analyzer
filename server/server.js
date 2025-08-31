import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import pkg from "pg";
const { Pool } = pkg;

const app = express();
app.use(bodyParser.json({ limit: "20mb" }));

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "myuser",
  password: process.env.DB_PASSWORD || "mypassword",
  database: process.env.DB_NAME || "mydb",
  port: 5432,
});

const initDB = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS sessions (
      id SERIAL PRIMARY KEY,
      session_id TEXT,
      game_alias TEXT,
      image TEXT,
      country_code TEXT,
      ip TEXT,
      mode TEXT,
      brand_domain TEXT,
      device TEXT,
      os TEXT,
      result TEXT,
      reason TEXT,
      model TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);
  console.log("✅ Table sessions is ready");
};

initDB().catch(console.error);

const OLLAMA_HOST =
  process.env.OLLAMA_HOST || "http://ollama:11434";

app.post("/analyze", async (req, res) => {
  try {
    const {
      gameAlias,
      image,
      countryCode,
      ip,
      mode,
      brandDomain,
      device,
      os,
      model,
    } = req.body;

    const sessionId = req.headers["session-id"] || null;

    const prompt = `"You are an AI system that analyzes a screenshot of an online casino game launch. 
    Your task is to determine the game launch status based only on the visual content of the screenshot. 
    Respond strictly in the following JSON format and nothing else: 
    { \"result\": \"true | false | undefined\", \"reason\": \"very short explanation of why this result was chosen\" }. 
     Rules: 
     - Do not use Markdown, code blocks, or extra text. 
     - Return only raw JSON. 
     - \"true\" if the game launched successfully (the game screen is clearly visible and playable). 
     - \"false\" if the game failed to launch (an error message, blank screen, loader or obvious malfunction is visible). 
     - \"undefined\" if you cannot determine the status from the screenshot. 
     - The explanation must be very short, maximum 10 words."`;

    const ollamaRes = await fetch(`${OLLAMA_HOST}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: model || "llava",
        prompt: prompt,
        images: [image],
        stream: false,
      }),
    });

    const text = await ollamaRes.text();
    let parsed;
    try {
      const ollamaData = JSON.parse(text);

      // Чистим Markdown-обертку и пробелы
      let clean = ollamaData.response
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

      parsed = JSON.parse(clean);
    } catch (err) {
      console.error("❌ Invalid JSON from Ollama:", text);
      return res.status(500).json({ error: "Invalid response from Ollama" });
    }

    const { result, reason } = parsed;

    console.log(
      `📊 Analysis result: ${result}, reason: ${reason}, model: ${
        model || "llava"
      }`
    );

    await pool.query(
      `INSERT INTO sessions
      (session_id, game_alias, image, country_code, ip, mode, brand_domain, device, os, result, reason, model)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
      [
        sessionId,
        gameAlias,
        image,
        countryCode,
        ip,
        mode,
        brandDomain,
        device,
        os,
        result,
        reason,
        model || "llava",
      ]
    );

    res.json({
      success: true,
      sessionId,
      gameAlias,
      result,
      reason,
      model: model || "llava",
    });
  } catch (err) {
    console.error("❌ Server error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = 3002;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));