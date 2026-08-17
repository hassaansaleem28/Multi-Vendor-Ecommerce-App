import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Loader from "../UserComps/Loader";
import { AiOutlineEye } from "react-icons/ai";
import { getAllEventsAdmin } from "../../redux-toolkit/actions/eventActions";
import DataTable from "../ui/DataTable";
import TableAction from "../ui/TableAction";

function AdminAllEvents() {
  const dispatch = useDispatch();
  const { allEventsAdmin, isLoading: isEventsLoading } = useSelector(
    state => state.events
  );

  useEffect(
    function () {
      dispatch(getAllEventsAdmin());
    },
    [dispatch]
  );

  const columns = [
    { field: "id", headerName: "Event ID", minWidth: 150, flex: 0.7 },
    { field: "name", headerName: "Name", minWidth: 180, flex: 1.4 },
    { field: "price", headerName: "Price", minWidth: 110, flex: 0.6 },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 90,
      flex: 0.5,
    },
    {
      field: "sold",
      headerName: "Sold out",
      type: "number",
      minWidth: 110,
      flex: 0.6,
    },
    {
      field: "Preview",
      headerName: "",
      type: "number",
      sortable: false,
      minWidth: 80,
      flex: 0.4,
      renderCell: params => (
        <TableAction
          icon={AiOutlineEye}
          to={`/product/${params.id}?isEvent=true`}
          title="Preview event"
          tone="brand"
        />
      ),
    },
  ];

  const row = [];
  allEventsAdmin &&
    allEventsAdmin.forEach(item => {
      row.push({
        id: item._id,
        name: item.name,
        price: "US$ " + item.discountPrice,
        stock: item.stock,
        sold: item.sold_out,
      });
    });

  if (isEventsLoading) return <Loader label="Loading events" />;

  return (
    <DataTable
      title="Events"
      subtitle={`${row.length} event${row.length === 1 ? "" : "s"} across all shops`}
      rows={row}
      columns={columns}
    />
  );
}

export default AdminAllEvents;
