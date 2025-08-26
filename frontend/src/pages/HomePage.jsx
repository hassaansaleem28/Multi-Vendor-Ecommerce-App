import Header from "../components/Layouts/Header";
import BestDeals from "../components/UserComps/BestDeals";
import Categories from "../components/UserComps/Categories";
import Events from "../components/UserComps/Events";
import FeaturedProducts from "../components/UserComps/FeaturedProducts";
import Footer from "../components/UserComps/Footer";
import Hero from "../components/UserComps/Hero";
import Sponsors from "../components/UserComps/Sponsors";

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
