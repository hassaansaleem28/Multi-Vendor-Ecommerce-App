import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Layouts/Header";
import ProductDetails from "../components/ProductDetails";
import { useEffect, useState } from "react";
import { productData } from "../static/data";
import SuggestedProducts from "../components/SuggestedProducts";

function ProductDetailsPage() {
  const { name } = useParams();
  const [data, setData] = useState(null);
  const productName = name.replace(/-/g, " ");

  useEffect(function () {
    const data = productData.find(prod => prod.name === productName);
    setData(data);
  }, []);

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
