import { useEffect, useState } from "react";
import Header from "../components/Layouts/Header";
import styles from "../styles/styles";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "../components/UserComps/Footer";
import PageHero from "../components/ui/PageHero";
import ProductGrid from "../components/ui/ProductGrid";

function ProductPage() {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const [dataa, setDataa] = useState([]);
  const { allProducts, isLoading } = useSelector(state => state.product);

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
    <div className="flex min-h-screen flex-col">
      <Header activeHeading={3} />

      <PageHero
        eyebrow="Marketplace"
        title={categoryData || "All products"}
        subtitle={
          categoryData
            ? `Everything listed under ${categoryData}.`
            : "Browse the full catalogue from every shop on ShopO."
        }
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Products", to: categoryData ? "/products" : undefined },
          ...(categoryData ? [{ label: categoryData }] : []),
        ]}
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-4 py-2 text-[13px] font-semibold text-ink-600">
          <span className="h-2 w-2 rounded-full bg-brand-500" />
          {dataa?.length || 0} item{dataa?.length === 1 ? "" : "s"}
        </span>
      </PageHero>

      <main className={`${styles.section} flex-1 py-12`}>
        <ProductGrid
          products={dataa}
          loading={isLoading && (!dataa || dataa.length === 0)}
          skeletonCount={10}
          emptyTitle="No products found"
          emptyMessage={
            categoryData
              ? `Nothing listed under ${categoryData} yet. Try another category.`
              : "No products have been listed yet."
          }
        />
      </main>

      <Footer />
    </div>
  );
}

export default ProductPage;
