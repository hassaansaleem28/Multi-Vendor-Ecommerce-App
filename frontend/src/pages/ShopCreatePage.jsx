import { useSelector } from "react-redux";
import ShopCreate from "../components/ShopCreate";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function ShopCreatePage() {
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
      <ShopCreate />
    </div>
  );
}

export default ShopCreatePage;
