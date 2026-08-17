import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import CartSingle from "./CartSingle";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
} from "../../redux-toolkit/actions/cartActions";
import { backdrop, drawer } from "../../lib/motion";

function Cart({ setOpenCart }) {
  const { cart } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  function removeFromCarthandler(data) {
    dispatch(removeFromCart(data));
  }
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );
  function quantityChangeHandler(data) {
    dispatch(addToCart(data));
  }

  // Escape to close + lock background scroll
  useEffect(
    function () {
      function onKey(e) {
        if (e.key === "Escape") setOpenCart(false);
      }
      window.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
      return () => {
        window.removeEventListener("keydown", onKey);
        document.body.style.overflow = "";
      };
    },
    [setOpenCart]
  );

  const itemCount = cart?.length || 0;

  return (
    <motion.div
      variants={backdrop}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={() => setOpenCart(false)}
      className="fixed inset-0 z-[70] bg-ink-950/50 backdrop-blur-sm"
    >
      <motion.aside
        variants={drawer("right")}
        onClick={e => e.stopPropagation()}
        className="absolute right-0 top-0 flex h-full w-[88%] max-w-[420px] flex-col bg-white shadow-panel"
      >
        {/* ---- Head ---------------------------------------------- */}
        <header className="flex items-center justify-between border-b border-ink-100 px-6 py-5">
          <div className="flex items-center gap-2.5">
            <IoBagHandleOutline size={22} className="text-ink-700" />
            <h2 className="font-display text-[18px] font-bold text-ink-900">
              Your cart
            </h2>
            <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-[12px] font-bold text-brand-700">
              {itemCount}
            </span>
          </div>

          <button
            onClick={() => setOpenCart(false)}
            aria-label="Close cart"
            className="grid h-9 w-9 cursor-pointer place-items-center rounded-full text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-900"
          >
            <RxCross1 size={17} />
          </button>
        </header>

        {/* ---- Body ---------------------------------------------- */}
        {itemCount === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="grid h-20 w-20 place-items-center rounded-full bg-ink-50"
            >
              <IoBagHandleOutline size={34} className="text-ink-300" />
            </motion.div>
            <h3 className="mt-6 font-display text-[19px] font-bold text-ink-900">
              Your cart is empty
            </h3>
            <p className="mt-2 text-[14px] text-ink-500">
              Add a few things you love and they&apos;ll show up here.
            </p>
            <Link
              to="/products"
              onClick={() => setOpenCart(false)}
              className="mt-7 inline-flex h-[46px] items-center rounded-xl bg-brand-600 px-6 font-semibold text-white transition-all duration-300 hover:bg-brand-700 active:scale-95"
            >
              Start shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto">
              <AnimatePresence initial={false}>
                {cart.map((item, i) => (
                  <CartSingle
                    key={item._id || i}
                    item={item}
                    index={i}
                    quantityChangeHandler={quantityChangeHandler}
                    removeFromCarthandler={removeFromCarthandler}
                  />
                ))}
              </AnimatePresence>
            </div>

            {/* ---- Footer ---------------------------------------- */}
            <footer className="border-t border-ink-100 bg-ink-50/60 px-6 py-5">
              <div className="mb-1.5 flex items-center justify-between text-[14px] text-ink-500">
                <span>Subtotal</span>
                <span className="font-medium text-ink-700">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <div className="mb-4 flex items-center justify-between">
                <span className="font-display text-[16px] font-bold text-ink-900">
                  Total
                </span>
                <motion.span
                  key={totalPrice}
                  initial={{ scale: 1.12, color: "#4f46e5" }}
                  animate={{ scale: 1, color: "#111a2e" }}
                  transition={{ duration: 0.3 }}
                  className="font-display text-[24px] font-extrabold"
                >
                  ${totalPrice.toFixed(2)}
                </motion.span>
              </div>

              <p className="mb-4 text-[12px] text-ink-400">
                Shipping and taxes calculated at checkout.
              </p>

              <Link to="/checkout" onClick={() => setOpenCart(false)}>
                <motion.div
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  className="group flex h-[50px] cursor-pointer items-center justify-center gap-2 rounded-xl bg-brand-600 font-display text-[16px] font-bold text-white shadow-card transition-colors duration-300 hover:bg-brand-700"
                >
                  Checkout
                  <IoIosArrowForward className="transition-transform duration-300 group-hover:translate-x-1" />
                </motion.div>
              </Link>
            </footer>
          </>
        )}
      </motion.aside>
    </motion.div>
  );
}

export default Cart;
