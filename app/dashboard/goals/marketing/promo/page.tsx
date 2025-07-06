
"use client"
import CreatePromotionForm from "@/components/dashboard/analytics/adForm";
import HomeStoreAdsTable from "@/components/dashboard/analytics/tableAds"
import ForPrompt from "@/components/forPrompt"
import { useState } from "react";



const Page = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [next, setNext] = useState(false);
    const [about, setAbout] = useState("");

    return (
        <>
        { !isOpen && !next && <><button
        onClick={() => {
            setIsOpen(true);
            setAbout("Create a new homepage ad for the web store");
        }}
        className="bg-green-600 text-white mt-8 px-4 py-2 rounded mb-4">
            + New Promotion
        </button>
        <HomeStoreAdsTable/></>}
        {isOpen && <ForPrompt action2={()=>{ setNext(true); setIsOpen(false) }} action3={setAbout} action1={()=> setIsOpen(false)} for="promotion" about={about}/>}
        { next && <CreatePromotionForm action={()=>{ setNext(false); setIsOpen(true) }} action2={()=> {setIsOpen(false) ; setNext(false)}} promptTitle={about}/>}
        </>
    )
}

export default Page
