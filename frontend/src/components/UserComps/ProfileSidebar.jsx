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
import { motion } from "framer-motion";

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

  const items = [
    { id: 1, label: "Profile", Icon: RxPerson, onClick: () => setActive(1) },
    {
      id: 2,
      label: "Orders",
      Icon: HiOutlineShoppingBag,
      onClick: () => setActive(2),
    },
    {
      id: 3,
      label: "Refunds",
      Icon: HiOutlineReceiptRefund,
      onClick: () => setActive(3),
    },
    {
      id: 4,
      label: "Inbox",
      Icon: AiOutlineMessage,
      onClick: () => setActive(4) || navigate("/inbox"),
    },
    {
      id: 5,
      label: "Track Order",
      Icon: MdOutlineTrackChanges,
      onClick: () => setActive(5),
    },
    {
      id: 6,
      label: "Change Password",
      Icon: RiLockPasswordLine,
      onClick: () => setActive(6),
    },
    {
      id: 7,
      label: "Address",
      Icon: TbAddressBook,
      onClick: () => setActive(7),
    },
    ...(user && user.role === "Admin"
      ? [
          {
            id: 9,
            label: "Admin Dashboard",
            Icon: MdOutlineAdminPanelSettings,
            onClick: () => setActive(9) || navigate("/admin-dashboard"),
          },
        ]
      : []),
  ];

  return (
    <nav className="w-full rounded-2xl border border-ink-100 bg-white p-3 shadow-card">
      {/* identity */}
      <div className="mb-3 flex items-center gap-3 rounded-xl bg-ink-50/70 p-3">
        <img
          src={`${user?.avatar?.url}`}
          alt={user?.fullName}
          className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-white"
        />
        <div className="hidden min-w-0 display-block-800px">
          <p className="truncate font-display text-[14px] font-bold text-ink-900">
            {user?.fullName}
          </p>
          <p className="truncate text-[12px] text-ink-400">{user?.email}</p>
        </div>
      </div>

      <ul className="space-y-1">
        {items.map(({ id, label, Icon, onClick }) => {
          const isActive = active === id;
          return (
            <li key={id}>
              <motion.button
                onClick={onClick}
                whileTap={{ scale: 0.98 }}
                className={`relative flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors duration-200 ${
                  isActive
                    ? "text-brand-700"
                    : "text-ink-600 hover:bg-ink-50 hover:text-ink-900"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="profile-nav-active"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    className="absolute inset-0 rounded-xl bg-brand-50"
                  />
                )}
                <Icon size={19} className="relative z-10 shrink-0" />
                <span className="relative z-10 hidden text-[14px] font-medium display-block-800px">
                  {label}
                </span>
              </motion.button>
            </li>
          );
        })}

        {/* logout */}
        <li className="pt-1">
          <motion.button
            onClick={() => setActive(8) || logoutHandler()}
            whileTap={{ scale: 0.98 }}
            className="flex w-full cursor-pointer items-center gap-3 rounded-xl border-t border-ink-100 px-3 py-2.5 pt-3.5 text-left text-danger-600 transition-colors duration-200 hover:bg-danger-50"
          >
            <MdOutlineLogout size={19} className="shrink-0" />
            <span className="hidden text-[14px] font-medium display-block-800px">
              Log out
            </span>
          </motion.button>
        </li>
      </ul>
    </nav>
  );
}

export default ProfileSidebar;
