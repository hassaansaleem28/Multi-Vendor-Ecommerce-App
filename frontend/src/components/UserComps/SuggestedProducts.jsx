import { useEffect, useState } from "react";
import styles from "../../styles/styles";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";

function SuggestedProducts({ data }) {
  const [products, setProducts] = useState(null);
  const { allProducts } = useSelector(state => state.product);

  useEffect(function () {
    const d =
      allProducts &&
      allProducts.filter(prod => prod.category === data.category);
    setProducts(d);
  }, []);
  return (
    <div>
      {data ? (
        <div className={`${styles.section}`}>
          <h2
            className={`${styles.heading} text-[25px] font-[Roboto] font-[800] border-b mb-5 p-4`}
          >
            Related Product
          </h2>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:*:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
            {products &&
              products.map((prod, i) => <ProductCard product={prod} key={i} />)}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default SuggestedProducts;
