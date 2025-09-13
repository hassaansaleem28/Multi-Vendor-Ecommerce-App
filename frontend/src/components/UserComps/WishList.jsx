import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import WishListSingle from "./WishListSingle";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../../redux-toolkit/actions/wishlistActions";
import { addToCart } from "../../redux-toolkit/actions/cartActions";
import { toast } from "react-toastify";

function WishList({ setOpenWishList }) {
  const { wishlist } = useSelector(state => state.wishlist);
  const dispatch = useDispatch();

  function removeFromWishlistHandler(data) {
    dispatch(removeFromWishlist(data));
  }
  function addToCartFromWishList(data) {
    const newData = { ...data, qty: 1 };
    dispatch(addToCart(newData));
    setOpenWishList(false);
    toast.success("Product added to cart from wishlist!");
  }

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 h-full w-[80%] overflow-y-scroll width-800px-25 bg-white flex flex-col justify-between] shadow-sm">
        {wishlist && wishlist.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenWishList(false)}
              />
            </div>
            <h5>Your Wish List 💌 is Empty!</h5>
          </div>
        ) : (
          <div>
            <div className="flex w-full justify-end pt-5 pr-5">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenWishList(false)}
              />
            </div>
            {/* Item length */}
            <div className={`flex-with-items-center p-4`}>
              <AiOutlineHeart size={25} />
              <h5 className="pl-2 text-[20px] font-[500]">
                {wishlist && wishlist.length} items
              </h5>
            </div>
            {/* cart single items */}
            <br />
            <div className="w-full border-t">
              {wishlist &&
                wishlist.map((item, i) => (
                  <WishListSingle
                    key={i}
                    item={item}
                    removeFromWishlistHandler={removeFromWishlistHandler}
                    addToCartFromWishList={addToCartFromWishList}
                  />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WishList;
