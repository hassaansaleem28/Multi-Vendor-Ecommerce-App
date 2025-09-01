import styles from "../../styles/styles";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function passwordChangeHandler(e) {
    try {
      e.preventDefault();

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
    } catch (error) {
      if (error) {
        toast.error(error.response?.data?.message);
      }
    }
  }
  return (
    <div className="w-full px-5">
      <h1 className="text-[25px] block text-center font-[600] font-[Roboto] text-[#000000ba] pb-2">
        Change Password
      </h1>
      <div className="w-full">
        <form
          aria-required
          onSubmit={passwordChangeHandler}
          className="flex flex-col items-center"
        >
          <div className="width-800px-50 w-[100%] mt-6">
            <label className="block pb-2">Enter your old password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 mbZero-800px`}
              required
              value={oldPassword}
              onChange={e => setOldPassword(e.target.value)}
            />
          </div>
          <div className="width-800px-50 w-[100%] mt-2">
            <label className="block pb-2">Enter your new password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 mbZero-800px`}
              required
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
            />
          </div>
          <div className="width-800px-50 w-[100%] mt-2">
            <label className="block pb-2">Enter your confirm password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 mbZero-800px`}
              required
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Update"
            className={`mr-8 w-[47%] h-[40px] border border-[#3a24db] text-center
                  text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
          />
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
