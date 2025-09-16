import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import CountDown from "./CountDown";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../redux-toolkit/actions/cartActions";
import Loader from "../UserComps/Loader";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function EventCard({ active, data, isLoading }) {
  const { cart } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  function addToCarthandler(data) {
    const isItemExists = cart && cart?.find(i => i?._id === data._id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) return toast.error("Product stock is Limited!");
      else {
        const cartData = { ...data, qty: 1 };
        dispatch(addToCart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  }
  if (isLoading) return <Loader />;
  return (
    <div
      className={`w-full block bg-white rounded-lg ${
        active ? "unset" : "mb-12"
      } lg:flex p-2`}
    >
      <div className="w-full lg:w-[50%] m-auto mr-3">
        <img
          src={`${data && data?.images[0].url}`}
          alt="Image"
          className="rounded-2xl"
        />
      </div>
      <div className="w-full lg:[w-50%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>{data.name}</h2>
        <p>{data?.description}</p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              ${data?.originalPrice}
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-[Roboto]">
              ${data?.discountPrice}
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
            {data.sold_out} Sold
            {/* {data?.sold_out} Sold */}
          </span>
        </div>
        <CountDown data={data} />
        <br />
        <div className="flex items-center gap-5">
          <Link to={`/product/${data?._id}?isEvent=true`}>
            <div
              className={`${styles.button} rounded-[6px] font-[500] text-[1.2rem] text-[#fff]`}
            >
              See details
            </div>
          </Link>
          <div
            className={`${styles.button} rounded-[6px] font-[500] text-[1.2rem] text-[#fff] cursor-pointer`}
            onClick={() => addToCarthandler(data)}
          >
            Add to cart
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
