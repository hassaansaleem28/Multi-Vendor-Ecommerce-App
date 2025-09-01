import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ActivationPage from "./pages/ActivationPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
import { useEffect, useState } from "react";
import { loadUser } from "./redux-toolkit/actions/userActions";
import { useDispatch } from "react-redux";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import BestSellingPage from "./pages/BestSellingPage";
import EventPage from "./pages/EventPage";
import FaqPage from "./pages/FaqPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProfilePage from "./pages/ProfilePage";
import CheckoutPage from "./pages/CheckoutPage";
import ShopCreatePage from "./pages/ShopCreatePage";
import SellerActivationPage from "./pages/SellerActivationPage";
import ShopLoginPage from "./pages/ShopLoginPage";
import { loadSeller } from "./redux-toolkit/actions/sellerActions";
import ShopHomePage from "./pages/ShopHomePage";
import ProtectedRoute from "./routes/ProtectedRoute";
import SellerProtectedRoute from "./routes/SellerProtectedRoute";
import ShopDashboardPage from "./pages/ShopDashboardPage";
import ShopCreateProduct from "./components/SellerComps/ShopCreateProduct";
import ShopAllProducts from "./components/SellerComps/ShopAllProducts";
import ShopCreateEvent from "./components/SellerComps/ShopCreateEvent";
import ShopAllEvents from "./components/SellerComps/ShopAllEvents";
import ShopAllCoupons from "./components/SellerComps/ShopAllCoupons";
import { getAllProducts } from "./redux-toolkit/actions/productActions";
import ShopPreviewPage from "./components/SellerComps/ShopPreviewPage";
import { getAllEvents } from "./redux-toolkit/actions/eventActions";
import PaymentPage from "./pages/PaymentPage";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import ShopAllOrders from "./components/SellerComps/ShopAllOrders";
import ShopOrderDetails from "./components/SellerComps/ShopOrderDetails";
import UserOrderDetails from "./components/UserComps/UserOrderDetails";
import TrackOrderPage from "./pages/TrackOrderPage";
import ShopAllRefunds from "./components/SellerComps/ShopAllRefunds";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function App() {
  const dispatch = useDispatch();
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/api/v2/payment/stripeapikey`
      );
      setStripeApiKey(data.stripeApiKey);
      console.log(stripeApiKey);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(
    function () {
      dispatch(loadUser());
      dispatch(loadSeller());
      dispatch(getAllProducts());
      dispatch(getAllEvents());
      getStripeApiKey();
    },
    [dispatch]
  );

  return (
    <BrowserRouter>
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Routes>
            <Route
              path="/payment"
              element={
                <ProtectedRoute>
                  <PaymentPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Elements>
      )}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="user/order/:id"
          element={
            <ProtectedRoute>
              <UserOrderDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="user/track-order/:id"
          element={
            <ProtectedRoute>
              <TrackOrderPage />
            </ProtectedRoute>
          }
        />
        <Route path="/activation/:url" element={<ActivationPage />} />
        <Route
          path="seller/activation/:url"
          element={<SellerActivationPage />}
        />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/shop-create" element={<ShopCreatePage />} />
        <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />
        <Route
          path="/dashboard"
          element={
            <SellerProtectedRoute>
              <ShopDashboardPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-create-product"
          element={
            <SellerProtectedRoute>
              <ShopCreateProduct />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-refunds"
          element={
            <SellerProtectedRoute>
              <ShopAllRefunds />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-orders"
          element={
            <SellerProtectedRoute>
              <ShopAllOrders />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/order/:id"
          element={
            <SellerProtectedRoute>
              <ShopOrderDetails />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-products"
          element={
            <SellerProtectedRoute>
              <ShopAllProducts />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-coupons"
          element={
            <SellerProtectedRoute>
              <ShopAllCoupons />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-events"
          element={
            <SellerProtectedRoute>
              <ShopAllEvents />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-create-event"
          element={
            <SellerProtectedRoute>
              <ShopCreateEvent />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/shop/:id"
          element={
            <SellerProtectedRoute>
              <ShopHomePage />
            </SellerProtectedRoute>
          }
        />
        <Route path="/shop-login" element={<ShopLoginPage />} />
        <Route path="/best-selling" element={<BestSellingPage />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route path="/order/success" element={<OrderSuccessPage />} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </BrowserRouter>
  );
}

export default App;
