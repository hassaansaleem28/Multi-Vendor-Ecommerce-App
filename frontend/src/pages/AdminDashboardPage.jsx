import AdminDashboardMain from "../components/AdminComps/AdminDashboardMain";
import AdminSidebar from "../components/AdminComps/AdminSidebar";
import AdminHeader from "../components/Layouts/AdminHeader";

function AdminDashboardPage() {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] width-at-800px">
            <AdminSidebar activeHeading={1} />
          </div>
          <AdminDashboardMain />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
