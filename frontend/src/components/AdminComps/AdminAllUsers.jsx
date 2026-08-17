import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux-toolkit/actions/userActions";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import Loader from "../UserComps/Loader";
import axios from "axios";
import { toast } from "react-toastify";
import DataTable from "../ui/DataTable";
import TableAction from "../ui/TableAction";
import ConfirmDialog from "../ui/ConfirmDialog";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function AdminAllUsers() {
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const dispatch = useDispatch();
  const { users, isLoading: isUsersLoading } = useSelector(state => state.user);

  useEffect(
    function () {
      dispatch(getAllUsers());
    },
    [dispatch]
  );

  async function handleDelete(id) {
    try {
      await axios
        .delete(`${API_BASE_URL}/api/v2/user/delete-user-from-admin/${id}`, {
          withCredentials: true,
        })
        .then(res => {
          toast.success(res?.data?.message);
          dispatch(getAllUsers());
        })
        .catch(error => toast.error(error.message));
    } catch (error) {
      console.error(error);
    }
  }

  const columns = [
    {
      field: "id",
      headerName: "User ID",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "name",
      headerName: "Full Name",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "email",
      headerName: "Email",
      type: "text",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "role",
      headerName: "User role",
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
      field: "actions",
      headerName: "",
      sortable: false,
      minWidth: 90,
      flex: 0.5,
      renderCell: params => (
        <TableAction
          icon={AiOutlineDelete}
          onClick={() => setUserId(params.id) || setOpen(true)}
          title="Delete user"
          tone="danger"
        />
      ),
    },
  ];

  const row = [];
  users &&
    users.forEach(item => {
      row.push({
        id: item._id,
        name: item.fullName,
        email: item.email,
        role: item?.role,
        joinedAt: item.createdAt.slice(0, 10),
      });
    });

  if (isUsersLoading) return <Loader label="Loading users" />;

  return (
    <>
      <DataTable
        title="Users"
        subtitle={`${row.length} registered user${row.length === 1 ? "" : "s"}`}
        rows={row}
        columns={columns}
      />

      <ConfirmDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => setOpen(false) || handleDelete(userId)}
        title="Delete this user?"
        message="This permanently removes the account and everything tied to it. This can't be undone."
        confirmLabel="Delete user"
      />
    </>
  );
}

export default AdminAllUsers;
