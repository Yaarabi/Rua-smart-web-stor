import { NextResponse } from "next/server";
import generatePrompts from "@/app/utils/openai";

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();

        if (!prompt) {
        return NextResponse.json({ result: null, error: "Prompt is missing" }, { status: 400 });
        }

        const result = await generatePrompts(prompt);

        if (!result) {
        console.error("generatePromots returned null or undefined");
        return NextResponse.json({ result: null, error: "AI generation failed" }, { status: 500 });
        }

        return NextResponse.json({ result });
    } catch (error) {
        console.error("API /generate crashed:", error);
        return NextResponse.json({ result: null, error: "Server Error" }, { status: 500 });
    }
}
