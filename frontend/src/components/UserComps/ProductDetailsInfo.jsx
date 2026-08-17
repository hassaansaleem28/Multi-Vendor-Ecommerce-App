import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Ratings from "./Ratings";
import { easeOutSoft } from "../../lib/motion";

const TABS = [
  { id: 1, label: "Product Details" },
  { id: 2, label: "Reviews" },
  { id: 3, label: "Seller Information" },
];

function ProductDetailsInfo({ data, product, totalReviewsLength, avgRating }) {
  const navigate = useNavigate();
  const [active, setActive] = useState(1);

  const panel = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: easeOutSoft } },
    exit: { opacity: 0, y: -8, transition: { duration: 0.18 } },
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white">
      {/* ---- Tab bar ---------------------------------------------- */}
      <div className="no-scrollbar flex overflow-x-auto border-b border-ink-100 px-2">
        {TABS.map(tab => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`relative shrink-0 cursor-pointer px-5 py-4 font-display text-[15px] font-semibold transition-colors duration-200 md:px-7 md:text-[16px] ${
                isActive
                  ? "text-brand-700"
                  : "text-ink-500 hover:text-ink-900"
              }`}
            >
              {tab.label}
              {tab.id === 2 && (
                <span className="ml-1.5 rounded-full bg-ink-100 px-1.5 py-0.5 text-[11px] font-bold text-ink-500">
                  {data?.reviews?.length || 0}
                </span>
              )}
              {isActive && (
                <motion.span
                  layoutId="product-tab-underline"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  className="absolute inset-x-3 bottom-0 h-[3px] rounded-t-full bg-brand-600"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* ---- Panels ------------------------------------------------ */}
      <div className="p-6 md:p-8">
        <AnimatePresence mode="wait">
          {/* Details ------------------------------------------- */}
          {active === 1 && (
            <motion.div
              key="details"
              variants={panel}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <p className="whitespace-pre-line text-[15px] leading-[1.8] text-ink-600">
                {data.description}
              </p>
            </motion.div>
          )}

          {/* Reviews ------------------------------------------- */}
          {active === 2 && (
            <motion.div
              key="reviews"
              variants={panel}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="min-h-[220px]"
            >
              {data?.reviews?.length ? (
                <div className="divide-y divide-ink-100">
                  {data.reviews.map((review, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.35 }}
                      className="flex gap-4 py-5 first:pt-0 last:pb-0"
                    >
                      <img
                        src={`${review?.user?.avatar?.url}`}
                        alt={review?.user?.fullName}
                        className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-ink-100"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          <h4 className="font-display text-[15px] font-bold text-ink-900">
                            {review?.user?.fullName}
                          </h4>
                          <Ratings rating={review?.rating} size={14} />
                        </div>
                        <p className="mt-2 text-[14px] leading-relaxed text-ink-600">
                          {review?.comment}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-14 text-center">
                  <div className="grid h-14 w-14 place-items-center rounded-full bg-ink-50">
                    <Ratings rating={0} size={16} />
                  </div>
                  <h4 className="mt-4 font-display text-[17px] font-bold text-ink-900">
                    No reviews yet
                  </h4>
                  <p className="mt-1 text-[14px] text-ink-500">
                    Be the first to review this product after your purchase.
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {/* Seller -------------------------------------------- */}
          {active === 3 && (
            <motion.div
              key="seller"
              variants={panel}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid gap-8 md:grid-cols-2"
            >
              <div>
                <button
                  onClick={() => navigate(`/shop/preview/${data.shop._id}`)}
                  className="flex cursor-pointer items-center gap-4 text-left"
                >
                  <img
                    src={`${data.shop.avatar.url}`}
                    alt={data.shop.name}
                    className="h-[60px] w-[60px] rounded-full object-cover ring-2 ring-ink-100 transition-all duration-300 hover:ring-brand-300"
                  />
                  <div>
                    <h3 className="font-display text-[18px] font-bold text-ink-900">
                      {data.shop.name}
                    </h3>
                    <p className="text-[13px] text-ink-500">
                      {Number(avgRating).toFixed(1)}/5 rating
                    </p>
                  </div>
                </button>

                <p className="mt-4 text-[15px] leading-relaxed text-ink-600">
                  {data.shop.description}
                </p>
              </div>

              <div className="rounded-2xl border border-ink-100 bg-ink-50/60 p-6">
                <dl className="space-y-4">
                  {[
                    {
                      label: "Joined on",
                      value: data?.shop?.createdAt?.slice(0, 10),
                    },
                    { label: "Total products", value: product?.length ?? 0 },
                    { label: "Total reviews", value: totalReviewsLength ?? 0 },
                  ].map(row => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between border-b border-ink-200/70 pb-3 last:border-0 last:pb-0"
                    >
                      <dt className="text-[14px] text-ink-500">{row.label}</dt>
                      <dd className="font-display text-[15px] font-bold text-ink-900">
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <Link to={`/shop/preview/${data?.shop?._id}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-6 flex h-[46px] cursor-pointer items-center justify-center rounded-xl bg-ink-900 font-semibold text-white transition-colors duration-300 hover:bg-ink-800"
                  >
                    Visit shop
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default ProductDetailsInfo;
