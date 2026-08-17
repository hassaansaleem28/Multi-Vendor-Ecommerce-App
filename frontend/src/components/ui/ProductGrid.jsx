import { motion } from "framer-motion";
import ProductCard from "../UserComps/ProductCard";
import { staggerContainer, listItem } from "../../lib/motion";
import { ProductGridSkeleton } from "./Skeletons";

/**
 * The responsive product grid used by every listing page, with a staggered
 * reveal as it scrolls into view.
 */
function ProductGrid({
  products = [],
  isEvent = false,
  loading = false,
  skeletonCount = 5,
  emptyTitle = "No products found",
  emptyMessage = "Try a different category or check back soon.",
  className = "",
}) {
  if (loading) return <ProductGridSkeleton count={skeletonCount} />;

  if (!products || products.length === 0) {
    return (
      // `key` matters: without it React reconciles this motion.div with the
      // grid's motion.div below (same element type, same tree position). The
      // grid would then inherit this one's in-flight animation values and
      // never run its own variants, leaving every card stuck at opacity 0.
      <motion.div
        key="product-grid-empty"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink-200 bg-white/60 px-6 py-20 text-center"
      >
        <div className="grid h-16 w-16 place-items-center rounded-full bg-ink-50">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-ink-300"
          >
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
        </div>
        <h3 className="mt-5 font-display text-[19px] font-bold text-ink-900">
          {emptyTitle}
        </h3>
        <p className="mt-1.5 max-w-sm text-[14px] text-ink-500">
          {emptyMessage}
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      key="product-grid"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className={`grid grid-cols-1 gap-[20px] sm:grid-cols-2 md:gap-[25px] lg:grid-cols-4 xl:grid-cols-5 xl:gap-[30px] ${className}`}
    >
      {products.map((product, i) => (
        <motion.div key={product?._id || i} variants={listItem}>
          <ProductCard product={product} isEvent={isEvent} />
        </motion.div>
      ))}
    </motion.div>
  );
}

export default ProductGrid;
