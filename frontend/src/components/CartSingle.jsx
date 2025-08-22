import { useState } from "react";
import styles from "../styles/styles";
import { RxCross1 } from "react-icons/rx";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";

function CartSingle({ item }) {
  const [val, setVal] = useState(1);
  const totalPrice = item.price * val;
  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <div>
          <div
            className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.normalFlex} justify-center cursor-pointer`}
            onClick={() => setVal(val + 1)}
          >
            <HiPlus size={18} color="rgb(255, 255, 255)" />
          </div>
          <span className="pl-[10px]">{val}</span>
          <div
            className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
            onClick={() => setVal(val === 1 ? 1 : val - 1)}
          >
            <HiOutlineMinus size={16} color="#7d879c" />
          </div>
        </div>
        <img
          src="https://bonik-react.vercel.app/assets/images/products/Fashion/Clothes/1.SilverHighNeckSweater.png"
          alt="Image"
          className="w-[80px] h-[80px] ml-2"
        />
        <div className="pl-[5px]">
          <h1 className="">{item.name}</h1>
          <h4 className="font-[400] text-[15px] text-[#00000082]">
            ${item.price} * {val}
          </h4>
          <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
            US ${totalPrice}
          </h4>
        </div>
        <RxCross1 className="cursor-pointer" />
      </div>
    </div>
  );
}

export default CartSingle;
