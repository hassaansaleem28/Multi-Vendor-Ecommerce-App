import { AiOutlineCamera } from "react-icons/ai";
import { useSelector } from "react-redux";
import styles from "../styles/styles";
import { useState } from "react";
import AllOrders from "./AllOrders";
import AllRefundOrders from "./AllRefundOrders";
import TrackOrder from "./TrackOrder";
import PaymentMethods from "./PaymentMethods";
import UserAddress from "./UserAddress";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function ProfileContent({ active }) {
  const { user } = useSelector(state => state.user);
  const [name, setName] = useState(user && user.fullName);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState();
  const [zipCode, setZipCode] = useState();
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="w-full">
      {/* profile-page */}
      {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={`${API_BASE_URL}/${user?.avatar.url}`}
                alt="Image "
                className="w-[150px] rounded-full object-cover border-[3px] border-[#3ad132] h-[150px]"
              />
              <div className="w-[30px] h-[30px] top-[115px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute button-[5px] right-[5px]">
                <AiOutlineCamera />
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
                    value={name}
                    onChange={e => setName(e.target.value)}
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
              <div className="w-full  flex-800px block pb-3">
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
                  <label className="block pb-2">Zip Code</label>
                  <input
                    type="number"
                    className={`${styles.input} !w-[95%] mbZero-800px`}
                    required
                    value={zipCode}
                    onChange={e => setZipCode(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full flex-800px block pb-3">
                <div className="width-800px-50 w-[100%]">
                  <label className="block pb-2">Address 1</label>
                  <input
                    type="address"
                    className={`${styles.input} !w-[95%] mb-4 mbZero-800px`}
                    required
                    value={address1}
                    onChange={e => setAddress1(e.target.value)}
                  />
                </div>
                <div className="width-800px-50 w-[100%]">
                  <label className="block pb-2">Address 2</label>
                  <input
                    type="address"
                    className={`${styles.input} !w-[95%] mb-4 mbZero-800px`}
                    required
                    value={address2}
                    onChange={e => setAddress2(e.target.value)}
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
          <PaymentMethods />
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
