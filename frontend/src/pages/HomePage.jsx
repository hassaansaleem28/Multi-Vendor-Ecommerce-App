import BestDeals from "../components/BestDeals";
import Categories from "../components/Categories";
import Events from "../components/Events";
import FeaturedProducts from "../components/FeaturedProducts";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Header from "../components/Layouts/Header";
import Sponsors from "../components/Sponsors";

function HomePage() {
  return (
    <div>
      <Header activeHeading={1} />
      <Hero />
      <Categories />
      <BestDeals />
      <Events />
      <FeaturedProducts />
      <Sponsors />
      <Footer />
    </div>
  );
}

export default HomePage;
