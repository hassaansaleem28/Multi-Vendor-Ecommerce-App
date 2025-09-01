import Header from "../components/Layouts/Header";
import CheckoutSteps from "../components/UserComps/CheckoutSteps";
import Footer from "../components/UserComps/Footer";
import { Payment } from "../components/UserComps/Payment";

function PaymentPage() {
  return (
    <div className="w-full min-h-screen bg-[#f6f9fc]">
      <Header />
      <br />
      <br />
      <CheckoutSteps active={2} />
      <Payment />
      <br />
      <br />
      <Footer />
    </div>
  );
}

export default PaymentPage;
