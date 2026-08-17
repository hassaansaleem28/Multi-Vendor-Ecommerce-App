import EventCard from "../components/UserComps/EventCard";
import Header from "../components/Layouts/Header";
import Footer from "../components/UserComps/Footer";
import { useSelector } from "react-redux";
import styles from "../styles/styles";
import PageHero from "../components/ui/PageHero";
import Loader from "../components/UserComps/Loader";

function EventPage() {
  const { allEvents, isLoading } = useSelector(state => state.events);

  return (
    <div className="flex min-h-screen flex-col">
      <Header activeHeading={4} />

      <PageHero
        eyebrow="Flash sales"
        title="Live events"
        subtitle="Time-boxed offers from our sellers. When the clock runs out, so does the price."
        crumbs={[{ label: "Home", to: "/" }, { label: "Events" }]}
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-accent-200 bg-accent-50 px-4 py-2 text-[13px] font-semibold text-accent-700">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-500" />
          </span>
          {allEvents?.length || 0} running
        </span>
      </PageHero>

      <main className={`${styles.section} flex-1 py-12`}>
        {isLoading ? (
          <Loader label="Loading events" />
        ) : (
          <div className="grid gap-6">
            {allEvents?.length !== 0 &&
              allEvents &&
              allEvents.map((event, i) => (
                <EventCard
                  data={event}
                  key={event?._id || i}
                  active={true}
                  isLoading={isLoading}
                />
              ))}

            {allEvents?.length === 0 && (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink-200 bg-white/60 px-6 py-20 text-center">
                <h3 className="font-display text-[20px] font-bold text-ink-900">
                  No events running
                </h3>
                <p className="mt-2 max-w-sm text-[14px] text-ink-500">
                  There are no flash sales right now. Check back soon — sellers
                  launch new offers regularly.
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default EventPage;
