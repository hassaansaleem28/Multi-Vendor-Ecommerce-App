import { FiShoppingBag } from "react-icons/fi";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { RxDashboard } from "react-icons/rx";
import { Link } from "react-router-dom";
import { GrWorkshop } from "react-icons/gr";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BsHandbag } from "react-icons/bs";

function AdminSidebar({ activeHeading }) {
  return (
    <div className="w-full h-[90vh] bg-white overflow-y-scroll shadow-sm sticky top-0 left-0 z-10">
      {/* single item */}
      <div className="w-full flex items-center p-4">
        <Link to={"/admin-dashboard"} className="w-full flex items-center">
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
        <Link to={"/admin-orders"} className="w-full flex items-center">
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
        <Link to={"/admin-sellers"} className="w-full flex items-center">
          <GrWorkshop
            size={30}
            color={`${activeHeading === 3 ? "crimson" : "#555"}`}
          />
          <h5
            className={`display-block-800px hidden pl-2 text-[18px] font-[400] ${
              activeHeading === 3 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Sellers
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link to={"/admin-users"} className="w-full flex items-center">
          <HiOutlineUserGroup
            size={30}
            color={`${activeHeading === 4 ? "crimson" : "#555"}`}
          />
          <h5
            className={`display-block-800px hidden pl-2 text-[18px] font-[400] ${
              activeHeading === 4 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Users
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link to={"/admin-products"} className="w-full flex items-center">
          <BsHandbag
            size={30}
            color={`${activeHeading === 5 ? "crimson" : "#555"}`}
          />
          <h5
            className={`display-block-800px hidden pl-2 text-[18px] font-[400] ${
              activeHeading === 5 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Products
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link to={"/admin-events"} className="w-full flex items-center">
          <GrWorkshop
            size={30}
            color={`${activeHeading === 6 ? "crimson" : "#555"}`}
          />
          <h5
            className={`display-block-800px hidden pl-2 text-[18px] font-[400] ${
              activeHeading === 6 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Events
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link
          to={"/admin-withdraw-request"}
          className="w-full flex items-center"
        >
          <CiMoneyBill
            size={30}
            color={`${activeHeading === 7 ? "crimson" : "#555"}`}
          />
          <h5
            className={`display-block-800px hidden pl-2 text-[17px] font-[400] ${
              activeHeading === 7 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Withdraw Requests
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link to={"/profile"} className="w-full flex items-center">
          <CiSettings
            size={30}
            color={`${activeHeading === 8 ? "crimson" : "#555"}`}
          />
          <h5
            className={`display-block-800px hidden pl-2 text-[18px] font-[400] ${
              activeHeading === 8 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Settings
          </h5>
        </Link>
      </div>
    </div>
  );
}

export default AdminSidebar;
