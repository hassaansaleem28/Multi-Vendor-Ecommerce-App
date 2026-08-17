import Lottie from "react-lottie";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiOutlineShoppingBag, HiOutlineClipboardList } from "react-icons/hi";
import animationData from "../assets/animations/107043-success.json";
import Header from "../components/Layouts/Header";
import Footer from "../components/UserComps/Footer";
import CheckoutSteps from "../components/UserComps/CheckoutSteps";
import { easeOutSoft } from "../lib/motion";

function OrderSuccessPage() {
  return (
    <div className="flex min-h-screen flex-col bg-ink-50">
      <Header />
      <main className="flex-1">
        <CheckoutSteps active={3} />
        <Success />
      </main>
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
    <div className="mx-auto w-11/12 max-w-[560px] py-6 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 26, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: easeOutSoft }}
        className="rounded-2xl border border-ink-100 bg-white px-6 py-10 text-center shadow-card sm:px-10"
      >
        <div className="pointer-events-none mx-auto w-[240px]">
          <Lottie options={defaultOptions} width={240} height={240} />
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: easeOutSoft, delay: 0.25 }}
          className="mt-2 font-display text-[28px] font-extrabold tracking-tight text-ink-900"
        >
          Order confirmed
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: easeOutSoft, delay: 0.33 }}
          className="mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-ink-500"
        >
          Thanks for shopping with ShopO. We&apos;ve emailed your receipt — your
          seller is packing the order now.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: easeOutSoft, delay: 0.42 }}
          className="mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center"
        >
          <Link
            to="/profile"
            className="inline-flex h-[48px] items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 font-semibold text-white shadow-card transition-all duration-300 hover:bg-brand-700 hover:shadow-card-hover active:scale-95"
          >
            <HiOutlineClipboardList size={19} />
            Track your order
          </Link>

          <Link
            to="/products"
            className="inline-flex h-[48px] items-center justify-center gap-2 rounded-xl border border-ink-200 px-6 font-semibold text-ink-700 transition-all duration-300 hover:border-ink-300 hover:bg-ink-50 active:scale-95"
          >
            <HiOutlineShoppingBag size={19} />
            Continue shopping
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default OrderSuccessPage;
