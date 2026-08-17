import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ShippingInfo from "./ShippingInfo";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { motion } from "framer-motion";
import { IoIosArrowForward } from "react-icons/io";
import { HiOutlineTicket } from "react-icons/hi";
import styles from "../../styles/styles";
import { easeOutSoft } from "../../lib/motion";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Checkout() {
  const { user } = useSelector(state => state.user);
  const { cart } = useSelector(state => state.cart);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [userInfo, setUserInfo] = useState(false);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipCode, setZipCode] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [couponCodeData, setCouponCodeData] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(null);
  const navigate = useNavigate();

  function submitPayment() {
    if (
      address1 === "" ||
      address2 === "" ||
      zipCode === null ||
      country === "" ||
      city === ""
    ) {
      toast.error("Please choose your delivery address!");
    } else {
      const shippingAddress = {
        address1,
        address2,
        zipCode,
        country,
        city,
      };

      const orderData = {
        cart,
        totalPrice,
        subTotalPrice,
        shipping,
        discountPrice,
        shippingAddress,
        user,
      };

      localStorage.setItem("latestOrder", JSON.stringify(orderData));
      navigate("/payment");
    }
  }

  const subTotalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );
  const shipping = subTotalPrice * 0.1;

  async function handleSubmit(e) {
    e.preventDefault();
    const name = couponCode;

    await axios
      .get(`${API_BASE_URL}/api/v2/coupons/get-coupon-value/${name}`)
      .then(res => {
        const shopId = res?.data?.couponCode?.shopId;
        const couponCodeVal = res.data?.couponCode?.value;
        if (res.data.couponCode !== null) {
          const isCouponValid =
            cart && cart.filter(item => item.shopId === shopId);
          if (isCouponValid.length === 0) {
            toast.error("Coupon code is not valid for this shop!");
            setCouponCode("");
          } else {
            const eligiblePrice = isCouponValid.reduce(
              (acc, item) => acc + item.qty * item.discountPrice,
              0
            );
            const discountPrice = (eligiblePrice * couponCodeVal) / 100;
            setDiscountPrice(discountPrice);
            setCouponCodeData(res.data.couponCode);
            setCouponCode("");
            toast.success(`You have got ${couponCodeVal}% discount!!`);
          }
        }
        if (res.data.couponCode === null) {
          toast.error("Coupon code doesn't exists!");
          setCouponCode("");
        }
      });
  }

  const discountPercentenge = couponCodeData ? discountPrice : "";
  const totalPrice = couponCodeData
    ? (subTotalPrice + shipping - discountPercentenge).toFixed(2)
    : (subTotalPrice + shipping).toFixed(2);

  return (
    <div className={`${styles.section} pb-12`}>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <ShippingInfo
          user={user}
          country={country}
          setCountry={setCountry}
          city={city}
          setCity={setCity}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          address1={address1}
          setAddress1={setAddress1}
          address2={address2}
          setAddress2={setAddress2}
          zipCode={zipCode}
          setZipCode={setZipCode}
        />

        <div className="lg:sticky lg:top-24 lg:self-start">
          <CartData
            handleSubmit={handleSubmit}
            totalPrice={totalPrice}
            shipping={shipping}
            subTotalPrice={subTotalPrice}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            discountPercentenge={discountPercentenge}
            itemCount={cart?.length || 0}
            onSubmitPayment={submitPayment}
          />
        </div>
      </div>
    </div>
  );
}

function CartData({
  handleSubmit,
  totalPrice,
  shipping,
  subTotalPrice,
  couponCode,
  setCouponCode,
  discountPercentenge,
  itemCount,
  onSubmitPayment,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: easeOutSoft, delay: 0.1 }}
      className="rounded-2xl border border-ink-100 bg-white p-6"
    >
      <h3 className="font-display text-[18px] font-bold text-ink-900">
        Order summary
      </h3>
      <p className="mt-0.5 text-[13px] text-ink-500">
        {itemCount} item{itemCount === 1 ? "" : "s"} in your cart
      </p>

      <dl className="mt-6 space-y-3.5">
        <div className="flex items-center justify-between">
          <dt className="text-[14px] text-ink-500">Subtotal</dt>
          <dd className="font-display text-[15px] font-semibold text-ink-900">
            ${subTotalPrice.toFixed(2)}
          </dd>
        </div>

        <div className="flex items-center justify-between">
          <dt className="text-[14px] text-ink-500">Shipping</dt>
          <dd className="font-display text-[15px] font-semibold text-ink-900">
            ${shipping.toFixed(2)}
          </dd>
        </div>

        <div className="flex items-center justify-between border-b border-ink-100 pb-4">
          <dt className="text-[14px] text-ink-500">Discount</dt>
          <dd
            className={`font-display text-[15px] font-semibold ${
              discountPercentenge ? "text-success-600" : "text-ink-400"
            }`}
          >
            {discountPercentenge
              ? `−$${Number(discountPercentenge).toFixed(2)}`
              : "—"}
          </dd>
        </div>

        <div className="flex items-center justify-between pt-1">
          <dt className="font-display text-[16px] font-bold text-ink-900">
            Total
          </dt>
          <motion.dd
            key={totalPrice}
            initial={{ scale: 1.1, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="font-display text-[26px] font-extrabold text-ink-900"
          >
            ${totalPrice}
          </motion.dd>
        </div>
      </dl>

      {/* coupon */}
      <form onSubmit={handleSubmit} className="mt-6">
        <label className="mb-1.5 block text-[13px] font-semibold text-ink-700">
          Coupon code
        </label>
        <div className="relative">
          <HiOutlineTicket
            size={18}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400"
          />
          <input
            type="text"
            className="w-full rounded-xl border border-ink-200 bg-ink-50/60 py-2.5 pl-11 pr-4 text-[15px] uppercase text-ink-900 placeholder:normal-case placeholder:text-ink-400 transition-all duration-200 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={e => setCouponCode(e.target.value)}
            required
          />
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.985 }}
          className="mt-3 h-[44px] w-full cursor-pointer rounded-xl border border-brand-200 bg-brand-50 font-semibold text-brand-700 transition-colors duration-300 hover:border-brand-300 hover:bg-brand-100"
        >
          Apply code
        </motion.button>
      </form>

      {/* pay */}
      <motion.button
        onClick={onSubmitPayment}
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.985 }}
        className="group mt-6 flex h-[52px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-brand-600 font-display text-[16px] font-bold text-white shadow-card transition-colors duration-300 hover:bg-brand-700"
      >
        Go to payment
        <IoIosArrowForward className="transition-transform duration-300 group-hover:translate-x-1" />
      </motion.button>

      <p className="mt-3 text-center text-[12px] text-ink-400">
        Secure checkout · Your details are encrypted
      </p>
    </motion.div>
  );
}

export default Checkout;
