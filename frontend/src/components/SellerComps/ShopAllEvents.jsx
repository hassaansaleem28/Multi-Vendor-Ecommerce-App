import AllEvents from "./AllEvents";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";

function ShopAllEvents() {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="w-[80px] width-at-800px">
          <DashboardSidebar activeHeading={5} />
        </div>
        <div className="w-full justify-center flex">
          <AllEvents />
        </div>
      </div>
    </div>
  );
}

export default ShopAllEvents;
