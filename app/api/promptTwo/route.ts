import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY!, // safe on server
});

export async function POST(req: Request) {
    try {
        const { userPrompt } = await req.json();

        const contents = `
Role: You are an expert front-end developer.
Your task is to generate a **complete production-quality website page** using ONLY HTML5 and CSS3 (no JavaScript, no React, no external libraries).
The site must be fully responsive, mobile-first, modern, and indistinguishable from a React/Tailwind website.

Instructions:
1. Base the theme on: "${userPrompt || "Any random topic you want. Be creative."}".
2. Use semantic HTML structure (<header>, <main>, <section>, <footer>, etc.).
3. Write responsive CSS (mobile-first with media queries -> MAKE SURE THE COLOR THEME IS DIFFERENT EVERY TIME, LIGHT DARK KEEP SWITCHING).
4. Use a high-quality, creative, and unexpected color palette (with exact hex codes in comments).
5. Include animations, hover effects, and transitions to make the page dynamic without JS.
6. The output must be **a single string of valid HTML** with <style> included in the <head>.

Output Format (IMPORTANT):
Return ONLY the final HTML+CSS code, nothing else.
`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents,
        });

        const text = response.text || "";

        return NextResponse.json({ text });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: "Failed to generate site" },
            { status: 500 }
        );
    }
}
