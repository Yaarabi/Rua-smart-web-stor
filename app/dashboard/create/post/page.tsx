

"use client"
import {  useState } from "react"
import ForPrompt from "@/components/forPrompt"
import AddPost from "@/components/dashboard/addPost"
import Option from "@/components/dashboard/postOption"
import { useRouter } from "next/navigation"


const Page = () => {

    

    const [IA, setIA] = useState(true)
    const [option, setOption] = useState(false)
    const [post, setPost] = useState(false)
    const [ about, setAbout ] = useState("")




    const promptComming = () => {
        setPost(true);
        setIA(false)
    }

    const redy = () => {

        setPost(false);
        setOption(true)

    }

    const prompt = `You are a professional content writer specializing in technology and electronic products.
    
                Your task:
                Write a high-converting, SEO-optimized product post based on the following product information: ${about}.
    
                The post must:
                - Start with a catchy introduction that quickly captures attention and highlights the product's key benefit.
                - Clearly explain the main features and advantages in simple, persuasive, and engaging language.
                - Use a friendly, modern, and professional tone.
                - Include at least one practical digital marketing recommendation such as: social media ads, SEO optimization, email marketing, or influencer collaborations.
                - End with a strong, persuasive call to action that invites the reader to explore the product at this link: www.rua.com.
    
                Additional guidelines:
                - Use short, punchy sentences and easy-to-read formatting.
                - Add relevant emojis to make the post visually appealing.
                - Write around 200-300 words.
                - Avoid using bold formatting (no asterisks **) or like that 🌈.
    
                The goal is to create an engaging post that attracts attention, builds interest, and drives traffic to www.rua.com.`;
    
    const router = useRouter();

    return (
        <>
        
        {IA && <ForPrompt for={"post"} about={about} action1={()=>{router.back()}} action2={promptComming} action3={(x)=> setAbout(x)}/> }
        { post && <AddPost prompt={prompt} action2={redy}  action={() => {setPost(false); setAbout(""); setIA(true)}} /> }
        {option && <Option image="" action={()=> setOption(false)}/>  }
        </>
    )
}

export default Page
