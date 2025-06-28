
"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_YourPublicTestKey");

export default function StripeProvider({ children }: { children: React.ReactNode }) {
    return <Elements stripe={stripePromise}>{children}</Elements>;
}
