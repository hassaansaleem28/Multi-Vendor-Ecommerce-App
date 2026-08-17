import { AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";
import { motion } from "framer-motion";
import Logo from "../ui/Logo";

const quickLinks = [
  { to: "/dashboard-coupons", Icon: AiOutlineGift, label: "Discount codes" },
  { to: "/dashboard-events", Icon: MdOutlineLocalOffer, label: "Events" },
  { to: "/dashboard-products", Icon: FiShoppingBag, label: "Products" },
  { to: "/dashboard-orders", Icon: FiPackage, label: "Orders" },
  { to: "/dashboard-messages", Icon: BiMessageSquareDetail, label: "Inbox" },
];

function DashboardHeader() {
  const { seller } = useSelector(state => state.seller);

  return (
    <header className="sticky left-0 top-0 z-30 flex h-[72px] w-full items-center justify-between border-b border-ink-100 bg-white/90 px-5 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <Link to="/">
          <Logo size="sm" />
        </Link>
        <span className="hidden rounded-full bg-brand-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-700 sm:inline-block">
          Seller
        </span>
      </div>

      <div className="flex items-center gap-1">
        {quickLinks.map(({ to, Icon, label }) => (
          <Link
            key={to}
            to={to}
            title={label}
            aria-label={label}
            className="hidden md:block"
          >
            <motion.span
              whileHover={{ y: -2, scale: 1.06 }}
              whileTap={{ scale: 0.92 }}
              className="grid h-11 w-11 place-items-center rounded-xl text-ink-500 transition-colors duration-200 hover:bg-ink-50 hover:text-brand-600"
            >
              <Icon size={22} />
            </motion.span>
          </Link>
        ))}

        <Link
          to={`/shop/${seller?._id}`}
          className="ml-3"
          title="Your shop"
          aria-label="Your shop"
        >
          <motion.img
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            src={`${seller?.avatar?.url}`}
            alt={seller?.name}
            className="h-[44px] w-[44px] rounded-full object-cover ring-2 ring-ink-100 transition-all duration-300 hover:ring-brand-300"
          />
        </Link>
      </div>
    </header>
  );
}

export default DashboardHeader;
