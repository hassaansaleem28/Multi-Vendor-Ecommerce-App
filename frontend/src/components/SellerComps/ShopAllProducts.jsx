import AllProducts from "./AllProducts";
import SellerLayout from "./SellerLayout";

function ShopAllProducts() {
  return (
    <SellerLayout
      active={3}
      title="All products"
      subtitle="Everything your shop currently has listed."
    >
      <AllProducts />
    </SellerLayout>
  );
}

export default ShopAllProducts;
