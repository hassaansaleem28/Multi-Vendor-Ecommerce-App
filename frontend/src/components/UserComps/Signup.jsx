import { useState } from "react";
import { RxAvatar } from "react-icons/rx";
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineUser } from "react-icons/hi";
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

function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("file", avatar);
      const { data } = await axios.post(
        `${API_BASE_URL}/api/v2/user/create-user`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (data?.success) toast.success(data?.message);
      setFullName("");
      setEmail("");
      setPassword("");
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
      badge="Get started"
      title="Create your account"
      subtitle="One account, every shop on ShopO."
      highlights={[
        { value: "Free", label: "To join" },
        { value: "2 min", label: "Setup" },
        { value: "Secure", label: "Checkout" },
      ]}
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <Field
          label="Full name"
          icon={HiOutlineUser}
          type="text"
          name="fullName"
          autoComplete="name"
          required
          placeholder="Jane Doe"
          value={fullName}
          onChange={e => setFullName(e.target.value)}
        />

        <Field
          label="Email address"
          icon={HiOutlineMail}
          type="email"
          name="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
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
          hint="Use at least 8 characters."
        />

        {/* Avatar ------------------------------------------------- */}
        <div>
          <span className="mb-1.5 block text-[13px] font-semibold text-ink-700">
            Profile photo
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
                  alt="user profile"
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
              <span>{avatar ? "Change photo" : "Upload photo"}</span>
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

        <SubmitButton loading={isLoading} loadingText="Creating account…">
          Create account
          <IoIosArrowForward />
        </SubmitButton>

        <p className="text-center text-[12px] leading-relaxed text-ink-400">
          By signing up you agree to ShopO&apos;s Terms of Service and Privacy
          Policy.
        </p>

        <div className="relative py-1">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-ink-100" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-3 text-[12px] text-ink-400">or</span>
          </div>
        </div>

        <p className="text-center text-[14px] text-ink-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-brand-600 transition-colors hover:text-brand-700"
          >
            Sign in
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}

export default Signup;
