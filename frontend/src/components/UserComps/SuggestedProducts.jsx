import { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { useSelector } from "react-redux";
import SectionHeading from "../ui/SectionHeading";
import ProductGrid from "../ui/ProductGrid";

function SuggestedProducts({ data }) {
  const [products, setProducts] = useState(null);
  const { allProducts } = useSelector(state => state.product);

  useEffect(
    function () {
      const d =
        allProducts &&
        allProducts.filter(
          prod => prod.category === data.category && prod._id !== data._id
        );
      setProducts(d);
    },
    [allProducts, data]
  );

  if (!data || !products || products.length === 0) return null;

  return (
    <section className={`${styles.section} mb-16`}>
      <SectionHeading
        eyebrow="You might also like"
        title="Related products"
        subtitle={`More from ${data.category}.`}
        actionLabel="View category"
        actionTo={`/products?category=${data.category}`}
      />

      <ProductGrid products={products} />
    </section>
  );
}

export default SuggestedProducts;
