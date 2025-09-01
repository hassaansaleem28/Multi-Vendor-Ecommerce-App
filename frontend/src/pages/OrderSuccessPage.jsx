import Lottie from "react-lottie";
import animationData from "../assets/animations/107043-success.json";
import Header from "../components/Layouts/Header";
import Footer from "../components/UserComps/Footer";

function OrderSuccessPage() {
  return (
    <div>
      <Header />
      <Success />
      <Footer />
    </div>
  );
}

function Success() {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div>
      <Lottie options={defaultOptions} width={300} height={300} />
      <h5 className="text-center mb-14 text-[25px] text-[#000000a1]">
        Your order is successful 😍
      </h5>
      <br />
      <br />
    </div>
  );
}

export default OrderSuccessPage;
