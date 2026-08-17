import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "../../styles/styles";
import { ShippingIcon } from "../../static/ShippingIcon";
import { DailySurpriseIcon } from "../../static/DailySurpriseIcon";
import { AffordablePricesIcon } from "../../static/AffordablePricesIcon";
import { SecurePaymentIcon } from "../../static/SecurePaymentIcon";
import { categoriesData } from "../../static/data";
import SectionHeading from "../ui/SectionHeading";
import {
  staggerContainer,
  listItem,
  viewportAny,
  easeOutSoft,
} from "../../lib/motion";

const brandingData = [
  {
    id: 1,
    title: "Free Shipping",
    Description: "From all orders over 100$",
    icon: <ShippingIcon />,
  },
  {
    id: 21,
    title: "Daily Surprise Offers",
    Description: "Save up to 25% off",
    icon: <DailySurpriseIcon />,
  },
  {
    id: 4,
    title: "Affordable Prices",
    Description: "Get factory direct price",
    icon: <AffordablePricesIcon />,
  },
  {
    id: 5,
    title: "Secure Payments",
    Description: "100% protected payments",
    icon: <SecurePaymentIcon />,
  },
];

function Categories() {
  const navigate = useNavigate();

  return (
    <>
      {/* ---- Service promises ------------------------------------- */}
      <div className={`${styles.section} hidden sm:block`}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportAny}
          className="my-12 grid grid-cols-2 gap-3 lg:grid-cols-4"
        >
          {brandingData.map(brand => (
            <motion.div
              key={brand.id}
              variants={listItem}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.28, ease: easeOutSoft }}
              className="flex items-start gap-3 rounded-2xl border border-ink-100 bg-white p-5 shadow-card transition-shadow duration-300 hover:shadow-card-hover"
            >
              <span className="shrink-0">{brand.icon}</span>
              <div>
                <h3 className="font-display text-[15px] font-bold text-ink-900">
                  {brand.title}
                </h3>
                <p className="mt-0.5 text-[13px] text-ink-500">
                  {brand.Description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ---- Category grid ---------------------------------------- */}
      <div className={`${styles.section} mb-14`} id="categories">
        <SectionHeading
          eyebrow="Browse"
          title="Shop by category"
          subtitle="Jump straight to what you're looking for."
          actionLabel="All products"
          actionTo="/products"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportAny}
          className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        >
          {categoriesData &&
            categoriesData.map(category => (
              <motion.button
                key={category.id}
                variants={listItem}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.28, ease: easeOutSoft }}
                onClick={() => navigate(`/products?category=${category.title}`)}
                className="group relative flex h-[118px] w-full cursor-pointer items-center justify-between overflow-hidden rounded-2xl border border-ink-100 bg-white px-4 text-left shadow-card transition-shadow duration-300 hover:border-brand-200 hover:shadow-card-hover"
              >
                {/* wash that fades in on hover */}
                <span className="absolute inset-0 bg-gradient-to-br from-brand-50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <h5 className="relative z-10 max-w-[55%] font-display text-[15px] font-semibold capitalize leading-snug text-ink-800 transition-colors duration-300 group-hover:text-brand-700">
                  {category.title}
                </h5>

                <img
                  src={category.image_Url}
                  alt={category.title}
                  loading="lazy"
                  className="relative z-10 h-[86px] w-[100px] object-contain transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3"
                />
              </motion.button>
            ))}
        </motion.div>
      </div>
    </>
  );
}

export default Categories;
