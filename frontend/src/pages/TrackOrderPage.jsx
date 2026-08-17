import Header from "../components/Layouts/Header";
import Footer from "../components/UserComps/Footer";
import TrackOrderDetails from "../components/UserComps/TrackOrderDetails";
import PageHero from "../components/ui/PageHero";

function TrackOrderPage() {
  return (
    <div className="flex min-h-screen flex-col bg-ink-50">
      <Header />

      <PageHero
        eyebrow="Order tracking"
        title="Where's my order?"
        subtitle="Live status for this order, from the seller's shelf to your door."
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Profile", to: "/profile" },
          { label: "Track order" },
        ]}
      />

      <main className="flex-1">
        <TrackOrderDetails />
      </main>

      <Footer />
    </div>
  );
}

export default TrackOrderPage;
