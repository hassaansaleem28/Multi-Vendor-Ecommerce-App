import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAllOrdersUser } from "../../redux-toolkit/actions/orderActions";
import styles from "../../styles/styles";
import { BsFillBagFill } from "react-icons/bs";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import {
  AiOutlineStar,
  AiFillStar,
  AiOutlineMessage,
} from "react-icons/ai";
import {
  HiOutlineLocationMarker,
  HiOutlineCreditCard,
  HiOutlineRefresh,
} from "react-icons/hi";
import { MdTrackChanges } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import axios from "axios";
import StatusPill from "../ui/StatusPill";
import { backdrop, modal, easeOutSoft } from "../../lib/motion";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function OrderDetails() {
  const { orders } = useSelector(state => state.orders);
  const { user } = useSelector(state => state.user);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(1);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedItem, setSelectedItem] = useState({});
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const { id } = useParams();
  useEffect(
    function () {
      dispatch(getAllOrdersUser(user?._id));
    },
    [dispatch]
  );

  const data = orders && orders.find(item => item._id === id);

  async function reviewHandler() {
    try {
      setIsLoading(true);
      await axios
        .put(
          `${API_BASE_URL}/api/v2/product/create-new-review`,
          {
            user,
            rating,
            comment,
            productId: selectedItem?._id,
            orderId: id,
          },
          { withCredentials: true }
        )
        .then(res => {
          toast.success(res.data.message);
          dispatch(getAllOrdersUser(user?._id));
          setComment("");
          setRating(null);
          setOpen(false);
        });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      toast.error(error.message);
    }
  }

  async function refundHandler() {
    try {
      setIsLoading(true);
      await axios
        .put(`${API_BASE_URL}/api/v2/order/give-order-refund/${id}`, {
          status: "Processing refund",
        })
        .then(res => {
          toast.success(res.data.message);
          dispatch(getAllOrdersUser(user?._id));
          setIsLoading(false);
        })
        .catch(error => {
          toast.error(error.message);
          setIsLoading(false);
        });
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      toast.error(error.message);
    }
  }

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
            to={`/user/track-order/${data?._id}`}
            className="inline-flex h-[42px] items-center gap-2 rounded-xl border border-ink-200 px-4 text-[14px] font-semibold text-ink-700 transition-all duration-300 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
          >
            <MdTrackChanges size={17} />
            Track
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
          Items in this order
        </h2>

        <div className="divide-y divide-ink-100">
          {data &&
            data?.cart?.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.1 + i * 0.06 }}
                className="flex flex-wrap items-center gap-4 px-6 py-5"
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

                {data?.status === "Delivered" && !item.isReviewed ? (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setOpen(true) || setSelectedItem(item)}
                    className="inline-flex h-[40px] cursor-pointer items-center gap-1.5 rounded-xl bg-accent-400 px-4 text-[13px] font-bold text-ink-900 transition-colors duration-300 hover:bg-accent-300"
                  >
                    <AiFillStar size={15} />
                    Write a review
                  </motion.button>
                ) : null}
              </motion.div>
            ))}
        </div>

        <div className="flex items-center justify-between border-t border-ink-100 bg-ink-50/60 px-6 py-5">
          <span className="font-display text-[16px] font-bold text-ink-900">
            Total paid
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
              Shipping address
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
            <StatusPill
              status={data?.paymentInfo?.status || "Not Paid"}
            />
          </div>

          {data?.paymentInfo?.type && (
            <div className="mt-3 flex items-center justify-between text-[14px]">
              <span className="text-ink-500">Method</span>
              <span className="font-semibold text-ink-800">
                {data.paymentInfo.type}
              </span>
            </div>
          )}

          {data?.status === "Delivered" && (
            <motion.button
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              onClick={() => refundHandler()}
              disabled={isLoading}
              className="mt-6 flex h-[46px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-danger-200 bg-danger-50 font-semibold text-danger-600 transition-colors duration-300 hover:bg-danger-100 disabled:opacity-60"
            >
              <HiOutlineRefresh size={18} />
              {isLoading ? "Please wait…" : "Request a refund"}
            </motion.button>
          )}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: easeOutSoft, delay: 0.28 }}
        className="mt-6"
      >
        <Link
          to="/inbox"
          className="inline-flex h-[48px] items-center gap-2 rounded-xl bg-ink-900 px-6 font-semibold text-white shadow-card transition-all duration-300 hover:bg-ink-800 hover:shadow-card-hover active:scale-95"
        >
          <AiOutlineMessage size={19} />
          Message the seller
        </Link>
      </motion.div>

      {/* ---- Review modal ---------------------------------------- */}
      <AnimatePresence>
        {open && (
          <motion.div
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/50 p-4 backdrop-blur-sm"
          >
            <motion.div
              variants={modal}
              onClick={e => e.stopPropagation()}
              className="relative max-h-[88vh] w-full max-w-[520px] overflow-y-auto rounded-2xl bg-white shadow-panel"
            >
              <header className="flex items-center justify-between border-b border-ink-100 px-6 py-5">
                <h2 className="font-display text-[19px] font-bold text-ink-900">
                  Write a review
                </h2>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="grid h-9 w-9 cursor-pointer place-items-center rounded-full text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-900"
                >
                  <RxCross1 size={16} />
                </button>
              </header>

              <div className="p-6">
                {/* product */}
                <div className="flex items-center gap-4 rounded-xl border border-ink-100 bg-ink-50/60 p-4">
                  <img
                    src={selectedItem?.images?.[0]?.url}
                    className="h-[64px] w-[64px] shrink-0 rounded-lg border border-ink-100 bg-white object-contain p-1"
                    alt={selectedItem?.name}
                  />
                  <div className="min-w-0">
                    <p className="line-clamp-2 font-display text-[14px] font-semibold text-ink-900">
                      {selectedItem?.name}
                    </p>
                    <p className="mt-0.5 text-[13px] text-ink-500">
                      US${selectedItem?.discountPrice} × {selectedItem?.qty}
                    </p>
                  </div>
                </div>

                {/* rating */}
                <div className="mt-7">
                  <label className="block font-display text-[15px] font-bold text-ink-900">
                    Your rating <span className="text-danger-500">*</span>
                  </label>
                  <div
                    className="mt-3 flex items-center gap-1.5"
                    onMouseLeave={() => setHoverRating(0)}
                  >
                    {[1, 2, 3, 4, 5].map(i => {
                      const filled = (hoverRating || rating) >= i;
                      return (
                        <motion.button
                          key={i}
                          type="button"
                          whileHover={{ scale: 1.18 }}
                          whileTap={{ scale: 0.9 }}
                          onMouseEnter={() => setHoverRating(i)}
                          onClick={() => setRating(i)}
                          aria-label={`Rate ${i} out of 5`}
                          className="cursor-pointer"
                        >
                          {filled ? (
                            <AiFillStar size={30} color="#f59e0b" />
                          ) : (
                            <AiOutlineStar size={30} color="#bfc8da" />
                          )}
                        </motion.button>
                      );
                    })}
                    <span className="ml-2 text-[13px] font-medium text-ink-500">
                      {hoverRating || rating}/5
                    </span>
                  </div>
                </div>

                {/* comment */}
                <div className="mt-6">
                  <label className="block font-display text-[15px] font-bold text-ink-900">
                    Comment{" "}
                    <span className="text-[13px] font-normal text-ink-400">
                      (optional)
                    </span>
                  </label>
                  <textarea
                    name="comment"
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    rows={5}
                    placeholder="How was the product? Share your experience so other shoppers know what to expect."
                    className="mt-2 w-full resize-none rounded-xl border border-ink-200 bg-ink-50/60 p-4 text-[14px] leading-relaxed text-ink-800 placeholder:text-ink-400 transition-all duration-200 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
                  />
                </div>

                <motion.button
                  whileHover={rating > 1 ? { scale: 1.015 } : undefined}
                  whileTap={rating > 1 ? { scale: 0.985 } : undefined}
                  onClick={rating > 1 ? reviewHandler : null}
                  disabled={rating <= 1 || isLoading}
                  className="mt-6 flex h-[48px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-brand-600 font-semibold text-white shadow-card transition-colors duration-300 hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isLoading && (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  )}
                  {isLoading ? "Submitting…" : "Submit review"}
                </motion.button>

                {rating <= 1 && (
                  <p className="mt-2 text-center text-[12px] text-ink-400">
                    Pick at least 2 stars to submit.
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default OrderDetails;
