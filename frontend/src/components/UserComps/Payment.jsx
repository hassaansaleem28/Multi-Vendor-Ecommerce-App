import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import { AnimatePresence, motion } from "framer-motion";
import { HiOutlineCreditCard, HiOutlineCash } from "react-icons/hi";
import { FaPaypal } from "react-icons/fa";
import styles from "../../styles/styles";
import { backdrop, modal, easeOutSoft } from "../../lib/motion";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const stripeElementStyle = {
  style: {
    base: {
      fontSize: "16px",
      lineHeight: "24px",
      color: "#111a2e",
      fontFamily: "Inter, system-ui, sans-serif",
      "::placeholder": { color: "#94a1bc" },
    },
    invalid: { color: "#dc2626" },
  },
};

const stripeFieldClass =
  "w-full rounded-xl border border-ink-200 bg-ink-50/60 px-4 py-3 transition-all duration-200 focus-within:border-brand-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-brand-500/10";

function Payment() {
  const [orderData, setOrderData] = useState([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector(state => state.user);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const paymentData = {
    amount: Math.round(orderData?.totalPrice * 100),
  };

  const order = {
    cart: orderData?.cart,
    shippingAddress: orderData?.shippingAddress,
    user: user && user,
    totalPrice: orderData?.totalPrice,
  };

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("latestOrder"));
    setOrderData(orderData);
  }, []);

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "PayPal",
            amount: {
              currencyCode: "USD",
              value: orderData?.totalPrice,
            },
          },
        ],
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then(orderId => orderId);
  }

  async function onApprove(data, actions) {
    return actions.order.capture().then(details => {
      const { payer } = details;

      let paymentInfo = payer;
      if (paymentInfo !== undefined) paypalPaymentHandler(paymentInfo);
    });
  }

  async function paypalPaymentHandler(paymentInfo) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    order.paymentInfo = {
      id: paymentInfo.payer_id,
      status: "succeeded",
      type: "Paypal",
    };

    await axios
      .post(`${API_BASE_URL}/api/v2/order/create-order`, order, config)
      .then(() => {
        setOpen(false);
        navigate("/order/success");
        toast.success("Order Successful!");
        localStorage.setItem("cartItems", JSON.stringify([]));
        localStorage.setItem("latestOrder", JSON.stringify([]));
        window.location.reload();
      });
  }

  async function paymentHandler(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${API_BASE_URL}/api/v2/payment/payment/process`,
        paymentData,
        config
      );

      const client_secret = data?.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        },
      });

      if (result.error) {
        toast.error(result?.error?.message);
        setIsLoading(false);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
            type: "Credit Card",
          };
          await axios
            .post(`${API_BASE_URL}/api/v2/order/create-order`, order, config)
            .then(() => {
              setOpen(false);
              navigate("/order/success");
              toast.success("Order Successful!");
              localStorage.setItem("cartItems", JSON.stringify([]));
              localStorage.setItem("latestOrder", JSON.stringify([]));
              window.location.reload();
            });
        }
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      toast.error(error);
    }
  }

  async function cashOnDeliveryHandler(e) {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    order.paymentInfo = {
      type: "Cash on delivery",
    };
    await axios
      .post(`${API_BASE_URL}/api/v2/order/create-order`, order, config)
      .then(() => {
        setOpen(false);
        navigate("/order/success");
        toast.success("Order Successful!");
        localStorage.setItem("cartItems", JSON.stringify([]));
        localStorage.setItem("latestOrder", JSON.stringify([]));
        window.location.reload();
      });
  }

  return (
    <div className={`${styles.section} pb-12`}>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <PaymentInfo
          user={user}
          open={open}
          isLoading={isLoading}
          setOpen={setOpen}
          onApprove={onApprove}
          createOrder={createOrder}
          paymentHandler={paymentHandler}
          cashOnDeliveryHandler={cashOnDeliveryHandler}
        />

        <div className="lg:sticky lg:top-24 lg:self-start">
          <CartData orderData={orderData} />
        </div>
      </div>
    </div>
  );
}

/** One selectable payment method with an expanding body. */
function MethodCard({ icon: Icon, title, subtitle, selected, onSelect, children }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
        selected
          ? "border-brand-300 bg-brand-50/30 shadow-card"
          : "border-ink-200 bg-white hover:border-ink-300"
      }`}
    >
      <button
        type="button"
        onClick={onSelect}
        className="flex w-full cursor-pointer items-center gap-4 p-5 text-left"
      >
        {/* radio */}
        <span
          className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 transition-colors duration-200 ${
            selected ? "border-brand-600" : "border-ink-300"
          }`}
        >
          <AnimatePresence>
            {selected && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.18 }}
                className="h-2.5 w-2.5 rounded-full bg-brand-600"
              />
            )}
          </AnimatePresence>
        </span>

        <span
          className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-colors duration-300 ${
            selected ? "bg-brand-600 text-white" : "bg-ink-50 text-ink-500"
          }`}
        >
          <Icon size={20} />
        </span>

        <span className="min-w-0 flex-1">
          <span className="block font-display text-[15px] font-bold text-ink-900">
            {title}
          </span>
          <span className="block text-[13px] text-ink-500">{subtitle}</span>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {selected && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: easeOutSoft }}
            className="overflow-hidden"
          >
            <div className="border-t border-ink-100 bg-white p-5">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PaymentInfo({
  user,
  open,
  isLoading,
  setOpen,
  onApprove,
  createOrder,
  paymentHandler,
  cashOnDeliveryHandler,
}) {
  const [select, setSelect] = useState(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: easeOutSoft }}
      className="space-y-4"
    >
      {/* ---- Card ------------------------------------------------- */}
      <MethodCard
        icon={HiOutlineCreditCard}
        title="Debit / credit card"
        subtitle="Visa, Mastercard, Amex — processed by Stripe"
        selected={select === 1}
        onSelect={() => setSelect(1)}
      >
        <form onSubmit={paymentHandler} className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-[13px] font-semibold text-ink-700">
              Name on card
            </label>
            <input
              required
              readOnly
              placeholder={user && user.name}
              value={(user && user.name) || ""}
              className="w-full cursor-not-allowed rounded-xl border border-ink-200 bg-ink-50/60 px-4 py-3 text-[15px] text-ink-700 opacity-80"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-[13px] font-semibold text-ink-700">
              Card number
            </label>
            <CardNumberElement
              className={stripeFieldClass}
              options={stripeElementStyle}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[13px] font-semibold text-ink-700">
              Expiry date
            </label>
            <CardExpiryElement
              className={stripeFieldClass}
              options={stripeElementStyle}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[13px] font-semibold text-ink-700">
              CVC
            </label>
            <CardCvcElement
              className={stripeFieldClass}
              options={stripeElementStyle}
            />
          </div>

          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={isLoading ? undefined : { scale: 1.01 }}
            whileTap={isLoading ? undefined : { scale: 0.99 }}
            className="mt-1 flex h-[50px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-brand-600 font-display text-[16px] font-bold text-white shadow-card transition-colors duration-300 hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70 sm:col-span-2"
          >
            {isLoading && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            )}
            {isLoading ? "Processing…" : "Pay now"}
          </motion.button>
        </form>
      </MethodCard>

      {/* ---- PayPal ----------------------------------------------- */}
      <MethodCard
        icon={FaPaypal}
        title="PayPal"
        subtitle="Pay with your PayPal balance or linked card"
        selected={select === 2}
        onSelect={() => setSelect(2)}
      >
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => setOpen(true)}
          className="flex h-[50px] w-full cursor-pointer items-center justify-center rounded-xl bg-brand-600 font-display text-[16px] font-bold text-white shadow-card transition-colors duration-300 hover:bg-brand-700"
        >
          Continue with PayPal
        </motion.button>

        <AnimatePresence>
          {open && (
            <motion.div
              variants={backdrop}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[99999] flex items-center justify-center bg-ink-950/50 p-4 backdrop-blur-sm"
            >
              <motion.div
                variants={modal}
                onClick={e => e.stopPropagation()}
                className="relative max-h-[85vh] w-full max-w-[440px] overflow-y-auto rounded-2xl bg-white p-7 shadow-panel"
              >
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close PayPal"
                  className="absolute right-4 top-4 grid h-9 w-9 cursor-pointer place-items-center rounded-full text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-900"
                >
                  <RxCross1 size={16} />
                </button>

                <h3 className="mb-6 font-display text-[19px] font-bold text-ink-900">
                  Pay with PayPal
                </h3>

                <PayPalScriptProvider
                  options={{
                    "client-id":
                      "Aczac4Ry9_QA1t4c7TKH9UusH3RTe6onyICPoCToHG10kjlNdI-qwobbW9JAHzaRQwFMn2-k660853jn",
                  }}
                >
                  <PayPalButtons
                    style={{ layout: "vertical" }}
                    onApprove={onApprove}
                    createOrder={createOrder}
                  />
                </PayPalScriptProvider>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </MethodCard>

      {/* ---- Cash on delivery ------------------------------------- */}
      <MethodCard
        icon={HiOutlineCash}
        title="Cash on delivery"
        subtitle="Pay the courier when your order arrives"
        selected={select === 3}
        onSelect={() => setSelect(3)}
      >
        <form onSubmit={cashOnDeliveryHandler}>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="flex h-[50px] w-full cursor-pointer items-center justify-center rounded-xl bg-brand-600 font-display text-[16px] font-bold text-white shadow-card transition-colors duration-300 hover:bg-brand-700"
          >
            Confirm order
          </motion.button>
        </form>
      </MethodCard>
    </motion.div>
  );
}

function CartData({ orderData }) {
  const shipping = orderData?.shipping?.toFixed(2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: easeOutSoft, delay: 0.1 }}
      className="rounded-2xl border border-ink-100 bg-white p-6"
    >
      <h3 className="font-display text-[18px] font-bold text-ink-900">
        Order summary
      </h3>
      <p className="mt-0.5 text-[13px] text-ink-500">
        {orderData?.cart?.length || 0} item
        {orderData?.cart?.length === 1 ? "" : "s"}
      </p>

      <dl className="mt-6 space-y-3.5">
        <div className="flex items-center justify-between">
          <dt className="text-[14px] text-ink-500">Subtotal</dt>
          <dd className="font-display text-[15px] font-semibold text-ink-900">
            ${orderData?.subTotalPrice}
          </dd>
        </div>

        <div className="flex items-center justify-between">
          <dt className="text-[14px] text-ink-500">Shipping</dt>
          <dd className="font-display text-[15px] font-semibold text-ink-900">
            ${shipping}
          </dd>
        </div>

        <div className="flex items-center justify-between border-b border-ink-100 pb-4">
          <dt className="text-[14px] text-ink-500">Discount</dt>
          <dd
            className={`font-display text-[15px] font-semibold ${
              orderData?.discountPrice ? "text-success-600" : "text-ink-400"
            }`}
          >
            {orderData?.discountPrice
              ? `−$${orderData.discountPrice}`
              : "—"}
          </dd>
        </div>

        <div className="flex items-center justify-between pt-1">
          <dt className="font-display text-[16px] font-bold text-ink-900">
            Total
          </dt>
          <dd className="font-display text-[26px] font-extrabold text-ink-900">
            ${orderData?.totalPrice}
          </dd>
        </div>
      </dl>

      <p className="mt-5 text-center text-[12px] text-ink-400">
        Secure checkout · Your details are encrypted
      </p>
    </motion.div>
  );
}

export { Payment, PaymentInfo };
