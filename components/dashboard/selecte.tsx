    "use client";

import { FaTimes } from "react-icons/fa";
import GenerateEmail from "./generateEmail";
import { useState } from "react";

const emailTypes = [
    { label: "Newsletter", value: "newsletter" },
    { label: "Promotional", value: "promotional" },
    { label: "Transactional", value: "transactional" },
    { label: "Welcome", value: "welcome" },
    { label: "Abandoned Cart", value: "abandoned_cart" },
    { label: "Re-engagement", value: "re_engagement" },
    { label: "Survey/Feedback", value: "survey_feedback" },
    { label: "Event Invitation", value: "event_invitation" },
    ];

interface Props{
    action: () => void;
    customers: { name: string; email: string }[];
}

const Select = ({customers, action}: Props) => {

    
    const [selected, setSelected] = useState("");
    const [isOpen, setIsOpen] = useState(false);


    const submit = () => {
        if (selected) {
        setIsOpen(true);
        }
    };

    return (
        <div className="absolute top-1/2 md:left-[55%] transform -translate-x-1/2 -translate-y-1/2 w-[90%] z-50">
            
        {!isOpen && (
            <div className="flex flex-col justify-center gap-5 md:mx-auto bg-gray-900 p-8 w-2/5 rounded-xl shadow-xl">
            <FaTimes className="self-end" onClick={action}/>
            <label className="text-base font-medium text-white">Email Marketing Type</label>
            <select
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
                className="border border-gray-500 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 text-gray-900"
            >
                <option value="" disabled>
                Select Type
                </option>
                {emailTypes.map((type) => (
                <option key={type.value} value={type.value}>
                    {type.label}
                </option>
                ))}
            </select>
            <button
                onClick={submit}
                className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all active:scale-95"
            >
                Next
            </button>
            </div>
        )}

        {isOpen && <GenerateEmail action={()=> setIsOpen(false)} type={selected} customers ={customers} />}
        </div>
    );
    };

export default Select;
