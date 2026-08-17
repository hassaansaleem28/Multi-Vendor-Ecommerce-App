import { AiOutlineCamera } from "react-icons/ai";
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLockClosed,
} from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AllOrders from "./AllOrders";
import AllRefundOrders from "./AllRefundOrders";
import TrackOrder from "./TrackOrder";
import UserAddress from "./UserAddress";
import { toast } from "react-toastify";
import {
  clearErrors,
  loadUser,
  updateUser,
} from "../../redux-toolkit/actions/userActions";
import axios from "axios";
import ChangePassword from "./ChangePassword";
import Field from "../ui/Field";
import SubmitButton from "../ui/SubmitButton";
import { easeOutSoft } from "../../lib/motion";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function ProfileContent({ active }) {
  const { user, error } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState(user && user.fullName);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(
    function () {
      if (error) toast.error(error);
      dispatch(clearErrors());
    },
    [error]
  );

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(updateUser({ email, password, fullName, phoneNumber }));
  }

  async function handleImage(e) {
    const file = e.target.files[0];
    setAvatar(file);
    setUploading(true);

    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    await axios
      .put(`${API_BASE_URL}/api/v2/user/update-user-avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then(() => {
        dispatch(loadUser());
        toast.success("Profile Updated!");
        setUploading(false);
      })
      .catch(error => {
        toast.error(error);
        setUploading(false);
      });
  }

  return (
    <div className="w-full">
      {/* ================= Profile ============================== */}
      {active === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: easeOutSoft }}
          className="overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-card"
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
                <motion.img
                  key={user?.avatar?.url}
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  src={
                    avatar ? URL.createObjectURL(avatar) : `${user?.avatar.url}`
                  }
                  alt={user?.fullName}
                  className="h-[110px] w-[110px] rounded-full border-4 border-white object-cover shadow-card"
                />

                {uploading && (
                  <span className="absolute inset-0 grid place-items-center rounded-full bg-ink-950/45">
                    <span className="h-7 w-7 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  </span>
                )}

                <label
                  htmlFor="image"
                  className="absolute bottom-1 right-1 grid h-9 w-9 cursor-pointer place-items-center rounded-full bg-brand-600 text-white shadow-card transition-all duration-300 hover:bg-brand-700 active:scale-90"
                  title="Change photo"
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

          <div className="px-6 pb-8 pt-[68px] text-center md:px-9">
            <h2 className="font-display text-[22px] font-bold text-ink-900">
              {user?.fullName}
            </h2>
            <p className="mt-0.5 text-[14px] text-ink-500">{user?.email}</p>

            {/* form */}
            <form
              onSubmit={handleSubmit}
              aria-required={true}
              className="mt-9 grid gap-5 text-left sm:grid-cols-2"
            >
              <Field
                label="Full name"
                icon={HiOutlineUser}
                type="text"
                name="fullName"
                required
                value={fullName}
                onChange={e => setFullName(e.target.value)}
              />

              <Field
                label="Email address"
                icon={HiOutlineMail}
                type="email"
                name="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
              />

              <Field
                label="Phone number"
                icon={HiOutlinePhone}
                type="number"
                name="phoneNumber"
                required
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
              />

              <Field
                label="Confirm with password"
                icon={HiOutlineLockClosed}
                type="password"
                name="password"
                autoComplete="current-password"
                required
                placeholder="Your current password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />

              <div className="sm:col-span-2 sm:mx-auto sm:w-[260px]">
                <SubmitButton type="submit">Update profile</SubmitButton>
              </div>
            </form>
          </div>
        </motion.div>
      )}

      {/* ================= Other panels ========================= */}
      {active === 2 && <AllOrders />}
      {active === 3 && <AllRefundOrders />}
      {active === 5 && <TrackOrder />}
      {active === 6 && <ChangePassword />}
      {active === 7 && <UserAddress />}
    </div>
  );
}

export default ProfileContent;
