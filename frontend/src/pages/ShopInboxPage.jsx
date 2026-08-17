import SellerLayout from "../components/SellerComps/SellerLayout";
import DashboardMessages from "../components/SellerComps/DashboardMessages";

function ShopInboxPage() {
  return (
    <SellerLayout active={8} wide>
      <DashboardMessages />
    </SellerLayout>
  );
}

export default ShopInboxPage;
