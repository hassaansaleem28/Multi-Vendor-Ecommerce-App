import { AnimatePresence, motion } from "framer-motion";
import { RxCross1 } from "react-icons/rx";
import { HiOutlineExclamation } from "react-icons/hi";
import { backdrop, modal } from "../../lib/motion";

/**
 * Destructive-action confirmation used by the admin tables.
 */
function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  tone = "danger",
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-ink-950/50 p-4 backdrop-blur-sm"
        >
          <motion.div
            variants={modal}
            onClick={e => e.stopPropagation()}
            className="relative w-full max-w-[420px] rounded-2xl bg-white p-7 shadow-panel"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 grid h-9 w-9 cursor-pointer place-items-center rounded-full text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-900"
            >
              <RxCross1 size={16} />
            </button>

            <div
              className={`mx-auto grid h-14 w-14 place-items-center rounded-full ${
                tone === "danger"
                  ? "bg-danger-50 text-danger-600"
                  : "bg-brand-50 text-brand-600"
              }`}
            >
              <HiOutlineExclamation size={27} />
            </div>

            <h3 className="mt-5 text-center font-display text-[19px] font-bold text-ink-900">
              {title}
            </h3>
            {message && (
              <p className="mt-2 text-center text-[14px] leading-relaxed text-ink-500">
                {message}
              </p>
            )}

            <div className="mt-7 flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={onClose}
                className="h-[46px] flex-1 cursor-pointer rounded-xl border border-ink-200 font-semibold text-ink-700 transition-colors duration-300 hover:bg-ink-50"
              >
                {cancelLabel}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={onConfirm}
                className={`h-[46px] flex-1 cursor-pointer rounded-xl font-semibold text-white shadow-card transition-colors duration-300 ${
                  tone === "danger"
                    ? "bg-danger-600 hover:bg-danger-700"
                    : "bg-brand-600 hover:bg-brand-700"
                }`}
              >
                {confirmLabel}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ConfirmDialog;
