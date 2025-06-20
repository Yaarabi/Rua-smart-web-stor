
"use client"

import AddProductForm from "@/components/addProduct"
import Option from "@/components/option"
import { useState } from "react"



const Page = () => {

    const [manualy, setManualy] = useState(false)
    const [IA, setIA] = useState(false)

    const handelManualy = () => {
        setManualy(true)
        setIA(false)
    }
    const handelByIA = () => {
        setIA(true)
        setManualy(false)
    }

    return (
        <>
        { !manualy && !IA && <Option forWhat={"product"} action1={handelManualy} action2={handelByIA} />}
        { manualy && <AddProductForm/> }
        {IA && <h2>Loading ...</h2> }
        </>
    )
    }

    export default Page
