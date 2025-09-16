import { AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function DashboardHeader() {
  const { seller } = useSelector(state => state.seller);

  return (
    <div className="w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div>
        <Link to="/">
          <img
            src="https://shopo.quomodothemes.website/assets/images/logo.svg"
            alt="Logo"
          />
        </Link>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <Link to={"/dashboard/coupons"}>
            <AiOutlineGift
              color="#555"
              size={30}
              className="mx-5 cursor-pointer display-block-800px hidden"
            />
          </Link>
          <Link to={"/dashboard-events"}>
            <MdOutlineLocalOffer
              color="#555"
              size={30}
              className="mx-5 cursor-pointer display-block-800px hidden"
            />
          </Link>
          <Link to={"/dashboard-products"}>
            <FiShoppingBag
              color="#555"
              size={30}
              className="mx-5 cursor-pointer display-block-800px hidden"
            />
          </Link>
          <Link to={"/dashboard-orders"}>
            <FiPackage
              color="#555"
              size={30}
              className="mx-5 cursor-pointer display-block-800px hidden"
            />
          </Link>
          <Link to={"/dashboard-messages"}>
            <BiMessageSquareDetail
              color="#555"
              size={30}
              className="mx-5 cursor-pointer display-block-800px hidden"
            />
          </Link>
          <Link to={`/shop/${seller?._id}`}>
            <img
              src={`${seller?.avatar?.url}`}
              alt="Image"
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;
