import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAllOrdersUser } from "../../redux-toolkit/actions/orderActions";
import styles from "../../styles/styles";
import { BsFillBagFill } from "react-icons/bs";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { toast } from "react-toastify";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function OrderDetails() {
  const { orders } = useSelector(state => state.orders);
  const { user } = useSelector(state => state.user);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(1);
  const [selectedItem, setSelectedItem] = useState({});
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const { id } = useParams();
  useEffect(
    function () {
      dispatch(getAllOrdersUser(user?._id));
    },
    [dispatch]
  );

  const data = orders && orders.find(item => item._id === id);

  async function reviewHandler() {
    try {
      setIsLoading(true);
      await axios
        .put(
          `${API_BASE_URL}/api/v2/product/create-new-review`,
          {
            user,
            rating,
            comment,
            productId: selectedItem?._id,
            orderId: id,
          },
          { withCredentials: true }
        )
        .then(res => {
          toast.success(res.data.message);
          dispatch(getAllOrdersUser(user?._id));
          setComment("");
          setRating(null);
          setOpen(false);
        });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      toast.error(error.message);
    }
  }
  async function refundHandler() {
    try {
      setIsLoading(true);
      await axios
        .put(`${API_BASE_URL}/api/v2/order/give-order-refund/${id}`, {
          status: "Processing refund",
        })
        .then(res => {
          toast.success(res.data.message);
          dispatch(getAllOrdersUser(user?._id));
          setIsLoading(false);
        })
        .catch(error => {
          toast.error(error.message);
          setIsLoading(false);
        });
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      toast.error(error.message);
    }
  }

  return (
    <div className={`py-4 mt-15 min-h-screen ${styles.section}`}>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={30} color="crimson" />
          <h1 className="pl-2 text-[25px]">Order Details</h1>
        </div>
      </div>
      <div className="w-full flex items-center justify-between pt-6">
        <h5 className="text-[#00000084]">
          Order ID: <span>#{data?._id?.slice(0, 8)}</span>
        </h5>
        <h5 className="text-[#00000084]">
          Placed on: <span>{data?.createdAt?.slice(0, 10)}</span>
        </h5>
      </div>
      {/* order items */}
      <br />
      <br />
      {data &&
        data?.cart?.map((item, i) => (
          <div key={i} className="w-full flex items-start mb-5">
            <img
              src={`${item?.images[0]}`}
              className="w-[80px] h-[80px] object-cover"
              alt=""
            />
            <div className="w-full">
              <h5 className="pl-3 text-[20px]">{item?.name}</h5>
              <h5 className="pl-3 text-[20px] text-[#00000091]">
                US${item?.discountPrice} x {item?.qty}
              </h5>
            </div>
            {data?.status === "Delivered" && !item.isReviewed ? (
              <div
                className={`${styles.button} rounded-[8px] text-[1.1rem] font-[500] text-[#fff] cursor-pointer`}
                onClick={() => setOpen(true) || setSelectedItem(item)}
              >
                <h5>Write a review</h5>
              </div>
            ) : null}
          </div>
        ))}
      {/* Review Pop up */}
      {open && (
        <div className="w-full fixed top-0 left-0 h-screen bg-[#0005] z-[50] flex items-center justify-center">
          <div className="w-[50%] h-min bg-[#fff] shadow rounded-md p-3">
            <div className="w-full flex justify-end p-3">
              <RxCross1
                size={30}
                onClick={() => setOpen(false)}
                className="cursor-pointer"
              />
            </div>
            <h2 className="text-[30px] font-[500] font-[Poppins] text-center">
              Give a Review
            </h2>
            <br />
            <div className="w-full flex">
              <img
                src={`${API_BASE_URL}/${selectedItem?.images[0]}`}
                className="w-[80px] h-[80px]"
                alt=""
              />
              <div>
                <div className="pl-3 text-[20px]">{selectedItem?.name}</div>
                <h4 className="pl-3 text-[20px]">
                  US${selectedItem?.discountPrice} x {selectedItem?.qty}
                </h4>
              </div>
            </div>
            <br />
            <br />
            {/* ratings */}
            <h5 className="pl-3 text-[20px] font-[500]">
              Give a Rating <span className="text-red-500">*</span>
            </h5>
            <div className="flex w-full ml-2 pt-1">
              {[1, 2, 3, 4, 5].map(i =>
                rating >= i ? (
                  <AiFillStar
                    key={i}
                    className="mr-1 cursor-pointer"
                    color="rgb(246,186,0)"
                    size={25}
                    onClick={() => setRating(i)}
                  />
                ) : (
                  <AiOutlineStar
                    key={i}
                    className="mr-1 cursor-pointer"
                    color="rgb(246,186,0)"
                    size={25}
                    onClick={() => setRating(i)}
                  />
                )
              )}
            </div>
            <br />
            <div className="w-full ml-3">
              <label className="block text-[20px] font-[500]">
                Write a comment
                <span className="ml-1 font-[400] text-[16px] text-[#00000052]">
                  (optional)
                </span>
              </label>
              <textarea
                name="comment"
                id=""
                value={comment}
                onChange={e => setComment(e.target.value)}
                cols={20}
                rows={5}
                placeholder="How was your product? Write your thoughts about your experience!"
                className="mt-2 w-[95%] border p-2 outline-none"
              ></textarea>
              <div
                className={`${styles.button} text-white text-[1.1rem] font-[500] rounded-[9px] ml-3 cursor-pointer`}
                onClick={rating > 1 ? reviewHandler : null}
              >
                {isLoading ? "Submitting" : "Submit"}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="border-t w-full text-right">
        <h5 className="pt-3 text-[18px]">
          Total Price: <strong>US${data?.totalPrice}</strong>
        </h5>
      </div>
      <br />
      <br />
      <div className="w-full flex-800px items-center">
        <div className="w-full width-60-800px">
          <h4 className="pt-3 text-[20px] font-[600]">Shipping Address:</h4>
          <h4 className="pt-3 text-[20px]">
            {data?.shippingAddress.address1 +
              " " +
              data?.shippingAddress.address2}
          </h4>
          <h4 className=" text-[20px]">{data?.shippingAddress.country}</h4>
          <h4 className=" text-[20px]">{data?.shippingAddress.city}</h4>
          <h4 className=" text-[20px]">+92{data?.user?.phoneNumber}</h4>
        </div>
        <div className="w-full width-800px-40">
          <h4 className="pt-3 text-[20px]">Payment Info:</h4>
          <h4>
            Status:
            {data?.paymentInfo?.status ? data?.paymentInfo?.status : "Not Paid"}
          </h4>
          {data?.status === "Delivered" && (
            <>
              <br />
              <div
                className={`${styles.button} text-[1.1rem] rounded-[9px] font-[500] text-white cursor-pointer `}
                onClick={() => refundHandler()}
              >
                {isLoading ? "Wait.." : "Give a refund"}
              </div>
            </>
          )}
        </div>
      </div>
      <br />
      <Link to={"/"}>
        {" "}
        <div
          className={`${styles.button} text-[1.1rem] rounded-[9px] font-[500] text-white`}
        >
          Send Message
        </div>
      </Link>
      <br />
      <br />
    </div>
  );
}

export default OrderDetails;
