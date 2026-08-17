import AllOrders from "./AllOrders";
import SellerLayout from "./SellerLayout";

function ShopAllOrders() {
  return (
    <SellerLayout
      active={2}
      title="All orders"
      subtitle="Every order placed with your shop."
    >
      <AllOrders />
    </SellerLayout>
  );
}

export default ShopAllOrders;
