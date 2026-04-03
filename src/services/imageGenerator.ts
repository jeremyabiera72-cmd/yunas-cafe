import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function generateCafeImages() {
  const heroPrompt = "A cozy, modern, and aesthetic coffee shop interior with warm lighting, wooden furniture, and a welcoming atmosphere. High resolution, professional photography.";
  const coffeePrompt = "A high-quality close-up of a beautifully crafted latte with latte art in a ceramic cup, sitting on a rustic wooden table in a cafe. Soft morning light.";

  const heroResponse = await ai.models.generateContent({
    model: "gemini-2.5-flash-image",
    contents: [{ parts: [{ text: heroPrompt }] }],
    config: { imageConfig: { aspectRatio: "16:9" } }
  });

  const coffeeResponse = await ai.models.generateContent({
    model: "gemini-2.5-flash-image",
    contents: [{ parts: [{ text: coffeePrompt }] }],
    config: { imageConfig: { aspectRatio: "1:1" } }
  });

  let heroUrl = "";
  let coffeeUrl = "";

  for (const part of heroResponse.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      heroUrl = `data:image/png;base64,${part.inlineData.data}`;
    }
  }

  for (const part of coffeeResponse.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      coffeeUrl = `data:image/png;base64,${part.inlineData.data}`;
    }
  }

  return { heroUrl, coffeeUrl };
}
