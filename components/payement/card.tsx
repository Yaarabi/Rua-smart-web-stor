
"use client";


import { Card, CardContent } from "@/components/cardPayement";
import PaymentForm from "./form";

const PaymentCard = () => {
    const client = {
        name: "John Doe",
        email: "john@example.com",
        city: "New York",
        country: "USA",
    };

    const items = [
        { name: "Product 1", quantity: 1, price: 49.99 },
        { name: "Product 2", quantity: 2, price: 29.99 },
    ];

    const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);


    return (
        <main className="max-w-screen-lg mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-8 text-center">Payment</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                <Card>
                    <CardContent className="p-6">
                        <h2 className="text-xl font-semibold mb-4">Client Information</h2>
                        <p><strong>Name:</strong> {client.name}</p>
                        <p><strong>Email:</strong> {client.email}</p>
                        <p><strong>City:</strong> {client.city}</p>
                        <p><strong>Country:</strong> {client.country}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                        {items.map((item, idx) => (
                            <div key={idx} className="flex justify-between mb-2">
                                <span>{item.name} (x{item.quantity})</span>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}

                        <div className="flex justify-between mt-4 border-t pt-4 font-bold">
                            <span>Total</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                        <PaymentForm/>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
};

export default PaymentCard;