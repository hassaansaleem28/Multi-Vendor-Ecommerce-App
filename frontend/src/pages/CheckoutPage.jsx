import Header from "../components/Layouts/Header";
import Checkout from "../components/UserComps/Checkout";
import CheckoutSteps from "../components/UserComps/CheckoutSteps";
import Footer from "../components/UserComps/Footer";

function CheckoutPage() {
  return (
    <div>
      <Header />
      <br />
      <br />
      <CheckoutSteps active={1} />
      <Checkout />
      <br />
      <br />
      <Footer />
    </div>
  );
}

export default CheckoutPage;
