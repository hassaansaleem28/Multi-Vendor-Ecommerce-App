import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllOrdersUser } from "../../redux-toolkit/actions/orderActions";
import DataTable from "../ui/DataTable";
import StatusPill from "../ui/StatusPill";

function AllOrders() {
  const { orders } = useSelector(state => state.orders);
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();

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
      minWidth: 150,
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
      minWidth: 120,
      flex: 1,
      renderCell: params => (
        <Link
          to={`/user/order/${params.id}`}
          className="inline-flex h-8 items-center gap-1.5 rounded-lg px-3 text-[13px] font-semibold text-brand-600 transition-colors hover:bg-brand-50"
        >
          View
          <AiOutlineArrowRight size={15} />
        </Link>
      ),
    },
  ];

  const row = [];
  useEffect(function () {
    dispatch(getAllOrdersUser(user._id));
  }, []);

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
      title="Your orders"
      subtitle={`${row.length} order${row.length === 1 ? "" : "s"} placed`}
      rows={row}
      columns={columns}
    />
  );
}

export default AllOrders;
