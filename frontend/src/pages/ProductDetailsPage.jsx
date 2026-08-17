import { useParams, useSearchParams } from "react-router-dom";
import Header from "../components/Layouts/Header";
import { useEffect, useState } from "react";
import SuggestedProducts from "../components/UserComps/SuggestedProducts";
import Footer from "../components/UserComps/Footer";
import ProductDetails from "../components/UserComps/ProductDetails";
import { useSelector } from "react-redux";
import Loader from "../components/UserComps/Loader";

function ProductDetailsPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get("isEvent");
  const { allProducts, isLoading } = useSelector(state => state.product);
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
      window.scrollTo(0, 0);
    },
    [allProducts, allEvents]
  );

  return (
    <div className="flex min-h-screen flex-col bg-ink-50">
      <Header />

      <main className="flex-1">
        {!data && isLoading ? (
          <Loader label="Loading product" />
        ) : (
          <>
            <ProductDetails data={data} />
            {!eventData && <>{data && <SuggestedProducts data={data} />}</>}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default ProductDetailsPage;
