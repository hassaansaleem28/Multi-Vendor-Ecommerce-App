import AdminSidebar from "../components/AdminComps/AdminSidebar";
import AdminHeader from "../components/Layouts/AdminHeader";
import AdminAllUsers from "../components/AdminComps/AdminAllUsers";

function AdminAllUsersPage() {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] width-at-800px">
            <AdminSidebar activeHeading={4} />
          </div>
          <AdminAllUsers />
        </div>
      </div>
    </div>
  );
}

export default AdminAllUsersPage;
