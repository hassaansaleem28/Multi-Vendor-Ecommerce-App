import Header from "../components/Layouts/Header";
import CheckoutSteps from "../components/UserComps/CheckoutSteps";
import Footer from "../components/UserComps/Footer";
import PageHero from "../components/ui/PageHero";
import { Payment } from "../components/UserComps/Payment";

function PaymentPage() {
  return (
    <div className="flex min-h-screen flex-col bg-ink-50">
      <Header />

      <PageHero
        eyebrow="Step 2 of 3"
        title="Payment"
        subtitle="Choose how you'd like to pay. All transactions are encrypted."
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Checkout", to: "/checkout" },
          { label: "Payment" },
        ]}
      />

      <main className="flex-1">
        <CheckoutSteps active={2} />
        <Payment />
      </main>

      <Footer />
    </div>
  );
}

export default PaymentPage;
