import Footer from "./Footer";
import OrderDetails from "./OrderDetails";
import Header from "../Layouts/Header";

function UserOrderDetails() {
  return (
    <div className="flex min-h-screen flex-col bg-ink-50">
      <Header />
      <main className="flex-1">
        <OrderDetails />
      </main>
      <Footer />
    </div>
  );
}

export default UserOrderDetails;
