import SellerLayout from "../components/SellerComps/SellerLayout";
import ShopWithdrawMoney from "../components/SellerComps/ShopWithdrawMoney";

function ShopWithdrawMoneyPage() {
  return (
    <SellerLayout
      active={7}
      title="Withdraw money"
      subtitle="Move your earnings to your bank account."
    >
      <ShopWithdrawMoney />
    </SellerLayout>
  );
}

export default ShopWithdrawMoneyPage;
