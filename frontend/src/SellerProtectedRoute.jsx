import { Navigate } from "react-router-dom";

function SellerProtectedRoute({ isSeller, children }) {
  if (!isSeller) return <Navigate to={`/`} replace />;
  return <div>{children}</div>;
}
export default SellerProtectedRoute;
