import { AiOutlineArrowRight, AiOutlineMoneyCollect } from "react-icons/ai";
import styles from "../../styles/styles";
import { MdBorderClear } from "react-icons/md";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllOrdersAdmin } from "../../redux-toolkit/actions/orderActions";
import Loader from "../UserComps/Loader";
import { getAllSellers } from "../../redux-toolkit/actions/sellerActions";

function AdminDashboardMain() {
  const { adminOrders, isLoading } = useSelector(state => state.orders);
  const { sellers, isLoading: isSellersLoading } = useSelector(
    state => state.seller
  );
  const dispatch = useDispatch();
  useEffect(
    function () {
      dispatch(getAllOrdersAdmin());
      dispatch(getAllSellers());
    },
    [dispatch]
  );
  if (isLoading) return <Loader />;
  if (isSellersLoading) return <Loader />;
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
  ];
  const row = [];
  adminOrders &&
    adminOrders.forEach(item => {
      row.push({
        id: item._id,
        itemsQty: item?.cart?.reduce((acc, item) => acc + item.qty, 0),
        total: item.totalPrice + " $",
        status: item?.status,
        createdAt: item.createdAt.slice(0, 10),
      });
    });

  return (
    <div className="w-full p-8">
      <h3 className="text-[22px] font-[Poppins] pb-2">Overview</h3>
      <div className="w-full block flex-800px items-center justify-between">
        <div className="w-full mb-4 width-800px-30 min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <AiOutlineMoneyCollect size={30} className="mr-2" fill="00000085" />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              Total Earning
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">${120}</h5>
        </div>
        <div className="w-full mb-4 width-800px-30 min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <MdBorderClear size={30} className="mr-2" fill="00000085" />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              All Sellers
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {sellers && sellers.length}
          </h5>
          <Link to={"/admin-sellers"}>
            <h5 className="pt-4 pl-2 text-[#077f9c]">View Sellers</h5>
          </Link>
        </div>
        <div className="w-full mb-4 width-800px-30 min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <AiOutlineMoneyCollect size={30} className="mr-2" fill="00000085" />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              All Orders
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {adminOrders && adminOrders.length}
          </h5>
          <Link to={"/dashboard-products"}>
            <h5 className="pt-4 pl-2 text-[#077f9c]">View Orders</h5>
          </Link>
        </div>
      </div>
      <br />
      <h3 className="text-[22px] font-[Poppins] pb-2">Latest Orders</h3>
      <div className="pt-1 flex flex-col  min-h-[200px] max-h-[600px]">
        <DataGrid
          rows={row}
          columns={columns}
          pageSizeOptions={[10]}
          initialState={{
            pagination: { paginationModel: { pageSize: 5, page: 0 } },
          }}
          disableRowSelectionOnClick
          sx={{ flexGrow: 1 }}
        />
      </div>
    </div>
  );
}

export default AdminDashboardMain;
