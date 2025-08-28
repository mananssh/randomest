import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY!, // safe on server
});

export async function GET() {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Generate a concise premise for a single, static, and absurd website. The premise must be a creative, unexpected, and highly specific concept that can be expressed through text, layout, and interactive elements without relying on any images. It should include:
1.  **Website Name:** A catchy, ridiculous name.
2.  **Tagline:** A short, humorous description.
3.  **Core Absurd Concept:** The central, funny idea (e.g., "A subscription service for clouds," "A search engine for smells," "A dating app for sentient houseplants").
4.  **Key Sections/Features:** 3-4 specific, text-based features or pages that logically extend from the concept (e.g., "Testimonial Generator," "FAQ from the future," "Live Counter of Imaginary Metrics," "A button that does something pointless but delightful").
Output must be in valid JSON format with the following structure, containing no other text or explanations:

{
  "name": "Website Name",
  "tagline": "A short funny tagline",
  "concept": "A paragraph describing the core absurd premise",
  "features": ["Feature 1", "Feature 2", "Feature 3"]
}
hi manan
`,
    });

    return NextResponse.json({ text: response.text });
}
