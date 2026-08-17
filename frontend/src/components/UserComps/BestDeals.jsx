import { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { useSelector } from "react-redux";
import SectionHeading from "../ui/SectionHeading";
import ProductGrid from "../ui/ProductGrid";

function BestDeals() {
  const [dataa, setDataa] = useState([]);
  const { allProducts, isLoading } = useSelector(state => state.product);

  useEffect(
    function () {
      const sortedData =
        allProducts &&
        [...allProducts]?.sort((a, b) => b.sold_out - a.sold_out);
      const firstFive = sortedData && sortedData.slice(0, 5);
      setDataa(firstFive);
    },
    [allProducts],
  );

  return (
    <section className={`${styles.section} mb-16`}>
      <SectionHeading
        eyebrow="Trending now"
        title="Best deals"
        subtitle="The pieces our shoppers can't stop buying this week."
        actionLabel="See best sellers"
        actionTo="/best-selling"
      />

      <ProductGrid
        products={dataa}
        loading={isLoading && (!dataa || dataa.length === 0)}
        emptyTitle="No deals right now"
        emptyMessage="New offers land every week — check back shortly."
      />
    </section>
  );
}

export default BestDeals;
