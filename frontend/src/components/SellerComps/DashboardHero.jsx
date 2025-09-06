import { AiOutlineArrowRight, AiOutlineMoneyCollect } from "react-icons/ai";
import { MdBorderClear } from "react-icons/md";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllOrdersShop } from "../../redux-toolkit/actions/orderActions";
import { getAllProductsShop } from "../../redux-toolkit/actions/productActions";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";

function DashboardHero() {
  const dispatch = useDispatch();
  const { seller } = useSelector(state => state.seller);
  const { shopOrders } = useSelector(state => state.orders);
  const { product } = useSelector(state => state.product);
  const [deliveredOrder, setDeliveredOrder] = useState(null);

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
    deliveredOrder &&
    deliveredOrder.reduce((acc, order) => acc + order.totalPrice, 0);
  const serviceCharges = totalEarningWithoutTax * 0.1;
  const availableBalance = totalEarningWithoutTax - serviceCharges.toFixed(2);

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: params =>
        params.row.status === "Delivered" ? "greenColor" : "redColor",
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "actions",
      headerName: "",
      sortable: false,
      minWidth: 150,
      flex: 1,
      renderCell: params => (
        <Link to={`/order/${params.id}`}>
          <Button>
            <AiOutlineArrowRight size={20} />
          </Button>
        </Link>
      ),
    },
  ];
  const row = [];
  shopOrders &&
    shopOrders.forEach(item => {
      row.push({
        id: item._id,
        itemsQty: item?.cart?.length,
        total: "US$" + item?.totalPrice,
        status: item?.status,
      });
    });

  return (
    <div className="w-full p-8">
      <h3 className="text-[22px] font-[Poppins] pb-2">Overview </h3>
      <div className="w-full block flex-800px items-center justify-between">
        <div className="w-full mb-4 width-800px-30 min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <AiOutlineMoneyCollect size={30} className="mr-2" fill="00000085" />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              Account Balance
              <span className="text-[16px]">(with 10% service charges)</span>
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            ${availableBalance}
          </h5>
          <Link to={"/dashboard-withdraw-money"}>
            <h5 className="pt-4 pl-2 text-[#077f9c]">Withdraw Money</h5>
          </Link>
        </div>
        <div className="w-full mb-4 width-800px-30 min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <MdBorderClear size={30} className="mr-2" fill="00000085" />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              All Orders
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {shopOrders && shopOrders.length}
          </h5>
          <Link to={"/dashboard-orders"}>
            <h5 className="pt-4 pl-2 text-[#077f9c]">View Orders</h5>
          </Link>
        </div>
        <div className="w-full mb-4 width-800px-30 min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <AiOutlineMoneyCollect size={30} className="mr-2" fill="00000085" />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              All Products
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {product && product.length}
          </h5>
          <Link to={"/dashboard-products"}>
            <h5 className="pt-4 pl-2 text-[#077f9c]">View Products</h5>
          </Link>
        </div>
      </div>
      <br />
      <h3 className="text-[22px] font-[Poppins] pb-2">Latest Orders</h3>
      <div className="w-full min-h-[45vh] bg-white rounded">
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
        />
      </div>
    </div>
  );
}

export default DashboardHero;
