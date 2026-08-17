import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";
import {
  HiOutlineTruck,
  HiOutlineShieldCheck,
  HiOutlineRefresh,
} from "react-icons/hi";
import { AnimatePresence, motion } from "framer-motion";
import ProductDetailsInfo from "./ProductDetailsInfo";
import Ratings from "./Ratings";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux-toolkit/actions/productActions";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux-toolkit/actions/wishlistActions";
import { addToCart } from "../../redux-toolkit/actions/cartActions";
import { toast } from "react-toastify";
import axios from "axios";
import { easeOutSoft } from "../../lib/motion";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const perks = [
  { icon: HiOutlineTruck, label: "Free shipping over $100" },
  { icon: HiOutlineShieldCheck, label: "Buyer protection included" },
  { icon: HiOutlineRefresh, label: "30-day easy returns" },
];

function ProductDetails({ data }) {
  const { wishlist } = useSelector(state => state.wishlist);
  const { cart } = useSelector(state => state.cart);
  const { product } = useSelector(state => state.product);
  const { user, isAuthenticated } = useSelector(state => state.user);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const totalReviewsLength =
    product && product.reduce((acc, prod) => acc + prod.reviews.length, 0);
  const totalRatings =
    product &&
    product.reduce(
      (acc, prod) =>
        acc + prod.reviews.reduce((sum, rev) => sum + rev.rating, 0),
      0
    );
  const avgRating = totalRatings / totalReviewsLength || 0;

  useEffect(
    function () {
      dispatch(getAllProductsShop(data && data?.shop._id));
      if (wishlist && wishlist.find(item => item._id === data?._id))
        setClick(true);
      else setClick(false);
    },
    [dispatch, data, wishlist, data?._id]
  );

  function IncrementCount() {
    setCount(count + 1);
  }
  function DecrementCount() {
    if (count > 1) setCount(count - 1);
  }
  async function handleMessageSubmit() {
    try {
      if (isAuthenticated) {
        const groupTitle = data?._id + user?._id;
        const userId = user?._id;
        const sellerId = data?.shop?._id;
        await axios
          .post(`${API_BASE_URL}/api/v2/conversation/create-new-conversation`, {
            groupTitle,
            userId,
            sellerId,
          })
          .then(res => navigate(`/inbox?${res.data.conversation._id}`));
      } else {
        toast.error("Please login to create a conversation!");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

  function removeFromWishListhandler(data) {
    setClick(click => !click);
    dispatch(removeFromWishlist(data));
  }
  function addToWishListhandler(data) {
    setClick(click => !click);
    dispatch(addToWishlist(data));
  }
  function addToCarthandler(id) {
    const isItemExists = cart && cart?.find(i => i?._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (product.stock < 1) return toast.error("Product stock is Limited!");
      else {
        const cartData = { ...data, qty: count };
        dispatch(addToCart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  }

  if (!data) return null;

  const discountPct =
    data?.originalPrice && data.originalPrice > data.discountPrice
      ? Math.round(
          ((data.originalPrice - data.discountPrice) / data.originalPrice) * 100
        )
      : 0;

  const lowStock = data?.stock > 0 && data?.stock <= 10;

  return (
    <div className="bg-ink-50">
      <div className={`${styles.section} py-10`}>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* ================= Gallery ========================== */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeOutSoft }}
              className="relative overflow-hidden rounded-2xl border border-ink-100 bg-white p-6"
            >
              {discountPct > 0 && (
                <span className="absolute left-5 top-5 z-10 rounded-full bg-danger-500 px-3 py-1.5 text-[12px] font-bold text-white shadow-card">
                  −{discountPct}% off
                </span>
              )}

              <AnimatePresence mode="wait">
                <motion.img
                  key={select}
                  src={`${data?.images[select].url}`}
                  alt={data.name}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.3, ease: easeOutSoft }}
                  className="mx-auto h-[340px] w-full object-contain md:h-[440px]"
                />
              </AnimatePresence>
            </motion.div>

            {/* thumbnails */}
            {data?.images?.length > 1 && (
              <div className="no-scrollbar mt-4 flex gap-3 overflow-x-auto pb-1">
                {data.images.map((img, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setSelect(i)}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={`View image ${i + 1}`}
                    className={`relative h-[84px] w-[84px] shrink-0 overflow-hidden rounded-xl border-2 bg-white p-2 transition-colors duration-200 ${
                      select === i
                        ? "border-brand-600"
                        : "border-ink-100 hover:border-ink-300"
                    }`}
                  >
                    <img
                      src={`${img?.url}`}
                      alt={`${data.name} thumbnail ${i + 1}`}
                      className="h-full w-full object-contain"
                    />
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          {/* ================= Info ============================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeOutSoft, delay: 0.1 }}
            className="flex flex-col"
          >
            <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-brand-600">
              {data.category}
            </span>

            <h1 className="mt-2 font-display text-[26px] font-bold leading-tight tracking-tight text-ink-900 md:text-[34px]">
              {data.name}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <Ratings rating={data?.ratings} size={17} />
              <span className="text-[13px] text-ink-500">
                {data?.reviews?.length || 0} review
                {data?.reviews?.length === 1 ? "" : "s"}
              </span>
              <span className="text-ink-200">•</span>
              <span className="text-[13px] text-ink-500">
                {data?.sold_out} sold
              </span>
            </div>

            {/* price */}
            <div className="mt-6 flex flex-wrap items-baseline gap-3">
              <span className="font-display text-[36px] font-extrabold tracking-tight text-ink-900">
                ${data.discountPrice}
              </span>
              {data.originalPrice ? (
                <span className="text-[19px] font-medium text-ink-400 line-through">
                  ${data.originalPrice}
                </span>
              ) : null}
              {discountPct > 0 && (
                <span className="rounded-full bg-danger-50 px-2.5 py-1 text-[12px] font-bold text-danger-600">
                  Save {discountPct}%
                </span>
              )}
            </div>

            {/* stock */}
            <div className="mt-4">
              {data?.stock > 0 ? (
                <span
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[13px] font-semibold ${
                    lowStock
                      ? "bg-accent-50 text-accent-700"
                      : "bg-success-50 text-success-700"
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      lowStock ? "bg-accent-500" : "bg-success-500"
                    }`}
                  />
                  {lowStock
                    ? `Only ${data.stock} left in stock`
                    : `In stock (${data.stock} available)`}
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-full bg-danger-50 px-3 py-1.5 text-[13px] font-semibold text-danger-600">
                  <span className="h-2 w-2 rounded-full bg-danger-500" />
                  Out of stock
                </span>
              )}
            </div>

            <p className="mt-5 line-clamp-4 whitespace-pre-line text-[15px] leading-relaxed text-ink-600">
              {data.description}
            </p>

            {/* quantity + wishlist */}
            <div className="mt-8 flex items-center gap-4">
              <div className="flex items-center overflow-hidden rounded-xl border border-ink-200 bg-white">
                <button
                  onClick={DecrementCount}
                  disabled={count <= 1}
                  aria-label="Decrease quantity"
                  className="grid h-12 w-12 cursor-pointer place-items-center text-ink-600 transition-colors hover:bg-ink-50 hover:text-ink-900 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <AiOutlineMinus size={16} />
                </button>
                <span className="grid h-12 w-14 place-items-center border-x border-ink-200 font-display text-[17px] font-bold tabular-nums text-ink-900">
                  {count}
                </span>
                <button
                  onClick={IncrementCount}
                  aria-label="Increase quantity"
                  className="grid h-12 w-12 cursor-pointer place-items-center text-ink-600 transition-colors hover:bg-ink-50 hover:text-ink-900"
                >
                  <AiOutlinePlus size={16} />
                </button>
              </div>

              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={() =>
                  click
                    ? removeFromWishListhandler(data)
                    : addToWishListhandler(data)
                }
                title={click ? "Remove from wishlist" : "Add to wishlist"}
                aria-label={click ? "Remove from wishlist" : "Add to wishlist"}
                className={`grid h-12 w-12 cursor-pointer place-items-center rounded-xl border bg-white transition-colors duration-200 ${
                  click
                    ? "border-danger-200 text-danger-500"
                    : "border-ink-200 text-ink-500 hover:border-danger-200 hover:text-danger-500"
                }`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={click ? "on" : "off"}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    {click ? (
                      <AiFillHeart size={23} />
                    ) : (
                      <AiOutlineHeart size={23} />
                    )}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => addToCarthandler(data._id)}
              className="mt-5 flex h-[54px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-brand-600 font-display text-[16px] font-bold text-white shadow-card transition-colors duration-300 hover:bg-brand-700 hover:shadow-card-hover"
            >
              <AiOutlineShoppingCart size={21} />
              Add to cart
            </motion.button>

            {/* perks */}
            <ul className="mt-7 grid gap-3 rounded-2xl border border-ink-100 bg-white p-5 sm:grid-cols-3">
              {perks.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-2.5 text-[13px] font-medium text-ink-600"
                >
                  <Icon size={20} className="shrink-0 text-brand-600" />
                  {label}
                </li>
              ))}
            </ul>

            {/* seller */}
            <div className="mt-6 flex flex-wrap items-center gap-4 rounded-2xl border border-ink-100 bg-white p-5">
              <button
                onClick={() => navigate(`/shop/preview/${data?.shop?._id}`)}
                className="flex flex-1 cursor-pointer items-center gap-3 text-left"
              >
                <img
                  src={`${data?.shop?.avatar?.url}`}
                  alt={data.shop.name}
                  className="h-[54px] w-[54px] rounded-full object-cover ring-2 ring-ink-100 transition-all duration-300 hover:ring-brand-300"
                />
                <div className="min-w-0">
                  <h3 className="truncate font-display text-[16px] font-bold text-ink-900">
                    {data.shop.name}
                  </h3>
                  <p className="text-[13px] text-ink-500">
                    {avgRating.toFixed(1)}/5 rating · View shop
                  </p>
                </div>
              </button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleMessageSubmit}
                className="flex h-[44px] cursor-pointer items-center gap-2 rounded-xl border border-ink-200 px-5 text-[14px] font-semibold text-ink-700 transition-colors duration-300 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
              >
                Message
                <AiOutlineMessage size={17} />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* ================= Tabs ============================== */}
        <div className="mt-14">
          <ProductDetailsInfo
            data={data}
            product={product}
            totalReviewsLength={totalReviewsLength}
            avgRating={avgRating}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
