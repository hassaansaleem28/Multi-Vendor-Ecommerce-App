import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function AdminProtectedRoute({ children }) {
  const { isAuthenticated, loading, user } = useSelector(state => state.user);

  if (loading === false) {
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    else if (user && user.role !== "Admin") {
      return <Navigate to="/" replace />;
    }
  }
  return children;
}
export default AdminProtectedRoute;
