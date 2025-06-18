
import { OpenAI } from "openai";
import dotenv from "dotenv"

dotenv.config()


const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.API_KEY,
});

const generatePromots = async (prompt: string) => {

    const respense = await openai.chat.completions.create({

        model: "deepseek/deepseek-r1-0528",
        messages: [
        {
            "role": "user",
            "content": prompt,
    }
    ],
        max_tokens: 3001,


    })

    return respense.choices[0].message.content?.trim()

}

export default generatePromots








