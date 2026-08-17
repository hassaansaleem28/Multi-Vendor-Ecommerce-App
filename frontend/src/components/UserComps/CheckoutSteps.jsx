import { motion } from "framer-motion";
import { HiCheck } from "react-icons/hi";
import { easeOutSoft } from "../../lib/motion";

const STEPS = [
  { id: 1, label: "Shipping" },
  { id: 2, label: "Payment" },
  { id: 3, label: "Success" },
];

/**
 * Three-step progress rail. Completed steps get a check, the current step is
 * filled, and the connector between them fills left-to-right as you advance.
 */
const CheckoutSteps = ({ active }) => {
  return (
    <div className="w-full px-4 py-8">
      <div className="mx-auto flex w-full max-w-[620px] items-center">
        {STEPS.map((step, i) => {
          const isDone = active > step.id;
          const isCurrent = active === step.id;
          const isLast = i === STEPS.length - 1;

          return (
            <div
              key={step.id}
              className={`flex items-center ${isLast ? "" : "flex-1"}`}
            >
              {/* node */}
              <div className="flex flex-col items-center gap-2">
                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 0.4,
                    ease: easeOutSoft,
                    delay: i * 0.1,
                  }}
                  className={`relative grid h-11 w-11 place-items-center rounded-full font-display text-[15px] font-bold transition-colors duration-500 ${
                    isDone
                      ? "bg-success-600 text-white"
                      : isCurrent
                        ? "bg-brand-600 text-white"
                        : "border-2 border-ink-200 bg-white text-ink-400"
                  }`}
                >
                  {isDone ? <HiCheck size={20} /> : step.id}

                  {isCurrent && (
                    <motion.span
                      initial={{ scale: 1, opacity: 0.6 }}
                      animate={{ scale: 1.6, opacity: 0 }}
                      transition={{
                        duration: 1.6,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                      className="absolute inset-0 rounded-full border-2 border-brand-500"
                    />
                  )}
                </motion.div>

                <span
                  className={`text-[13px] font-semibold transition-colors duration-300 ${
                    isDone || isCurrent ? "text-ink-900" : "text-ink-400"
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {/* connector */}
              {!isLast && (
                <div className="relative mx-3 -mt-6 h-[3px] flex-1 overflow-hidden rounded-full bg-ink-200">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: active > step.id ? 1 : 0 }}
                    transition={{ duration: 0.6, ease: easeOutSoft, delay: 0.2 }}
                    style={{ transformOrigin: "left" }}
                    className="absolute inset-0 rounded-full bg-success-600"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CheckoutSteps;
