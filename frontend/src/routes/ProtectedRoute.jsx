import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useSelector(state => state.user);

  if (loading === false) {
    if (!isAuthenticated) return <Navigate to="/login" replace />;
  }
  return <div>{children}</div>;
}
export default ProtectedRoute;
