import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../components/UserComps/Loader";

function SellerProtectedRoute({ children }) {
  const { isSeller, isLoading } = useSelector(state => state.seller);

  if (isLoading === true) return <Loader />;
  else {
    if (!isSeller) return <Navigate to={`/login`} replace />;
  }

  return <div>{children}</div>;
}
export default SellerProtectedRoute;
