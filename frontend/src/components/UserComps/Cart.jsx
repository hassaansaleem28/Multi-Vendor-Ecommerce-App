import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import styles from "../../styles/styles";
import CartSingle from "./CartSingle";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
} from "../../redux-toolkit/actions/cartActions";

function Cart({ setOpenCart }) {
  const { cart } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  function removeFromCarthandler(data) {
    dispatch(removeFromCart(data));
  }
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );
  function quantityChangeHandler(data) {
    dispatch(addToCart(data));
  }

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 overflow-y-scroll h-full w-[80%] width-800px-25 bg-white flex flex-col justify-between] shadow-sm">
        {cart && cart.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenCart(false)}
              />
            </div>
            <h5>Cart Items is Empty!</h5>
          </div>
        ) : (
          <>
            <div>
              <div className="flex w-full justify-end pt-5 pr-5">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpenCart(false)}
                />
              </div>
              {/* Item length */}
              <div className={`${styles.normalFlex} p-4`}>
                <IoBagHandleOutline size={25} />
                <h5 className="pl-2 text-[20px] font-[500]">
                  {cart && cart.length} items
                </h5>
              </div>
              {/* cart single items */}
              <br />
              <div className="w-full border-t">
                {cart &&
                  cart.map((item, i) => (
                    <CartSingle
                      key={i}
                      item={item}
                      quantityChangeHandler={quantityChangeHandler}
                      removeFromCarthandler={removeFromCarthandler}
                    />
                  ))}
              </div>
            </div>
            <div className="px-5 my-8">
              {/* checkout buttons */}
              <Link to="/checkout">
                <div
                  className={`h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px]`}
                >
                  <h1 className="text-[#fff] text-[18px] font-[600]">
                    Checkout Now (USD$ {totalPrice} )
                  </h1>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
