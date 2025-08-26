import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Signup from "../components/UserComps/Signup";

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
