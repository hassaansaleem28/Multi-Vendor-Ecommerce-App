import DashboardHeader from "../components/SellerComps/DashboardHeader";
import ShopSettings from "../components/SellerComps/ShopSettings";
import DashboardSidebar from "../components/SellerComps/DashboardSidebar";

function ShopSettingsPage() {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] width-at-800px">
          <DashboardSidebar activeHeading={11} />
        </div>
        <ShopSettings />
      </div>
    </div>
  );
}

export default ShopSettingsPage;
