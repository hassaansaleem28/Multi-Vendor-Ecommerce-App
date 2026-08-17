import { useSelector } from "react-redux";
import styles from "../../styles/styles";
import SectionHeading from "../ui/SectionHeading";
import ProductGrid from "../ui/ProductGrid";

function FeaturedProducts() {
  const { allProducts, isLoading } = useSelector(state => state.product);

  return (
    <section className={`${styles.section} mb-16`}>
      <SectionHeading
        eyebrow="Handpicked"
        title="Featured products"
        subtitle="A curated mix from shops across the marketplace."
        actionLabel="Browse all"
        actionTo="/products"
      />

      <ProductGrid
        products={allProducts}
        loading={isLoading && (!allProducts || allProducts.length === 0)}
        skeletonCount={10}
        emptyTitle="Nothing here yet"
        emptyMessage="Products will appear as soon as sellers list them."
      />
    </section>
  );
}

export default FeaturedProducts;
