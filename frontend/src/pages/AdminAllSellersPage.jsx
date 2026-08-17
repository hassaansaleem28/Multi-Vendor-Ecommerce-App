import AdminLayout from "../components/AdminComps/AdminLayout";
import AdminAllSellers from "../components/AdminComps/AdminAllSellers";

function AdminAllSellersPage() {
  return (
    <AdminLayout
      active={3}
      title="All sellers"
      subtitle="Shops trading on the marketplace."
    >
      <AdminAllSellers />
    </AdminLayout>
  );
}

export default AdminAllSellersPage;
