import EventCard from "../components/UserComps/EventCard";
import Header from "../components/Layouts/Header";
import { useSelector } from "react-redux";

function EventPage() {
  const { allEvents, isLoading } = useSelector(state => state.events);

  return (
    <div>
      <Header activeHeading={4} />
      {allEvents?.length !== 0 &&
        allEvents &&
        allEvents.map((event, i) => (
          <EventCard data={event} key={i} active={true} isLoading={isLoading} />
        ))}
      {allEvents?.length === 0 && <h4>No Product Events Running!</h4>}
    </div>
  );
}

export default EventPage;
