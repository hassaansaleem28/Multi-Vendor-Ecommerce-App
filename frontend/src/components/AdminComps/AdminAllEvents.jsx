import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "../UserComps/Loader";
import Button from "@mui/material/Button";
import { AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getAllEventsAdmin } from "../../redux-toolkit/actions/eventActions";

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
  if (isEventsLoading) return <Loader />;

  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
    { field: "name", headerName: "Name", minWidth: 180, flex: 1.4 },
    { field: "price", headerName: "Price", minWidth: 100, flex: 0.6 },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 80,
      flex: 0.5,
    },
    {
      field: "sold",
      headerName: "Sold out",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "Preview",
      headerName: "",
      type: "number",
      sortable: false,
      minWidth: 100,
      flex: 0.8,
      renderCell: params => {
        return (
          <>
            <Link to={`/product/${params.id}?isEvent=true`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
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

  return (
    <div className="w-full flex justify-center pt-5">
      <div className="w-[97%]">
        <h3 className="text-[32px] font-[Poppins] pb-2">All Events</h3>
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

export default AdminAllEvents;
