import { motion } from "framer-motion";

/**
 * Centred loading indicator — a ring plus three pulsing dots, in brand colours.
 */
function Loader({ label = "Loading" }) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 py-20">
      <div className="relative h-12 w-12">
        <span className="absolute inset-0 rounded-full border-[3px] border-ink-200" />
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-brand-600"
        />
      </div>

      <div className="flex items-center gap-1.5">
        {[0, 1, 2].map(i => (
          <motion.span
            key={i}
            animate={{ opacity: [0.25, 1, 0.25], y: [0, -3, 0] }}
            transition={{
              duration: 1.1,
              repeat: Infinity,
              delay: i * 0.16,
              ease: "easeInOut",
            }}
            className="h-1.5 w-1.5 rounded-full bg-brand-500"
          />
        ))}
      </div>

      {label && (
        <p className="text-[13px] font-medium text-ink-400">{label}…</p>
      )}
    </div>
  );
}

export default Loader;
