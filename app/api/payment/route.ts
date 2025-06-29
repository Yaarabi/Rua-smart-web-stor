import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-05-28.basil",
});

export async function POST(req: NextRequest) {
    try {
        const { amount } = await req.json();

        if (!amount) {
            return NextResponse.json({ message: "Amount is required" }, { status: 400 });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Number(amount),
            currency: "USD",
        });

        return NextResponse.json({ clientSecret: paymentIntent.client_secret }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Server error", error }, { status: 500 });
    }
}
