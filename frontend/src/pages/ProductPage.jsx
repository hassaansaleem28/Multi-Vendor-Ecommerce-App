import { useEffect, useState } from "react";
import Header from "../components/Layouts/Header";
import styles from "../styles/styles";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/UserComps/ProductCard";
import { useSelector } from "react-redux";

function ProductPage() {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const [dataa, setDataa] = useState([]);
  const { allProducts } = useSelector(state => state.product);

  useEffect(
    function () {
      if (categoryData === null) {
        const data = allProducts;
        setDataa(data);
      } else {
        const data =
          allProducts && allProducts.filter(i => i.category === categoryData);
        setDataa(data);
      }
    },
    [categoryData, allProducts]
  );
  return (
    <div>
      <Header activeHeading={3} />
      <br />
      <br />
      <div className={`${styles.section}`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
          {dataa &&
            dataa.map((prod, i) => <ProductCard product={prod} key={i} />)}
        </div>
        {dataa && dataa.length === 0 ? (
          <h1 className="text-center w-full pb-[110px] text-[20px]">
            No Products found!
          </h1>
        ) : null}
      </div>
    </div>
  );
}

export default ProductPage;
