import AdminDashboardMain from "../components/AdminComps/AdminDashboardMain";
import AdminLayout from "../components/AdminComps/AdminLayout";

function AdminDashboardPage() {
  return (
    <AdminLayout active={1} wide>
      <AdminDashboardMain />
    </AdminLayout>
  );
}

export default AdminDashboardPage;
