import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const TONES = {
  neutral: "text-ink-500 hover:bg-ink-100 hover:text-ink-900",
  brand: "text-brand-600 hover:bg-brand-50 hover:text-brand-700",
  danger: "text-ink-400 hover:bg-danger-50 hover:text-danger-600",
  success: "text-success-600 hover:bg-success-50 hover:text-success-700",
};

/**
 * Icon button for DataGrid action cells. Renders a Link when `to` is given,
 * otherwise a button.
 */
function TableAction({ icon: Icon, to, onClick, title, tone = "neutral", size = 18 }) {
  const className = `grid h-9 w-9 cursor-pointer place-items-center rounded-lg transition-colors duration-200 ${
    TONES[tone] || TONES.neutral
  }`;

  const inner = (
    <motion.span
      whileHover={{ scale: 1.14 }}
      whileTap={{ scale: 0.88 }}
      className={className}
    >
      <Icon size={size} />
    </motion.span>
  );

  if (to) {
    return (
      <Link to={to} title={title} aria-label={title}>
        {inner}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} title={title} aria-label={title}>
      {inner}
    </button>
  );
}

export default TableAction;
