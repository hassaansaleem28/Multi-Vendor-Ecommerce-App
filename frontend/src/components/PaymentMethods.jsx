import { AiOutlineDelete } from "react-icons/ai";
import styles from "../styles/styles";

function PaymentMethods() {
  return (
    <div className="w-full px-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] font-[Roboto] text-[#000000ba] pb-2">
          Payment Methods
        </h1>
        <div className={`${styles.button} rounded-md`}>
          <span className="text-[#fff] font-[500]">Add New</span>
        </div>
      </div>
      <br />
      <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
        <div className="flex items-center">
          <img
            src="https://bonik-react.vercel.app/assets/images/payment-methods/Visa.svg"
            alt="Image"
          />
          <h5 className="pl-5 font-[600]">Hassaan</h5>
        </div>
        <div className="pl-8 flex items-center">
          <h6>123 **** *** ****</h6>
          <h5 className="pl-6">10/2026</h5>
        </div>
        <div className="min-w-[10%] flex items-center justify-between pl-8">
          <AiOutlineDelete size={25} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default PaymentMethods;
