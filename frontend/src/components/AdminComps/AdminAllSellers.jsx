import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import Loader from "../UserComps/Loader";
import axios from "axios";
import { toast } from "react-toastify";
import { getAllSellers } from "../../redux-toolkit/actions/sellerActions";
import DataTable from "../ui/DataTable";
import TableAction from "../ui/TableAction";
import ConfirmDialog from "../ui/ConfirmDialog";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function AdminAllSellers() {
  const [open, setOpen] = useState(false);
  const [sellerId, setSellerId] = useState("");
  const dispatch = useDispatch();
  const { sellers, isLoading: isSellersLoading } = useSelector(
    state => state.seller
  );

  useEffect(
    function () {
      dispatch(getAllSellers());
    },
    [dispatch]
  );

  async function handleDelete(id) {
    try {
      await axios
        .delete(`${API_BASE_URL}/api/v2/seller/delete-seller-from-admin/${id}`, {
          withCredentials: true,
        })
        .then(res => {
          toast.success(res?.data?.message);
          dispatch(getAllSellers());
        })
        .catch(error => toast.error(error.message));
    } catch (error) {
      console.error(error);
    }
  }

  const columns = [
    { field: "id", headerName: "Seller ID", minWidth: 150, flex: 0.7 },
    { field: "name", headerName: "Shop Name", minWidth: 130, flex: 0.7 },
    {
      field: "email",
      headerName: "Email",
      type: "text",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "role",
      headerName: "Role",
      type: "text",
      minWidth: 110,
      flex: 0.6,
    },
    {
      field: "address",
      headerName: "Address",
      type: "text",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "joinedAt",
      headerName: "Joined At",
      type: "text",
      minWidth: 130,
      flex: 0.8,
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
          to={`/shop/preview/${params.id}`}
          title="Preview shop"
          tone="brand"
        />
      ),
    },
    {
      field: "actions",
      headerName: "",
      sortable: false,
      minWidth: 80,
      flex: 0.4,
      renderCell: params => (
        <TableAction
          icon={AiOutlineDelete}
          onClick={() => setSellerId(params.id) || setOpen(true)}
          title="Delete seller"
          tone="danger"
        />
      ),
    },
  ];

  const row = [];
  sellers &&
    sellers.forEach(item => {
      row.push({
        id: item._id,
        name: item.name,
        email: item.email,
        role: item?.role,
        address: item?.address,
        joinedAt: item.createdAt.slice(0, 10),
      });
    });

  if (isSellersLoading) return <Loader label="Loading sellers" />;

  return (
    <>
      <DataTable
        title="Sellers"
        subtitle={`${row.length} shop${row.length === 1 ? "" : "s"} registered`}
        rows={row}
        columns={columns}
      />

      <ConfirmDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => setOpen(false) || handleDelete(sellerId)}
        title="Delete this seller?"
        message="The shop and all of its listings will be removed permanently. This can't be undone."
        confirmLabel="Delete seller"
      />
    </>
  );
}

export default AdminAllSellers;
