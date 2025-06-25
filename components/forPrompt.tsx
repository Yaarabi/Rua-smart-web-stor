"use client"

import { FaArrowLeft } from "react-icons/fa";

    interface Props {
    action1: () => void;
    action2: () => void;
    action3: React.Dispatch<React.SetStateAction<string>>;
    about: string;
    }



const ForPrompt = ({ action1, action2, action3, about }: Props) => {



    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        action3(e.target.value);
    };


    return (
        <>
        <button onClick={action1} className="text-white hover:text-indigo-400 transition">
            <FaArrowLeft className="inline-block text-xl" />
        </button>
        <div className="md:w-3/5 mx-auto mt-8 px-4">

        <form className="space-y-5 mt-6">
            <h2 className="text-2xl font-semibold text-white">
            Please enter specific information about this product
            </h2>

            <div>
            <label htmlFor="about" className="block text-sm text-gray-300 mb-1">
                About Product
            </label>
            <textarea
                name="about"
                required
                value={about}
                onChange={handleChange}
                placeholder="Brief product about..."
                className="w-full p-3 border border-gray-300 rounded-md resize-none h-24 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            </div>

            <div className="flex justify-end">
            <button
            type="button"
                onClick={action2}
                className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
                disabled={ !about }
            >
                Next
            </button>
            </div>
        </form>
        </div>


        </>
    );
    };

    export default ForPrompt;
