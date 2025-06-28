
import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-05-28.basil",
});
export async function POST(req: NextRequest) {
    const { data } = await req.json();
    const { amount } = data;
    try {
        const paymentIntent = await stripe.paymentIntents.create({
        amount: Number(amount) * 100,
        currency: "USD",
        });

        return new NextResponse(paymentIntent.client_secret, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Server error", error }, { status: 500 });
    }
}