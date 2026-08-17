import { motion } from "framer-motion";

/**
 * The ShopO wordmark — a gradient bag mark plus the name. Replaces the old
 * hot-linked SVG so the brand renders even when third-party assets are down.
 *
 * `variant="light"` for dark backgrounds (footer, nav).
 */
function Logo({ size = "md", variant = "dark" }) {
  const dims = {
    sm: { box: 30, text: "text-[19px]", radius: "rounded-[9px]" },
    md: { box: 38, text: "text-[24px]", radius: "rounded-[11px]" },
    lg: { box: 46, text: "text-[29px]", radius: "rounded-[13px]" },
  }[size];

  const isLight = variant === "light";

  return (
    <motion.div
      className="flex select-none items-center gap-2.5"
      whileHover="hover"
      initial="rest"
      animate="rest"
    >
      <motion.span
        variants={{
          rest: { rotate: 0, scale: 1 },
          hover: { rotate: -8, scale: 1.06 },
        }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        className={`grid shrink-0 place-items-center bg-gradient-to-br from-brand-500 to-brand-700 shadow-card ${dims.radius}`}
        style={{ width: dims.box, height: dims.box }}
      >
        <svg
          width={dims.box * 0.52}
          height={dims.box * 0.52}
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
          <path d="M3 6h18" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      </motion.span>

      <span
        className={`font-display font-extrabold tracking-tight ${dims.text} ${
          isLight ? "text-white" : "text-ink-900"
        }`}
      >
        Shop<span className="text-accent-400">O</span>
      </span>
    </motion.div>
  );
}

export default Logo;
