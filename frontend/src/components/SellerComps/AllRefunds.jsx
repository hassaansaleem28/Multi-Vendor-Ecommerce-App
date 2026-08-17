import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersShop } from "../../redux-toolkit/actions/orderActions";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import Loader from "../UserComps/Loader";
import DataTable from "../ui/DataTable";
import StatusPill from "../ui/StatusPill";

function AllRefunds() {
  const { shopOrders, isLoading } = useSelector(state => state.orders);
  const { seller } = useSelector(state => state.seller);
  const dispatch = useDispatch();

  useEffect(
    function () {
      dispatch(getAllOrdersShop(seller._id));
    },
    [dispatch]
  );

  const refundOrders =
    shopOrders &&
    shopOrders.filter(
      item =>
        item.status === "Processing refund" || item.status === "Refund Success"
    );

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
      minWidth: 120,
      flex: 1,
      renderCell: params => (
        <Link
          to={`/order/${params.id}`}
          className="inline-flex h-8 items-center gap-1.5 rounded-lg px-3 text-[13px] font-semibold text-brand-600 transition-colors hover:bg-brand-50"
        >
          Manage
          <AiOutlineArrowRight size={15} />
        </Link>
      ),
    },
  ];

  const row = [];
  refundOrders &&
    refundOrders.forEach(item => {
      row.push({
        id: item._id,
        itemsQty: item?.cart?.length,
        total: "US$" + item?.totalPrice,
        status: item?.status,
      });
    });

  if (isLoading) return <Loader label="Loading refunds" />;

  return (
    <DataTable
      title="Refunds"
      subtitle={`${row.length} refund request${row.length === 1 ? "" : "s"}`}
      rows={row}
      columns={columns}
    />
  );
}

export default AllRefunds;
