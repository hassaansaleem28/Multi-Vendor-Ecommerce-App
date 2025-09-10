import { AiOutlineMessage } from "react-icons/ai";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { TbAddressBook } from "react-icons/tb";
import { RxPerson } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import {
  MdOutlineAdminPanelSettings,
  MdOutlineLogout,
  MdOutlineTrackChanges,
} from "react-icons/md";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function ProfileSidebar({ active, setActive }) {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.user);

  async function logoutHandler() {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/v2/user/logout-user`, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        window.location.reload(true);
        navigate("/");
      }
    } catch (err) {
      toast.error("Try again Later!");
      console.error(err);
    }
  }
  return (
    <div className="w-full bg-white shadow-sm rounded-[10px] p-4 pt-8">
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(1)}
      >
        <RxPerson size={20} color={active === 1 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 1 ? "text-[red]" : ""
          } display-block-800px hidden`}
        >
          Profile
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(2)}
      >
        <HiOutlineShoppingBag size={20} color={active === 2 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 2 ? "text-[red]" : ""
          } display-block-800px hidden`}
        >
          Orders
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(3)}
      >
        <HiOutlineReceiptRefund size={20} color={active === 3 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 3 ? "text-[red]" : ""
          } display-block-800px hidden`}
        >
          Refunds
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(4) || navigate("/inbox")}
      >
        <AiOutlineMessage size={20} color={active === 4 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 4 ? "text-[red]" : ""
          } display-block-800px hidden`}
        >
          Inbox
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(5)}
      >
        <MdOutlineTrackChanges size={20} color={active === 5 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 5 ? "text-[red]" : ""
          } display-block-800px hidden`}
        >
          Track Order
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(6)}
      >
        <RiLockPasswordLine size={20} color={active === 6 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 6 ? "text-[red]" : ""
          } display-block-800px hidden`}
        >
          Change Password
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(7)}
      >
        <TbAddressBook size={20} color={active === 7 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 7 ? "text-[red]" : ""
          } display-block-800px hidden`}
        >
          Address
        </span>
      </div>
      {user && user.role === "Admin" && (
        <div
          className="flex items-center cursor-pointer w-full mb-8"
          onClick={() => setActive(9) || navigate("/admin-dashboard")}
        >
          <MdOutlineAdminPanelSettings
            size={20}
            color={active === 9 ? "red" : ""}
          />
          <span
            className={`pl-3 ${
              active === 3 ? "text-[red]" : ""
            } display-block-800px hidden`}
          >
            Admin Dashboard
          </span>
        </div>
      )}
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(8) || logoutHandler()}
      >
        <MdOutlineLogout size={20} color={active === 8 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 8 ? "text-[red]" : ""
          } display-block-800px hidden`}
        >
          Log out
        </span>
      </div>
    </div>
  );
}

export default ProfileSidebar;
