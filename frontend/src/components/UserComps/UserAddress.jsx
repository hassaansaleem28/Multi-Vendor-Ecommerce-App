import { AiOutlineDelete } from "react-icons/ai";
import styles from "../../styles/styles";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import { Country, State } from "country-state-city";
import {
  deleteAddress,
  updateAddresses,
} from "../../redux-toolkit/actions/userActions";

function UserAddress() {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [addressType, setAddressType] = useState("");
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const addressTypeData = [
    { name: "Default" },
    { name: "Home" },
    { name: "Office" },
  ];
  function handleSubmit(e) {
    e.preventDefault();

    if (addressType === "" || country === "" || city === "")
      return toast.error("Please provide all the fields!");
    else {
      dispatch(
        updateAddresses({
          country,
          city,
          zipCode,
          address1,
          address2,
          addressType,
        })
      );
      setOpen(false);
      setCountry("");
      setCity("");
      setAddress1("");
      setAddress2("");
      setZipCode(null);
      setAddressType("");
    }
  }
  function handleDelete(address) {
    dispatch(deleteAddress(address._id));
  }

  return (
    <div className="w-full px-5">
      {open && (
        <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center">
          <div className="w-[35%] h-[80vh] bg-white rounded shadow relative overflow-y-scroll">
            <div className="flex w-full justify-end p-3">
              <RxCross1
                size={30}
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            <h1 className="text-center text-[25px] font-[Poppins]">
              Add New Address
            </h1>
            <div className="w-full">
              <form aria-required onSubmit={handleSubmit}>
                <div className="w-full block p-4">
                  <div className="w-full pb-2">
                    <label className="block pb-2">Your Country</label>
                    <select
                      name=""
                      id=""
                      value={country}
                      className="w-[95%] border h-[40px] rounded-[5px]"
                      onChange={e => setCountry(e.target.value)}
                    >
                      <option value="" className="block border pb-2">
                        Choose your country
                      </option>
                      {Country &&
                        Country.getAllCountries().map(item => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="w-full pb-2">
                    <label className="block pb-2">Your City</label>
                    <select
                      name=""
                      id=""
                      value={city}
                      className="w-[95%] border h-[40px] rounded-[5px]"
                      onChange={e => setCity(e.target.value)}
                    >
                      <option value="" className="block border pb-2">
                        Choose your city
                      </option>
                      {State &&
                        State.getStatesOfCountry(country).map(item => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="w-full pb-2">
                    <label className="block pb-2">Address 1</label>
                    <input
                      type="address"
                      className={`${styles.input}`}
                      required
                      value={address1}
                      onChange={e => setAddress1(e.target.value)}
                    />
                    <div className="w-full pb-2">
                      <label className="block pb-2">Address 2</label>
                      <input
                        type="address"
                        className={`${styles.input}`}
                        required
                        value={address2}
                        onChange={e => setAddress2(e.target.value)}
                      />
                    </div>
                    <div className="w-full pb-2">
                      <label className="block pb-2">Zip Code</label>
                      <input
                        type="number"
                        className={`${styles.input}`}
                        required
                        value={zipCode}
                        onChange={e => setZipCode(e.target.value)}
                      />
                    </div>
                    <div className="w-full pb-2">
                      <label className="block pb-2">Address Type</label>
                      <select
                        name=""
                        id=""
                        value={addressType}
                        className="w-[95%] border h-[40px] rounded-[5px]"
                        onChange={e => setAddressType(e.target.value)}
                      >
                        <option value="" className="block border pb-2">
                          Select address type
                        </option>
                        {addressTypeData &&
                          addressTypeData.map((item, i) => (
                            <option
                              className="block pb-2"
                              key={i}
                              value={item.name}
                            >
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="w-full pb-2">
                      <input
                        type="submit"
                        className={`${styles.input} mt-5 cursor-pointer`}
                        required
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] font-[Roboto] text-[#000000ba] pb-2">
          My addresses
        </h1>
        <div
          className={`${styles.button} rounded-md cursor-pointer`}
          onClick={() => setOpen(true)}
        >
          <span className="text-[#fff] font-[500] cursor-pointer">Add New</span>
        </div>
      </div>
      <br />
      {user &&
        user?.addresses.map((item, i) => (
          <div
            key={i}
            className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10"
          >
            <div className="flex items-center">
              <h5 className="pl-5 font-[600]">{item.addressType}</h5>
            </div>
            <div className="pl-8 flex items-center">
              <h6 className="text-[12px] text-unset-800px">
                {item.address1} {item.address2}
              </h6>
            </div>
            <div className="pl-8 flex items-center">
              <h6 className="text-[12px] text-unset-800px">
                {user && user.phoneNumber}
              </h6>
            </div>
            <div className="min-w-[10%] flex items-center justify-between pl-8">
              <AiOutlineDelete
                size={25}
                className="cursor-pointer"
                onClick={() => handleDelete(item)}
              />
            </div>
          </div>
        ))}
      {user && user.addresses.length === 0 && (
        <h5 className="text-center pt-8 text-[18px]">
          You don' t have any saved addresses
        </h5>
      )}
    </div>
  );
}

export default UserAddress;
