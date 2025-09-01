import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersUser } from "../../redux-toolkit/actions/orderActions";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function TrackOrderDetails() {
  const { orders } = useSelector(state => state.orders);
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const { id } = useParams();
  useEffect(
    function () {
      dispatch(getAllOrdersUser(user?._id));
    },
    [dispatch]
  );
  const data = orders && orders.find(item => item._id === id);

  return (
    <div className="w-full h-[80vh] flex justify-center items-center">
      <>
        {data && data.status === "Processing" ? (
          <h1 className="text-[20px] text-center">
            Your Order is processing at shop.
          </h1>
        ) : data?.status === "Transferred to delivery partner" ? (
          <h1 className="text-[20px] text-center">
            Your Order is on the way to delivery partner.
          </h1>
        ) : data?.status === "Shipping" ? (
          <h1 className="text-[20px] text-center">
            Your Order is coming with our deivery partner!
          </h1>
        ) : data?.status === "Recieved" ? (
          <h1 className="text-[20px] text-center">
            Your Order is in your city now! Out for delivery soon.
          </h1>
        ) : data?.status === "On the way" ? (
          <h1 className="text-[20px] text-center">
            Delivery man is heading towards you!
          </h1>
        ) : data?.status === "Delivered" ? (
          <>Your order has been delivered!</>
        ) : data?.status === "Processing refund" ? (
          <h1 className="text-[20px] text-center">
            Your refund is processing!
          </h1>
        ) : data?.status === "Refund Success" ? (
          <h1 className="text-[20px] text-center">Your refund succeeded!</h1>
        ) : null}
      </>
    </div>
  );
}

export default TrackOrderDetails;
