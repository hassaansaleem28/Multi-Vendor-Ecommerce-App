import { RxCross1 } from "react-icons/rx";
import { BsCartPlus } from "react-icons/bs";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { easeOutSoft } from "../../lib/motion";

function WishListSingle({
  item,
  index = 0,
  removeFromWishlistHandler,
  addToCartFromWishList,
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40, height: 0, paddingTop: 0, paddingBottom: 0 }}
      transition={{ duration: 0.32, ease: easeOutSoft, delay: index * 0.04 }}
      className="flex items-center gap-3 border-b border-ink-100 px-5 py-4"
    >
      <Link to={`/product/${item._id}`} className="shrink-0">
        <img
          src={`${item && item?.images[0]?.url}`}
          alt={item.name}
          className="h-[76px] w-[76px] rounded-xl border border-ink-100 bg-white object-contain p-1.5"
        />
      </Link>

      <div className="min-w-0 flex-1">
        <Link to={`/product/${item._id}`}>
          <h3 className="line-clamp-2 text-[14px] font-medium leading-snug text-ink-900 transition-colors hover:text-brand-700">
            {item.name}
          </h3>
        </Link>
        <p className="mt-1.5 font-display text-[16px] font-bold text-ink-900">
          ${item.discountPrice}
        </p>
      </div>

      <div className="flex shrink-0 flex-col items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.88 }}
          onClick={() => removeFromWishlistHandler(item)}
          title="Remove from wishlist"
          aria-label={`Remove ${item.name} from wishlist`}
          className="grid h-8 w-8 cursor-pointer place-items-center rounded-full text-ink-400 transition-colors hover:bg-danger-50 hover:text-danger-500"
        >
          <RxCross1 size={14} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.88 }}
          onClick={() => addToCartFromWishList(item)}
          title="Add to cart"
          aria-label={`Add ${item.name} to cart`}
          className="grid h-9 w-9 cursor-pointer place-items-center rounded-full bg-brand-50 text-brand-700 transition-colors hover:bg-brand-600 hover:text-white"
        >
          <BsCartPlus size={17} />
        </motion.button>
      </div>
    </motion.div>
  );
}

export default WishListSingle;
