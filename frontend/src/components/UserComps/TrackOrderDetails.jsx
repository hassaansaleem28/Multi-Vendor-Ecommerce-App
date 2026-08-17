import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersUser } from "../../redux-toolkit/actions/orderActions";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { HiCheck, HiOutlineTruck, HiOutlineRefresh } from "react-icons/hi";
import { IoIosArrowForward } from "react-icons/io";
import styles from "../../styles/styles";
import { easeOutSoft } from "../../lib/motion";

/** The happy-path delivery journey, in order. */
const DELIVERY_STEPS = [
  {
    status: "Processing",
    title: "Order placed",
    detail: "Your order is being processed at the shop.",
  },
  {
    status: "Transferred to delivery partner",
    title: "Handed to courier",
    detail: "Your order is on its way to the delivery partner.",
  },
  {
    status: "Shipping",
    title: "Shipped",
    detail: "Your order is travelling with our delivery partner.",
  },
  {
    status: "Recieved",
    title: "Arrived in your city",
    detail: "Your order reached your city and is out for delivery soon.",
  },
  {
    status: "On the way",
    title: "Out for delivery",
    detail: "The delivery rider is heading towards you.",
  },
  {
    status: "Delivered",
    title: "Delivered",
    detail: "Your order has been delivered. Enjoy!",
  },
];

const REFUND_STEPS = [
  {
    status: "Processing refund",
    title: "Refund requested",
    detail: "Your refund is being processed by the seller.",
  },
  {
    status: "Refund Success",
    title: "Refund complete",
    detail: "Your refund succeeded and the money is on its way back.",
  },
];

function TrackOrderDetails() {
  const { orders } = useSelector(state => state.orders);
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const { id } = useParams();
  useEffect(
    function () {
      dispatch(getAllOrdersUser(user?._id));
    },
    [dispatch]
  );

  const data = orders && orders.find(item => item._id === id);

  const isRefund =
    data?.status === "Processing refund" || data?.status === "Refund Success";
  const steps = isRefund ? REFUND_STEPS : DELIVERY_STEPS;
  const currentIndex = steps.findIndex(s => s.status === data?.status);

  if (!data) {
    return (
      <div className={`${styles.section} flex min-h-[60vh] items-center justify-center`}>
        <div className="text-center">
          <h1 className="font-display text-[20px] font-bold text-ink-900">
            Order not found
          </h1>
          <p className="mt-2 text-[14px] text-ink-500">
            We couldn&apos;t find an order with that ID.
          </p>
          <Link
            to="/profile"
            className="mt-6 inline-flex h-[46px] items-center rounded-xl bg-brand-600 px-6 font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Back to your orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.section} py-12`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeOutSoft }}
        className="mx-auto max-w-[720px] overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-card"
      >
        {/* ---- Head -------------------------------------------- */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink-100 px-7 py-6">
          <div className="flex items-center gap-3">
            <span
              className={`grid h-12 w-12 place-items-center rounded-xl ${
                isRefund
                  ? "bg-accent-50 text-accent-600"
                  : "bg-brand-50 text-brand-600"
              }`}
            >
              {isRefund ? (
                <HiOutlineRefresh size={23} />
              ) : (
                <HiOutlineTruck size={23} />
              )}
            </span>
            <div>
              <h1 className="font-display text-[19px] font-bold text-ink-900">
                {isRefund ? "Refund progress" : "Delivery progress"}
              </h1>
              <p className="text-[13px] text-ink-500">
                Order #{data._id?.slice(0, 10)}…
              </p>
            </div>
          </div>

          <Link
            to={`/user/order/${data._id}`}
            className="group inline-flex items-center gap-1 rounded-full border border-ink-200 px-4 py-2 text-[13px] font-semibold text-ink-700 transition-all duration-300 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
          >
            Order details
            <IoIosArrowForward className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* ---- Timeline ---------------------------------------- */}
        <ol className="relative px-7 py-8">
          {steps.map((step, i) => {
            const isDone = currentIndex > i;
            const isCurrent = currentIndex === i;
            const isPending = currentIndex < i;
            const isLast = i === steps.length - 1;

            return (
              <motion.li
                key={step.status}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.42,
                  ease: easeOutSoft,
                  delay: i * 0.09,
                }}
                className="relative flex gap-5 pb-8 last:pb-0"
              >
                {/* connector */}
                {!isLast && (
                  <span className="absolute left-[19px] top-10 h-full w-[2px] bg-ink-100">
                    <motion.span
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: isDone ? 1 : 0 }}
                      transition={{
                        duration: 0.5,
                        ease: easeOutSoft,
                        delay: 0.3 + i * 0.09,
                      }}
                      style={{ transformOrigin: "top" }}
                      className="block h-full w-full bg-success-500"
                    />
                  </span>
                )}

                {/* node */}
                <span
                  className={`relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full transition-colors duration-500 ${
                    isDone
                      ? "bg-success-600 text-white"
                      : isCurrent
                        ? "bg-brand-600 text-white"
                        : "border-2 border-ink-200 bg-white text-ink-300"
                  }`}
                >
                  {isDone ? (
                    <HiCheck size={19} />
                  ) : (
                    <span className="font-display text-[14px] font-bold">
                      {i + 1}
                    </span>
                  )}

                  {isCurrent && (
                    <motion.span
                      initial={{ scale: 1, opacity: 0.55 }}
                      animate={{ scale: 1.7, opacity: 0 }}
                      transition={{
                        duration: 1.7,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                      className="absolute inset-0 rounded-full border-2 border-brand-500"
                    />
                  )}
                </span>

                {/* text */}
                <div className={`pt-1.5 ${isPending ? "opacity-50" : ""}`}>
                  <h3
                    className={`font-display text-[16px] font-bold ${
                      isCurrent ? "text-brand-700" : "text-ink-900"
                    }`}
                  >
                    {step.title}
                    {isCurrent && (
                      <span className="ml-2 rounded-full bg-brand-50 px-2 py-0.5 align-middle text-[11px] font-bold uppercase tracking-wide text-brand-700">
                        Current
                      </span>
                    )}
                  </h3>
                  <p className="mt-1 text-[14px] leading-relaxed text-ink-500">
                    {step.detail}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </motion.div>
    </div>
  );
}

export default TrackOrderDetails;
