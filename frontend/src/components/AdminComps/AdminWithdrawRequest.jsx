import axios from "axios";
import { useEffect, useState } from "react";
import { BsPencil } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { HiChevronDown } from "react-icons/hi";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getAllWithdraws } from "../../redux-toolkit/actions/withdrawActions";
import Loader from "../../components/UserComps/Loader";
import DataTable from "../ui/DataTable";
import TableAction from "../ui/TableAction";
import StatusPill from "../ui/StatusPill";
import { backdrop, modal } from "../../lib/motion";

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
    { field: "id", headerName: "Withdraw ID", minWidth: 150, flex: 0.7 },
    { field: "name", headerName: "Seller Name", minWidth: 130, flex: 0.7 },
    { field: "shopId", headerName: "Shop Id", minWidth: 130, flex: 0.7 },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 110,
      flex: 0.6,
    },
    {
      field: "status",
      headerName: "Status",
      type: "text",
      minWidth: 150,
      flex: 0.7,
      renderCell: params => <StatusPill status={params.row.status} />,
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
      headerName: "",
      type: "number",
      sortable: false,
      minWidth: 90,
      flex: 0.5,
      renderCell: params =>
        params.row.status !== "Processing" ? null : (
          <TableAction
            icon={BsPencil}
            onClick={() => setOpen(true) || setWithdrawData(params.row)}
            title="Update status"
            tone="brand"
            size={16}
          />
        ),
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

  if (isWithdrawsLoading) return <Loader label="Loading withdraw requests" />;

  return (
    <>
      <DataTable
        title="Withdraw requests"
        subtitle={`${row.length} request${row.length === 1 ? "" : "s"} on record`}
        rows={row}
        columns={columns}
      />

      <AnimatePresence>
        {open && (
          <motion.div
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-ink-950/50 p-4 backdrop-blur-sm"
          >
            <motion.div
              variants={modal}
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-[440px] rounded-2xl bg-white shadow-panel"
            >
              <header className="flex items-center justify-between border-b border-ink-100 px-6 py-5">
                <h3 className="font-display text-[18px] font-bold text-ink-900">
                  Update withdraw status
                </h3>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="grid h-9 w-9 cursor-pointer place-items-center rounded-full text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-900"
                >
                  <RxCross1 size={16} />
                </button>
              </header>

              <div className="p-6">
                <div className="mb-6 space-y-2.5 rounded-xl border border-ink-100 bg-ink-50/60 p-4">
                  <div className="flex items-center justify-between text-[14px]">
                    <span className="text-ink-500">Seller</span>
                    <span className="font-semibold text-ink-900">
                      {withdrawData.name}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[14px]">
                    <span className="text-ink-500">Amount</span>
                    <span className="font-display text-[17px] font-bold text-ink-900">
                      ${withdrawData.amount}
                    </span>
                  </div>
                </div>

                <label className="mb-1.5 block text-[13px] font-semibold text-ink-700">
                  New status
                </label>
                <div className="relative">
                  <select
                    onChange={e => setWithdrawStatus(e.target.value)}
                    className="w-full cursor-pointer appearance-none rounded-xl border border-ink-200 bg-ink-50/60 py-2.5 pl-4 pr-10 text-[15px] text-ink-900 transition-all duration-200 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
                  >
                    <option value={withdrawStatus}>{withdrawData.status}</option>
                    <option value={withdrawStatus}>Succeed</option>
                  </select>
                  <HiChevronDown
                    size={18}
                    className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-400"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={handleSubmit}
                  className="mt-6 flex h-[48px] w-full cursor-pointer items-center justify-center rounded-xl bg-brand-600 font-semibold text-white shadow-card transition-colors duration-300 hover:bg-brand-700"
                >
                  {isLoading ? "Please wait…" : "Update status"}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default AdminWithdrawRequest;
