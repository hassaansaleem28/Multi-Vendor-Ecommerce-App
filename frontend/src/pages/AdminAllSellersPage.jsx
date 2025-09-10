import AdminSidebar from "../components/AdminComps/AdminSidebar";
import AdminHeader from "../components/Layouts/AdminHeader";
import AdminAllSellers from "../components/AdminComps/AdminAllSellers";

function AdminAllSellersPage() {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] width-at-800px">
            <AdminSidebar activeHeading={3} />
          </div>
          <AdminAllSellers />
        </div>
      </div>
    </div>
  );
}

export default AdminAllSellersPage;
