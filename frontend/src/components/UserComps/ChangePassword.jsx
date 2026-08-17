import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { HiOutlineLockClosed, HiOutlineShieldCheck } from "react-icons/hi";
import Field from "../ui/Field";
import SubmitButton from "../ui/SubmitButton";
import { easeOutSoft } from "../../lib/motion";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function passwordChangeHandler(e) {
    try {
      e.preventDefault();
      setIsLoading(true);

      const { data } = await axios.put(
        `${API_BASE_URL}/api/v2/user/update-user-password`,
        { oldPassword, newPassword, confirmPassword },
        { withCredentials: true }
      );
      if (data?.success) {
        toast.success(data?.message);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error) {
        toast.error(error.response?.data?.message);
      }
    }
  }

  const mismatch =
    confirmPassword.length > 0 && newPassword !== confirmPassword;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: easeOutSoft }}
      className="mx-auto max-w-[520px] rounded-2xl border border-ink-100 bg-white p-7 shadow-card md:p-9"
    >
      <div className="mb-7 flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
          <HiOutlineShieldCheck size={22} />
        </span>
        <div>
          <h2 className="font-display text-[19px] font-bold text-ink-900">
            Change password
          </h2>
          <p className="text-[13px] text-ink-500">
            Use a strong password you don&apos;t reuse elsewhere.
          </p>
        </div>
      </div>

      <form aria-required onSubmit={passwordChangeHandler} className="space-y-5">
        <Field
          label="Current password"
          icon={HiOutlineLockClosed}
          type="password"
          name="oldPassword"
          autoComplete="current-password"
          required
          placeholder="Enter your current password"
          value={oldPassword}
          onChange={e => setOldPassword(e.target.value)}
        />

        <Field
          label="New password"
          icon={HiOutlineLockClosed}
          type="password"
          name="newPassword"
          autoComplete="new-password"
          required
          placeholder="Choose a new password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          hint="At least 8 characters."
        />

        <div>
          <Field
            label="Confirm new password"
            icon={HiOutlineLockClosed}
            type="password"
            name="confirmPassword"
            autoComplete="new-password"
            required
            placeholder="Repeat the new password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
          {mismatch && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1.5 text-[12px] font-medium text-danger-600"
            >
              Passwords don&apos;t match.
            </motion.p>
          )}
        </div>

        <SubmitButton loading={isLoading} loadingText="Updating…">
          Update password
        </SubmitButton>
      </form>
    </motion.div>
  );
}

export default ChangePassword;
