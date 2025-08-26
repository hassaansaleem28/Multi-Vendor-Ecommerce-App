import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Login from "../components/UserComps/Login";

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
