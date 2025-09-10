import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "../UserComps/Loader";
import { getAllOrdersAdmin } from "../../redux-toolkit/actions/orderActions";

function AdminAllOrders() {
  const dispatch = useDispatch();
  const { adminOrders, isLoading: isOrdersLoading } = useSelector(
    state => state.orders
  );

  useEffect(
    function () {
      dispatch(getAllOrdersAdmin());
    },
    [dispatch]
  );
  if (isOrdersLoading) return <Loader />;

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
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "text",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "totalPrice",
      headerName: "Total Price",
      type: "text",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      type: "text",
      minWidth: 130,
      flex: 0.8,
    },
  ];
  const row = [];
  adminOrders &&
    adminOrders.forEach(item => {
      row.push({
        id: item._id,
        status: item.status || "-",
        itemsQty: item?.cart?.reduce((acc, item) => acc + item.qty, 0),
        totalPrice: item?.totalPrice + " $",
        createdAt: item.createdAt.slice(0, 10),
      });
    });

  return (
    <div className="w-full flex justify-center pt-5">
      <div className="w-[97%]">
        <h3 className="text-[32px] font-[Poppins] pb-2">All Orders</h3>
        <div className="w-full min-h-[45vh] bg-white rounded">
          <DataGrid
            rows={row}
            columns={columns}
            pageSizeOptions={[10]}
            initialState={{
              pagination: { paginationModel: { pageSize: 10, page: 0 } },
            }}
            disableRowSelectionOnClick
            sx={{ flexGrow: 1 }}
          />
        </div>
      </div>
    </div>
  );
}

export default AdminAllOrders;
