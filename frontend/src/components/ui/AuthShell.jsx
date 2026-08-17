import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { easeOutSoft } from "../../lib/motion";

/**
 * The frame every auth screen sits in — login, signup, shop login, shop
 * create. A deep navy brand panel on the left (desktop only) and the form
 * card on the right, both animating in on mount.
 */
function AuthShell({ title, subtitle, badge, highlights = [], children }) {
  return (
    <div className="min-h-screen w-full bg-ink-50 lg:grid lg:grid-cols-[1.05fr_1fr]">
      {/* ---- Brand panel ------------------------------------------- */}
      <div className="relative hidden overflow-hidden bg-ink-950 lg:flex lg:flex-col lg:justify-between lg:p-14">
        {/* ambient colour */}
        <div className="pointer-events-none absolute inset-0">
          <div className="animate-float-slow absolute -left-24 -top-24 h-[420px] w-[420px] rounded-full bg-brand-600/25 blur-[110px]" />
          <div
            className="animate-float-slow absolute -bottom-32 right-0 h-[380px] w-[380px] rounded-full bg-accent-500/15 blur-[110px]"
            style={{ animationDelay: "2.5s" }}
          />
          <div
            className="absolute inset-0 opacity-[0.16]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.14) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.14) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
              maskImage:
                "radial-gradient(ellipse at 30% 30%, #000 25%, transparent 72%)",
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOutSoft }}
          className="relative z-10"
        >
          <Link
            to="/"
            className="font-display text-2xl font-extrabold tracking-tight text-white"
          >
            Shop<span className="text-accent-400">O</span>
          </Link>
        </motion.div>

        <div className="relative z-10">
          {badge && (
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeOutSoft, delay: 0.1 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white/85 backdrop-blur"
            >
              {badge}
            </motion.span>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOutSoft, delay: 0.16 }}
            className="max-w-md font-display text-[42px] font-extrabold leading-[1.1] tracking-tight text-white"
          >
            A marketplace built for{" "}
            <span className="bg-gradient-to-r from-accent-300 to-accent-500 bg-clip-text text-transparent">
              every seller
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOutSoft, delay: 0.24 }}
            className="mt-5 max-w-md text-[15px] leading-relaxed text-white/60"
          >
            Thousands of products, hundreds of independent shops, one checkout.
            Join ShopO and start trading in minutes.
          </motion.p>

          {highlights.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-5">
              {highlights.map((h, i) => (
                <motion.div
                  key={h.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    ease: easeOutSoft,
                    delay: 0.32 + i * 0.08,
                  }}
                >
                  <p className="font-display text-2xl font-bold text-white">
                    {h.value}
                  </p>
                  <p className="text-xs uppercase tracking-wider text-white/45">
                    {h.label}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="relative z-10 text-xs text-white/35"
        >
          &copy; {new Date().getFullYear()} ShopO. All rights reserved.
        </motion.p>
      </div>

      {/* ---- Form panel -------------------------------------------- */}
      <div className="flex min-h-screen items-center justify-center px-5 py-12 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: easeOutSoft }}
          className="w-full max-w-[440px]"
        >
          {/* mobile logo */}
          <Link
            to="/"
            className="mb-8 block text-center font-display text-2xl font-extrabold tracking-tight text-ink-900 lg:hidden"
          >
            Shop<span className="text-brand-600">O</span>
          </Link>

          <div className="rounded-2xl border border-ink-100 bg-white p-7 shadow-panel sm:p-9">
            <h2 className="font-display text-[26px] font-bold tracking-tight text-ink-900">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-1.5 text-[14px] text-ink-500">{subtitle}</p>
            )}
            <div className="mt-7">{children}</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default AuthShell;
