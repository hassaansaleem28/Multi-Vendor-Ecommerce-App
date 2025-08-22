import { useEffect, useState } from "react";
import Header from "../components/Layouts/Header";
import styles from "../styles/styles";
import { productData } from "../static/data";
import ProductCard from "../components/ProductCard";

function BestSellingPage() {
  const [data, setData] = useState();

  useEffect(function () {
    const data =
      productData && productData.sort((a, b) => b.total_sell - a.total_sell);
    setData(data);
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Header activeHeading={2} />
      <br />
      <br />
      <div className={`${styles.section}`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
          {data &&
            data.map((prod, i) => <ProductCard product={prod} key={i} />)}
        </div>
        {data && data.length === 0 ? (
          <h1 className="text-center w-full pb-[110px] text-[20px]">
            No Products found!
          </h1>
        ) : null}
      </div>
    </div>
  );
}

export default BestSellingPage;
