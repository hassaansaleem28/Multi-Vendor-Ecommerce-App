import { AiOutlineArrowRight, AiOutlineMoneyCollect } from "react-icons/ai";
import { MdBorderClear } from "react-icons/md";
import { FiPackage } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { getAllOrdersShop } from "../../redux-toolkit/actions/orderActions";
import { getAllProductsShop } from "../../redux-toolkit/actions/productActions";
import DataTable from "../ui/DataTable";
import StatCard from "../ui/StatCard";
import StatusPill from "../ui/StatusPill";
import { easeOutSoft } from "../../lib/motion";

function DashboardHero() {
  const dispatch = useDispatch();
  const { seller } = useSelector(state => state.seller);
  const { shopOrders } = useSelector(state => state.orders);
  const { product } = useSelector(state => state.product);
  const availableBalance = seller?.availableBalance.toFixed(2);

  useEffect(
    function () {
      dispatch(getAllOrdersShop(seller._id));
      dispatch(getAllProductsShop(seller._id));
    },
    [dispatch]
  );

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 150,
      flex: 0.7,
    },
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
    {
      field: "actions",
      headerName: "",
      sortable: false,
      minWidth: 120,
      flex: 1,
      renderCell: params => (
        <Link
          to={`/order/${params.id}`}
          className="inline-flex h-8 items-center gap-1.5 rounded-lg px-3 text-[13px] font-semibold text-brand-600 transition-colors hover:bg-brand-50"
        >
          View
          <AiOutlineArrowRight size={15} />
        </Link>
      ),
    },
  ];

  const row = [];
  shopOrders &&
    shopOrders.forEach(item => {
      row.push({
        id: item._id,
        itemsQty: item?.cart?.length,
        total: "US$" + item?.totalPrice,
        status: item?.status,
      });
    });

  return (
    <div>
      {/* ---- Greeting ------------------------------------------- */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: easeOutSoft }}
        className="mb-7"
      >
        <h1 className="font-display text-[26px] font-bold tracking-tight text-ink-900">
          Welcome back, {seller?.name}
        </h1>
        <p className="mt-1 text-[14px] text-ink-500">
          Here&apos;s how your shop is doing today.
        </p>
      </motion.div>

      {/* ---- KPIs ----------------------------------------------- */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          index={0}
          icon={AiOutlineMoneyCollect}
          tone="success"
          label="Account balance"
          hint="After 10% service charge"
          value={`$${availableBalance}`}
          to="/dashboard-withdraw-money"
          linkLabel="Withdraw money"
        />

        <StatCard
          index={1}
          icon={MdBorderClear}
          tone="brand"
          label="All orders"
          hint="Lifetime orders received"
          value={(shopOrders && shopOrders.length) || 0}
          to="/dashboard-orders"
          linkLabel="View orders"
        />

        <StatCard
          index={2}
          icon={FiPackage}
          tone="accent"
          label="All products"
          hint="Currently listed"
          value={(product && product.length) || 0}
          to="/dashboard-products"
          linkLabel="View products"
        />
      </div>

      {/* ---- Latest orders --------------------------------------- */}
      <div className="mt-8">
        <DataTable
          title="Latest orders"
          subtitle="The most recent orders placed with your shop."
          rows={row}
          columns={columns}
          height={520}
        />
      </div>
    </div>
  );
}

export default DashboardHero;
