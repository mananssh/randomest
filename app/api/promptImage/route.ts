import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(req: Request) {
    try {
        const { userPrompt } = await req.json();

        const contents = `Generate a distinct, high-resolution digital art interpretation of the concept "${userPrompt || "Any random topic you want. Be creative."}". Each image must be a unique, visually coherent masterpiece with cinematic lighting, an imaginative and absurd composition, vibrant and harmonious colors, ultra-realistic detail, and 8K resolution, avoiding any blurriness, grain, text, watermarks, distorted anatomy, or ugly deformities to ensure three separate, gallery-quality artworks suitable for a professional website.`;

        // Call Cloudflare AI endpoint
        const response = await fetch(
            `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/black-forest-labs/flux-1-schnell`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.CLOUDFLARE_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    prompt: contents,
                }),
            }
        );

        if (!response.ok) {
            const errText = await response.text();
            console.error("Cloudflare error:", errText);
            return NextResponse.json(
                { error: "Cloudflare API failed", details: errText },
                { status: 500 }
            );
        }

        // Get image binary
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Save image to /public/myimage.png
        const filePath = path.join(process.cwd(), "public", "myimage.png");
        await fs.writeFile(filePath, buffer);

        return NextResponse.json({
            success: true,
            path: "/myimage.png",
        });
    } catch (err: any) {
        console.error(err);
        return NextResponse.json(
            { error: "Failed to generate image" },
            { status: 500 }
        );
    }
}
