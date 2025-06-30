

"use client"
import {  useState } from "react"
import ForPrompt from "@/components/forPrompt"
import AddPost from "@/components/dashboard/addPost"


const Page = () => {

    

    const [IA, setIA] = useState(true)
    const [post, setPost] = useState(false)
    const [ about, setAbout ] = useState("")



    const promptComming = () => {
        setPost(true);
        setIA(false)
    }

    const redy = () => {
        // include here Post request for of blog creation
        setPost(false);

    }

    const prompt = `You are a professional blog writer specializing in technology and electronic products.

Your task:
Write an SEO-optimized, highly engaging **recommendation blog post** based on the following product information: ${about}.

The blog must:
- Start with a captivating introduction that highlights why this product is worth considering.
- Provide a detailed, clear explanation of the product’s key features, benefits, and what makes it stand out in the market.
- Compare briefly to similar products or alternatives, and explain why this product is a recommended choice.
- Include one or more digital marketing strategies that could help promote this product effectively, such as social media campaigns, influencer partnerships, or content marketing tips.
- End with a strong, persuasive call to action that invites readers to discover more about the product or purchase it at this link: www.rua.com.

Additional guidelines:
- Use a friendly, modern, and professional tone.
- Use short, punchy sentences and clear formatting.
- Add relevant emojis to make the blog visually engaging.
- The blog length should be around 400-500 words.
- Do not use bold formatting (no asterisks **).

The goal is to create a blog that feels helpful, trustworthy, and informative while naturally encouraging the reader to take action and visit www.rua.com.`;

    

    return (
        <>
        
        {IA && <ForPrompt for={"post"} about={about} action1={()=>{ setIA(false); setPost(true)} } action2={promptComming} action3={(x)=> setAbout(x)}/> }
        { post && <AddPost prompt={prompt} action2={redy}  action={() => {setPost(false); setAbout("");}} /> }
        </>
    )
}

export default Page
