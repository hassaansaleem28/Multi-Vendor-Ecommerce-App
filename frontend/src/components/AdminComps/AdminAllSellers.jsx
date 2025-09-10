import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "../UserComps/Loader";
import styles from "../../styles/styles";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { toast } from "react-toastify";
import { getAllSellers } from "../../redux-toolkit/actions/sellerActions";
import { Link } from "react-router-dom";

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
  if (isSellersLoading) return <Loader />;

  async function handleDelete(id) {
    try {
      await axios
        .delete(
          `${API_BASE_URL}/api/v2/seller/delete-seller-from-admin/${id}`,
          {
            withCredentials: true,
          }
        )
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
    {
      field: "id",
      headerName: "Seller ID",
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
      headerName: "Role",
      type: "text",
      minWidth: 130,
      flex: 0.7,
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
      headerName: "Preview Shop",
      sortable: false,
      minWidth: 150,
      flex: 1,
      renderCell: params => (
        <Link to={`/shop/preview/${params.id}`}>
          <Button>
            <AiOutlineEye size={20} />
          </Button>
        </Link>
      ),
    },
    {
      field: "actions",
      headerName: "Delete Seller",
      sortable: false,
      minWidth: 150,
      flex: 1,
      renderCell: params => (
        <Button onClick={() => setSellerId(params.id) || setOpen(true)}>
          <AiOutlineDelete size={20} />
        </Button>
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

  return (
    <div className="w-full flex justify-center pt-5">
      <div className="w-[97%]">
        <h3 className="text-[32px] font-[Poppins] pb-2">All Sellers</h3>
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
        {open && (
          <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
            <div className="p-6 width-800px-40 w-[95%] min-h-[20vh] bg-white rounded-xl shadow">
              <div className="w-full flex justify-end cursor-pointer">
                <RxCross1 size={20} onClick={() => setOpen(false)} />
              </div>
              <h3 className="text-[25px] text-center py-5 font-[Poppins] text-[#000000cb]">
                Are you sure you want to delete this seller?
              </h3>
              <div className="w-full flex items-center p-8 gap-8 justify-center">
                <button
                  onClick={() => setOpen(false)}
                  className={`${styles.button} cursor-pointer text-[18px] rounded-2xl text-white !bg-[#100f0f] !h-[42px] active:translate-y-0.5 transition-all`}
                >
                  Cancel
                </button>
                <button
                  className={`${styles.button} cursor-pointer text-[18px] rounded-2xl text-white !bg-[#100f0f] !h-[42px] active:translate-y-0.5 transition-all`}
                  onClick={() => setOpen(false) || handleDelete(sellerId)}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminAllSellers;
