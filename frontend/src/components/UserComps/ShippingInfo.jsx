import { Country, State } from "country-state-city";
import { AnimatePresence, motion } from "framer-motion";
import { HiOutlineLocationMarker, HiChevronDown } from "react-icons/hi";
import { easeOutSoft } from "../../lib/motion";

const inputClass =
  "w-full rounded-xl border border-ink-200 bg-ink-50/60 px-4 py-2.5 text-[15px] text-ink-900 placeholder:text-ink-400 transition-all duration-200 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10";

const labelClass = "mb-1.5 block text-[13px] font-semibold text-ink-700";

function ShippingInfo({
  user,
  country,
  setCountry,
  city,
  setCity,
  userInfo,
  setUserInfo,
  address1,
  setAddress1,
  address2,
  setAddress2,
  zipCode,
  setZipCode,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: easeOutSoft }}
      className="w-full rounded-2xl border border-ink-100 bg-white p-6 md:p-8"
    >
      <div className="mb-6 flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600">
          <HiOutlineLocationMarker size={21} />
        </span>
        <div>
          <h5 className="font-display text-[18px] font-bold text-ink-900">
            Shipping address
          </h5>
          <p className="text-[13px] text-ink-500">
            Where should we deliver your order?
          </p>
        </div>
      </div>

      <form className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Full name</label>
          <input
            type="text"
            value={user && user.fullName}
            readOnly
            required
            className={`${inputClass} cursor-not-allowed opacity-80`}
          />
        </div>

        <div>
          <label className={labelClass}>Email address</label>
          <input
            type="email"
            value={user && user.email}
            readOnly
            required
            className={`${inputClass} cursor-not-allowed opacity-80`}
          />
        </div>

        <div>
          <label className={labelClass}>Phone number</label>
          <input
            type="number"
            required
            value={user && user.phoneNumber}
            readOnly
            className={`${inputClass} cursor-not-allowed opacity-80`}
          />
        </div>

        <div>
          <label className={labelClass}>Zip code</label>
          <input
            type="number"
            value={zipCode ?? ""}
            onChange={e => setZipCode(e.target.value)}
            required
            placeholder="54000"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Country</label>
          <div className="relative">
            <select
              className={`${inputClass} cursor-pointer appearance-none pr-10`}
              value={country}
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
              className={`${inputClass} cursor-pointer appearance-none pr-10 disabled:opacity-60`}
              value={city}
              disabled={!country}
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
            required
            value={address1}
            onChange={e => setAddress1(e.target.value)}
            placeholder="Street address"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Address line 2</label>
          <input
            type="address"
            value={address2}
            onChange={e => setAddress2(e.target.value)}
            required
            placeholder="Apartment, suite, unit"
            className={inputClass}
          />
        </div>
      </form>

      {/* ---- Saved addresses ------------------------------------- */}
      <div className="mt-7 border-t border-ink-100 pt-5">
        <button
          type="button"
          onClick={() => setUserInfo(!userInfo)}
          className="flex cursor-pointer items-center gap-2 text-[14px] font-semibold text-brand-600 transition-colors hover:text-brand-700"
        >
          Choose from saved addresses
          <motion.span
            animate={{ rotate: userInfo ? 180 : 0 }}
            transition={{ duration: 0.25 }}
          >
            <HiChevronDown size={17} />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {userInfo && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: easeOutSoft }}
              className="overflow-hidden"
            >
              <div className="mt-4 grid gap-2.5">
                {user && user.addresses?.length ? (
                  user.addresses.map((item, index) => (
                    <label
                      key={index}
                      className="flex cursor-pointer items-center gap-3 rounded-xl border border-ink-200 p-3.5 transition-all duration-200 hover:border-brand-300 hover:bg-brand-50/50"
                    >
                      <input
                        type="checkbox"
                        className="h-4 w-4 cursor-pointer accent-[#4f46e5]"
                        value={item.addressType}
                        onClick={() =>
                          setAddress1(item.address1) ||
                          setAddress2(item.address2) ||
                          setZipCode(item.zipCode) ||
                          setCountry(item.country) ||
                          setCity(item.city)
                        }
                      />
                      <div className="min-w-0">
                        <p className="text-[14px] font-semibold text-ink-900">
                          {item.addressType}
                        </p>
                        <p className="truncate text-[13px] text-ink-500">
                          {item.address1}
                          {item.address2 ? `, ${item.address2}` : ""}
                        </p>
                      </div>
                    </label>
                  ))
                ) : (
                  <p className="rounded-xl border border-dashed border-ink-200 p-4 text-center text-[13px] text-ink-400">
                    No saved addresses yet. Add one from your profile.
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default ShippingInfo;
