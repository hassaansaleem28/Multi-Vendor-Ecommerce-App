import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { easeOutSoft } from "../../lib/motion";

/**
 * Title band at the top of interior pages: breadcrumb, page title, optional
 * subtitle and a right-hand slot for filters or counts.
 */
function PageHero({ eyebrow, title, subtitle, crumbs = [], children }) {
  return (
    <div className="relative overflow-hidden border-b border-ink-100 bg-white">
      {/* subtle grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-ink-100) 1px, transparent 1px), linear-gradient(90deg, var(--color-ink-100) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse at 20% 0%, #000 10%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto flex w-11/12 max-w-[1480px] flex-col gap-5 py-10 md:flex-row md:items-end md:justify-between md:py-14">
        <div>
          {crumbs.length > 0 && (
            <motion.nav
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: easeOutSoft }}
              className="mb-3 flex flex-wrap items-center gap-1.5 text-[13px] text-ink-400"
            >
              {crumbs.map((c, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  {c.to ? (
                    <Link
                      to={c.to}
                      className="transition-colors hover:text-brand-600"
                    >
                      {c.label}
                    </Link>
                  ) : (
                    <span className="font-medium text-ink-700">{c.label}</span>
                  )}
                  {i < crumbs.length - 1 && (
                    <IoIosArrowForward size={12} className="text-ink-300" />
                  )}
                </span>
              ))}
            </motion.nav>
          )}

          {eyebrow && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: easeOutSoft, delay: 0.05 }}
              className="mb-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-600"
            >
              {eyebrow}
            </motion.p>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeOutSoft, delay: 0.1 }}
            className="font-display text-[30px] font-bold tracking-tight text-ink-900 md:text-[40px]"
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeOutSoft, delay: 0.16 }}
              className="mt-2.5 max-w-2xl text-[15px] text-ink-500"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeOutSoft, delay: 0.2 }}
            className="shrink-0"
          >
            {children}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default PageHero;
