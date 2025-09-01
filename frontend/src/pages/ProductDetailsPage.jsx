import { useParams, useSearchParams } from "react-router-dom";
import Header from "../components/Layouts/Header";
import { useEffect, useState } from "react";
import SuggestedProducts from "../components/UserComps/SuggestedProducts";
import Footer from "../components/UserComps/Footer";
import ProductDetails from "../components/UserComps/ProductDetails";
import { useSelector } from "react-redux";

function ProductDetailsPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get("isEvent");
  const { allProducts } = useSelector(state => state.product);
  const { allEvents } = useSelector(state => state.events);

  useEffect(
    function () {
      if (eventData !== null) {
        const data = allEvents && allEvents.find(i => i._id === id);
        setData(data);
      } else {
        const data = allProducts && allProducts.find(i => i._id === id);
        setData(data);
      }
    },
    [allProducts, allEvents]
  );

  return (
    <div>
      <Header />
      <ProductDetails data={data} />
      {!eventData && <>{data && <SuggestedProducts data={data} />}</>}
      <Footer />
    </div>
  );
}

export default ProductDetailsPage;
