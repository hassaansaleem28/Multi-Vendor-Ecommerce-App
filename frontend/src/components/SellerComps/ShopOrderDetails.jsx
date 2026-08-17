import DashboardHeader from "./DashboardHeader";
import Footer from "../UserComps/Footer";
import OrderDetails from "./OrderDetails";

function ShopOrderDetails() {
  return (
    <div className="flex min-h-screen flex-col bg-ink-50">
      <DashboardHeader />
      <main className="flex-1">
        <OrderDetails />
      </main>
      <Footer />
    </div>
  );
}

export default ShopOrderDetails;
