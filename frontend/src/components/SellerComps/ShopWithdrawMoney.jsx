import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersShop } from "../../redux-toolkit/actions/orderActions";
import { getAllProductsShop } from "../../redux-toolkit/actions/productActions";
import styles from "../../styles/styles";
import axios from "axios";
import { AiOutlineDelete } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import { loadSeller } from "../../redux-toolkit/actions/sellerActions";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
    <div className="w-full h-[90vh] p-8">
      <div className="w-full bg-white h-full rounded flex justify-center items-center flex-col">
        <h5 className="text-[1.4rem] p-5">
          Available Balance: ${availableBalance}
        </h5>
        <button
          className={`${styles.button} text-white cursor-pointer rounded-[8px] font-[600] text-[1rem]`}
          onClick={() =>
            availableBalance < 50 || NaN
              ? toast.error("You don't have enough balance to withdraw!")
              : setOpen(true)
          }
        >
          Withdraw money
        </button>
      </div>
      {open && (
        <div className="w-full h-screen z-[9999] fixed top-0 left-0 flex items-center justify-center bg-[#0000004e]">
          <div
            className={`w-[95%] width-800px-50 bg-white shadow rounded ${
              paymentMethod ? "h-[80vh] overflow-y-scroll" : "h-[unset]"
            } min-h-[40vh] p-3`}
          >
            <div className="w-full flex justify-end">
              <RxCross1
                size={25}
                onClick={() => setOpen(false) || setPaymentMethod(false)}
                className="cursor-pointer"
              />
            </div>
            {paymentMethod ? (
              <div>
                <h3 className="text-[22px] font-Poppins text-center font-[600]">
                  Add new Withdraw Method:
                </h3>
                <form onSubmit={handleSubmit}>
                  <div>
                    <label>
                      Bank Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name=""
                      required
                      value={bankInfo.bankName}
                      onChange={e =>
                        setBankInfo({ ...bankInfo, bankName: e.target.value })
                      }
                      id=""
                      placeholder="Bank name"
                      className={`${styles.input} mt-2`}
                    />
                  </div>
                  <div className="pt-2">
                    <label>
                      Bank Country <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name=""
                      value={bankInfo.bankCountry}
                      onChange={e =>
                        setBankInfo({
                          ...bankInfo,
                          bankCountry: e.target.value,
                        })
                      }
                      id=""
                      required
                      placeholder="Bank Country"
                      className={`${styles.input} mt-2`}
                    />
                  </div>
                  <div className="pt-2">
                    <label>
                      Bank Swift Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name=""
                      id=""
                      required
                      value={bankInfo.bankSwiftCode}
                      onChange={e =>
                        setBankInfo({
                          ...bankInfo,
                          bankSwiftCode: e.target.value,
                        })
                      }
                      placeholder="Bank Swift Code"
                      className={`${styles.input} mt-2`}
                    />
                  </div>

                  <div className="pt-2">
                    <label>
                      Bank Account Number{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name=""
                      id=""
                      value={bankInfo.bankAccountNumber}
                      onChange={e =>
                        setBankInfo({
                          ...bankInfo,
                          bankAccountNumber: e.target.value,
                        })
                      }
                      required
                      placeholder="Bank account number"
                      className={`${styles.input} mt-2`}
                    />
                  </div>
                  <div className="pt-2">
                    <label>
                      Bank Holder Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name=""
                      required
                      value={bankInfo.bankHolderName}
                      onChange={e =>
                        setBankInfo({
                          ...bankInfo,
                          bankHolderName: e.target.value,
                        })
                      }
                      id=""
                      placeholder="Bank Holder name"
                      className={`${styles.input} mt-2`}
                    />
                  </div>

                  <div className="pt-2">
                    <label>
                      Bank Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name=""
                      required
                      id=""
                      value={bankInfo.bankAddress}
                      onChange={e =>
                        setBankInfo({
                          ...bankInfo,
                          bankAddress: e.target.value,
                        })
                      }
                      placeholder="Bank address"
                      className={`${styles.input} mt-2`}
                    />
                  </div>

                  <button
                    type="submit"
                    className={`${styles.button} mb-3 rounded-2xl text-[#fff] text-[22px] cursor-pointer mt-4`}
                  >
                    {isLoading ? "Wait..." : "Add"}
                  </button>
                </form>
              </div>
            ) : (
              <>
                <h3 className="text-[22px] font-Poppins">
                  Available Withdraw Methods:
                </h3>

                {seller && seller?.withdrawMethod ? (
                  <div>
                    <div className="flex-800px w-full justify-between items-center">
                      <div className="width-800px-50">
                        <h5>
                          Account Number:{" "}
                          {"*".repeat(
                            seller?.withdrawMethod.bankAccountNumber.length - 3
                          ) +
                            seller?.withdrawMethod.bankAccountNumber.slice(-3)}
                        </h5>
                        <h5>Bank Name: {seller?.withdrawMethod.bankName}</h5>
                      </div>
                      <div className="width-800px-50">
                        <AiOutlineDelete
                          size={25}
                          className="cursor-pointer"
                          onClick={() => deleteHandler()}
                        />
                      </div>
                    </div>
                    <br />
                    <h4>Available Balance: {availableBalance}$</h4>
                    <br />
                    <div className="flex-800px w-full items-center">
                      <input
                        type="number"
                        placeholder="Withdraw amount"
                        value={withdrawAmount}
                        onChange={e => setWithdrawAmount(e.target.value)}
                        className="width-800px-par w-[full] border marigin-right-800px p-1 rounded"
                      />
                      <div
                        className={`${styles.button} !h-[42px] rounded-2xl text-[#fff] text-[20px] cursor-pointer mt-4`}
                        onClick={withdrawHandler}
                      >
                        {isLoading ? "Wait..." : "Withdraw"}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-[18px] pt-2">
                      No Withdraw Methods available!
                    </p>
                    <div className="w-full flex items-center">
                      <div
                        className={`${styles.button} rounded-2xl text-[#fff] text-[22px] cursor-pointer mt-4`}
                        onClick={() => setPaymentMethod(true)}
                      >
                        Add new
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ShopWithdrawMoney;
