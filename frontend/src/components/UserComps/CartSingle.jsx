import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { easeOutSoft } from "../../lib/motion";

function CartSingle({
  item,
  index = 0,
  quantityChangeHandler,
  removeFromCarthandler,
}) {
  const [val, setVal] = useState(item.qty);
  const totalPrice = item.discountPrice * val;

  function Increment(data) {
    if (item.stock < val) {
      toast.error("Product stock limited!");
    } else {
      setVal(val + 1);
      const updateCartData = { ...data, qty: val + 1 };
      quantityChangeHandler(updateCartData);
    }
  }
  function Decrement(data) {
    setVal(val === 1 ? 1 : val - 1);
    const updateCartData = { ...data, qty: val === 1 ? 1 : val - 1 };
    quantityChangeHandler(updateCartData);
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40, height: 0, marginTop: 0, paddingTop: 0, paddingBottom: 0 }}
      transition={{ duration: 0.32, ease: easeOutSoft, delay: index * 0.04 }}
      className="flex gap-3 border-b border-ink-100 px-5 py-4"
    >
      {/* image */}
      <img
        src={`${item ? item && item?.images[0].url : ""}`}
        alt={item.name}
        className="h-[76px] w-[76px] shrink-0 rounded-xl border border-ink-100 bg-white object-contain p-1.5"
      />

      {/* details */}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 text-[14px] font-medium leading-snug text-ink-900">
            {item.name}
          </h3>
          <button
            onClick={() => removeFromCarthandler(item)}
            aria-label={`Remove ${item.name} from cart`}
            className="grid h-7 w-7 shrink-0 cursor-pointer place-items-center rounded-full text-ink-400 transition-colors hover:bg-danger-50 hover:text-danger-500"
          >
            <RxCross1 size={13} />
          </button>
        </div>

        <p className="mt-1 text-[12px] text-ink-400">
          ${item?.discountPrice} each
        </p>

        <div className="mt-2.5 flex items-center justify-between">
          {/* quantity stepper */}
          <div className="flex items-center gap-2.5">
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={() => Decrement(item)}
              aria-label="Decrease quantity"
              className="grid h-7 w-7 cursor-pointer place-items-center rounded-full bg-ink-100 text-ink-600 transition-colors hover:bg-ink-200 disabled:opacity-40"
              disabled={val <= 1}
            >
              <HiOutlineMinus size={14} />
            </motion.button>

            <span className="min-w-[18px] text-center font-display text-[14px] font-bold tabular-nums text-ink-900">
              {val}
            </span>

            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={() => Increment(item)}
              aria-label="Increase quantity"
              className="grid h-7 w-7 cursor-pointer place-items-center rounded-full bg-brand-600 text-white transition-colors hover:bg-brand-700"
            >
              <HiPlus size={14} />
            </motion.button>
          </div>

          <motion.span
            key={totalPrice}
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.22 }}
            className="font-display text-[16px] font-bold text-ink-900"
          >
            ${totalPrice.toFixed(2)}
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}

export default CartSingle;
