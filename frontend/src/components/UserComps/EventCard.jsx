import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import CountDown from "./CountDown";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../redux-toolkit/actions/cartActions";
import Loader from "../UserComps/Loader";
import { easeOutSoft, viewportAny } from "../../lib/motion";

function EventCard({ active, data, isLoading }) {
  const { cart } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  function addToCarthandler(data) {
    const isItemExists = cart && cart?.find(i => i?._id === data._id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) return toast.error("Product stock is Limited!");
      else {
        const cartData = { ...data, qty: 1 };
        dispatch(addToCart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  }

  if (isLoading) return <Loader />;

  const discountPct =
    data?.originalPrice && data.originalPrice > data.discountPrice
      ? Math.round(
          ((data.originalPrice - data.discountPrice) / data.originalPrice) * 100
        )
      : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportAny}
      transition={{ duration: 0.6, ease: easeOutSoft }}
      className={`relative w-full overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-card lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] ${
        active ? "" : "mb-10"
      }`}
    >
      {/* ---- Media ------------------------------------------------ */}
      <div className="group relative overflow-hidden bg-ink-50 p-6 lg:p-10">
        <motion.img
          src={`${data && data?.images[0].url}`}
          alt={data?.name}
          loading="lazy"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: easeOutSoft }}
          className="mx-auto h-[240px] w-full rounded-2xl object-contain lg:h-[340px]"
        />

        {discountPct > 0 && (
          <motion.span
            initial={{ scale: 0, rotate: -12 }}
            whileInView={{ scale: 1, rotate: -8 }}
            viewport={viewportAny}
            transition={{ type: "spring", stiffness: 300, damping: 16, delay: 0.3 }}
            className="absolute left-6 top-6 grid h-16 w-16 place-items-center rounded-full bg-danger-500 font-display text-[15px] font-extrabold text-white shadow-panel"
          >
            −{discountPct}%
          </motion.span>
        )}
      </div>

      {/* ---- Body ------------------------------------------------- */}
      <div className="flex flex-col justify-center p-6 lg:p-10">
        <span className="mb-3 inline-flex w-fit items-center gap-2 rounded-full bg-accent-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-accent-700">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-500 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-500" />
          </span>
          Limited-time event
        </span>

        <h2 className="font-display text-[24px] font-bold leading-snug tracking-tight text-ink-900 lg:text-[30px]">
          {data.name}
        </h2>

        <p className="mt-3 line-clamp-3 text-[15px] leading-relaxed text-ink-500">
          {data?.description}
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-baseline gap-2.5">
            <span className="font-display text-[28px] font-bold text-ink-900">
              ${data?.discountPrice}
            </span>
            <span className="text-[16px] font-medium text-ink-400 line-through">
              ${data?.originalPrice}
            </span>
          </div>
          <span className="rounded-full bg-success-50 px-3 py-1 text-[13px] font-semibold text-success-700">
            {data.sold_out} sold
          </span>
        </div>

        <div className="mt-6">
          <CountDown data={data} />
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              to={`/product/${data?._id}?isEvent=true`}
              className="group inline-flex h-[50px] items-center gap-2 rounded-xl bg-ink-900 px-6 font-semibold text-white shadow-card transition-all duration-300 hover:bg-ink-800 hover:shadow-card-hover"
            >
              See details
              <IoIosArrowForward className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => addToCarthandler(data)}
            className="inline-flex h-[50px] cursor-pointer items-center gap-2 rounded-xl bg-brand-600 px-6 font-semibold text-white shadow-card transition-all duration-300 hover:bg-brand-700 hover:shadow-card-hover"
          >
            <AiOutlineShoppingCart size={19} />
            Add to cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default EventCard;
