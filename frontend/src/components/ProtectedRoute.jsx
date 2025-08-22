import { useSelector } from "react-redux";
import Loader from "../components/Loader";

function ProtectedRoute() {
  const { isAuthenticated, loading } = useSelector(state => state.user);
  if (loading) return <Loader />;
  if (isAuthenticated) return <Outlet />;
  return <Navigate to="/" replace />;
}

export default ProtectedRoute;
