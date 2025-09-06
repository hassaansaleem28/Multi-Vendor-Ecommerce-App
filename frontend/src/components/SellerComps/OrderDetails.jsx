import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "../../styles/styles";
import { BsFillBagFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllOrdersShop } from "../../redux-toolkit/actions/orderActions";
import { toast } from "react-toastify";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function OrderDetails() {
  const { shopOrders } = useSelector(state => state.orders);
  const { seller } = useSelector(state => state.seller);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [status, setStatus] = useState("");

  const { id } = useParams();
  useEffect(
    function () {
      dispatch(getAllOrdersShop(seller._id));
    },
    [dispatch]
  );

  const data = shopOrders && shopOrders.find(item => item._id === id);

  async function orderUpdateHandler() {
    await axios
      .put(
        `${API_BASE_URL}/api/v2/order/update-order-status/${id}`,
        {
          status,
        },
        { withCredentials: true }
      )
      .then(() => {
        toast.success("Order updated!");
        navigate("/dashboard-orders");
      })
      .catch(error => {
        toast.error(error.response.data.message);
      });
  }

  async function refundOrderUpdateHandler() {
    await axios
      .put(
        `${API_BASE_URL}/api/v2/order/order-refund-success/${id}`,
        {
          status,
        },
        { withCredentials: true }
      )
      .then(res => {
        toast.success(res?.data?.message);
        dispatch(getAllOrdersShop(seller._id));
      })
      .catch(error => {
        toast.error(error?.response?.data?.message);
      });
  }

  return (
    <div className={`py-4 min-h-screen ${styles.section}`}>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={30} color="crimson" />
          <h1 className="pl-2 text-[25px]">Order Details</h1>
        </div>
        <Link to={"/dashboard-orders"}>
          <div
            className={`${styles.button} !bg-[#fce1e6] !rounded-[4px] text-[#e94560] font-[600] h-[45px] text-[18px]`}
          >
            Order List
          </div>
        </Link>
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
              src={`${API_BASE_URL}/${item?.images[0]}`}
              className="w-[80px] h-[80px] object-cover"
              alt=""
            />
            <div className="w-full">
              <h5 className="pl-3 text-[20px]">{item?.name}</h5>
              <h5 className="pl-3 text-[20px] text-[#00000091]">
                US${item?.discountPrice} x {item?.qty}
              </h5>
            </div>
          </div>
        ))}
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
            Status:{" "}
            {data?.paymentInfo?.status ? data?.paymentInfo?.status : "Not Paid"}
          </h4>
        </div>
      </div>
      <br />
      <br />
      <h4 className="pt-3 text-[20px] font-[600]">Order Status:</h4>
      {data?.status !== "Processing refund" &&
        data?.status !== "Refund Success" && (
          <select
            value={status}
            onChange={e => setStatus(e.target.value)}
            className="w-[200px] mt-2 border h-[35px] rounded-[5px]"
          >
            {[
              "Processing",
              "Transferred to delivery partner",
              "Shipping",
              "Received",
              "On the way",
              "Delivered",
            ]
              .slice(
                [
                  "Processing",
                  "Transferred to delivery partner",
                  "Shipping",
                  "Received",
                  "On the way",
                  "Delivered",
                ].indexOf(data?.status)
              )
              .map((option, index) => (
                <option value={option} key={index}>
                  {option}
                </option>
              ))}
          </select>
        )}
      {data?.status === "Processing refund" ||
      data?.status === "Refund Success" ? (
        <select
          value={status}
          onChange={e => setStatus(e.target.value)}
          className="w-[200px] mt-2 border h-[35px] rounded-[5px]"
        >
          {["Processing refund", "Refund Success"]
            .slice(
              ["Processing refund", "Refund Success"].indexOf(data?.status)
            )
            .map((option, index) => (
              <option value={option} key={index}>
                {option}
              </option>
            ))}
        </select>
      ) : null}
      <div
        className={`${styles.button} mt-5 !bg-[#FCE1E6] !rounded-[4px] text-[#E94560] font-[600] !h-[45px] text-[18px] cursor-pointer`}
        onClick={
          data?.status !== "Processing refund"
            ? orderUpdateHandler
            : refundOrderUpdateHandler
        }
      >
        Update Status
      </div>
    </div>
  );
}

export default OrderDetails;
