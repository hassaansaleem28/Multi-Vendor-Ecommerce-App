import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEvent,
  getAllEventsShop,
} from "../../redux-toolkit/actions/eventActions";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import Loader from "../UserComps/Loader";
import { DataGrid } from "@mui/x-data-grid";

function AllEvents() {
  const { isLoading, events } = useSelector(state => state.events);
  const { seller } = useSelector(state => state.seller);
  const dispatch = useDispatch();

  useEffect(
    function () {
      dispatch(getAllEventsShop(seller._id));
    },
    [dispatch]
  );
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
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: params => {
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];
  const row = [];
  events &&
    events.forEach(item => {
      row.push({
        id: item._id,
        name: item.name,
        price: "US$" + item.discountPrice,
        stock: item.stock,
        sold: item.sold_out,
      });
    });
  function handleDelete(id) {
    dispatch(deleteEvent(id));
    window.location.reload();
  }
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white flex flex-col min-h-[200px] max-h-[600px]">
          <DataGrid
            rows={row}
            columns={columns}
            pageSizeOptions={[10]}
            disableRowSelectionOnClick
            initialState={{
              pagination: { paginationModel: { pageSize: 10, page: 0 } },
            }}
            sx={{ flexGrow: 1 }}
          />
        </div>
      )}
    </>
  );
}

export default AllEvents;
