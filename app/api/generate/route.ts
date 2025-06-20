
import { OpenAI } from "openai";

const openai = new OpenAI({
    apiKey: process.env.API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
});

export async function POST(req: Request) {
    const { prompt } = await req.json();

    const response = await openai.chat.completions.create({
        model: "deepseek/deepseek-r1-0528",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 3000,
    });

    return Response.json({ result: response.choices[0].message.content?.trim() });
}
