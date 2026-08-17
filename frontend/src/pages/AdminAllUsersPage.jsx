import AdminLayout from "../components/AdminComps/AdminLayout";
import AdminAllUsers from "../components/AdminComps/AdminAllUsers";

function AdminAllUsersPage() {
  return (
    <AdminLayout
      active={4}
      title="All users"
      subtitle="Every registered customer on the marketplace."
    >
      <AdminAllUsers />
    </AdminLayout>
  );
}

export default AdminAllUsersPage;
