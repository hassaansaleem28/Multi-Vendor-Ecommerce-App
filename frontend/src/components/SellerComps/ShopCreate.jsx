import { useState } from "react";
import { RxAvatar } from "react-icons/rx";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineShoppingBag,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlineHashtag,
} from "react-icons/hi";
import { FiUploadCloud } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import AuthShell from "../ui/AuthShell";
import Field from "../ui/Field";
import SubmitButton from "../ui/SubmitButton";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function ShopCreate() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState(0);
  const [avatar, setAvatar] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("phoneNumber", phoneNumber);
      formData.append("zipCode", zipCode);
      formData.append("address", address);
      formData.append("file", avatar);
      const { data } = await axios.post(
        `${API_BASE_URL}/api/v2/seller/create-seller`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (data?.success) toast.success(data?.message);
      setName("");
      setEmail("");
      setPassword("");
      setAddress("");
      setPhoneNumber();
      setZipCode(0);
      setAvatar(null);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.response?.data.message);
      console.error("Error during signup:", error);
    }
  }

  function handleFileInputChange(e) {
    const file = e.target.files[0];
    setAvatar(file);
  }

  return (
    <AuthShell
      badge="Start selling"
      title="Create your shop"
      subtitle="Set up your storefront and list your first product today."
      highlights={[
        { value: "800+", label: "Active shops" },
        { value: "Fast", label: "Payouts" },
        { value: "Free", label: "To list" },
      ]}
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <Field
          label="Shop name"
          icon={HiOutlineShoppingBag}
          type="text"
          name="name"
          autoComplete="organization"
          required
          placeholder="Acme Supply Co."
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <Field
          label="Email address"
          icon={HiOutlineMail}
          type="email"
          name="email"
          autoComplete="email"
          required
          placeholder="shop@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <Field
          label="Phone number"
          icon={HiOutlinePhone}
          type="number"
          name="phone-number"
          autoComplete="tel"
          required
          placeholder="e.g. +92231241213"
          value={phoneNumber}
          onChange={e => setPhoneNumber(e.target.value)}
        />

        <Field
          label="Address"
          icon={HiOutlineLocationMarker}
          type="text"
          name="address"
          autoComplete="street-address"
          required
          placeholder="Shop address"
          value={address}
          onChange={e => setAddress(e.target.value)}
        />

        <Field
          label="Zip code"
          icon={HiOutlineHashtag}
          type="number"
          name="zip-code"
          autoComplete="postal-code"
          required
          placeholder="54000"
          value={zipCode}
          onChange={e => setZipCode(e.target.value)}
        />

        <Field
          label="Password"
          icon={HiOutlineLockClosed}
          type="password"
          name="password"
          autoComplete="new-password"
          required
          placeholder="Create a password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        {/* Shop logo ---------------------------------------------- */}
        <div>
          <span className="mb-1.5 block text-[13px] font-semibold text-ink-700">
            Shop logo
          </span>
          <div className="flex items-center gap-4 rounded-xl border border-dashed border-ink-200 bg-ink-50/60 p-3 transition-colors duration-200 hover:border-brand-300 hover:bg-brand-50/40">
            <motion.span
              key={avatar ? "has-avatar" : "no-avatar"}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 380, damping: 22 }}
              className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-full bg-white ring-2 ring-ink-100"
            >
              {avatar ? (
                <img
                  src={URL.createObjectURL(avatar)}
                  alt="shop logo"
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <RxAvatar className="h-7 w-7 text-ink-300" />
              )}
            </motion.span>

            <label
              htmlFor="file"
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-ink-200 bg-white px-3.5 py-2 text-[13px] font-semibold text-ink-700 shadow-sm transition-all duration-200 hover:border-brand-400 hover:text-brand-700 active:scale-95"
            >
              <FiUploadCloud size={16} />
              <span>{avatar ? "Change logo" : "Upload logo"}</span>
              <input
                id="file"
                type="file"
                name="file"
                accept=".jpg,.jpeg,.png"
                onChange={handleFileInputChange}
                className="sr-only"
              />
            </label>

            {avatar && (
              <span className="truncate text-[12px] text-ink-400">
                {avatar.name}
              </span>
            )}
          </div>
        </div>

        <SubmitButton loading={isLoading} loadingText="Creating shop…">
          Create shop
          <IoIosArrowForward />
        </SubmitButton>

        <p className="text-center text-[14px] text-ink-500">
          Already have a seller account?{" "}
          <Link
            to="/shop-login"
            className="font-semibold text-brand-600 transition-colors hover:text-brand-700"
          >
            Sign in
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}

export default ShopCreate;
