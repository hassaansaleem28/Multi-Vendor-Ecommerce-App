import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Loader from "../UserComps/Loader";
import { getAllProductsAdmin } from "../../redux-toolkit/actions/productActions";
import { AiOutlineEye } from "react-icons/ai";
import DataTable from "../ui/DataTable";
import TableAction from "../ui/TableAction";

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

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 150, flex: 0.7 },
    { field: "name", headerName: "Product name", minWidth: 130, flex: 1.2 },
    {
      field: "price",
      headerName: "Price",
      type: "text",
      minWidth: 110,
      flex: 0.6,
    },
    {
      field: "Stock",
      headerName: "Stock",
      type: "text",
      minWidth: 100,
      flex: 0.5,
    },
    {
      field: "Sold",
      headerName: "Sold",
      type: "text",
      minWidth: 100,
      flex: 0.5,
    },
    {
      field: "",
      headerName: "",
      sortable: false,
      minWidth: 80,
      flex: 0.4,
      renderCell: params => (
        <TableAction
          icon={AiOutlineEye}
          to={`/product/${params.id}`}
          title="Preview product"
          tone="brand"
        />
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

  if (isProductsLoading) return <Loader label="Loading products" />;

  return (
    <DataTable
      title="Products"
      subtitle={`${row.length} product${row.length === 1 ? "" : "s"} listed marketplace-wide`}
      rows={row}
      columns={columns}
    />
  );
}

export default AdminAllProducts;
