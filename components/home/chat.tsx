'use client'

import { useState, useRef, useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'
import getRespense from '@/app/hooks/getIArespense'

interface CartProps {
    onClose: () => void
}

const Chat = ({ onClose }: CartProps) => {
    const [messages, setMessages] = useState([
        { sender: 'ai', content: 'Hello, how can I help you?' }
    ])
    const [input, setInput] = useState('')
    const messagesEndRef = useRef<HTMLDivElement | null>(null)

    const prompt = `You are Rua Web Store's virtual assistant. Respond to the user's message in a warm, concise, and professional tone, just like a helpful customer support agent.

        Only begin with: "Hello, this is Rua Web Store Admin." if the user is asking a question or continuing a previous support conversation. Do not repeat this greeting in every message.

        Your response should:
        - Be no more than 3–4 sentences
        - Be friendly, clear, and solution-focused
        - Provide helpful information about orders, shipping, returns, product recommendations, or store policies
        - Ask for more details if the message is unclear or lacks context

        About Rua Web Store:
        Rua Web Store is an AI-powered e-commerce platform specializing in premium electronics — including smartphones, tablets, laptops, smartwatches, earbuds, cameras, and more. We offer fast shipping, secure checkout, and 24/7 support to help customers and dropshippers scale their businesses with smart automation and seamless service.

        Here is the user's message:
        ${input}`

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const sendMessage = async () => {
        if (!input.trim()) return

        const userMessage = { sender: 'user', content: input }
        setMessages(prev => [...prev, userMessage])
        setInput('')

        const aiResponse = await getRespense(prompt)

        const aiMessage = {
            sender: 'ai',
            content: aiResponse || 'Error: Unable to fetch response.'
        }
        setMessages(prev => [...prev, aiMessage])
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') sendMessage()
    }

    return (
        <div className="fixed top-16 right-0 sm:right-8 w-full sm:max-w-sm h-[80vh] bg-gray-800 text-gray-200 p-4 shadow-2xl z-50 flex flex-col rounded-none sm:rounded-2xl border border-gray-700">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-100">Support Chat</h2>
                <button onClick={onClose} className="text-gray-400 hover:text-red-400 transition-colors text-xl">
                    <FaTimes />
                </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-700 rounded-lg">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`p-3 rounded-xl shadow-md max-w-[70%] text-sm leading-relaxed ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-100'}`}>
                            {msg.content}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="flex items-center border-t border-gray-700 p-3 bg-gray-700 rounded-b-none sm:rounded-b-2xl">
                <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 bg-gray-800 text-gray-100 border border-gray-600 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button
                    onClick={sendMessage}
                    className="ml-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition"
                >
                    Send
                </button>
            </div>
        </div>
    )
}

export default Chat
