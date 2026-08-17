import { FiShoppingBag } from "react-icons/fi";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { RxDashboard } from "react-icons/rx";
import { Link } from "react-router-dom";
import { GrWorkshop } from "react-icons/gr";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BsHandbag } from "react-icons/bs";
import { MdOutlineLocalOffer } from "react-icons/md";
import { motion } from "framer-motion";

const NAV = [
  { id: 1, to: "/admin-dashboard", label: "Dashboard", Icon: RxDashboard },
  { id: 2, to: "/admin-orders", label: "All Orders", Icon: FiShoppingBag },
  { id: 3, to: "/admin-sellers", label: "All Sellers", Icon: GrWorkshop },
  { id: 4, to: "/admin-users", label: "All Users", Icon: HiOutlineUserGroup },
  { id: 5, to: "/admin-products", label: "All Products", Icon: BsHandbag },
  {
    id: 6,
    to: "/admin-events",
    label: "All Events",
    Icon: MdOutlineLocalOffer,
  },
  {
    id: 7,
    to: "/admin-withdraw-request",
    label: "Withdraw Requests",
    Icon: CiMoneyBill,
  },
  { id: 8, to: "/profile", label: "Settings", Icon: CiSettings },
];

function AdminSidebar({ activeHeading }) {
  return (
    <nav className="sticky left-0 top-[72px] z-10 h-[calc(100vh-72px)] w-full overflow-y-auto border-r border-ink-100 bg-white p-3">
      <ul className="space-y-1">
        {NAV.map(({ id, to, label, Icon }) => {
          const isActive = activeHeading === id;
          return (
            <li key={id}>
              <Link
                to={to}
                title={label}
                className={`relative flex items-center gap-3 rounded-xl px-3 py-3 transition-colors duration-200 ${
                  isActive
                    ? "text-brand-700"
                    : "text-ink-500 hover:bg-ink-50 hover:text-ink-900"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="admin-nav-active"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    className="absolute inset-0 rounded-xl bg-brand-50"
                  />
                )}
                <Icon size={22} className="relative z-10 shrink-0" />
                <span className="relative z-10 hidden whitespace-nowrap text-[14px] font-medium display-block-800px">
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default AdminSidebar;
