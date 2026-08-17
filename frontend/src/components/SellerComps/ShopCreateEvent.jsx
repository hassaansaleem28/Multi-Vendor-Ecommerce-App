import CreateEvent from "./CreateEvent";
import SellerLayout from "./SellerLayout";

function ShopCreateEvent() {
  return (
    <SellerLayout
      active={6}
      title="Create event"
      subtitle="Run a time-boxed promotion on one of your products."
    >
      <CreateEvent />
    </SellerLayout>
  );
}

export default ShopCreateEvent;
