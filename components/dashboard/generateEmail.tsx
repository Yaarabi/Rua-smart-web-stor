"use client";

import Loader from "../loader";
import { useEffect, useState } from "react";
import getRespense from "@/app/hooks/getIArespense";

interface RecomendProps {
    type: string;
}

const GenerateEmail = ({ type }: RecomendProps) => {
    const [response, setResponse] = useState({
        subject: "",
        greeting: "",
        body: "",
        callToAction: "",
    });
    const [loadingAI, setLoadingAI] = useState(false);

    useEffect(() => {
        const fetchAIResponse = async () => {
        setLoadingAI(true);

        const prompt = `
    You are an expert email marketing strategist. Write for an email marketing type of ${type}.
    Provide a detailed email template that includes:
    - A subject line
    - A greeting with the placeholder {{name}}
    - A body content
    - A persuasive call to action

    Return the email template as a JSON object with the following structure:
    {
        "subject": "Your Subject Line Here",
        "greeting": "Dear {{name}},",
        "body": "Your email body content here.",
        "callToAction": "Your call to action here."
    }
    `;

        try {
            const result = await getRespense(prompt);

            if (result) {
            const parsed = JSON.parse(result);
            setResponse(parsed);
            }
        } catch {
            setResponse({
            subject: "",
            greeting: "",
            body: "",
            callToAction: "",
            });
        } finally {
            setLoadingAI(false);
        }
        };

        if (type) {
        fetchAIResponse();
        }
    }, [type]);

    if (loadingAI) return <Loader />;

    return (
        <div className="max-w-4xl mx-auto mt-12 px-4 py-8 space-y-6">
        <div className="bg-gray-900 p-6 rounded-xl shadow space-y-6">
            <h3 className="text-2xl font-bold text-white mb-4 text-center">Email Template</h3>

            <div className="space-y-4">
            <div>
                <label className="block text-gray-300 mb-1">Subject</label>
                <textarea
                rows={2}
                value={response.subject}
                onChange={(e) => setResponse({ ...response, subject: e.target.value })}
                className="w-full rounded-lg p-3 bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
            </div>

            <div>
                <label className="block text-gray-300 mb-1">Greeting</label>
                <textarea
                rows={2}
                value={response.greeting}
                onChange={(e) => setResponse({ ...response, greeting: e.target.value })}
                className="w-full rounded-lg p-3 bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
            </div>

            <div>
                <label className="block text-gray-300 mb-1">Body</label>
                <textarea
                rows={6}
                value={response.body}
                onChange={(e) => setResponse({ ...response, body: e.target.value })}
                className="w-full rounded-lg p-3 bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
            </div>

            <div>
                <label className="block text-gray-300 mb-1">Call to Action</label>
                <textarea
                rows={2}
                value={response.callToAction}
                onChange={(e) => setResponse({ ...response, callToAction: e.target.value })}
                className="w-full rounded-lg p-3 bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
            </div>
            </div>

            <button
            className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition active:scale-95"
            >
            Use Template
            </button>
        </div>
        </div>
    );
};

export default GenerateEmail;
