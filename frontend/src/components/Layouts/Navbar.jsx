import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { navItems } from "../../static/data";

/**
 * Primary navigation. On desktop it sits in the dark nav bar and marks the
 * active route with a shared-layout pill; `mobile` renders the stacked
 * version used inside the drawer.
 */
function Navbar({ active, mobile = false }) {
  if (mobile) {
    return (
      <nav className="flex flex-col">
        {navItems.map((item, index) => {
          const isActive = active === index + 1;
          return (
            <Link
              key={index}
              to={item.url}
              className={`relative rounded-xl px-4 py-3 text-[15px] font-medium transition-colors duration-200 ${
                isActive
                  ? "bg-brand-50 text-brand-700"
                  : "text-ink-600 hover:bg-ink-50 hover:text-ink-900"
              }`}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-brand-600" />
              )}
              {item.title}
            </Link>
          );
        })}
      </nav>
    );
  }

  return (
    <nav className="block flex-with-items-center">
      {navItems.map((item, index) => {
        const isActive = active === index + 1;
        return (
          <div className="relative flex" key={index}>
            <Link
              to={item.url}
              className={`relative cursor-pointer px-5 py-2 text-[15px] font-medium transition-colors duration-300 padding-nav-800px marigin-top-800px ${
                isActive
                  ? "text-white"
                  : "text-ink-600 text-color-for-800px hover:text-white"
              }`}
            >
              <span className="relative z-10">{item.title}</span>

              {isActive && (
                <motion.span
                  layoutId="nav-active-pill"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  className="absolute inset-0 rounded-full bg-white/10"
                />
              )}
            </Link>

            {isActive && (
              <motion.span
                layoutId="nav-active-underline"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
                className="absolute -bottom-1 left-1/2 h-[3px] w-7 -translate-x-1/2 rounded-full bg-accent-400"
              />
            )}
          </div>
        );
      })}
    </nav>
  );
}

export default Navbar;
