
import StripeProvider from "./layout";
import PaymentForm from "@/components/payement/form";

export default function PaymentPage() {
    return (
        
        <StripeProvider>
            <PaymentForm />
        </StripeProvider>
    );
}
