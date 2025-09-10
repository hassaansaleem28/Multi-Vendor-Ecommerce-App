import AdminAllEvents from "../components/AdminComps/AdminAllEvents";
import AdminSidebar from "../components/AdminComps/AdminSidebar";
import AdminHeader from "../components/Layouts/AdminHeader";

function AdminAllEventsPage() {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] width-at-800px">
            <AdminSidebar activeHeading={6} />
          </div>
          <AdminAllEvents />
        </div>
      </div>
    </div>
  );
}

export default AdminAllEventsPage;
