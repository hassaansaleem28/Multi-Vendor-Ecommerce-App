import AllCoupons from "./AllCoupons";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";

function ShopAllCoupons() {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="w-[80px] width-at-800px">
          <DashboardSidebar activeHeading={9} />
        </div>
        <div className="w-full justify-center flex">
          <AllCoupons />
        </div>
      </div>
    </div>
  );
}
export default ShopAllCoupons;
