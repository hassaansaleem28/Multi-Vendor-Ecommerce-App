import { useEffect } from "react";
import Login from "../components/Login";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const { isAuthenticated } = useSelector(state => state.user);
  const navigate = useNavigate();
  useEffect(
    function () {
      if (isAuthenticated) navigate("/");
    },
    [isAuthenticated, navigate]
  );
  return (
    <div>
      <Login />
    </div>
  );
}

export default LoginPage;
