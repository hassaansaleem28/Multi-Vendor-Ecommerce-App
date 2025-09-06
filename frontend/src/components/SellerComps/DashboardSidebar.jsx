import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { VscNewFile } from "react-icons/vsc";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { RxDashboard } from "react-icons/rx";
import { Link } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";
import { HiOutlineReceiptRefund } from "react-icons/hi";

function DashboardSidebar({ activeHeading }) {
  return (
    <div className="w-full h-[100vh] bg-white shadow-sm sticky top-0 left-0 z-10">
      {/* single item */}
      <div className="w-full flex items-center p-4">
        <Link to={"/dashboard"} className="w-full flex items-center">
          <RxDashboard
            size={30}
            color={`${activeHeading === 1 ? "crimson" : "#555"}`}
          />
          <h5
            className={`display-block-800px hidden  pl-2 text-[18px] font-[400] ${
              activeHeading === 1 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Dashboard
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link to={"/dashboard-orders"} className="w-full flex items-center">
          <FiShoppingBag
            size={30}
            color={`${activeHeading === 2 ? "crimson" : "#555"}`}
          />
          <h5
            className={`display-block-800px hidden pl-2 text-[18px] font-[400] ${
              activeHeading === 2 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Orders
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link to={"/dashboard-products"} className="w-full flex items-center">
          <FiPackage
            size={30}
            color={`${activeHeading === 3 ? "crimson" : "#555"}`}
          />
          <h5
            className={`display-block-800px hidden pl-2 text-[18px] font-[400] ${
              activeHeading === 3 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Products
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link
          to={"/dashboard-create-product"}
          className="w-full flex items-center"
        >
          <AiOutlineFolderAdd
            size={30}
            color={`${activeHeading === 4 ? "crimson" : "#555"}`}
          />
          <h5
            className={`display-block-800px hidden pl-2 text-[18px] font-[400] ${
              activeHeading === 4 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Create Product
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link to={"/dashboard-events"} className="w-full flex items-center">
          <MdOutlineLocalOffer
            size={30}
            color={`${activeHeading === 5 ? "crimson" : "#555"}`}
          />
          <h5
            className={`display-block-800px hidden pl-2 text-[18px] font-[400] ${
              activeHeading === 5 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All events
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link
          to={"/dashboard-create-event"}
          className="w-full flex items-center"
        >
          <VscNewFile
            size={30}
            color={`${activeHeading === 6 ? "crimson" : "#555"}`}
          />
          <h5
            className={`display-block-800px hidden pl-2 text-[18px] font-[400] ${
              activeHeading === 6 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Create Events
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link
          to={"/dashboard-withdraw-money"}
          className="w-full flex items-center"
        >
          <CiMoneyBill
            size={30}
            color={`${activeHeading === 7 ? "crimson" : "#555"}`}
          />
          <h5
            className={`display-block-800px hidden pl-2 text-[18px] font-[400] ${
              activeHeading === 7 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Withdraw Money
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link to={"/dashboard-messages"} className="w-full flex items-center">
          <BiMessageSquareDetail
            size={30}
            color={`${activeHeading === 8 ? "crimson" : "#555"}`}
          />
          <h5
            className={`display-block-800px hidden pl-2 text-[18px] font-[400] ${
              activeHeading === 8 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Shop Inbox
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link to={"/dashboard-coupons"} className="w-full flex items-center">
          <AiOutlineGift
            size={30}
            color={`${activeHeading === 9 ? "crimson" : "#555"}`}
          />
          <h5
            className={`display-block-800px hidden pl-2 text-[18px] font-[400] ${
              activeHeading === 9 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Discount Codes
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link to={"/dashboard-refunds"} className="w-full flex items-center">
          <HiOutlineReceiptRefund
            size={30}
            color={`${activeHeading === 10 ? "crimson" : "#555"}`}
          />
          <h5
            className={`display-block-800px hidden pl-2 text-[18px] font-[400] ${
              activeHeading === 10 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Refunds
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link to={"/dashboard-settings"} className="w-full flex items-center">
          <CiSettings
            size={30}
            color={`${activeHeading === 11 ? "crimson" : "#555"}`}
          />
          <h5
            className={`display-block-800px hidden pl-2 text-[18px] font-[400] ${
              activeHeading === 11 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Settings
          </h5>
        </Link>
      </div>
    </div>
  );
}

export default DashboardSidebar;
