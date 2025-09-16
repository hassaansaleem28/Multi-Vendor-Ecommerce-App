import { useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/styles";
import axios from "axios";
import { toast } from "react-toastify";
import { loadSeller } from "../../redux-toolkit/actions/sellerActions";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function ShopSettings() {
  const { seller } = useSelector(state => state.seller);
  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState(seller?.name);
  const [description, setDescription] = useState(seller?.description);
  const [address, setAddress] = useState(seller?.address);
  const [phoneNumber, setPhoneNumber] = useState(seller?.phoneNumber);
  const [zipCode, setZipCode] = useState(seller?.zipCode);
  const dispatch = useDispatch();

  async function handleImage(e) {
    e.preventDefault();
    const file = e.target.files[0];
    setAvatar(file);

    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    await axios
      .put(`${API_BASE_URL}/api/v2/seller/update-shop-avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then(() => {
        dispatch(loadSeller());
        toast.success("Avatar Updated!");
      })
      .catch(error => {
        toast.error(error);
      });
  }
  async function handleSubmit(e) {
    e.preventDefault();

    await axios
      .put(
        `${API_BASE_URL}/api/v2/seller/update-shop-profile`,
        { name, description, address, phoneNumber, zipCode },
        { withCredentials: true }
      )
      .then(() => {
        dispatch(loadSeller());
        toast.success("Profile Updated!");
      })
      .catch(error => {
        toast.error(error?.message);
        console.error(error);
      });
  }
  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="flex flex-col w-full width-80per-800px my-5 justify-center">
        <div className="w-full flex items-center justify-center ">
          <div className="relative">
            <img
              src={
                avatar
                  ? URL.createObjectURL(avatar)
                  : `${seller?.avatar?.url}`
              }
              alt=""
              className="w-[200px] h-[200px] rounded-full cursor-pointer"
            />
            <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute right-[15px] bottom-[10px]">
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
        <form
          aria-required={true}
          className="flex flex-col items-center mb-10"
          onSubmit={handleSubmit}
        >
          <div className="width-800px-50 flex items-center flex-col mt-5 w-[100%]">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop name</label>
            </div>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="HS store"
              className={`${styles.input} !w-[95%] mb-4 mbZero-800px`}
              required
            />
          </div>
          <div className="width-800px-50 flex items-center flex-col mt-5 w-[100%]">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop description</label>
            </div>
            <input
              type="text"
              placeholder="Tell about your shop"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 mbZero-800px`}
            />
          </div>
          <div className="width-800px-50 flex items-center flex-col mt-5 w-[100%]">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop address</label>
            </div>
            <input
              type="address"
              placeholder="Shop address"
              value={address}
              onChange={e => setAddress(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 mbZero-800px`}
              required
            />
          </div>
          <div className="width-800px-50 flex items-center flex-col mt-5 w-[100%]">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop phone number</label>
            </div>
            <input
              type="number"
              placeholder="+425167512468"
              value={phoneNumber}
              onChange={e => setPhoneNumber(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 mbZero-800px`}
              required
            />
          </div>
          <div className="width-800px-50 flex items-center flex-col mt-5 w-[100%]">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop zip code</label>
            </div>
            <input
              type="number"
              placeholder="914121"
              value={zipCode}
              onChange={e => setZipCode(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 mbZero-800px`}
              required
            />
          </div>
          <div className="width-800px-50 flex items-center flex-col mt-5 w-[100%]">
            <input
              type="submit"
              value="Update Shop"
              className={`${styles.input} text-blue-500 !border-blue-500 cursor-pointer !w-[95%] mb-4 hover:bg-blue-500 hover:text-white font-[500] mbZero-800px transition-all active:translate-y-1`}
              required
              readOnly
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ShopSettings;
