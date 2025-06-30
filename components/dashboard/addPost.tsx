    "use client";

    import { useEffect, useState } from "react";
    import { FaArrowLeft } from "react-icons/fa";
    import getRespense from "@/app/hooks/getIArespense";
    import { usePost } from "@/zustand/store";
    import Loader from "../loader";
    import Posting from "../btnPatient";

    interface Props {
    action: () => void;
    action2: () => void;
    prompt: string;
    }

    interface Form {
    description: string;
    images: string;
    }

    const AddPost = ({ action, action2, prompt }: Props) => {
    
    const [descriptionByIA, setDescriptionByIA] = useState<string | null>(null);
    const [retry, setRetry] = useState(false);
    const [isRetrying, setIsRetrying] = useState(false);
    const [copied, setCopied] = useState(false);

    const tryAgainGenerate = () => {
        setIsRetrying(true);
        setRetry((prev) => !prev);
    };

    useEffect(() => {
        const fetchResponse = async () => {
        const description = await getRespense(prompt);
        setDescriptionByIA(description);
        setIsRetrying(false);
        };

        if (prompt) {
        fetchResponse();
        }
    }, [prompt, retry]);

    const [form, setForm] = useState<Form>({
        description: "",
        images: "",
    });

    useEffect(() => {
        if (descriptionByIA) {
        setForm((prev) => ({ ...prev, description: descriptionByIA }));
        }
    }, [descriptionByIA]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, files } = e.target as HTMLInputElement;

        if (name === "images" && files && files.length > 0) {
        const reader = new FileReader();
        const file = files[0];

        reader.onloadend = () => {
            const base64String = reader.result?.toString().split(",")[1];
            if (base64String) {
            setForm((prev) => ({ ...prev, images: base64String }));
            }
        };

        reader.onerror = (error) => {
            console.error("Error encoding image:", error);
        };

        reader.readAsDataURL(file);
        } else {
        setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const addPost = usePost((state) => state.addPost);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addPost({ description: descriptionByIA || "", images: form.images });
        action2();
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(form.description).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
        });
    };

    if (!descriptionByIA) {
        return <Loader />;
    }

    return (
        <>
        <button
            onClick={action}
            className="text-white hover:text-indigo-400 transition mb-4 flex items-center space-x-2"
        >
            <FaArrowLeft className="text-xl" />
            <span>Back</span>
        </button>
        <div className="w-full max-w-4xl m-auto px-4 mt-6">
            <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-gray-900 p-6 rounded-xl shadow-lg"
            >
            <h2 className="text-2xl font-semibold text-white mb-4">
                Add New Product Post
            </h2>

            <div className="relative">
                <label
                htmlFor="description"
                className="block text-sm text-gray-300 mb-2"
                >
                AI Generated Description
                </label>
                <textarea
                id="description"
                name="description"
                placeholder="Brief product description..."
                value={form.description}
                onChange={handleChange}
                className="w-full p-3 border border-gray-600 rounded-lg resize-none min-h-[40vh] bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                type="button"
                onClick={copyToClipboard}
                className="absolute top-2 right-2 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded text-sm transition"
                >
                {copied ? "Copied!" : "Copy"}
                </button>
            </div>

            <div>
                <label
                htmlFor="images"
                className="block text-sm text-gray-300 mb-2"
                >
                Upload Post Image
                </label>
                <input
                type="file"
                name="images"
                id="images"
                onChange={handleChange}
                className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            <div className="flex justify-end space-x-4">
                <button
                type="button"
                onClick={tryAgainGenerate}
                className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition flex items-center disabled:opacity-50"
                disabled={!form.description}
                >
                {isRetrying ? <Posting /> : "Re-Try AI"}
                </button>

                <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center disabled:opacity-50"
                disabled={!form.description}
                >
                Next
                </button>
            </div>
            </form>
        </div>
        </>
    );
    };

    export default AddPost;
