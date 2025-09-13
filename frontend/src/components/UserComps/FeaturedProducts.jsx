import { useSelector } from "react-redux";
import styles from "../../styles/styles";
import ProductCard from "./ProductCard";

function FeaturedProducts() {
  const { allProducts } = useSelector(state => state.product);
  return (
    <div className="">
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1 className="font-[800] text-[2rem] font-[Roboto]">
            Featured Products
          </h1>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {allProducts?.length !== 0 &&
            allProducts &&
            allProducts.map((product, i) => (
              <ProductCard product={product} key={i} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default FeaturedProducts;
