"use client";

import Loader from "../loader";
import { useEffect, useState } from "react";
import getRespense from "@/app/hooks/getIArespense";
import Posting from "../btnPatient";
import { FaArrowLeft } from "react-icons/fa";

interface RecomendProps {
    type: string;
    customers?: { name: string; email: string }[];
    action: () => void;
}

const GenerateEmail = ({ type, customers, action }: RecomendProps) => {
    const [response, setResponse] = useState({
        subject: "",
        greeting: "",
        body: "",
        callToAction: "",
    });

    const [loadingAI, setLoadingAI] = useState(false);
    const [sending, setSending] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [retry, setRetry] = useState(false);

    useEffect(() => {
        const fetchAIResponse = async () => {
        setLoadingAI(true);
        setError(null);

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

            if (!result) throw new Error("Empty AI response");

            const parsed = JSON.parse(result);

            if (
            !parsed.subject ||
            !parsed.greeting ||
            !parsed.body ||
            !parsed.callToAction
            ) {
            throw new Error("Incomplete email fields from AI.");
            }

            setResponse(parsed);
        } catch {
            console.error("AI generation error:");
            setError("Failed to generate email template. Please try again."
            );
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
    }, [type, retry]);

    const sendEmails = async () => {
        if (!customers || customers.length === 0) {
        setError("No customers selected.");
        return;
        }

        setSending(true);
        setSuccess(null);
        setError(null);

        try {
        const res = await fetch("/api/send/all", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            to: customers.map((c) => ({ email: c.email, name: c.name })),
            ...response,
            }),
        });

        const data = await res.json();

        if (data.success) {
            if (data.failed.length > 0) {
            setSuccess(`Successfully sent ${data.sent} emails.`);
            setError(`Failed to send to: ${data.failed.join(", ")}`);
            } else {
            setSuccess(`Successfully sent ${data.sent} emails to all customers.`);
            }
        } else {
            setError(data.error || "Failed to send emails.");
        }
        } catch {
        setError("An unexpected network error occurred.");
        } finally {
        setSending(false);
        }
    };

    if (loadingAI) {
        return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-white space-y-4">
            <Loader />
            <p className="text-lg text-gray-400">Generating email template with AI...</p>
        </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto mt-24 px-4 py-8 space-y-6">
        <div className="bg-gray-900 p-6 rounded-xl shadow space-y-6">
            <FaArrowLeft onClick={action} />
            <h3 className="text-2xl font-bold text-white mb-4 text-center">
            Email Template
            </h3>

            <div className="space-y-4">
            <div>
                <label className="block text-gray-300 mb-1">Subject</label>
                <textarea
                rows={2}
                value={response.subject}
                onChange={(e) =>
                    setResponse({ ...response, subject: e.target.value })
                }
                className="w-full rounded-lg p-3 bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
            </div>

            <div>
                <label className="block text-gray-300 mb-1">Greeting</label>
                <textarea
                rows={2}
                value={response.greeting}
                onChange={(e) =>
                    setResponse({ ...response, greeting: e.target.value })
                }
                className="w-full rounded-lg p-3 bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
            </div>

            <div>
                <label className="block text-gray-300 mb-1">Body</label>
                <textarea
                rows={6}
                value={response.body}
                onChange={(e) =>
                    setResponse({ ...response, body: e.target.value })
                }
                className="w-full rounded-lg p-3 bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
            </div>

            <div>
                <label className="block text-gray-300 mb-1">Call to Action</label>
                <textarea
                rows={2}
                value={response.callToAction}
                onChange={(e) =>
                    setResponse({ ...response, callToAction: e.target.value })
                }
                className="w-full rounded-lg p-3 bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
            </div>
            </div>

            <div className="flex space-x-4 justify-end items-center mt-6">
            <button
                onClick={() => setRetry(!retry)}
                className="px-6 py-3 bg-white hover:bg-green-700 text-blue-700 rounded-lg transition active:scale-95"
                disabled={sending}
            >
                Re-try
            </button>
            <button
                onClick={sendEmails}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition active:scale-95"
                disabled={sending}
            >
                {sending ? <Posting /> : "Send"}
            </button>
            </div>

            {success && (
            <p className="text-green-500 mt-4 text-center">{success}</p>
            )}
            {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        </div>
        </div>
    );
};

export default GenerateEmail;
