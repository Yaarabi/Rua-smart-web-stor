
"use client"

import AddProductForm from "@/components/addProduct"
import ForPrompt from "@/components/forPrompt"
import Option from "@/components/option"
import LaunchTips from "@/components/Tips"
import { useState } from "react"



const Page = () => {

    const [manualy, setManualy] = useState(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [IA, setIA] = useState(false)
    const [ about, setAbout ] = useState("")


    const handelManualy = () => {
        setLoading(false)
        setManualy(true)
        setIA(false)
    }
    const handelByIA = () => {
        setIA(true)
        setManualy(false)
    }
    const promptComming = () => {
        setLoading(true)
        setManualy(true)
        setIA(false)
    }

    return (
        <>
        { !manualy && !IA && <Option forWhat={"product"} action1={handelManualy} action2={handelByIA} />}
        { !manualy && !IA && <LaunchTips/> }
        { manualy && <AddProductForm forPrompt={about} forLoading={loading}  action={() => {setManualy(false); setAbout("")}} /> }
        {IA && <ForPrompt about={about} action1={()=> setIA(false)} action2={promptComming} action3={(x)=> setAbout(x)}/> }
        </>
    )
    }

    export default Page
