import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { easeOutSoft } from "../../lib/motion";

const TONES = {
  brand: "bg-brand-50 text-brand-600",
  accent: "bg-accent-50 text-accent-600",
  success: "bg-success-50 text-success-600",
  danger: "bg-danger-50 text-danger-600",
  ink: "bg-ink-100 text-ink-600",
};

/** KPI tile used across the seller and admin dashboards. */
function StatCard({
  icon: Icon,
  label,
  hint,
  value,
  to,
  linkLabel,
  tone = "brand",
  index = 0,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: easeOutSoft, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className="flex flex-col rounded-2xl border border-ink-100 bg-white p-6 shadow-card transition-shadow duration-300 hover:shadow-card-hover"
    >
      <div className="flex items-start gap-3">
        {Icon && (
          <span
            className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${
              TONES[tone] || TONES.brand
            }`}
          >
            <Icon size={22} />
          </span>
        )}
        <div className="min-w-0">
          <p className="text-[14px] font-medium text-ink-500">{label}</p>
          {hint && <p className="text-[12px] text-ink-400">{hint}</p>}
        </div>
      </div>

      <motion.p
        key={String(value)}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: easeOutSoft }}
        className="mt-5 font-display text-[30px] font-extrabold tracking-tight text-ink-900"
      >
        {value}
      </motion.p>

      {to && (
        <Link
          to={to}
          className="group mt-4 inline-flex items-center gap-1 text-[13px] font-semibold text-brand-600 transition-colors hover:text-brand-700"
        >
          {linkLabel}
          <IoIosArrowForward className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      )}
    </motion.div>
  );
}

export default StatCard;
