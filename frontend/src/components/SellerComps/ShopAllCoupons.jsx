import AllCoupons from "./AllCoupons";
import SellerLayout from "./SellerLayout";

function ShopAllCoupons() {
  return (
    <SellerLayout
      active={9}
      title="Discount codes"
      subtitle="Create and manage coupon codes for your shop."
    >
      <AllCoupons />
    </SellerLayout>
  );
}

export default ShopAllCoupons;
