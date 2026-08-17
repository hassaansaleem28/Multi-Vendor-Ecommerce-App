import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { VscNewFile } from "react-icons/vsc";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { RxDashboard } from "react-icons/rx";
import { Link } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { motion } from "framer-motion";

const NAV = [
  { id: 1, to: "/dashboard", label: "Dashboard", Icon: RxDashboard },
  { id: 2, to: "/dashboard-orders", label: "All Orders", Icon: FiShoppingBag },
  { id: 3, to: "/dashboard-products", label: "All Products", Icon: FiPackage },
  {
    id: 4,
    to: "/dashboard-create-product",
    label: "Create Product",
    Icon: AiOutlineFolderAdd,
  },
  {
    id: 5,
    to: "/dashboard-events",
    label: "All Events",
    Icon: MdOutlineLocalOffer,
  },
  {
    id: 6,
    to: "/dashboard-create-event",
    label: "Create Event",
    Icon: VscNewFile,
  },
  {
    id: 7,
    to: "/dashboard-withdraw-money",
    label: "Withdraw Money",
    Icon: CiMoneyBill,
  },
  {
    id: 8,
    to: "/dashboard-messages",
    label: "Shop Inbox",
    Icon: BiMessageSquareDetail,
  },
  {
    id: 9,
    to: "/dashboard-coupons",
    label: "Discount Codes",
    Icon: AiOutlineGift,
  },
  {
    id: 10,
    to: "/dashboard-refunds",
    label: "Refunds",
    Icon: HiOutlineReceiptRefund,
  },
  { id: 11, to: "/dashboard-settings", label: "Settings", Icon: CiSettings },
];

function DashboardSidebar({ activeHeading }) {
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
                    layoutId="seller-nav-active"
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

export default DashboardSidebar;
