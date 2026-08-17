import SellerLayout from "../components/SellerComps/SellerLayout";
import DashboardHero from "../components/SellerComps/DashboardHero";

function ShopDashboardPage() {
  return (
    <SellerLayout active={1} wide>
      <DashboardHero />
    </SellerLayout>
  );
}

export default ShopDashboardPage;
