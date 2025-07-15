
import { OpenAI } from "openai";
import dotenv from "dotenv"

dotenv.config()


const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENAI_API_KEY,
});

const generatePrompts = async (prompt: string) => {

try {
    const response = await openai.chat.completions.create({
        model: "mistralai/mistral-small-3.2-24b-instruct:free",
        // tngtech/deepseek-r1t2-chimera:free
        // "mistralai/mistral-7b-instruct"
        // mistralai/mistral-small-3.2-24b-instruct:free
        messages: [{ role: "user", content: prompt }],
        max_tokens: 1000,
    });

    console.log("OpenRouter raw response:", JSON.stringify(response, null, 2));

    const content = response.choices?.[0]?.message?.content?.trim();
    return content || null;

}catch (error) {
    console.error("generatePromots error:", error);
    return null;
}

}

export default generatePrompts








