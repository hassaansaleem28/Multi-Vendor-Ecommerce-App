import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersUser } from "../../redux-toolkit/actions/orderActions";
import { MdTrackChanges } from "react-icons/md";
import DataTable from "../ui/DataTable";
import StatusPill from "../ui/StatusPill";

function TrackOrder() {
  const { orders } = useSelector(state => state.orders);
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(function () {
    dispatch(getAllOrdersUser(user._id));
  }, []);

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
      minWidth: 170,
      flex: 0.7,
      renderCell: params => <StatusPill status={params.row.status} />,
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
      minWidth: 130,
      flex: 1,
      renderCell: params => (
        <Link
          to={`/user/track-order/${params.id}`}
          className="inline-flex h-8 items-center gap-1.5 rounded-lg px-3 text-[13px] font-semibold text-brand-600 transition-colors hover:bg-brand-50"
        >
          <MdTrackChanges size={16} />
          Track
        </Link>
      ),
    },
  ];

  const row = [];

  orders &&
    orders.forEach(item => {
      row.push({
        id: item._id,
        itemsQty: item?.cart?.length,
        total: "US$" + item?.totalPrice,
        status: item?.status,
      });
    });

  return (
    <DataTable
      title="Track your orders"
      subtitle="Follow each order from the seller's door to yours."
      rows={row}
      columns={columns}
    />
  );
}

export default TrackOrder;
