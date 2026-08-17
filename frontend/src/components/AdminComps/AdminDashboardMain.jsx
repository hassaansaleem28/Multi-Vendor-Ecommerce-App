import { AiOutlineMoneyCollect } from "react-icons/ai";
import { MdBorderClear } from "react-icons/md";
import { GrWorkshop } from "react-icons/gr";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllOrdersAdmin } from "../../redux-toolkit/actions/orderActions";
import Loader from "../UserComps/Loader";
import { getAllSellers } from "../../redux-toolkit/actions/sellerActions";
import DataTable from "../ui/DataTable";
import StatCard from "../ui/StatCard";
import StatusPill from "../ui/StatusPill";
import { easeOutSoft } from "../../lib/motion";

function AdminDashboardMain() {
  const { adminOrders, isLoading } = useSelector(state => state.orders);
  const { sellers, isLoading: isSellersLoading } = useSelector(
    state => state.seller
  );
  const dispatch = useDispatch();

  useEffect(
    function () {
      dispatch(getAllOrdersAdmin());
      dispatch(getAllSellers());
    },
    [dispatch]
  );

  const totalAdminEarning =
    adminOrders &&
    adminOrders.reduce((acc, item) => acc + item.totalPrice * 0.1, 0);
  const adminBalance = totalAdminEarning?.toFixed(2);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 170,
      flex: 0.7,
      renderCell: params => <StatusPill status={params.row.status} />,
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
  ];

  const row = [];
  adminOrders &&
    adminOrders.forEach(item => {
      row.push({
        id: item._id,
        itemsQty: item?.cart?.reduce((acc, item) => acc + item.qty, 0),
        total: item.totalPrice + " $",
        status: item?.status,
        createdAt: item.createdAt.slice(0, 10),
      });
    });

  if (isLoading) return <Loader label="Loading dashboard" />;
  if (isSellersLoading) return <Loader label="Loading sellers" />;

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: easeOutSoft }}
        className="mb-7"
      >
        <h1 className="font-display text-[26px] font-bold tracking-tight text-ink-900">
          Marketplace overview
        </h1>
        <p className="mt-1 text-[14px] text-ink-500">
          Platform-wide earnings, sellers and orders at a glance.
        </p>
      </motion.div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          index={0}
          icon={AiOutlineMoneyCollect}
          tone="success"
          label="Total earnings"
          hint="10% platform fee on all orders"
          value={`$${adminBalance}`}
        />

        <StatCard
          index={1}
          icon={GrWorkshop}
          tone="brand"
          label="All sellers"
          hint="Shops on the marketplace"
          value={(sellers && sellers.length) || 0}
          to="/admin-sellers"
          linkLabel="View sellers"
        />

        <StatCard
          index={2}
          icon={MdBorderClear}
          tone="accent"
          label="All orders"
          hint="Orders across every shop"
          value={(adminOrders && adminOrders.length) || 0}
          to="/admin-orders"
          linkLabel="View orders"
        />
      </div>

      <div className="mt-8">
        <DataTable
          title="Latest orders"
          subtitle="The most recent activity across the marketplace."
          rows={row}
          columns={columns}
          pageSize={5}
          height={480}
        />
      </div>
    </div>
  );
}

export default AdminDashboardMain;
