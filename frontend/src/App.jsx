import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ActivationPage from "./pages/ActivationPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
import { useEffect } from "react";
import { loadUser } from "./redux-toolkit/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import BestSellingPage from "./pages/BestSellingPage";
import EventPage from "./pages/EventPage";
import FaqPage from "./pages/FaqPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./ProtectedRoute";
import CheckoutPage from "./pages/CheckoutPage";
import ShopCreatePage from "./pages/ShopCreatePage";
import SellerActivationPage from "./pages/SellerActivationPage";
import ShopLoginPage from "./pages/ShopLoginPage";
import { loadSeller } from "./redux-toolkit/actions/sellerActions";
import SellerProtectedRoute from "./SellerProtectedRoute";
import ShopHomePage from "./pages/ShopHomePage";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.user);
  const { isSeller, seller } = useSelector(state => state.seller);

  useEffect(
    function () {
      dispatch(loadUser());
      dispatch(loadSeller());
    },
    [dispatch]
  );
  console.log(isSeller, seller);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="/activation/:url" element={<ActivationPage />} />
        <Route
          path="seller/activation/:url"
          element={<SellerActivationPage />}
        />
        <Route path="/product/:name" element={<ProductDetailsPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/shop-create" element={<ShopCreatePage />} />
        <Route
          path="/shop/:id"
          element={
            <SellerProtectedRoute isSeller={isSeller}>
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
