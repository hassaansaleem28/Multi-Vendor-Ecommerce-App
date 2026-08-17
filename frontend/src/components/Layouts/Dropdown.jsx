import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { dropdownVariants } from "../../lib/motion";

function Dropdown({ categoriesData, setDropdown }) {
  const navigate = useNavigate();

  function handleCategoryClick(category) {
    navigate(`/products?category=${category.title}`);
    setDropdown(false);
  }

  return (
    <motion.div
      variants={dropdownVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{ transformOrigin: "top" }}
      className="absolute z-30 max-h-[70vh] w-[270px] overflow-y-auto rounded-b-xl border border-t-0 border-ink-100 bg-white py-2 shadow-panel"
    >
      {categoriesData &&
        categoriesData.map((category, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.025, duration: 0.22 }}
            onClick={() => handleCategoryClick(category)}
            className="group flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-left transition-colors duration-200 hover:bg-brand-50"
          >
            <img
              src={category.image_Url}
              alt={category.title}
              className="h-7 w-7 shrink-0 select-none object-contain transition-transform duration-300 group-hover:scale-110"
            />
            <span className="select-none text-[14px] font-medium text-ink-700 transition-colors duration-200 group-hover:text-brand-700">
              {category.title}
            </span>
          </motion.button>
        ))}
    </motion.div>
  );
}

export default Dropdown;
