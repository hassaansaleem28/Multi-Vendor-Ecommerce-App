import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import ProductDetailCard from "./ProductDetailCard";
import Ratings from "./Ratings";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux-toolkit/actions/wishlistActions";
import { toast } from "react-toastify";
import { addToCart } from "../../redux-toolkit/actions/cartActions";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function ProductCard({ product, isEvent }) {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { wishlist } = useSelector(state => state.wishlist);
  const { cart } = useSelector(state => state.cart);

  function removeFromWishListhandler(data) {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  }
  function addToWishListhandler(data) {
    setClick(!click);
    dispatch(addToWishlist(data));
  }
  function addToCarthandler(id) {
    const isItemExists = cart && cart?.find(i => i?._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (product.stock < 1) return toast.error("Product stock is Limited!");
      else {
        const cartData = { ...product, qty: 1 };
        dispatch(addToCart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  }

  useEffect(
    function () {
      if (wishlist && wishlist.find(item => item._id === product._id))
        setClick(true);
      else setClick(false);
    },
    [wishlist, product._id]
  );

  return (
    <>
      <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
        <div className="flex justify-end"></div>
        <Link
          to={`${
            isEvent
              ? `/product/${product._id}?isEvent=true`
              : `/product/${product._id}`
          }`}
        >
          <img
            src={`${API_BASE_URL}/${product.images && product.images[0]}`}
            alt="Image"
            className="w-full h-[170px] object-contain"
          />
        </Link>
        <Link to={`/shop/preview/${product.shop._id}`}>
          <h5 className={`${styles.shop_name}`}>{product.shop.name}</h5>
        </Link>
        <Link
          to={`${
            isEvent
              ? `/product/${product._id}?isEvent=true`
              : `/product/${product._id}`
          }`}
        >
          {" "}
          <h4 className="pb-3 font-[500]">
            {product?.name.length > 40
              ? product?.name.slice(0, 40) + "..."
              : product?.name}
          </h4>
          <div className="flex">
            <Ratings rating={product?.ratings} />
          </div>
          <div className="py-2 flex items-center justify-between">
            <div className="flex">
              <h5 className={`${styles.productDiscountPrice}`}>
                {product.discountPrice}$
              </h5>
              <h4 className={`${styles.price}`}>
                {product?.originalPrice ? product?.originalPrice + " $" : null}
              </h4>
            </div>
            <span className="font-[400] text-[17px] text-[#68d284]">
              {product?.sold_out} sold
            </span>
          </div>
        </Link>
        {/* Side Options */}
        <div>
          {click ? (
            <AiFillHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => removeFromWishListhandler(product)}
              color={click ? "red" : "#333"}
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => addToWishListhandler(product)}
              color={click ? "red" : "#333"}
              title="Add to wishlist"
            />
          )}
          <AiOutlineEye
            size={22}
            className="cursor-pointer absolute right-2 top-14"
            onClick={() => setOpen(!open)}
            color="#000"
            title="Quick view"
          />
          <AiOutlineShoppingCart
            size={25}
            className="cursor-pointer absolute right-2 top-24"
            onClick={() => addToCarthandler(product._id)}
            color="#444"
            title="Add to cart"
          />
          {open ? (
            <ProductDetailCard setOpen={setOpen} product={product} />
          ) : null}
        </div>
      </div>
    </>
  );
}

export default ProductCard;
