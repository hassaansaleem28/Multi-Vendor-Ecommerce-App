import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiCheck, HiOutlineExclamation } from "react-icons/hi";
import { easeOutSoft } from "../../lib/motion";

/**
 * Shared result screen for the two email-activation routes. `status` is one
 * of "pending" | "success" | "error".
 */
function ActivationResult({ status, title, message, ctaLabel, ctaTo }) {
  const isError = status === "error";
  const isPending = status === "pending";

  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-ink-950 px-5">
      {/* ambient colour */}
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-float-slow absolute left-1/2 top-1/4 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-brand-600/25 blur-[120px]" />
        <div
          className={`animate-float-slow absolute bottom-0 right-1/4 h-[320px] w-[320px] rounded-full blur-[120px] ${
            isError ? "bg-danger-500/20" : "bg-accent-500/15"
          }`}
          style={{ animationDelay: "2s" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: easeOutSoft }}
        className="relative z-10 w-full max-w-[460px] rounded-2xl border border-white/10 bg-white/[0.04] p-9 text-center backdrop-blur-xl"
      >
        {/* icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 18,
            delay: 0.15,
          }}
          className={`mx-auto grid h-20 w-20 place-items-center rounded-full ${
            isError
              ? "bg-danger-500/15 ring-1 ring-danger-500/30"
              : isPending
                ? "bg-white/10 ring-1 ring-white/20"
                : "bg-success-500/15 ring-1 ring-success-500/30"
          }`}
        >
          {isPending ? (
            <span className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
          ) : isError ? (
            <HiOutlineExclamation className="h-10 w-10 text-danger-500" />
          ) : (
            <motion.span
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.35 }}
            >
              <HiCheck className="h-11 w-11 text-success-500" />
            </motion.span>
          )}
        </motion.div>

        {/* success ripple */}
        {status === "success" && (
          <motion.div
            initial={{ scale: 0.6, opacity: 0.5 }}
            animate={{ scale: 1.9, opacity: 0 }}
            transition={{ duration: 1.1, delay: 0.3, ease: "easeOut" }}
            className="pointer-events-none absolute left-1/2 top-[76px] h-20 w-20 -translate-x-1/2 rounded-full border border-success-500/50"
          />
        )}

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: easeOutSoft, delay: 0.25 }}
          className="mt-7 font-display text-[26px] font-bold tracking-tight text-white"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: easeOutSoft, delay: 0.33 }}
          className="mt-3 text-[15px] leading-relaxed text-white/55"
        >
          {message}
        </motion.p>

        {!isPending && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: easeOutSoft, delay: 0.42 }}
            className="mt-8"
          >
            <Link
              to={ctaTo}
              className="inline-flex h-[46px] items-center justify-center rounded-xl bg-brand-600 px-7 font-semibold text-white shadow-card transition-all duration-300 hover:bg-brand-700 hover:shadow-card-hover active:scale-95"
            >
              {ctaLabel}
            </Link>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default ActivationResult;
