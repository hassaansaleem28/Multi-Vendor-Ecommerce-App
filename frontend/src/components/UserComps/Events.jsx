import { useSelector } from "react-redux";
import styles from "../../styles/styles";
import EventCard from "../UserComps/EventCard";
import Loader from "./Loader";
import SectionHeading from "../ui/SectionHeading";

function Events() {
  const { allEvents, isLoading } = useSelector(state => state.events);

  if (isLoading)
    return (
      <section className={`${styles.section} mb-16`}>
        <Loader label="Loading events" />
      </section>
    );

  return (
    <section className={`${styles.section} mb-16`}>
      <SectionHeading
        eyebrow="Ends soon"
        title="Popular events"
        subtitle="Flash offers from our sellers — once the timer runs out, they're gone."
        actionLabel="All events"
        actionTo="/events"
      />

      <div className="grid w-full gap-6">
        {allEvents?.length !== 0 &&
          allEvents &&
          allEvents?.map((event, i) => (
            <EventCard
              data={event}
              key={event?._id || i}
              active={true}
              isLoading={isLoading}
            />
          ))}

        {allEvents?.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink-200 bg-white/60 px-6 py-16 text-center">
            <h3 className="font-display text-[19px] font-bold text-ink-900">
              No events running
            </h3>
            <p className="mt-1.5 text-[14px] text-ink-500">
              Flash sales appear here the moment a seller launches one.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Events;
