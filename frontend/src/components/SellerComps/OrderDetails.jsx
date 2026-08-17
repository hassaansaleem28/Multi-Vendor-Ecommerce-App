import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "../../styles/styles";
import { BsFillBagFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllOrdersShop } from "../../redux-toolkit/actions/orderActions";
import { toast } from "react-toastify";
import axios from "axios";
import { motion } from "framer-motion";
import {
  HiOutlineLocationMarker,
  HiOutlineCreditCard,
  HiChevronDown,
} from "react-icons/hi";
import { IoIosArrowBack } from "react-icons/io";
import StatusPill from "../ui/StatusPill";
import { easeOutSoft } from "../../lib/motion";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const DELIVERY_STATUSES = [
  "Processing",
  "Transferred to delivery partner",
  "Shipping",
  "Received",
  "On the way",
  "Delivered",
];
const REFUND_STATUSES = ["Processing refund", "Refund Success"];

function OrderDetails() {
  const { shopOrders } = useSelector(state => state.orders);
  const { seller } = useSelector(state => state.seller);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [status, setStatus] = useState("");

  const { id } = useParams();
  useEffect(
    function () {
      dispatch(getAllOrdersShop(seller._id));
    },
    [dispatch]
  );

  const data = shopOrders && shopOrders.find(item => item._id === id);

  async function orderUpdateHandler() {
    await axios
      .put(
        `${API_BASE_URL}/api/v2/order/update-order-status/${id}`,
        {
          status,
        },
        { withCredentials: true }
      )
      .then(() => {
        toast.success("Order updated!");
        navigate("/dashboard-orders");
      })
      .catch(error => {
        toast.error(error.response.data.message);
      });
  }

  async function refundOrderUpdateHandler() {
    await axios
      .put(
        `${API_BASE_URL}/api/v2/order/order-refund-success/${id}`,
        {
          status,
        },
        { withCredentials: true }
      )
      .then(res => {
        toast.success(res?.data?.message);
        dispatch(getAllOrdersShop(seller._id));
      })
      .catch(error => {
        toast.error(error?.response?.data?.message);
      });
  }

  const isRefund =
    data?.status === "Processing refund" || data?.status === "Refund Success";

  const options = isRefund
    ? REFUND_STATUSES.slice(REFUND_STATUSES.indexOf(data?.status))
    : DELIVERY_STATUSES.slice(DELIVERY_STATUSES.indexOf(data?.status));

  return (
    <div className={`${styles.section} min-h-screen py-10`}>
      {/* ---- Header ---------------------------------------------- */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: easeOutSoft }}
        className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-ink-100 bg-white p-6 shadow-card"
      >
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-600">
            <BsFillBagFill size={21} />
          </span>
          <div>
            <h1 className="font-display text-[22px] font-bold text-ink-900">
              Order details
            </h1>
            <p className="text-[13px] text-ink-500">
              #{data?._id?.slice(0, 8)} · Placed{" "}
              {data?.createdAt?.slice(0, 10)}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <StatusPill status={data?.status} />
          <Link
            to={"/dashboard-orders"}
            className="group inline-flex h-[42px] items-center gap-1.5 rounded-xl border border-ink-200 px-4 text-[14px] font-semibold text-ink-700 transition-all duration-300 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
          >
            <IoIosArrowBack className="transition-transform duration-300 group-hover:-translate-x-0.5" />
            Order list
          </Link>
        </div>
      </motion.div>

      {/* ---- Items ----------------------------------------------- */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: easeOutSoft, delay: 0.08 }}
        className="mt-6 overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-card"
      >
        <h2 className="border-b border-ink-100 px-6 py-5 font-display text-[17px] font-bold text-ink-900">
          Items ordered
        </h2>

        <div className="divide-y divide-ink-100">
          {data &&
            data?.cart?.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.32, delay: 0.1 + i * 0.06 }}
                className="flex items-center gap-4 px-6 py-5"
              >
                <img
                  src={`${item?.images[0].url}`}
                  className="h-[76px] w-[76px] shrink-0 rounded-xl border border-ink-100 bg-white object-contain p-1.5"
                  alt={item?.name}
                />
                <div className="min-w-0 flex-1">
                  <h3 className="line-clamp-2 font-display text-[15px] font-semibold text-ink-900">
                    {item?.name}
                  </h3>
                  <p className="mt-1 text-[13px] text-ink-500">
                    US${item?.discountPrice} × {item?.qty}
                  </p>
                </div>
                <span className="font-display text-[16px] font-bold text-ink-900">
                  ${(item?.discountPrice * item?.qty).toFixed(2)}
                </span>
              </motion.div>
            ))}
        </div>

        <div className="flex items-center justify-between border-t border-ink-100 bg-ink-50/60 px-6 py-5">
          <span className="font-display text-[16px] font-bold text-ink-900">
            Order total
          </span>
          <span className="font-display text-[24px] font-extrabold text-ink-900">
            US${data?.totalPrice}
          </span>
        </div>
      </motion.div>

      {/* ---- Address + payment ----------------------------------- */}
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: easeOutSoft, delay: 0.16 }}
          className="rounded-2xl border border-ink-100 bg-white p-6 shadow-card"
        >
          <div className="mb-4 flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-50 text-brand-600">
              <HiOutlineLocationMarker size={18} />
            </span>
            <h3 className="font-display text-[16px] font-bold text-ink-900">
              Ship to
            </h3>
          </div>

          <address className="space-y-1 text-[14px] not-italic leading-relaxed text-ink-600">
            <p>
              {data?.shippingAddress.address1} {data?.shippingAddress.address2}
            </p>
            <p>{data?.shippingAddress.city}</p>
            <p>{data?.shippingAddress.country}</p>
            <p className="pt-1 font-medium text-ink-800">
              +92{data?.user?.phoneNumber}
            </p>
          </address>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: easeOutSoft, delay: 0.22 }}
          className="rounded-2xl border border-ink-100 bg-white p-6 shadow-card"
        >
          <div className="mb-4 flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-50 text-brand-600">
              <HiOutlineCreditCard size={18} />
            </span>
            <h3 className="font-display text-[16px] font-bold text-ink-900">
              Payment
            </h3>
          </div>

          <div className="flex items-center justify-between text-[14px]">
            <span className="text-ink-500">Status</span>
            <StatusPill status={data?.paymentInfo?.status || "Not Paid"} />
          </div>

          {data?.paymentInfo?.type && (
            <div className="mt-3 flex items-center justify-between text-[14px]">
              <span className="text-ink-500">Method</span>
              <span className="font-semibold text-ink-800">
                {data.paymentInfo.type}
              </span>
            </div>
          )}
        </motion.div>
      </div>

      {/* ---- Status control -------------------------------------- */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: easeOutSoft, delay: 0.28 }}
        className="mt-6 rounded-2xl border border-ink-100 bg-white p-6 shadow-card"
      >
        <h3 className="font-display text-[17px] font-bold text-ink-900">
          Update order status
        </h3>
        <p className="mt-1 text-[13px] text-ink-500">
          The buyer sees this change on their tracking page immediately.
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <div className="relative min-w-[260px] flex-1 sm:flex-none">
            <select
              value={status}
              onChange={e => setStatus(e.target.value)}
              className="w-full cursor-pointer appearance-none rounded-xl border border-ink-200 bg-ink-50/60 py-2.5 pl-4 pr-10 text-[15px] text-ink-900 transition-all duration-200 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
            >
              <option value="">Choose a status</option>
              {options.map((option, index) => (
                <option value={option} key={index}>
                  {option}
                </option>
              ))}
            </select>
            <HiChevronDown
              size={18}
              className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-400"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={
              data?.status !== "Processing refund"
                ? orderUpdateHandler
                : refundOrderUpdateHandler
            }
            className="h-[46px] cursor-pointer rounded-xl bg-brand-600 px-6 font-semibold text-white shadow-card transition-colors duration-300 hover:bg-brand-700"
          >
            Update status
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

export default OrderDetails;
