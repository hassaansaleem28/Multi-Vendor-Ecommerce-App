import CreateProduct from "./CreateProduct";
import SellerLayout from "./SellerLayout";

function ShopCreateProduct() {
  return (
    <SellerLayout
      active={4}
      title="Create product"
      subtitle="Add a new item to your storefront."
    >
      <CreateProduct />
    </SellerLayout>
  );
}

export default ShopCreateProduct;
