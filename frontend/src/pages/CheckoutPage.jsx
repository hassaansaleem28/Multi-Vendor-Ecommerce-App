import Header from "../components/Layouts/Header";
import Checkout from "../components/UserComps/Checkout";
import CheckoutSteps from "../components/UserComps/CheckoutSteps";
import Footer from "../components/UserComps/Footer";
import PageHero from "../components/ui/PageHero";

function CheckoutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-ink-50">
      <Header />

      <PageHero
        eyebrow="Step 1 of 3"
        title="Checkout"
        subtitle="Confirm where your order should go, then continue to payment."
        crumbs={[{ label: "Home", to: "/" }, { label: "Checkout" }]}
      />

      <main className="flex-1">
        <CheckoutSteps active={1} />
        <Checkout />
      </main>

      <Footer />
    </div>
  );
}

export default CheckoutPage;
