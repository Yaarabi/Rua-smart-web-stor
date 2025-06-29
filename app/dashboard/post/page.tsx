
"use client"
import { useEffect, useState } from "react"
import ForPrompt from "@/components/forPrompt"


const Page = () => {

    const [IA, setIA] = useState(true)
    const [loading, setLoading] = useState(false)
    const [ about, setAbout ] = useState("")

    useEffect(()=>{
        console.log(loading)
    },[loading])

    const promptComming = () => {
        setLoading(true)
        setIA(false)
    }

    return (
        <>
        {IA && <ForPrompt for={"post"} about={about} action1={()=> setIA(false)} action2={promptComming} action3={(x)=> setAbout(x)}/> }
        </>
    )
}

export default Page
