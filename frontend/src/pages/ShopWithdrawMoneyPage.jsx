import DashboardHeader from "../components/SellerComps/DashboardHeader";
import DashboardSidebar from "../components/SellerComps/DashboardSidebar";
import ShopWithdrawMoney from "../components/SellerComps/ShopWithdrawMoney";

function ShopWithdrawMoneyPage() {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] width-at-800px">
          <DashboardSidebar activeHeading={7} />
        </div>
        <ShopWithdrawMoney />
      </div>
    </div>
  );
}

export default ShopWithdrawMoneyPage;
