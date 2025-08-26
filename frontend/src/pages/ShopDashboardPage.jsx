import DashboardHeader from "../components/SellerComps/DashboardHeader";
import DashboardSidebar from "../components/SellerComps/DashboardSidebar";

function ShopDashboardPage() {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-center justify-between w-full">
        <div className="w-[80px] width-at-800px">
          <DashboardSidebar activeHeading={1} />
        </div>
      </div>
    </div>
  );
}

export default ShopDashboardPage;
