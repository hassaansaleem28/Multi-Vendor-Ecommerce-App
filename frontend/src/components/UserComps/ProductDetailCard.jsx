import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux-toolkit/actions/cartActions";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux-toolkit/actions/wishlistActions";
import Ratings from "./Ratings";
import { backdrop, modal } from "../../lib/motion";

function ProductDetailCard({ setOpen, product }) {
  const { cart } = useSelector(state => state.cart);
  const { wishlist } = useSelector(state => state.wishlist);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const dispatch = useDispatch();

  function handleMessageSubmit() {}
  function IncrementCount() {
    setCount(count + 1);
  }
  function DecrementCount() {
    if (count > 1) setCount(count - 1);
  }
  function addToCarthandler(id) {
    const isItemExists = cart && cart?.find(i => i?._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (product.stock < count)
        return toast.error("Product stock is Limited!");
      else {
        const cartData = { ...product, qty: count };
        dispatch(addToCart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  }
  function removeFromWishListhandler(data) {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  }
  function addToWishListhandler(data) {
    setClick(!click);
    dispatch(addToWishlist(data));
  }

  useEffect(
    function () {
      if (wishlist && wishlist.find(item => item._id === product._id))
        setClick(true);
      else setClick(false);
    },
    [wishlist, product._id]
  );

  // Close on Escape
  useEffect(
    function () {
      function onKey(e) {
        if (e.key === "Escape") setOpen(false);
      }
      window.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
      return () => {
        window.removeEventListener("keydown", onKey);
        document.body.style.overflow = "";
      };
    },
    [setOpen]
  );

  if (!product) return null;

  return (
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
        className="relative max-h-[90vh] w-full max-w-[900px] overflow-y-auto rounded-2xl bg-white shadow-panel"
      >
        <button
          onClick={() => setOpen(false)}
          aria-label="Close quick view"
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink-500 shadow-card backdrop-blur transition-colors hover:bg-ink-900 hover:text-white"
        >
          <RxCross1 size={16} />
        </button>

        <div className="grid gap-0 md:grid-cols-2">
          {/* ---- Media + shop ---------------------------------- */}
          <div className="bg-ink-50 p-6 md:p-8">
            <img
              src={product.images[0].url}
              alt={product.name}
              className="mx-auto h-[260px] w-full rounded-xl object-contain"
            />

            <Link
              to={`/shop/preview/${product?.shop._id}`}
              className="mt-6 flex items-center gap-3 rounded-xl border border-ink-100 bg-white p-3 transition-all duration-300 hover:border-brand-200 hover:shadow-card"
            >
              <img
                src={product?.shop?.avatar?.url}
                alt={product?.shop?.name}
                className="h-12 w-12 rounded-full object-cover ring-2 ring-ink-100"
              />
              <div className="min-w-0">
                <h3 className="truncate font-display text-[15px] font-bold text-ink-900">
                  {product?.shop?.name}
                </h3>
                <p className="text-[13px] text-ink-500">
                  {product?.shop?.ratings || 0} rating
                </p>
              </div>
            </Link>

            <button
              onClick={handleMessageSubmit}
              className="mt-3 flex h-[46px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-ink-900 font-semibold text-white transition-all duration-300 hover:bg-ink-800 active:scale-[0.98]"
            >
              Send message
              <AiOutlineMessage size={18} />
            </button>

            <p className="mt-4 text-center text-[13px] font-medium text-ink-400">
              {product.sold_out} units sold
            </p>
          </div>

          {/* ---- Details ---------------------------------------- */}
          <div className="flex flex-col p-6 md:p-8">
            <h1 className="font-display text-[22px] font-bold leading-snug tracking-tight text-ink-900">
              {product.name}
            </h1>

            <div className="mt-3 flex items-center gap-2">
              <Ratings rating={product?.ratings} size={16} />
              <span className="text-[13px] text-ink-400">
                ({product?.reviews?.length || 0} reviews)
              </span>
            </div>

            <p className="mt-4 max-h-[160px] overflow-y-auto whitespace-pre-line text-[14px] leading-relaxed text-ink-600">
              {product.description}
            </p>

            <div className="mt-6 flex items-baseline gap-2.5">
              <span className="font-display text-[30px] font-bold text-ink-900">
                ${product.discountPrice}
              </span>
              {product.originalPrice ? (
                <span className="text-[16px] font-medium text-ink-400 line-through">
                  ${product.originalPrice}
                </span>
              ) : null}
            </div>

            {/* quantity + wishlist */}
            <div className="mt-7 flex items-center justify-between">
              <div className="flex items-center overflow-hidden rounded-xl border border-ink-200">
                <button
                  onClick={DecrementCount}
                  aria-label="Decrease quantity"
                  className="grid h-11 w-11 cursor-pointer place-items-center text-ink-600 transition-colors hover:bg-ink-50 hover:text-ink-900 disabled:opacity-40"
                  disabled={count <= 1}
                >
                  <AiOutlineMinus size={15} />
                </button>
                <span className="grid h-11 w-12 place-items-center border-x border-ink-200 font-display text-[16px] font-bold tabular-nums text-ink-900">
                  {count}
                </span>
                <button
                  onClick={IncrementCount}
                  aria-label="Increase quantity"
                  className="grid h-11 w-11 cursor-pointer place-items-center text-ink-600 transition-colors hover:bg-ink-50 hover:text-ink-900"
                >
                  <AiOutlinePlus size={15} />
                </button>
              </div>

              <motion.button
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.9 }}
                onClick={() =>
                  click
                    ? removeFromWishListhandler(product)
                    : addToWishListhandler(product)
                }
                title={click ? "Remove from wishlist" : "Add to wishlist"}
                aria-label={click ? "Remove from wishlist" : "Add to wishlist"}
                className={`grid h-11 w-11 cursor-pointer place-items-center rounded-xl border transition-colors duration-200 ${
                  click
                    ? "border-danger-200 bg-danger-50 text-danger-500"
                    : "border-ink-200 text-ink-500 hover:border-danger-200 hover:text-danger-500"
                }`}
              >
                {click ? <AiFillHeart size={21} /> : <AiOutlineHeart size={21} />}
              </motion.button>
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => addToCarthandler(product._id)}
              className="mt-5 flex h-[50px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-brand-600 font-semibold text-white shadow-card transition-all duration-300 hover:bg-brand-700 hover:shadow-card-hover"
            >
              Add to cart
              <AiOutlineShoppingCart size={19} />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ProductDetailCard;
