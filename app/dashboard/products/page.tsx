
import generatePromots from "@/app/utils/openai"

const Test = async () => {

    const prompt: string = "Give me a product title and a short, engaging description for a smart watch I'm launching. Format the result like this: title: [text], description: [text]. Make sure it follows digital marketing best practices (clear benefit, emotional hook, SEO-friendly). Keep it concise, no extra text."
    const respense = await generatePromots(prompt)
    return (
        <div>
        { respense }
        </div>
)
}

export default Test
