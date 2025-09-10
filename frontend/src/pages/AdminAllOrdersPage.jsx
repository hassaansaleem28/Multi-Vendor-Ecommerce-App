import AdminAllOrders from "../components/AdminComps/AdminAllOrders";
import AdminSidebar from "../components/AdminComps/AdminSidebar";
import AdminHeader from "../components/Layouts/AdminHeader";

function AdminAllOrdersPage() {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] width-at-800px">
            <AdminSidebar activeHeading={2} />
          </div>
          <AdminAllOrders />
        </div>
      </div>
    </div>
  );
}

export default AdminAllOrdersPage;
