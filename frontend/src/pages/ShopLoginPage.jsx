import { useNavigate } from "react-router-dom";
import ShopLogin from "../components/ShopLogin";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function ShopLoginPage() {
  const { isSeller, seller } = useSelector(state => state.seller);
  const navigate = useNavigate();
  useEffect(
    function () {
      if (isSeller) navigate(`/shop/${seller._id}`);
    },
    [isSeller, navigate]
  );
  return (
    <div>
      <ShopLogin />
    </div>
  );
}

export default ShopLoginPage;
