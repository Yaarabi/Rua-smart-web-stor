'use client';

import { useState, useRef, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import getRespense from '@/app/hooks/getIArespense';

interface CartProps {
    onClose: () => void;
}

const Chat = ({ onClose }: CartProps) => {
    const [messages, setMessages] = useState([
        { sender: 'ai', content: 'Hello, how can I help you?' }
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const prompt= `You are Rua Web Store's virtual admin assistant. Respond to the user's message in a short, friendly, and professional tone, as if you are a helpful customer support agent.
Start with: "Hello, this is Rua Web Store Admin." only once in your first response, unless the user starts a new conversation.
Focus on being clear, polite, and helpful. Avoid repeating your title in every sentence.
Keep your response concise and to the point, no more than 3-4 sentences.
Provide useful information about orders, shipping, returns, product recommendations, or store policies when possible.
If you don’t have enough information, kindly ask the user for more details and offer to assist further.
Here is the user's message: ${input}`

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: 'user', content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');

        const aiResponse = await getRespense(prompt);

        if (aiResponse) {
            const aiMessage = { sender: 'ai', content: aiResponse };
            setMessages((prev) => [...prev, aiMessage]);
        } else {
            setMessages((prev) => [...prev, { sender: 'ai', content: 'Error: Unable to fetch response.' }]);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') sendMessage();
    };

    return (
        <div className="fixed top-16 right-8 w-full max-w-sm h-[80vh] bg-white text-gray-900 p-4 shadow-2xl z-50 flex flex-col rounded-2xl border border-gray-200">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Support Chat</h2>
                <button onClick={onClose} className="text-gray-500 hover:text-red-500 transition-colors text-2xl">
                    <FaTimes />
                </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-100 rounded-lg">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`p-3 rounded-xl shadow max-w-[70%] ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'}`}>
                            {msg.content}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="flex border-t p-3 bg-gray-50 rounded-b-2xl">
                <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button onClick={sendMessage} className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition">
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;
