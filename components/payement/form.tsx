"use client";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";

export default function PaymentForm() {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const cardElement = elements?.getElement(CardElement);

        try {
            if (!stripe || !cardElement) return;

            setLoading(true);
            setMessage("");

            const { data } = await axios.post("/api/create-payment-intent", {
                amount: 8900,
            });

            const clientSecret = data.clientSecret;

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: { card: cardElement },
            });

            if (result.error) {
                setMessage(`Payment failed: ${result.error.message}`);
            } else {
                if (result.paymentIntent?.status === "succeeded") {
                    setMessage("✅ Payment successful!");
                }
            }
        } catch (error) {
            console.log(error)
            setMessage("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow space-y-6">
            <h2 className="text-2xl font-bold text-center">Stripe Test Payment</h2>

            <form onSubmit={onSubmit} className="space-y-4">
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
                    {loading ? "Processing..." : "Pay $89.00"}
                </button>
            </form>

            {message && <p className="text-center text-red-500">{message}</p>}

            <div className="mt-6 bg-gray-100 p-4 rounded">
                <h3 className="font-semibold mb-2">Stripe Test Card:</h3>
                <p><strong>Card Number:</strong> 4242 4242 4242 4242</p>
                <p><strong>Expiry:</strong> Any future date</p>
                <p><strong>CVC:</strong> Any 3 digits</p>
                <p><strong>ZIP:</strong> Any 5 digits</p>
            </div>
        </div>
    );
}
