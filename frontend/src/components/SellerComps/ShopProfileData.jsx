import { useEffect, useState } from "react";
import ProductCard from "../UserComps/ProductCard";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { RxDashboard } from "react-icons/rx";
import { getAllProductsShop } from "../../redux-toolkit/actions/productActions";
import Ratings from "../UserComps/Ratings";
import { getAllEventsShop } from "../../redux-toolkit/actions/eventActions";
import { staggerContainer, listItem, easeOutSoft } from "../../lib/motion";

const panel = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: easeOutSoft } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.18 } },
};

function EmptyPanel({ title, message }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink-200 bg-white/60 px-6 py-16 text-center">
      <h3 className="font-display text-[18px] font-bold text-ink-900">
        {title}
      </h3>
      <p className="mt-1.5 max-w-sm text-[14px] text-ink-500">{message}</p>
    </div>
  );
}

function ShopProfileData({ isOwner }) {
  const [active, setActive] = useState(1);
  const { product } = useSelector(state => state.product);
  const dispatch = useDispatch();
  const { events } = useSelector(state => state.events);
  const { seller } = useSelector(state => state.seller);
  const { id } = useParams();

  const allReviews = product && product.map(product => product.reviews).flat();

  useEffect(
    function () {
      dispatch(getAllProductsShop(id));
      dispatch(getAllEventsShop(seller._id));
    },
    [dispatch]
  );

  const tabs = [
    { id: 1, label: "Products", count: product?.length || 0 },
    { id: 2, label: "Running events", count: events?.length || 0 },
    { id: 3, label: "Reviews", count: allReviews?.length || 0 },
  ];

  return (
    <div className="w-full">
      {/* ---- Tabs ------------------------------------------------ */}
      <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
        <div className="no-scrollbar flex gap-1 overflow-x-auto rounded-xl border border-ink-100 bg-white p-1.5">
          {tabs.map(tab => {
            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={`relative shrink-0 cursor-pointer rounded-lg px-4 py-2.5 font-display text-[14px] font-semibold transition-colors duration-200 ${
                  isActive ? "text-white" : "text-ink-500 hover:text-ink-900"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="shop-tab-pill"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    className="absolute inset-0 rounded-lg bg-ink-900"
                  />
                )}
                <span className="relative z-10">
                  {tab.label}
                  <span
                    className={`ml-1.5 rounded-full px-1.5 py-0.5 text-[11px] font-bold ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-ink-100 text-ink-500"
                    }`}
                  >
                    {tab.count}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {isOwner && (
          <Link to={"/dashboard"}>
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex h-[44px] cursor-pointer items-center gap-2 rounded-xl bg-brand-600 px-5 font-semibold text-white shadow-card transition-colors duration-300 hover:bg-brand-700"
            >
              <RxDashboard size={17} />
              Dashboard
            </motion.div>
          </Link>
        )}
      </div>

      {/* ---- Panels ---------------------------------------------- */}
      <AnimatePresence mode="wait">
        {active === 1 && (
          <motion.div
            key="products"
            variants={panel}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {product && product.length > 0 ? (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="mb-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                {product.map((product, index) => (
                  <motion.div key={product?._id || index} variants={listItem}>
                    <ProductCard product={product} isShop={true} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <EmptyPanel
                title="No products yet"
                message="This shop hasn't listed anything so far."
              />
            )}
          </motion.div>
        )}

        {active === 2 && (
          <motion.div
            key="events"
            variants={panel}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {events && events.length > 0 ? (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="mb-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                {events.map((product, index) => (
                  <motion.div key={product?._id || index} variants={listItem}>
                    <ProductCard product={product} isShop={true} isEvent={true} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <EmptyPanel
                title="No events running"
                message="This shop has no active flash sales right now."
              />
            )}
          </motion.div>
        )}

        {active === 3 && (
          <motion.div
            key="reviews"
            variants={panel}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {allReviews && allReviews.length > 0 ? (
              <div className="divide-y divide-ink-100 rounded-2xl border border-ink-100 bg-white px-6 shadow-card">
                {allReviews.map((data, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.32 }}
                    className="flex gap-4 py-5"
                  >
                    <img
                      src={`${data.user.avatar.url}`}
                      alt={data.user.fullName}
                      className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-ink-100"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <h4 className="font-display text-[15px] font-bold text-ink-900">
                          {data.user.fullName}
                        </h4>
                        <Ratings rating={data.rating} size={14} />
                      </div>
                      <p className="mt-2 text-[14px] leading-relaxed text-ink-600">
                        {data?.comment}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <EmptyPanel
                title="No reviews yet"
                message="Reviews appear here once shoppers rate this shop's products."
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ShopProfileData;
