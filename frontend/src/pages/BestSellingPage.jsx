import { useEffect, useState } from "react";
import Header from "../components/Layouts/Header";
import styles from "../styles/styles";
import { useSelector } from "react-redux";
import Footer from "../components/UserComps/Footer";
import PageHero from "../components/ui/PageHero";
import ProductGrid from "../components/ui/ProductGrid";

function BestSellingPage() {
  const [data, setData] = useState();
  const { allProducts, isLoading } = useSelector(state => state.product);

  useEffect(
    function () {
      const allProductsData = allProducts ? [...allProducts] : [];
      const sortedData = allProductsData?.sort(
        (a, b) => b.sold_out - a.sold_out
      );
      setData(sortedData);
      window.scrollTo(0, 0);
    },
    [allProducts]
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Header activeHeading={2} />

      <PageHero
        eyebrow="Most loved"
        title="Best selling"
        subtitle="Ranked by units sold across the whole marketplace."
        crumbs={[{ label: "Home", to: "/" }, { label: "Best selling" }]}
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-4 py-2 text-[13px] font-semibold text-ink-600">
          <span className="h-2 w-2 rounded-full bg-accent-500" />
          {data?.length || 0} item{data?.length === 1 ? "" : "s"}
        </span>
      </PageHero>

      <main className={`${styles.section} flex-1 py-12`}>
        <ProductGrid
          products={data}
          loading={isLoading && (!data || data.length === 0)}
          skeletonCount={10}
          emptyTitle="No products found"
          emptyMessage="Once sellers start listing, the best sellers show up here."
        />
      </main>

      <Footer />
    </div>
  );
}

export default BestSellingPage;
