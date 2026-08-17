import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { easeOutSoft, viewportOnce } from "../../lib/motion";

/**
 * The heading that opens every home-page section: small eyebrow label, big
 * display title, an accent rule that draws itself in, and an optional
 * "view all" link on the right.
 */
function SectionHeading({ eyebrow, title, subtitle, actionLabel, actionTo }) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.4, ease: easeOutSoft }}
            className="mb-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-600"
          >
            {eyebrow}
          </motion.p>
        )}

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5, ease: easeOutSoft, delay: 0.06 }}
          className="font-display text-[26px] font-bold tracking-tight text-ink-900 md:text-[34px]"
        >
          {title}
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.55, ease: easeOutSoft, delay: 0.16 }}
          style={{ transformOrigin: "left" }}
          className="mt-3 h-[3px] w-16 rounded-full bg-gradient-to-r from-brand-600 to-accent-400"
        />

        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-3 max-w-xl text-[15px] text-ink-500"
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      {actionLabel && actionTo && (
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.45, ease: easeOutSoft, delay: 0.1 }}
        >
          <Link
            to={actionTo}
            className="group inline-flex items-center gap-1 rounded-full border border-ink-200 bg-white px-4 py-2 text-sm font-semibold text-ink-700 transition-all duration-300 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
          >
            {actionLabel}
            <IoIosArrowForward className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      )}
    </div>
  );
}

export default SectionHeading;
