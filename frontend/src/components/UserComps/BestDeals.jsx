import { useEffect, useState } from "react";
import styles from "../../styles/styles";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";

function BestDeals() {
  const [dataa, setDataa] = useState([]);
  const { allProducts } = useSelector(state => state.product);
  useEffect(
    function () {
      const sortedData =
        allProducts &&
        [...allProducts]?.sort((a, b) => b.sold_out - a.sold_out);
      const firstFive = sortedData && sortedData.slice(0, 5);
      setDataa(firstFive);
    },
    [allProducts]
  );
  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1 className="font-[800] text-[2rem] font-[Roboto]">Best Deals</h1>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {dataa &&
            dataa.length !== 0 &&
            dataa &&
            dataa.map((prod, i) => <ProductCard product={prod} key={i} />)}
        </div>
      </div>
    </div>
  );
}

export default BestDeals;
