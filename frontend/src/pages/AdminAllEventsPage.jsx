import AdminLayout from "../components/AdminComps/AdminLayout";
import AdminAllEvents from "../components/AdminComps/AdminAllEvents";

function AdminAllEventsPage() {
  return (
    <AdminLayout
      active={6}
      title="All events"
      subtitle="Flash sales running across every shop."
    >
      <AdminAllEvents />
    </AdminLayout>
  );
}

export default AdminAllEventsPage;
