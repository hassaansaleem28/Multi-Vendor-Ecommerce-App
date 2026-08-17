import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HiOutlineLocationMarker,
  HiOutlinePhone,
  HiOutlineCube,
  HiOutlineStar,
  HiOutlineCalendar,
  HiOutlineCog,
  HiOutlineLogout,
} from "react-icons/hi";
import Loader from "../UserComps/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux-toolkit/actions/productActions";
import { easeOutSoft } from "../../lib/motion";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 border-b border-ink-100 py-3.5 last:border-0">
      <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-ink-50 text-ink-500">
        <Icon size={16} />
      </span>
      <div className="min-w-0">
        <p className="text-[12px] font-semibold uppercase tracking-wide text-ink-400">
          {label}
        </p>
        <p className="mt-0.5 break-words text-[14px] text-ink-800">
          {value || "—"}
        </p>
      </div>
    </div>
  );
}

function ShopInfo({ isOwner }) {
  const [data, setData] = useState({});
  const { product } = useSelector(state => state.product);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const totalReviewsLength =
    product && product.reduce((acc, prod) => acc + prod.reviews.length, 0);
  const totalRatings =
    product &&
    product.reduce(
      (acc, prod) =>
        acc + prod.reviews.reduce((sum, rev) => sum + rev.rating, 0),
      0
    );
  const avgRating = totalRatings / totalReviewsLength || 0;

  const { id } = useParams();

  useEffect(
    function () {
      async function getData() {
        try {
          setIsLoading(true);
          dispatch(getAllProductsShop(id));
          const res = await axios.get(
            `${API_BASE_URL}/api/v2/seller/get-shop-info/${id}`
          );
          setData(res.data.shop);
          setIsLoading(false);
        } catch (error) {
          console.error(error);
          setIsLoading(false);
        }
      }
      getData();
    },
    [dispatch]
  );

  async function logoutHandler() {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${API_BASE_URL}/api/v2/seller/logout-seller`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        window.location.href = "/shop-create";
      } else {
        console.error("Logout failed:", res.data.message);
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) return <Loader label="Loading shop" />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: easeOutSoft }}
      className="overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-card"
    >
      {/* banner + avatar */}
      <div className="relative h-[100px] bg-ink-950">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="animate-float-slow absolute -left-8 -top-12 h-[200px] w-[200px] rounded-full bg-brand-600/30 blur-[60px]" />
          <div
            className="animate-float-slow absolute -bottom-16 right-6 h-[180px] w-[180px] rounded-full bg-accent-500/20 blur-[60px]"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <img
          src={`${data?.avatar?.url}`}
          alt={data?.name}
          className="absolute -bottom-[48px] left-1/2 h-[100px] w-[100px] -translate-x-1/2 rounded-full border-4 border-white object-cover shadow-card"
        />
      </div>

      <div className="px-5 pb-6 pt-[60px] text-center">
        <h3 className="font-display text-[19px] font-bold text-ink-900">
          {data?.name}
        </h3>
        {data?.description && (
          <p className="mx-auto mt-2 max-w-xs text-[14px] leading-relaxed text-ink-500">
            {data.description}
          </p>
        )}
      </div>

      <div className="px-5 pb-5">
        <InfoRow
          icon={HiOutlineLocationMarker}
          label="Address"
          value={data?.address}
        />
        <InfoRow
          icon={HiOutlinePhone}
          label="Phone number"
          value={data?.phoneNumber}
        />
        <InfoRow
          icon={HiOutlineCube}
          label="Total products"
          value={product && product.length}
        />
        <InfoRow
          icon={HiOutlineStar}
          label="Shop rating"
          value={`${Number(avgRating).toFixed(1)} / 5`}
        />
        <InfoRow
          icon={HiOutlineCalendar}
          label="Joined on"
          value={data?.createdAt?.slice(0, 10)}
        />
      </div>

      {isOwner && (
        <div className="space-y-2.5 border-t border-ink-100 p-5">
          <Link to={"/dashboard-settings"}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex h-[44px] cursor-pointer items-center justify-center gap-2 rounded-xl bg-ink-900 font-semibold text-white transition-colors duration-300 hover:bg-ink-800"
            >
              <HiOutlineCog size={18} />
              Edit shop
            </motion.div>
          </Link>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={logoutHandler}
            className="flex h-[44px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-danger-200 bg-danger-50 font-semibold text-danger-600 transition-colors duration-300 hover:bg-danger-100"
          >
            <HiOutlineLogout size={18} />
            Log out
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}

export default ShopInfo;
