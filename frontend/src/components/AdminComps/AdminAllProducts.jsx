import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "../UserComps/Loader";
import { getAllProductsAdmin } from "../../redux-toolkit/actions/productActions";
import Button from "@mui/material/Button";
import { AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";

function AdminAllProducts() {
  const dispatch = useDispatch();
  const { allProductsAdmin, isLoading: isProductsLoading } = useSelector(
    state => state.product
  );

  useEffect(
    function () {
      dispatch(getAllProductsAdmin());
    },
    [dispatch]
  );
  if (isProductsLoading) return <Loader />;

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "name",
      headerName: "Product name",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "price",
      headerName: "Price",
      type: "text",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "Stock",
      headerName: "Stock",
      type: "text",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "Sold",
      headerName: "Sold",
      type: "text",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "",
      headerName: "Preview Product",
      sortable: false,
      minWidth: 150,
      flex: 1,
      renderCell: params => (
        <Link to={`/product/${params.id}`}>
          <Button>
            <AiOutlineEye size={20} />
          </Button>
        </Link>
      ),
    },
  ];
  const row = [];
  allProductsAdmin &&
    allProductsAdmin.forEach(item => {
      row.push({
        id: item._id,
        name: item.name,
        price: item.discountPrice + " $",
        Stock: item?.stock,
        Sold: item.sold_out,
      });
    });

  return (
    <div className="w-full flex justify-center pt-5">
      <div className="w-[97%]">
        <h3 className="text-[32px] font-[Poppins] pb-2">All Products</h3>
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

export default AdminAllProducts;
