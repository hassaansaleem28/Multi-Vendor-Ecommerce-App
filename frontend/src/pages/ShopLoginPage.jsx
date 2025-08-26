import { useNavigate } from "react-router-dom";
import ShopLogin from "../components/SellerComps/ShopLogin";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function ShopLoginPage() {
  const { isSeller, isLoading } = useSelector(state => state.seller);
  const navigate = useNavigate();
  useEffect(
    function () {
      if (isSeller === true) navigate(`/dashboard`);
    },
    [isSeller, isLoading]
  );
  return (
    <div>
      <ShopLogin />
    </div>
  );
}

export default ShopLoginPage;
