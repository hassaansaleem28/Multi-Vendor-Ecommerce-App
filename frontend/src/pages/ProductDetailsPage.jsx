import { useParams } from "react-router-dom";
import Header from "../components/Layouts/Header";
import { useEffect, useState } from "react";
import SuggestedProducts from "../components/UserComps/SuggestedProducts";
import Footer from "../components/UserComps/Footer";
import ProductDetails from "../components/UserComps/ProductDetails";
import { useDispatch, useSelector } from "react-redux";

function ProductDetailsPage() {
  const { name } = useParams();
  const [data, setData] = useState(null);
  const productName = name.replace(/-/g, " ");
  const { allProducts } = useSelector(state => state.product);

  useEffect(
    function () {
      const data =
        allProducts && allProducts?.find(prod => prod.name === productName);
      setData(data);
    },
    [productName, allProducts]
  );

  return (
    <div>
      <Header />
      <ProductDetails data={data} />
      {data && <SuggestedProducts data={data} />}
      <Footer />
    </div>
  );
}

export default ProductDetailsPage;
