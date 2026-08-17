import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  AiFillHeart,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
import ProductDetailCard from "./ProductDetailCard";
import Ratings from "./Ratings";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux-toolkit/actions/wishlistActions";
import { toast } from "react-toastify";
import { addToCart } from "../../redux-toolkit/actions/cartActions";
import { easeOutSoft } from "../../lib/motion";

/** Small circular action button that slides in from the right on hover. */
function QuickAction({ icon: Icon, onClick, title, active, index }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      title={title}
      aria-label={title}
      variants={{
        rest: { opacity: 0, x: 14 },
        hover: { opacity: 1, x: 0 },
      }}
      transition={{ duration: 0.25, ease: easeOutSoft, delay: index * 0.05 }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.9 }}
      className={`grid h-9 w-9 place-items-center rounded-full border border-ink-100 bg-white/95 shadow-card backdrop-blur transition-colors duration-200 ${
        active
          ? "text-danger-500"
          : "text-ink-600 hover:bg-ink-900 hover:text-white"
      }`}
    >
      <Icon size={17} />
    </motion.button>
  );
}

function ProductCard({ product, isEvent }) {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { wishlist } = useSelector(state => state.wishlist);
  const { cart } = useSelector(state => state.cart);

  function removeFromWishListhandler(data) {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  }
  function addToWishListhandler(data) {
    setClick(!click);
    dispatch(addToWishlist(data));
  }
  function addToCarthandler(id) {
    const isItemExists = cart && cart?.find(i => i?._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (product.stock < 1) return toast.error("Product stock is Limited!");
      else {
        const cartData = { ...product, qty: 1 };
        dispatch(addToCart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  }

  console.log(product);

  useEffect(
    function () {
      if (wishlist && wishlist.find(item => item._id === product._id))
        setClick(true);
      else setClick(false);
    },
    [wishlist, product._id],
  );

  const productHref = isEvent
    ? `/product/${product._id}?isEvent=true`
    : `/product/${product._id}`;

  const discountPct =
    product?.originalPrice && product.originalPrice > product.discountPrice
      ? Math.round(
          ((product.originalPrice - product.discountPrice) /
            product.originalPrice) *
            100,
        )
      : 0;

  const outOfStock = product?.stock < 1;

  return (
    <>
      <motion.div
        initial="rest"
        whileHover="hover"
        animate="rest"
        whileTap={{ scale: 0.99 }}
        variants={{
          rest: { y: 0 },
          hover: { y: -6 },
        }}
        transition={{ duration: 0.32, ease: easeOutSoft }}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-card transition-shadow duration-300 hover:border-brand-100 hover:shadow-card-hover"
      >
        {/* ---- Media ------------------------------------------- */}
        <div className="relative overflow-hidden bg-ink-50/70 p-4">
          <Link to={productHref} className="block">
            <motion.img
              src={`${product.images && product.images[0].url}`}
              alt={product.name}
              loading="lazy"
              variants={{ rest: { scale: 1 }, hover: { scale: 1.08 } }}
              transition={{ duration: 0.5, ease: easeOutSoft }}
              className="mx-auto h-[170px] w-full object-contain"
            />
          </Link>

          {/* badges */}
          <div className="pointer-events-none absolute left-3 top-3 flex flex-col gap-1.5">
            {discountPct > 0 && (
              <span className="rounded-full bg-danger-500 px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
                −{discountPct}%
              </span>
            )}
            {isEvent && (
              <span className="rounded-full bg-accent-400 px-2.5 py-1 text-[11px] font-bold text-ink-900 shadow-sm">
                Event
              </span>
            )}
            {outOfStock && (
              <span className="rounded-full bg-ink-800 px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
                Sold out
              </span>
            )}
          </div>

          {/* quick actions */}
          <div className="absolute right-3 top-3 flex flex-col gap-2">
            <QuickAction
              index={0}
              icon={click ? AiFillHeart : AiOutlineHeart}
              active={click}
              title={click ? "Remove from wishlist" : "Add to wishlist"}
              onClick={() =>
                click
                  ? removeFromWishListhandler(product)
                  : addToWishListhandler(product)
              }
            />
            <QuickAction
              index={1}
              icon={AiOutlineEye}
              title="Quick view"
              onClick={() => setOpen(!open)}
            />
          </div>
        </div>

        {/* ---- Body -------------------------------------------- */}
        <div className="flex flex-1 flex-col px-4 pb-4">
          <Link
            to={`/shop/preview/${product.shop._id}`}
            className="text-[11px] font-semibold uppercase tracking-wider text-brand-600 transition-colors hover:text-brand-700"
          >
            {product.shop.name}
          </Link>

          <Link to={productHref} className="mt-1.5 block">
            <h4 className="line-clamp-2 min-h-[42px] font-display text-[15px] font-semibold leading-snug text-ink-900 transition-colors duration-200 group-hover:text-brand-700">
              {product?.name.length > 60
                ? product?.name.slice(0, 60) + "…"
                : product?.name}
            </h4>
          </Link>

          <div className="mt-2 flex items-center gap-2">
            <Ratings rating={product?.ratings} size={15} />
            <span className="text-[12px] text-ink-400">
              ({product?.reviews?.length || 0})
            </span>
          </div>

          <div className="mt-auto pt-4">
            <div className="flex items-end justify-between">
              <div className="flex items-baseline gap-1.5">
                <span className="font-display text-[19px] font-bold text-ink-900">
                  ${product.discountPrice}
                </span>
                {product?.originalPrice ? (
                  <span className="text-[13px] font-medium text-ink-400 line-through">
                    ${product.originalPrice}
                  </span>
                ) : null}
              </div>
              <span className="text-[12px] font-medium text-ink-400">
                {product?.sold_out} sold
              </span>
            </div>

            <motion.button
              type="button"
              onClick={() => addToCarthandler(product._id)}
              whileTap={{ scale: 0.97 }}
              variants={{
                rest: { backgroundColor: "#f6f8fb", color: "#2a3a5c" },
                hover: { backgroundColor: "#4f46e5", color: "#ffffff" },
              }}
              transition={{ duration: 0.25 }}
              className="mt-3 flex h-[42px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl text-[14px] font-semibold"
            >
              <AiOutlineShoppingCart size={18} />
              Add to cart
            </motion.button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && <ProductDetailCard setOpen={setOpen} product={product} />}
      </AnimatePresence>
    </>
  );
}

export default ProductCard;
