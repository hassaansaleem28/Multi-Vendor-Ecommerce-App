import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersShop } from "../../redux-toolkit/actions/orderActions";
import { getAllProductsShop } from "../../redux-toolkit/actions/productActions";
import axios from "axios";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { HiOutlineLibrary, HiOutlineCash } from "react-icons/hi";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import { loadSeller } from "../../redux-toolkit/actions/sellerActions";
import { backdrop, modal, easeOutSoft } from "../../lib/motion";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const inputClass =
  "w-full rounded-xl border border-ink-200 bg-ink-50/60 px-4 py-2.5 text-[15px] text-ink-900 placeholder:text-ink-400 transition-all duration-200 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10";
const labelClass = "mb-1.5 block text-[13px] font-semibold text-ink-700";

function ShopWithdrawMoney() {
  const dispatch = useDispatch();
  const { seller } = useSelector(state => state.seller);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(50);
  const [bankInfo, setBankInfo] = useState({
    bankName: "",
    bankCountry: "",
    bankSwiftCode: null,
    bankAccountNumber: null,
    bankHolderName: "",
    bankAddress: "",
  });

  useEffect(
    function () {
      dispatch(getAllOrdersShop(seller._id));
      dispatch(getAllProductsShop(seller._id));
    },
    [dispatch]
  );

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const withdrawMethod = {
        bankName: bankInfo.bankName,
        bankCountry: bankInfo.bankCountry,
        bankSwiftCode: bankInfo.bankSwiftCode,
        bankAccountNumber: bankInfo.bankAccountNumber,
        bankHolderName: bankInfo.bankHolderName,
        bankAddress: bankInfo.bankAddress,
      };
      setPaymentMethod(false);
      setIsLoading(true);
      const { data } = await axios.put(
        `${API_BASE_URL}/api/v2/seller/update-withdraw-method`,
        {
          withdrawMethod,
        },
        { withCredentials: true }
      );
      if (data?.success) {
        toast.success("Withdraw Credentials Updated!");
        dispatch(loadSeller());
        setBankInfo({
          bankName: "",
          bankCountry: "",
          bankSwiftCode: null,
          bankAccountNumber: null,
          bankHolderName: "",
          bankAddress: "",
        });
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
      setIsLoading(false);
    }
  }

  async function deleteHandler() {
    try {
      const { data } = await axios.delete(
        `${API_BASE_URL}/api/v2/seller/delete-withdraw-method`,
        { withCredentials: true }
      );
      if (data?.success) {
        toast.success("Withdraw Method Deleted!");
        dispatch(loadSeller());
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function withdrawHandler() {
    if (withdrawAmount < 50 || withdrawAmount > availableBalance)
      return toast.error("You can' t withdraw this amount!");
    else {
      const amount = withdrawAmount;
      try {
        setIsLoading(true);
        const { data } = await axios.post(
          `${API_BASE_URL}/api/v2/withdraw-request/create-withdraw-request`,
          { amount },
          { withCredentials: true }
        );
        if (data?.success) toast.success("Withdraw Money Request Successful!");
        dispatch(loadSeller());
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        toast.error(error.message);
      }
    }
  }

  const availableBalance = seller?.availableBalance.toFixed(2);

  return (
    <div>
      {/* ---- Balance card ---------------------------------------- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: easeOutSoft }}
        className="relative mx-auto max-w-[560px] overflow-hidden rounded-2xl bg-ink-950 p-8 text-center shadow-panel"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="animate-float-slow absolute -left-16 -top-16 h-[260px] w-[260px] rounded-full bg-brand-600/30 blur-[80px]" />
          <div
            className="animate-float-slow absolute -bottom-20 right-0 h-[220px] w-[220px] rounded-full bg-accent-500/20 blur-[80px]"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div className="relative z-10">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/10 text-accent-400 backdrop-blur mx-auto">
            <HiOutlineCash size={28} />
          </span>

          <p className="mt-6 text-[12px] font-semibold uppercase tracking-[0.18em] text-white/50">
            Available balance
          </p>

          <motion.p
            key={availableBalance}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: easeOutSoft }}
            className="mt-2 font-display text-[44px] font-extrabold tracking-tight text-white"
          >
            ${availableBalance}
          </motion.p>

          <p className="mt-1 text-[13px] text-white/45">
            Minimum withdrawal is $50
          </p>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() =>
              availableBalance < 50 || NaN
                ? toast.error("You don't have enough balance to withdraw!")
                : setOpen(true)
            }
            className="mt-8 h-[50px] w-full max-w-[280px] cursor-pointer rounded-xl bg-white font-display text-[16px] font-bold text-ink-900 shadow-card transition-colors duration-300 hover:bg-accent-400"
          >
            Withdraw money
          </motion.button>
        </div>
      </motion.div>

      {/* ---- Modal ----------------------------------------------- */}
      <AnimatePresence>
        {open && (
          <motion.div
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setOpen(false) || setPaymentMethod(false)}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-ink-950/50 p-4 backdrop-blur-sm"
          >
            <motion.div
              variants={modal}
              onClick={e => e.stopPropagation()}
              className="relative max-h-[88vh] w-full max-w-[520px] overflow-y-auto rounded-2xl bg-white shadow-panel"
            >
              <header className="sticky top-0 z-10 flex items-center justify-between border-b border-ink-100 bg-white px-6 py-5">
                <h3 className="font-display text-[18px] font-bold text-ink-900">
                  {paymentMethod
                    ? "Add withdraw method"
                    : "Withdraw methods"}
                </h3>
                <button
                  onClick={() => setOpen(false) || setPaymentMethod(false)}
                  aria-label="Close"
                  className="grid h-9 w-9 cursor-pointer place-items-center rounded-full text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-900"
                >
                  <RxCross1 size={16} />
                </button>
              </header>

              <div className="p-6">
                {paymentMethod ? (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className={labelClass}>
                        Bank name <span className="text-danger-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={bankInfo.bankName}
                        onChange={e =>
                          setBankInfo({ ...bankInfo, bankName: e.target.value })
                        }
                        placeholder="Bank name"
                        className={inputClass}
                      />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className={labelClass}>
                          Bank country{" "}
                          <span className="text-danger-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={bankInfo.bankCountry}
                          onChange={e =>
                            setBankInfo({
                              ...bankInfo,
                              bankCountry: e.target.value,
                            })
                          }
                          required
                          placeholder="Country"
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>
                          Swift code <span className="text-danger-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={bankInfo.bankSwiftCode ?? ""}
                          onChange={e =>
                            setBankInfo({
                              ...bankInfo,
                              bankSwiftCode: e.target.value,
                            })
                          }
                          placeholder="SWIFT / BIC"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>
                        Account number{" "}
                        <span className="text-danger-500">*</span>
                      </label>
                      <input
                        type="number"
                        value={bankInfo.bankAccountNumber ?? ""}
                        onChange={e =>
                          setBankInfo({
                            ...bankInfo,
                            bankAccountNumber: e.target.value,
                          })
                        }
                        required
                        placeholder="Account number"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>
                        Account holder name{" "}
                        <span className="text-danger-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={bankInfo.bankHolderName}
                        onChange={e =>
                          setBankInfo({
                            ...bankInfo,
                            bankHolderName: e.target.value,
                          })
                        }
                        placeholder="Full name on the account"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>
                        Bank address <span className="text-danger-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={bankInfo.bankAddress}
                        onChange={e =>
                          setBankInfo({
                            ...bankInfo,
                            bankAddress: e.target.value,
                          })
                        }
                        placeholder="Branch address"
                        className={inputClass}
                      />
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.985 }}
                      className="mt-2 flex h-[48px] w-full cursor-pointer items-center justify-center rounded-xl bg-brand-600 font-semibold text-white shadow-card transition-colors duration-300 hover:bg-brand-700"
                    >
                      {isLoading ? "Please wait…" : "Add method"}
                    </motion.button>
                  </form>
                ) : seller && seller?.withdrawMethod ? (
                  <div>
                    {/* saved bank card */}
                    <div className="flex items-center gap-4 rounded-xl border border-ink-100 bg-ink-50/60 p-4">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-brand-600 shadow-sm">
                        <HiOutlineLibrary size={21} />
                      </span>

                      <div className="min-w-0 flex-1">
                        <p className="font-display text-[15px] font-bold text-ink-900">
                          {seller?.withdrawMethod.bankName}
                        </p>
                        <p className="text-[13px] tabular-nums text-ink-500">
                          {"•".repeat(
                            Math.max(
                              seller?.withdrawMethod.bankAccountNumber.length -
                                3,
                              0
                            )
                          ) + seller?.withdrawMethod.bankAccountNumber.slice(-3)}
                        </p>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.12 }}
                        whileTap={{ scale: 0.88 }}
                        onClick={() => deleteHandler()}
                        aria-label="Delete withdraw method"
                        className="grid h-9 w-9 cursor-pointer place-items-center rounded-full text-ink-400 transition-colors hover:bg-danger-50 hover:text-danger-500"
                      >
                        <AiOutlineDelete size={19} />
                      </motion.button>
                    </div>

                    <div className="mt-6 flex items-center justify-between rounded-xl bg-brand-50 px-4 py-3">
                      <span className="text-[14px] text-ink-600">
                        Available balance
                      </span>
                      <span className="font-display text-[18px] font-bold text-ink-900">
                        ${availableBalance}
                      </span>
                    </div>

                    <div className="mt-6">
                      <label className={labelClass}>Amount to withdraw</label>
                      <div className="flex gap-3">
                        <div className="relative flex-1">
                          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[15px] font-semibold text-ink-400">
                            $
                          </span>
                          <input
                            type="number"
                            placeholder="50"
                            value={withdrawAmount}
                            onChange={e => setWithdrawAmount(e.target.value)}
                            className={`${inputClass} pl-8`}
                          />
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.96 }}
                          onClick={withdrawHandler}
                          className="h-[46px] shrink-0 cursor-pointer rounded-xl bg-brand-600 px-6 font-semibold text-white shadow-card transition-colors duration-300 hover:bg-brand-700"
                        >
                          {isLoading ? "Wait…" : "Withdraw"}
                        </motion.button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center py-8 text-center">
                    <span className="grid h-16 w-16 place-items-center rounded-full bg-ink-50 text-ink-300">
                      <HiOutlineLibrary size={30} />
                    </span>
                    <h4 className="mt-5 font-display text-[17px] font-bold text-ink-900">
                      No withdraw method yet
                    </h4>
                    <p className="mt-1.5 max-w-xs text-[14px] text-ink-500">
                      Add your bank details so we know where to send your
                      earnings.
                    </p>

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setPaymentMethod(true)}
                      className="mt-7 inline-flex h-[46px] cursor-pointer items-center gap-2 rounded-xl bg-brand-600 px-6 font-semibold text-white shadow-card transition-colors duration-300 hover:bg-brand-700"
                    >
                      <AiOutlinePlus size={17} />
                      Add new method
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ShopWithdrawMoney;
