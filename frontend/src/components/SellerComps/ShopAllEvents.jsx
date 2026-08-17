import AllEvents from "./AllEvents";
import SellerLayout from "./SellerLayout";

function ShopAllEvents() {
  return (
    <SellerLayout
      active={5}
      title="All events"
      subtitle="Your running and scheduled flash sales."
    >
      <AllEvents />
    </SellerLayout>
  );
}

export default ShopAllEvents;
