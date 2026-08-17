import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Loader from "../UserComps/Loader";
import { getAllOrdersAdmin } from "../../redux-toolkit/actions/orderActions";
import DataTable from "../ui/DataTable";
import StatusPill from "../ui/StatusPill";

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

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 170,
      flex: 0.7,
      renderCell: params => <StatusPill status={params.row.status} />,
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

  if (isOrdersLoading) return <Loader label="Loading orders" />;

  return (
    <DataTable
      title="Orders"
      subtitle={`${row.length} order${row.length === 1 ? "" : "s"} marketplace-wide`}
      rows={row}
      columns={columns}
    />
  );
}

export default AdminAllOrders;
