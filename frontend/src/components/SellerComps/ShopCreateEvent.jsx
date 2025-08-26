import CreateEvent from "./CreateEvent";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";

function ShopCreateEvent() {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-center justify-between w-full">
        <div className="w-[330px]">
          <DashboardSidebar activeHeading={6} />
        </div>
        <div className="w-full flex justify-center">
          <CreateEvent />
        </div>
      </div>
    </div>
  );
}

export default ShopCreateEvent;
