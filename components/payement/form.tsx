"use client";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Product {
    _id: string;
    name: string;
    title: string;
    description: string;
    price: number;
    category: string;
    stock: string;
    images: string;
    createdAt: Date;
    quantity: number;
}

export default function PaymentForm() {

    const { data: session, status } = useSession();
    const stripe = useStripe();
    const elements = useElements();
    const router = useRouter();

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const [userId, setUserId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [cartItems, setCartItems] = useState<Product[]>([]);

    useEffect(() => {
        if (session) {
            console.log(session.user)
            setUserId(session?.user._id || "");
            setName(session?.user.name || "");
            setEmail(session?.user.email || "");
        }
    }, [status, session]);

    useEffect(() => {
        const storedOrder = localStorage.getItem("order");
        if (storedOrder) {
            setCartItems(JSON.parse(storedOrder));
        }
    }, []);

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const cardElement = elements?.getElement(CardElement);

        try {
            if (!stripe || !cardElement) return;

            setLoading(true);
            setMessage("");

            let currentUserId = userId;

            if (!session) {
                const registerResponse = await axios.post("/api/action/register", {
                    username: name,
                    email,
                    password: "123456789" 
                });

                currentUserId = registerResponse.data.user._id;
            }

            const { data } = await axios.post("/api/payment", { amount: totalPrice });
            const clientSecret = data.clientSecret;

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: { card: cardElement },
            });

            if (result.error) {
                setMessage(`Payment failed: ${result.error.message}`);
            } else if (result.paymentIntent?.status === "succeeded") {
                setMessage("✅ Payment successful!");

                const orderResponse = await axios.post("/api/orders", {
                    userId: currentUserId || "guest",
                    name,
                    email,
                    items: cartItems.map(item => ({
                        productId: item._id,
                        name: item.name,
                        quantity: item.quantity,
                        price: item.price,
                    })),
                    shippingAddress: { city, country },
                    totalPrice,
                    isPaid: true,
                    paidAt: new Date(),
                });

                if (orderResponse.data.message === "Order created successfully") {
                    localStorage.removeItem("order");
                    router.push("/");
                } else {
                    setMessage("Order creation failed. Please contact support.");
                }
            }
        } catch (error) {
            console.log(error);
            setMessage("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow space-y-6">
            <h2 className="text-2xl font-bold text-center">Stripe Test Payment</h2>

            <form onSubmit={onSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full border px-3 py-2 rounded"
                />
                <input
                    type="text"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full border px-3 py-2 rounded"
                />
                <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    className="w-full border px-3 py-2 rounded"
                />
                <input
                    type="text"
                    placeholder="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                    className="w-full border px-3 py-2 rounded"
                />

                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: "16px",
                                color: "#32325d",
                                "::placeholder": { color: "#aab7c4" },
                            },
                            invalid: { color: "#fa755a" },
                        },
                    }}
                />
                <button
                    type="submit"
                    disabled={!stripe || loading}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                    {loading ? "Processing..." : `Pay ${totalPrice.toFixed(2)} MAD`}
                </button>
            </form>

            {message && <p className="text-center text-gray-900">{message}</p>}

            <div className="mt-6 bg-gray-100 p-4 rounded">
                <h3 className="font-semibold mb-2">Stripe Test Card:</h3>
                <p><strong>Card Number:</strong> 4242 4242 4242 4242</p>
            </div>
        </div>
    );
}
