import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux-toolkit/actions/wishlistActions";
import { addToCart } from "../../redux-toolkit/actions/cartActions";
import { toast } from "react-toastify";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function ProductDetails({ data }) {
  const { wishlist } = useSelector(state => state.wishlist);
  const { cart } = useSelector(state => state.cart);
  const { product } = useSelector(state => state.product);

  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const totalReviewsLength =
    product && product.reduce((acc, prod) => acc + prod.reviews.length, 0);
  const totalRatings =
    product &&
    product.reduce(
      (acc, prod) =>
        acc + prod.reviews.reduce((sum, rev) => sum + rev.rating, 0),
      0
    );
  const avgRating = totalRatings / totalReviewsLength || 0;

  useEffect(
    function () {
      dispatch(getAllProductsShop(data && data?.shop._id));
      if (wishlist && wishlist.find(item => item._id === data?._id))
        setClick(true);
      else setClick(false);
    },
    [dispatch, data, wishlist, data?._id]
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

  function removeFromWishListhandler(data) {
    console.log("YES");
    setClick(click => !click);
    dispatch(removeFromWishlist(data));
  }
  function addToWishListhandler(data) {
    console.log("HELLO");
    setClick(click => !click);
    dispatch(addToWishlist(data));
  }
  function addToCarthandler(id) {
    const isItemExists = cart && cart?.find(i => i?._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (product.stock < 1) return toast.error("Product stock is Limited!");
      else {
        const cartData = { ...data, qty: count };
        dispatch(addToCart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
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
                        onClick={() => removeFromWishListhandler(data)}
                        color={click ? "red" : "#333"}
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer "
                        onClick={() => addToWishListhandler(data)}
                        color={click ? "red" : "#333"}
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>
                <div
                  className={`${styles.button} !mt-6 !rounded cursor-pointer !h-11 flex items-center`}
                  onClick={() => addToCarthandler(data._id)}
                >
                  <span className="text-white flex items-center cursor-pointer">
                    Add to cart{" "}
                    <AiOutlineShoppingCart className="ml-1 cursor-pointer" />
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
                    <h5 className="pb-3 text-[15px]">
                      ({avgRating}/5) Ratings
                    </h5>
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
          <ProductDetailsInfo
            data={data}
            product={product}
            totalReviewsLength={totalReviewsLength}
            avgRating={avgRating}
          />
          <br />
          <br />
        </div>
      ) : null}
    </div>
  );
}

export default ProductDetails;
