import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getAllProductsShop,
} from "../../redux-toolkit/actions/productActions";
import { Link } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEye, AiOutlinePlus } from "react-icons/ai";
import Loader from "../UserComps/Loader";
import DataTable from "../ui/DataTable";
import TableAction from "../ui/TableAction";

function AllProducts() {
  const { product, isLoading } = useSelector(state => state.product);
  const { seller } = useSelector(state => state.seller);
  const dispatch = useDispatch();

  useEffect(
    function () {
      dispatch(getAllProductsShop(seller._id));
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
      minWidth: 80,
      flex: 0.5,
      renderCell: params => (
        <TableAction
          icon={AiOutlineEye}
          to={`/product/${params.id}`}
          title="Preview product"
          tone="brand"
        />
      ),
    },
    {
      field: "Delete",
      flex: 0.5,
      minWidth: 80,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: params => (
        <TableAction
          icon={AiOutlineDelete}
          onClick={() => handleDelete(params.id)}
          title="Delete product"
          tone="danger"
        />
      ),
    },
  ];

  const row = [];
  product &&
    product.forEach(item => {
      row.push({
        id: item._id,
        name: item.name,
        price: "US$" + item.discountPrice,
        stock: item.stock,
        sold: 10,
      });
    });

  function handleDelete(id) {
    dispatch(deleteProduct(id));
    window.location.reload();
  }

  if (isLoading) return <Loader label="Loading products" />;

  return (
    <DataTable
      title="Products"
      subtitle={`${row.length} product${row.length === 1 ? "" : "s"} listed`}
      rows={row}
      columns={columns}
      action={
        <Link
          to="/dashboard-create-product"
          className="inline-flex h-[42px] items-center gap-2 rounded-xl bg-brand-600 px-4 text-[14px] font-semibold text-white transition-all duration-300 hover:bg-brand-700 active:scale-95"
        >
          <AiOutlinePlus size={16} />
          New product
        </Link>
      }
    />
  );
}

export default AllProducts;
