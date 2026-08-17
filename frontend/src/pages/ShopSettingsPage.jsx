import SellerLayout from "../components/SellerComps/SellerLayout";
import ShopSettings from "../components/SellerComps/ShopSettings";

function ShopSettingsPage() {
  return (
    <SellerLayout
      active={11}
      title="Shop settings"
      subtitle="Update how your storefront looks to shoppers."
    >
      <ShopSettings />
    </SellerLayout>
  );
}

export default ShopSettingsPage;
