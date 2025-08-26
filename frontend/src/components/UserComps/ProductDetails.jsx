import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import ProductDetailsInfo from "./ProductDetailsInfo";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux-toolkit/actions/productActions";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function ProductDetails({ data }) {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();

  const { product } = useSelector(state => state.product);
  const dispatch = useDispatch();
  useEffect(
    function () {
      dispatch(getAllProductsShop(data && data?.shop._id));
    },
    [dispatch, data]
  );

  function IncrementCount() {
    setCount(count + 1);
  }
  function DecrementCount() {
    if (count > 1) setCount(count - 1);
  }
  function handleMessageSubmit() {
    navigate("/inbox?conversation=50nfqkwfnqw");
  }

  return (
    <div className="bg-white">
      {data ? (
        <div className={`${styles.section} w-[90%] width-80per-800px`}>
          <div className="w-full py-5">
            <div className="block w-full flex-800px">
              <div className="w-full width-800px-50">
                <img
                  src={`${API_BASE_URL}/${data?.images[select]}`}
                  alt="Image"
                  className="w-[80%] cursor-pointer"
                />
                <div className="w-full flex">
                  {data &&
                    data?.images.map((img, i) => (
                      <div className={`cursor-pointer`} key={i}>
                        <img
                          src={`${API_BASE_URL}/${img}`}
                          alt="Images"
                          className="h-[200px] overflow-hidden mr-3 mt-3"
                          onClick={() => setSelect(i)}
                        />
                      </div>
                    ))}
                </div>
              </div>
              <div className="w-full width-800px-50 pt-5">
                <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                <p>{data.description}</p>
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    ${data.discountPrice}
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {data.price ? data.price + "$" : null}
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
                  className={`${styles.button} !mt-6 !rounded !h-11 flex items-center`}
                >
                  <span className="text-white flex items-center">
                    Add to cart <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>
                <div className="flex items-center pt-8">
                  <img
                    src={`${API_BASE_URL}/${data.shop.avatar.url}`}
                    alt="Image"
                    className="w-[50px] h-[50px] rounded-full mr-2 cursor-pointer"
                    onClick={() => navigate(`/shop/preview/${data.shop._id}`)}
                  />
                  <div
                    className="pr-8 cursor-pointer"
                    onClick={() => navigate(`/shop/preview/${data.shop._id}`)}
                  >
                    <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                      {data.shop.name}
                    </h3>
                    <h5 className="pb-3 text-[15px]">(4/5) Ratings</h5>
                  </div>
                  <div
                    className={`${styles.button} !bg-[#6443d1] !mt-4 !rounded !h-11`}
                    onClick={handleMessageSubmit}
                  >
                    <span className="text-white flex items-center">
                      Send Message <AiOutlineMessage className="ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ProductDetailsInfo data={data} product={product} />
          <br />
          <br />
        </div>
      ) : null}
    </div>
  );
}

export default ProductDetails;
