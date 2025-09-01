import AllRefunds from "./AllRefunds";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";

function ShopAllRefunds() {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="w-[80px] width-at-800px">
          <DashboardSidebar activeHeading={10} />
        </div>
        <div className="w-full justify-center flex">
          <AllRefunds />
        </div>
      </div>
    </div>
  );
}

export default ShopAllRefunds;
