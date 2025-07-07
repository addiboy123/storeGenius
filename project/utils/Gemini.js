import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyCR6x7LF-SZtlsG8K2oPqjFZk0gwcBhqYc" // ideally use env var
});

async function fetchEnvironmentalData(productName) {
  const prompt = `
You are an environmental data assistant. Provide estimated environmental impact for the product "${productName}" in the following JSON format:

{
  "carbon_footprint": number (in kg CO2e),
  "water_usage": number (in liters),
  "land_usage": number (in m2)
}
IMPORTANT
Only respond with valid JSON. Do not include explanations, headings, or markdown.
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }]
    });

    // `response.text` is a function
    let text =response.text;
    console.log("Raw Gemini Output:", text);

    // Clean markdown if any (```)
    text = text.trim().replace(/^```json\s*|```$/g, "");

    const data = JSON.parse(text);
    return data;
  } catch (err) {
    console.error("Failed to fetch or parse environmental data:", err);
    return null;
  }
}

