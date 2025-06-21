
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
    const [ form, setForm ] = useState({
        title: "",
        about: ""
    })


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
        { manualy && <AddProductForm forPrompt={form} forLoading={loading}  action={() => {setManualy(false); setForm({ title: "", about:"" })}} /> }
        {IA && <ForPrompt form={form} action1={()=> setIA(false)} action2={promptComming} action3={(x)=> setForm(x)}/> }
        </>
    )
    }

    export default Page
