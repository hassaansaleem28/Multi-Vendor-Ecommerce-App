import { useState } from "react";
import styles from "../../styles/styles";
import { RxCross1 } from "react-icons/rx";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { toast } from "react-toastify";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function CartSingle({ item, quantityChangeHandler, removeFromCarthandler }) {
  const [val, setVal] = useState(item.qty);
  const totalPrice = item.discountPrice * val;

  function Increment(data) {
    if (item.stock < val) {
      toast.error("Product stock limited!");
    } else {
      setVal(val + 1);
      const updateCartData = { ...data, qty: val + 1 };
      quantityChangeHandler(updateCartData);
    }
  }
  function Decrement(data) {
    setVal(val === 1 ? 1 : val - 1);
    const updateCartData = { ...data, qty: val === 1 ? 1 : val - 1 };
    quantityChangeHandler(updateCartData);
  }
  console.log(item);
  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <div>
          <div
            className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.normalFlex} justify-center cursor-pointer`}
            onClick={() => Increment(item)}
          >
            <HiPlus size={18} color="rgb(255, 255, 255)" />
          </div>
          <span className="pl-[8px]">{item.qty}</span>
          <div
            className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
            onClick={() => Decrement(item)}
          >
            <HiOutlineMinus size={16} color="#7d879c" />
          </div>
        </div>
        <img
          src={`${API_BASE_URL}/${item ? item && item?.images[0] : ""}`}
          alt="Image"
          className="w-[130px] h-min ml-2 mr-2 rounded-[5px]"
        />
        <div className="pl-[5px]">
          <h1 className="">{item.name}</h1>
          <h4 className="font-[400] text-[15px] text-[#00000082]">
            ${item?.discountPrice} * {val}
          </h4>
          <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
            US ${totalPrice}
          </h4>
        </div>
        <RxCross1
          className="cursor-pointer"
          onClick={() => removeFromCarthandler(item)}
        />
      </div>
    </div>
  );
}

export default CartSingle;
