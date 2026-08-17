import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import { Country, State } from "country-state-city";
import { AnimatePresence, motion } from "framer-motion";
import {
  HiOutlineLocationMarker,
  HiChevronDown,
  HiOutlineHome,
  HiOutlineOfficeBuilding,
  HiOutlineStar,
} from "react-icons/hi";
import {
  deleteAddress,
  updateAddresses,
} from "../../redux-toolkit/actions/userActions";
import { backdrop, modal, easeOutSoft } from "../../lib/motion";

const inputClass =
  "w-full rounded-xl border border-ink-200 bg-ink-50/60 px-4 py-2.5 text-[15px] text-ink-900 placeholder:text-ink-400 transition-all duration-200 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10";
const labelClass = "mb-1.5 block text-[13px] font-semibold text-ink-700";

const TYPE_ICONS = {
  Default: HiOutlineStar,
  Home: HiOutlineHome,
  Office: HiOutlineOfficeBuilding,
};

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: easeOutSoft }}
      className="rounded-2xl border border-ink-100 bg-white p-6 shadow-card md:p-8"
    >
      {/* ---- Header --------------------------------------------- */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-[19px] font-bold text-ink-900">
            Saved addresses
          </h2>
          <p className="mt-0.5 text-[13px] text-ink-500">
            {user?.addresses?.length || 0} address
            {user?.addresses?.length === 1 ? "" : "es"} on file
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setOpen(true)}
          className="inline-flex h-[44px] cursor-pointer items-center gap-2 rounded-xl bg-brand-600 px-5 font-semibold text-white shadow-card transition-colors duration-300 hover:bg-brand-700"
        >
          <AiOutlinePlus size={17} />
          Add new
        </motion.button>
      </div>

      {/* ---- List ----------------------------------------------- */}
      <div className="mt-7 space-y-3">
        <AnimatePresence initial={false}>
          {user &&
            user?.addresses.map((item, i) => {
              const Icon = TYPE_ICONS[item.addressType] || HiOutlineLocationMarker;
              return (
                <motion.div
                  key={item._id || i}
                  layout
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20, height: 0 }}
                  transition={{ duration: 0.3, ease: easeOutSoft }}
                  className="group flex items-center gap-4 rounded-xl border border-ink-100 bg-white p-4 transition-all duration-300 hover:border-brand-200 hover:shadow-card"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                    <Icon size={20} />
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="font-display text-[15px] font-bold text-ink-900">
                      {item.addressType}
                    </p>
                    <p className="truncate text-[13px] text-ink-500">
                      {item.address1} {item.address2}
                    </p>
                  </div>

                  <span className="hidden shrink-0 text-[13px] text-ink-400 sm:block">
                    {user && user.phoneNumber}
                  </span>

                  <motion.button
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.88 }}
                    onClick={() => handleDelete(item)}
                    aria-label={`Delete ${item.addressType} address`}
                    className="grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-full text-ink-400 transition-colors hover:bg-danger-50 hover:text-danger-500"
                  >
                    <AiOutlineDelete size={19} />
                  </motion.button>
                </motion.div>
              );
            })}
        </AnimatePresence>

        {user && user.addresses.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-ink-200 px-6 py-14 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-ink-50 text-ink-300">
              <HiOutlineLocationMarker size={26} />
            </span>
            <h3 className="mt-4 font-display text-[17px] font-bold text-ink-900">
              No saved addresses
            </h3>
            <p className="mt-1 text-[14px] text-ink-500">
              Add one to speed up your next checkout.
            </p>
          </div>
        )}
      </div>

      {/* ---- Modal ---------------------------------------------- */}
      <AnimatePresence>
        {open && (
          <motion.div
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/50 p-4 backdrop-blur-sm"
          >
            <motion.div
              variants={modal}
              onClick={e => e.stopPropagation()}
              className="relative max-h-[88vh] w-full max-w-[480px] overflow-y-auto rounded-2xl bg-white shadow-panel"
            >
              <header className="sticky top-0 z-10 flex items-center justify-between border-b border-ink-100 bg-white px-6 py-5">
                <h3 className="font-display text-[18px] font-bold text-ink-900">
                  Add new address
                </h3>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="grid h-9 w-9 cursor-pointer place-items-center rounded-full text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-900"
                >
                  <RxCross1 size={16} />
                </button>
              </header>

              <form aria-required onSubmit={handleSubmit} className="space-y-5 p-6">
                <div>
                  <label className={labelClass}>Country</label>
                  <div className="relative">
                    <select
                      value={country}
                      className={`${inputClass} cursor-pointer appearance-none pr-10`}
                      onChange={e => setCountry(e.target.value)}
                    >
                      <option value="">Choose your country</option>
                      {Country &&
                        Country.getAllCountries().map(item => (
                          <option key={item.isoCode} value={item.isoCode}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                    <HiChevronDown
                      size={18}
                      className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-400"
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>City / State</label>
                  <div className="relative">
                    <select
                      value={city}
                      disabled={!country}
                      className={`${inputClass} cursor-pointer appearance-none pr-10 disabled:opacity-60`}
                      onChange={e => setCity(e.target.value)}
                    >
                      <option value="">
                        {country ? "Choose your city" : "Select a country first"}
                      </option>
                      {State &&
                        State.getStatesOfCountry(country).map(item => (
                          <option key={item.isoCode} value={item.isoCode}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                    <HiChevronDown
                      size={18}
                      className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-400"
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Address line 1</label>
                  <input
                    type="address"
                    className={inputClass}
                    required
                    placeholder="Street address"
                    value={address1}
                    onChange={e => setAddress1(e.target.value)}
                  />
                </div>

                <div>
                  <label className={labelClass}>Address line 2</label>
                  <input
                    type="address"
                    className={inputClass}
                    required
                    placeholder="Apartment, suite, unit"
                    value={address2}
                    onChange={e => setAddress2(e.target.value)}
                  />
                </div>

                <div>
                  <label className={labelClass}>Zip code</label>
                  <input
                    type="number"
                    className={inputClass}
                    required
                    placeholder="54000"
                    value={zipCode ?? ""}
                    onChange={e => setZipCode(e.target.value)}
                  />
                </div>

                <div>
                  <label className={labelClass}>Address type</label>
                  <div className="relative">
                    <select
                      value={addressType}
                      className={`${inputClass} cursor-pointer appearance-none pr-10`}
                      onChange={e => setAddressType(e.target.value)}
                    >
                      <option value="">Select address type</option>
                      {addressTypeData &&
                        addressTypeData.map((item, i) => (
                          <option key={i} value={item.name}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                    <HiChevronDown
                      size={18}
                      className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-400"
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  className="mt-2 flex h-[48px] w-full cursor-pointer items-center justify-center rounded-xl bg-brand-600 font-semibold text-white shadow-card transition-colors duration-300 hover:bg-brand-700"
                >
                  Save address
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default UserAddress;
