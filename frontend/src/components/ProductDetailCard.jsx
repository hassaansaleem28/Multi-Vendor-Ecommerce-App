import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import styles from "../styles/styles";

function ProductDetailCard({ setOpen, product }) {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);

  function handleMessageSubmit() {}
  function IncrementCount() {
    setCount(count + 1);
  }
  function DecrementCount() {
    if (count > 1) setCount(count - 1);
  }

  return (
    <div className="bg-white ">
      {product ? (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex justify-center items-center">
          <div className="w-[90%] width-60-800px h-[90vh] overflow-scroll height-800px bg-white rounded-md shadow-sm relative p-4">
            <RxCross1
              size={30}
              className="absolute right-3 top-3 z-50"
              onClick={() => setOpen(false)}
            />
            <div className="block w-full flex-800px">
              <div className="w-full width-800px-50">
                <img src={product.image_Url[0].url} alt="Product Image" />
                <div className="flex">
                  <img
                    src={product.shop.shop_avatar.url}
                    alt="Image"
                    className="w-[50px] h-[50px] rounded-full mr-2"
                  />
                  <div>
                    <h3 className={`${styles.shop_name}`}>
                      {product.shop.name}
                    </h3>
                    <h5 className="pb-3 text-[15px]">
                      ({product.shop.ratings}) Ratings
                    </h5>
                  </div>
                </div>
                <div
                  className={`${styles.button} bg-[#000] mt-4 h-11 rounded-[4px]`}
                  onClick={handleMessageSubmit}
                >
                  <span className="text-[#fff] flex items-center font-medium">
                    Send Message <AiOutlineMessage className="ml-1" />
                  </span>
                </div>
                <h5 className="text-[16px] text-[red] mt-5">
                  ({product.total_sell}) Sold out
                </h5>
              </div>
              <div className="w-full width-800px-50 pt-5 pl-[5px] pr-[5px]">
                <h1 className={`${styles.productTitle} text-[20px]`}>
                  {product.name}
                </h1>
                <p>{product.description}</p>
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {product.discount_price}$
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {product.price ? product.price + "$" : null}
                  </h3>
                </div>
                <div className="flex items-center mt-12 justify-between pr-3">
                  <div>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={DecrementCount}
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[8px]">
                      {count}
                    </span>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={IncrementCount}
                    >
                      +
                    </button>
                  </div>
                  <div>
                    {click ? (
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => setClick(!click)}
                        color={click ? "red" : "#333"}
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer "
                        onClick={() => setClick(!click)}
                        color={click ? "red" : "#333"}
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>
                <div
                  className={`${styles.button} mt-6 rounded-[4px] h-11 flex items-center`}
                >
                  <span className="text-[#fff] flex items-center">
                    Add to cart <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ProductDetailCard;
