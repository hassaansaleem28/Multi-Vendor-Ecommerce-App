import AdminLayout from "../components/AdminComps/AdminLayout";
import AdminAllOrders from "../components/AdminComps/AdminAllOrders";

function AdminAllOrdersPage() {
  return (
    <AdminLayout
      active={2}
      title="All orders"
      subtitle="Every order placed across all shops."
    >
      <AdminAllOrders />
    </AdminLayout>
  );
}

export default AdminAllOrdersPage;
