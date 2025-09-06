import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersShop } from "../../redux-toolkit/actions/orderActions";
import { getAllProductsShop } from "../../redux-toolkit/actions/productActions";
import styles from "../../styles/styles";

function ShopWithdrawMoney() {
  const dispatch = useDispatch();
  const { seller } = useSelector(state => state.seller);
  const { shopOrders } = useSelector(state => state.orders);
  const [deliveredOrders, setDeliveredOrder] = useState([]);

  useEffect(
    function () {
      dispatch(getAllOrdersShop(seller._id));
      dispatch(getAllProductsShop(seller._id));

      const orderData =
        shopOrders && shopOrders.filter(item => item.status === "Delivered");
      setDeliveredOrder(orderData);
    },
    [dispatch]
  );
  const totalEarningWithoutTax =
    deliveredOrders &&
    deliveredOrders.reduce((acc, order) => acc + order.totalPrice, 0);
  const serviceCharges = totalEarningWithoutTax * 0.1;
  const availableBalance = totalEarningWithoutTax - serviceCharges.toFixed(2);

  return (
    <div className="w-full h-[90vh] p-8">
      <div className="w-full bg-white h-full rounded flex justify-center items-center flex-col">
        <h5 className="text-[1.4rem] p-5">
          Available Balance: ${availableBalance}
        </h5>
        <button
          className={`${styles.button} text-white cursor-pointer rounded-[8px] font-[600] text-[1rem]`}
        >
          Withdraw money
        </button>
      </div>
    </div>
  );
}

export default ShopWithdrawMoney;
