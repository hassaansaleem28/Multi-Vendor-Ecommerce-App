import { RxCross1 } from "react-icons/rx";
import { AiOutlineHeart } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import WishListSingle from "./WishListSingle";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../../redux-toolkit/actions/wishlistActions";
import { addToCart } from "../../redux-toolkit/actions/cartActions";
import { toast } from "react-toastify";
import { backdrop, drawer } from "../../lib/motion";

function WishList({ setOpenWishList }) {
  const { wishlist } = useSelector(state => state.wishlist);
  const dispatch = useDispatch();

  function removeFromWishlistHandler(data) {
    dispatch(removeFromWishlist(data));
  }
  function addToCartFromWishList(data) {
    const newData = { ...data, qty: 1 };
    dispatch(addToCart(newData));
    setOpenWishList(false);
    toast.success("Product added to cart from wishlist!");
  }

  useEffect(
    function () {
      function onKey(e) {
        if (e.key === "Escape") setOpenWishList(false);
      }
      window.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
      return () => {
        window.removeEventListener("keydown", onKey);
        document.body.style.overflow = "";
      };
    },
    [setOpenWishList]
  );

  const itemCount = wishlist?.length || 0;

  return (
    <motion.div
      variants={backdrop}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={() => setOpenWishList(false)}
      className="fixed inset-0 z-[70] bg-ink-950/50 backdrop-blur-sm"
    >
      <motion.aside
        variants={drawer("right")}
        onClick={e => e.stopPropagation()}
        className="absolute right-0 top-0 flex h-full w-[88%] max-w-[420px] flex-col bg-white shadow-panel"
      >
        <header className="flex items-center justify-between border-b border-ink-100 px-6 py-5">
          <div className="flex items-center gap-2.5">
            <AiOutlineHeart size={22} className="text-danger-500" />
            <h2 className="font-display text-[18px] font-bold text-ink-900">
              Wishlist
            </h2>
            <span className="rounded-full bg-danger-50 px-2.5 py-0.5 text-[12px] font-bold text-danger-600">
              {itemCount}
            </span>
          </div>

          <button
            onClick={() => setOpenWishList(false)}
            aria-label="Close wishlist"
            className="grid h-9 w-9 cursor-pointer place-items-center rounded-full text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-900"
          >
            <RxCross1 size={17} />
          </button>
        </header>

        {itemCount === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="grid h-20 w-20 place-items-center rounded-full bg-danger-50"
            >
              <AiOutlineHeart size={34} className="text-danger-300" />
            </motion.div>
            <h3 className="mt-6 font-display text-[19px] font-bold text-ink-900">
              Your wishlist is empty
            </h3>
            <p className="mt-2 text-[14px] text-ink-500">
              Tap the heart on any product to save it for later.
            </p>
            <Link
              to="/products"
              onClick={() => setOpenWishList(false)}
              className="mt-7 inline-flex h-[46px] items-center rounded-xl bg-brand-600 px-6 font-semibold text-white transition-all duration-300 hover:bg-brand-700 active:scale-95"
            >
              Browse products
            </Link>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto">
            <AnimatePresence initial={false}>
              {wishlist.map((item, i) => (
                <WishListSingle
                  key={item._id || i}
                  item={item}
                  index={i}
                  removeFromWishlistHandler={removeFromWishlistHandler}
                  addToCartFromWishList={addToCartFromWishList}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </motion.aside>
    </motion.div>
  );
}

export default WishList;
