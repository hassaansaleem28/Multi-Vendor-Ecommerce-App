import AdminAllEvents from "../components/AdminComps/AdminAllEvents";
import AdminSidebar from "../components/AdminComps/AdminSidebar";
import AdminWithdrawRequest from "../components/AdminComps/AdminWithdrawRequest";
import AdminHeader from "../components/Layouts/AdminHeader";

function AdminWithdrawPage() {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] width-at-800px">
            <AdminSidebar activeHeading={7} />
          </div>
          <AdminWithdrawRequest />
        </div>
      </div>
    </div>
  );
}

export default AdminWithdrawPage;
