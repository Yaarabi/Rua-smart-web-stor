


"use client"
import {  useState } from "react"
import ForPrompt from "@/components/forPrompt"
import AddPost from "@/components/dashboard/addPost"
import { AdOption } from "@/components/dashboard/postOption"


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

const prompt = `You are a professional ad copywriter specializing in technology and electronic products.

Your task:
Write a short, high-impact advertisement based on the following product information: ${about}.

The ad must:
- Start with a bold, attention-grabbing hook or question.
- Clearly highlight the key benefit or unique selling point of the product in simple, persuasive language.
- Use an energetic, engaging, and direct tone that instantly connects with the target audience.
- Include a call to action that encourages immediate clicks, purchases, or further exploration at this link: www.rua.com.

Additional guidelines:
- Keep the ad between 50 to 100 words.
- Add 2-4 relevant emojis to make the ad visually appealing.
- Avoid using bold formatting (no asterisks **).
- The ad should feel modern, conversational, and action-driven.

The goal is to create a scroll-stopping ad that quickly captures attention and drives traffic to www.rua.com.`;

    

    return (
        <>
        
        {IA && <ForPrompt for={"post"} about={about} action1={()=>{ setIA(false); setPost(true)} } action2={promptComming} action3={(x)=> setAbout(x)}/> }
        { post && <AddPost prompt={prompt} action2={redy}  action={() => {setPost(false); setAbout("");}} /> }
        {option && <AdOption image="" action={()=> setOption(false)}/>  }
        </>
    )
}

export default Page
