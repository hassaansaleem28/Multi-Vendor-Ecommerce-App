import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { BsCartPlus } from "react-icons/bs";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function WishListSingle({
  item,
  removeFromWishlistHandler,
  addToCartFromWishList,
}) {
  const [val, setVal] = useState(1);
  const totalPrice = item.discountPrice * val;
  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <RxCross1
          className="cursor-pointer"
          onClick={() => removeFromWishlistHandler(item)}
        />
        <img
          src={`${API_BASE_URL}/${item && item?.images[0]}`}
          alt="Image"
          className="w-[130px] h-min ml-2 mr-2 rounded-[5px]"
        />
        <div className="pl-[5px]">
          <h1 className="">{item.name}</h1>
          <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
            US ${totalPrice}
          </h4>
        </div>
        <div>
          <BsCartPlus
            size={20}
            className="cursor-pointer"
            title="Add to cart"
            onClick={() => addToCartFromWishList(item)}
          />
        </div>
      </div>
    </div>
  );
}

export default WishListSingle;
