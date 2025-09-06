import DashboardHeader from "../components/SellerComps/DashboardHeader";
import DashboardMessages from "../components/SellerComps/DashboardMessages";
import DashboardSidebar from "../components/SellerComps/DashboardSidebar";

function ShopInboxPage() {
  return (
    <div className="mt-10">
      {/* <DashboardHeader /> */}

      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] width-at-800px">
          <DashboardSidebar activeHeading={8} />
        </div>
        <DashboardMessages />
      </div>
    </div>
  );
}

export default ShopInboxPage;
