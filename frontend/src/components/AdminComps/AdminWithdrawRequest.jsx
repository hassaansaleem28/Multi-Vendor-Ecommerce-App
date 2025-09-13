import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { BsPencil } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getAllWithdraws } from "../../redux-toolkit/actions/withdrawActions";
import Loader from "../../components/UserComps/Loader";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function AdminWithdrawRequest() {
  const [open, setOpen] = useState(false);
  const [withdrawData, setWithdrawData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [withdrawStatus, setWithdrawStatus] = useState("Processing");
  const { withdraws, isLoading: isWithdrawsLoading } = useSelector(
    state => state.withdraw
  );
  const dispatch = useDispatch();

  useEffect(
    function () {
      dispatch(getAllWithdraws());
    },
    [dispatch]
  );
  if (isWithdrawsLoading) return <Loader />;
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const { data } = await axios.put(
        `${API_BASE_URL}/api/v2/withdraw-request/update-withdraw-status/${withdrawData.id}`,
        { sellerId: withdrawData.shopId },
        { withCredentials: true }
      );
      if (data?.success) {
        dispatch(getAllWithdraws());
        toast.success(data?.message);
        setOpen(false);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      toast.error(error.message);
    }
  }

  const columns = [
    {
      field: "id",
      headerName: "Withdraw ID",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "name",
      headerName: "Seller Name",
      minWidth: 130,
      flex: 0.7,
      cellClassName: params =>
        params.row.status === "Delivered" ? "greenColor" : "redColor",
    },
    {
      field: "shopId",
      headerName: "Shop Id",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "status",
      headerName: "Status",
      type: "text",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "createdAt",
      headerName: "Requested At",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: " ",
      headerName: "Update Status",
      type: "number",
      sortable: false,
      minWidth: 100,
      flex: 0.8,
      renderCell: params => {
        return (
          <div className="flex items-center justify-center mt-3 ml-15">
            <BsPencil
              size={20}
              className={`${
                params.row.status !== "Processing" ? "hidden" : "block"
              } cursor-pointer`}
              onClick={() => setOpen(true) || setWithdrawData(params.row)}
            />
          </div>
        );
      },
    },
  ];

  const row = [];
  withdraws &&
    withdraws?.forEach(item => {
      row.push({
        id: item._id,
        name: item.seller.name,
        shopId: item.seller._id,
        amount: item.amount,
        status: item.status,
        createdAt: item.createdAt.slice(0, 10),
      });
    });

  return (
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
      {open && (
        <div className="w-full fixed h-screen top-0 left-0 bg-[#00000031] z-[9999] flex items-center justify-center">
          <div className="w-[30%] min-h-[40vh] bg-white rounded shadow p-4">
            <div className="flex justify-end w-full">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            <h1 className="text-[25px] text-center text-[Poppins]">
              Update Withdraw status
            </h1>
            <br />
            <div className="flex flex-col mt-12 justify-center items-center">
              <select
                name=""
                id=""
                onChange={e => setWithdrawStatus(e.target.value)}
                className="w-[200px] h-[35px] border rounded mb-2"
              >
                <option value={withdrawStatus}>{withdrawData.status}</option>
                <option value={withdrawStatus}>Succeed</option>
              </select>
              <button
                type="submit"
                className={`block ${styles.button} text-white cursor-pointer !h-[42px] mt-4 text-[21px] rounded-2xl`}
                onClick={handleSubmit}
              >
                {isLoading ? "Wait..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminWithdrawRequest;
