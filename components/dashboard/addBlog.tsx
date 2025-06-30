    "use client";

import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import getRespense from "@/app/hooks/getIArespense";
import Loader from "../loader";
import Posting from "../btnPatient";
import { useCreateBlog } from "@/app/hooks/forBlogs";
import { useRouter } from "next/navigation";


interface Props {
    action: () => void;
    promptContent: string;
    promptTitle: string;
}

interface Form {
    title: string;
    content: string;
    images: string;
    }

const AddBlog = ({ action,promptContent, promptTitle }: Props) => {

    const [contentByIA, setContentByIA] = useState<string | null>(null);
    const [titleByIA, setTitleByIA] = useState<string | null>(null);
    const [retry, setRetry] = useState(false);
    const [isRetrying, setIsRetrying] = useState(false);

    const router = useRouter()

    const tryAgainGenerate = () => {
        setIsRetrying(true);
        setRetry((prev) => !prev);
    };

    useEffect(() => {
            const fetchResponse = async () => {
            const title = await getRespense(promptTitle);
            const content = await getRespense(promptContent);
            setTitleByIA(title);
            setContentByIA(content);
            setIsRetrying(false);
            
            };
            if (promptContent && promptTitle) {
            fetchResponse();
            }
        }, [promptContent, promptTitle, retry]);

    const [form, setForm] = useState<Form>({
        title: "",
        content: "",
        images: "",
    });

    useEffect(() => {
        if (contentByIA) {
        setForm((prev) => ({ ...prev, content: contentByIA }));
        }
    }, [contentByIA]);

    useEffect(() => {
        if (titleByIA) {
        setForm((prev) => ({ ...prev, title: titleByIA }));
        }
    }, [titleByIA]);

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

    const create = useCreateBlog();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        create.mutate(form);
        if(create.isSuccess){
            router.push("/dashboard/create")
        }
    };

    if (!contentByIA || !titleByIA) {
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
                Add New Blog Post
            </h2>

            <div>
                <label htmlFor="title" className="block text-sm text-gray-300 mb-2">
                AI Generated Title
                </label>
                <input
                id="title"
                name="title"
                placeholder="Blog title..."
                value={form.title}
                onChange={handleChange}
                className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            <div>
                <label htmlFor="content" className="block text-sm text-gray-300 mb-2">
                AI Generated Content
                </label>
                <textarea
                id="content"
                name="content"
                placeholder="Blog content..."
                value={form.content}
                onChange={handleChange}
                className="w-full p-3 border border-gray-600 rounded-lg resize-none min-h-[40vh] bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            <div>
                <label htmlFor="images" className="block text-sm text-gray-300 mb-2">
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
                disabled={!form.content && !form.title}
                >
                {isRetrying ? <Posting /> : "Re-Try AI"}
                </button>

                <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center disabled:opacity-50"
                disabled={!form.content || !form.title}
                >
                {create.isPending ? <Posting /> : "Next"}
                </button>
            </div>
            </form>
        </div>
        </>
    );
};

export default AddBlog;
