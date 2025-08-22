import { useNavigate } from "react-router-dom";
import Signup from "../components/Signup";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function SignupPage() {
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
      <Signup />
    </div>
  );
}

export default SignupPage;
