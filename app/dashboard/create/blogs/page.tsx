

"use client"
import {  useState } from "react"
import ForPrompt from "@/components/forPrompt"
import AddBlog from "@/components/dashboard/addBlog"


const Page = () => {

    

    const [IA, setIA] = useState(true)
    const [post, setPost] = useState(false)
    const [ about, setAbout ] = useState("")

    


    const promptComming = () => {
        setPost(true);
        setIA(false)
    }



    const promptTitle = `You are a professional blog writer specializing in technology and electronic products.

        Write an engaging, SEO-friendly blog post title that clearly summarizes a recommendation for the following product: ${about}.

        The title should be:
        - Concise and catchy
        - Highlight the main benefit or unique selling point of the product
        - Optimized for search engines
        - Inviting for readers interested in technology and electronics
        - No more than 10 words
        `;

    const promptContent = `You are a professional blog writer specializing in technology and electronic products.

        Write only the SEO-optimized, highly engaging blog content based on the following product information: ${about}.

        Important: Do not write a title. Only write the blog body.

        The blog must:
        - Start with a captivating introduction that highlights why this product is worth considering.
        - Provide a detailed, clear explanation of the product’s key features, benefits, and what makes it stand out in the market.
        - Briefly compare to similar products or alternatives, explaining why this product is a recommended choice.
        - Include digital marketing strategies to promote the product effectively, such as social media campaigns, influencer partnerships, or content marketing tips.
        - End with a strong, persuasive call to action inviting readers to discover more or purchase at www.rua.com.

        Additional guidelines:
        - Use a friendly, modern, and professional tone.
        - Use short, punchy sentences and clear formatting.
        - Add relevant emojis to make the blog visually engaging.
        - The blog length should be around 400-500 words.
        - Do not use bold formatting (no asterisks **).
        - and again do not use this **.

        The goal is to create a blog that feels helpful, trustworthy, and informative while naturally encouraging the reader to take action and visit www.rua.com.
        `;


    return (
        <>
        
        {IA && <ForPrompt for={"Blog"} about={about} action1={()=>{ setIA(false); setPost(true)} } action2={promptComming} action3={(x)=> setAbout(x)}/> }
        { post && <AddBlog promptTitle={promptTitle} promptContent={promptContent}  action={() => {setPost(false); setAbout("");}} /> }
        </>
    )
}

export default Page
