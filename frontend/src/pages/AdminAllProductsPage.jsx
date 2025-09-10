import AdminAllProducts from "../components/AdminComps/AdminAllProducts";
import AdminSidebar from "../components/AdminComps/AdminSidebar";
import AdminHeader from "../components/Layouts/AdminHeader";

function AdminAllProductsPage() {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] width-at-800px">
            <AdminSidebar activeHeading={5} />
          </div>
          <AdminAllProducts />
        </div>
      </div>
    </div>
  );
}

export default AdminAllProductsPage;
