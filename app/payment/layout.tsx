
"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51ReltOPwLrapiRicvr6J5hoMdImMOJZJp36ZDCBkzQdlpyhcYHxejsgLjWlpT1EIIbJc8mc8Cxh1mtmWzUgTTo6V00OobSnwON");

export default function StripeProvider({ children }: { children: React.ReactNode }) {
    return <Elements stripe={stripePromise}>{children}</Elements>;
}
