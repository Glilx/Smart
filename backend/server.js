import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/api/analyze", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Missing message" });

    const prompt = `
أنت مساعد ذكي لتحليل نية المستخدم في خدمات حكومية.
أعد بصيغة:
نية: ...
خدمة: ...
رسالة: "${message}"
`;

    const response = await client.chat.completions.create({
      model: "gpt-4.1",
      messages: [
        { role: "system", content: "أنت مساعد ذكي لتحليل النية." },
        { role: "user", content: prompt }
      ],
      temperature: 0.3,
      max_tokens: 200
    });

    const text = response.choices[0].message.content;
    res.json({ result: text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
