import { useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { loadSeller } from "../../redux-toolkit/actions/sellerActions";
import { easeOutSoft } from "../../lib/motion";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const inputClass =
  "w-full rounded-xl border border-ink-200 bg-ink-50/60 px-4 py-2.5 text-[15px] text-ink-900 placeholder:text-ink-400 transition-all duration-200 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10";
const labelClass = "mb-1.5 block text-[13px] font-semibold text-ink-700";

function ShopSettings() {
  const { seller } = useSelector(state => state.seller);
  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState(seller?.name);
  const [description, setDescription] = useState(seller?.description);
  const [address, setAddress] = useState(seller?.address);
  const [phoneNumber, setPhoneNumber] = useState(seller?.phoneNumber);
  const [zipCode, setZipCode] = useState(seller?.zipCode);
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();

  async function handleImage(e) {
    e.preventDefault();
    const file = e.target.files[0];
    setAvatar(file);
    setUploading(true);

    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    await axios
      .put(`${API_BASE_URL}/api/v2/seller/update-shop-avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then(() => {
        dispatch(loadSeller());
        toast.success("Avatar Updated!");
        setUploading(false);
      })
      .catch(error => {
        toast.error(error);
        setUploading(false);
      });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await axios
      .put(
        `${API_BASE_URL}/api/v2/seller/update-shop-profile`,
        { name, description, address, phoneNumber, zipCode },
        { withCredentials: true }
      )
      .then(() => {
        dispatch(loadSeller());
        toast.success("Profile Updated!");
      })
      .catch(error => {
        toast.error(error?.message);
        console.error(error);
      });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: easeOutSoft }}
      className="mx-auto w-full max-w-[720px] overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-card"
    >
      {/* banner + avatar */}
      <div className="relative h-[120px] bg-ink-950">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="animate-float-slow absolute -left-10 -top-16 h-[220px] w-[220px] rounded-full bg-brand-600/30 blur-[70px]" />
          <div
            className="animate-float-slow absolute -bottom-20 right-10 h-[200px] w-[200px] rounded-full bg-accent-500/20 blur-[70px]"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div className="absolute -bottom-[52px] left-1/2 -translate-x-1/2">
          <div className="relative">
            <img
              src={
                avatar ? URL.createObjectURL(avatar) : `${seller?.avatar?.url}`
              }
              alt={seller?.name}
              className="h-[110px] w-[110px] rounded-full border-4 border-white object-cover shadow-card"
            />

            {uploading && (
              <span className="absolute inset-0 grid place-items-center rounded-full bg-ink-950/45">
                <span className="h-7 w-7 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              </span>
            )}

            <label
              htmlFor="image"
              title="Change shop logo"
              className="absolute bottom-1 right-1 grid h-9 w-9 cursor-pointer place-items-center rounded-full bg-brand-600 text-white shadow-card transition-all duration-300 hover:bg-brand-700 active:scale-90"
            >
              <AiOutlineCamera size={17} />
              <input
                type="file"
                id="image"
                accept="image/*"
                className="hidden"
                onChange={handleImage}
              />
            </label>
          </div>
        </div>
      </div>

      <div className="px-6 pb-8 pt-[68px] md:px-9">
        <div className="text-center">
          <h2 className="font-display text-[22px] font-bold text-ink-900">
            {seller?.name}
          </h2>
          <p className="mt-0.5 text-[14px] text-ink-500">{seller?.email}</p>
        </div>

        <form
          aria-required={true}
          className="mt-9 space-y-5"
          onSubmit={handleSubmit}
        >
          <div>
            <label className={labelClass}>Shop name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="HS store"
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className={labelClass}>Shop description</label>
            <textarea
              rows="4"
              placeholder="Tell shoppers what your shop is about"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className={`${inputClass} resize-none leading-relaxed`}
            />
          </div>

          <div>
            <label className={labelClass}>Shop address</label>
            <input
              type="address"
              placeholder="Shop address"
              value={address}
              onChange={e => setAddress(e.target.value)}
              className={inputClass}
              required
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Phone number</label>
              <input
                type="number"
                placeholder="+425167512468"
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>Zip code</label>
              <input
                type="number"
                placeholder="914121"
                value={zipCode}
                onChange={e => setZipCode(e.target.value)}
                className={inputClass}
                required
              />
            </div>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="flex h-[50px] w-full cursor-pointer items-center justify-center rounded-xl bg-brand-600 font-display text-[16px] font-bold text-white shadow-card transition-colors duration-300 hover:bg-brand-700"
          >
            Update shop
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}

export default ShopSettings;
