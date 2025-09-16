import { AiOutlineCamera } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/styles";
import { useEffect, useState } from "react";
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

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function ProfileContent({ active }) {
  const { user, error } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState(user && user.fullName);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);

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
      })
      .catch(error => {
        toast.error(error);
      });
  }

  return (
    <div className="w-full">
      {/* profile-page */}
      {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={`${user?.avatar.url}`}
                alt="Image "
                className="w-[150px] rounded-full object-cover border-[3px] border-[#3ad132] h-[150px]"
              />
              <div className="w-[30px] h-[30px] top-[115px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute button-[5px] right-[5px]">
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  onChange={handleImage}
                />
                <label htmlFor="image">
                  <AiOutlineCamera className="cursor-pointer" />
                </label>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="w-full px-5">
            <form onSubmit={handleSubmit} aria-required={true}>
              <div className="w-full  flex-800px block pb-3">
                <div className="width-800px-50 w-[100%]">
                  <label className="block pb-2">Full Name</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 mbZero-800px`}
                    required
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                  />
                </div>
                <div className="width-800px-50 w-[100%]">
                  <label className="block pb-2">Email address</label>
                  <input
                    type="email"
                    className={`${styles.input} !w-[95%] mb-1 mbZero-800px`}
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full flex-800px block pb-3">
                <div className="width-800px-50 w-[100%]">
                  <label className="block pb-2">Phone number</label>
                  <input
                    type="number"
                    className={`${styles.input} !w-[95%] mb-4 mbZero-800px`}
                    required
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="width-800px-50 w-[100%]">
                  <label className="block pb-2">Your Password</label>
                  <input
                    type="password"
                    className={`${styles.input} !w-[95%] mb-4 mbZero-800px`}
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <input
                type="submit"
                value="Update"
                className={`w-[250px] h-[40px] border border-[#3a24db] text-center
                  text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
              />
            </form>
          </div>
        </>
      )}
      {/* orders-page */}
      {active === 2 && (
        <div>
          <AllOrders />
        </div>
      )}
      {active === 3 && (
        <div>
          <AllRefundOrders />
        </div>
      )}
      {active === 5 && (
        <div>
          <TrackOrder />
        </div>
      )}
      {active === 6 && (
        <div>
          <ChangePassword />
        </div>
      )}
      {active === 7 && (
        <div>
          <UserAddress />
        </div>
      )}
    </div>
  );
}

export default ProfileContent;
