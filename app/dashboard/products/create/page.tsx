
"use client"

import AddProductForm from "@/components/addProduct"
import ForPrompt, { Context } from "@/components/forPrompt"
import Option from "@/components/option"
import LaunchTips from "@/components/Tips"
import { useContext, useState } from "react"



const Page = () => {

    const [manualy, setManualy] = useState(false)
    const [IA, setIA] = useState(false)
    const form = useContext(Context)

    const handelManualy = () => {
        setManualy(true)
        setIA(false)
    }
    const handelByIA = () => {
        setIA(true)
        setManualy(false)
    }
    const promptComming = () => {
        setManualy(true)
        setIA(false)
    }

    return (
        <>
        { !manualy && !IA && <Option forWhat={"product"} action1={handelManualy} action2={handelByIA} />}
        { !manualy && !IA && <LaunchTips/> }
        { manualy && <AddProductForm prompt = {form} action={() => setManualy(false)}/> }
        {IA && <ForPrompt action1={()=> setIA(false)} action2={promptComming}/> }
        </>
    )
    }

    export default Page
