import { useState } from "react";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import AuthShell from "../ui/AuthShell";
import Field from "../ui/Field";
import SubmitButton from "../ui/SubmitButton";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function ShopLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    setIsLoading(true);
    e.preventDefault();
    await axios
      .post(
        `${API_BASE_URL}/api/v2/seller/login-seller`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .then(() => {
        setIsLoading(false);
        setEmail("");
        setPassword("");
        toast.success("Login Successfully!");
        navigate("/dashboard");
        window.location.reload();
      })
      .catch(err => {
        setIsLoading(false);
        toast.error(err?.response?.data?.message);
        console.error("Error during login:", err);
      });
  }

  return (
    <AuthShell
      badge="Seller portal"
      title="Seller sign in"
      subtitle="Manage products, orders and payouts in one place."
      highlights={[
        { value: "Live", label: "Order alerts" },
        { value: "0%", label: "Setup fee" },
        { value: "24/7", label: "Support" },
      ]}
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
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
          label="Password"
          icon={HiOutlineLockClosed}
          type="password"
          name="password"
          autoComplete="current-password"
          required
          placeholder="Enter your password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <div className="flex items-center justify-between">
          <label
            htmlFor="remember-me"
            className="flex cursor-pointer items-center gap-2 text-[13px] text-ink-600"
          >
            <input
              type="checkbox"
              name="remember-me"
              id="remember-me"
              className="h-4 w-4 cursor-pointer rounded border-ink-300 accent-[#4f46e5]"
            />
            Remember me
          </label>
          <a
            href="./forgot-password"
            className="text-[13px] font-semibold text-brand-600 transition-colors hover:text-brand-700"
          >
            Forgot password?
          </a>
        </div>

        <SubmitButton loading={isLoading} loadingText="Signing in…">
          Sign in to dashboard
          <IoIosArrowForward />
        </SubmitButton>

        <div className="relative py-1">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-ink-100" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-3 text-[12px] text-ink-400">or</span>
          </div>
        </div>

        <p className="text-center text-[14px] text-ink-500">
          Don&apos;t have a shop yet?{" "}
          <Link
            to="/shop-create"
            className="font-semibold text-brand-600 transition-colors hover:text-brand-700"
          >
            Create your shop
          </Link>
        </p>

        <p className="text-center text-[13px] text-ink-400">
          Shopping instead?{" "}
          <Link
            to="/login"
            className="font-semibold text-ink-600 underline-offset-2 transition-colors hover:text-ink-900 hover:underline"
          >
            Customer login
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}

export default ShopLogin;
