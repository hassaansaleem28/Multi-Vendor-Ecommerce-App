import AllRefunds from "./AllRefunds";
import SellerLayout from "./SellerLayout";

function ShopAllRefunds() {
  return (
    <SellerLayout
      active={10}
      title="Refunds"
      subtitle="Refund requests from your customers."
    >
      <AllRefunds />
    </SellerLayout>
  );
}

export default ShopAllRefunds;
