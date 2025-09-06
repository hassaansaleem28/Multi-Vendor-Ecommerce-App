import EventCard from "../components/UserComps/EventCard";
import Header from "../components/Layouts/Header";
import { useSelector } from "react-redux";

function EventPage() {
  const { allEvents, isLoading } = useSelector(state => state.events);

  return (
    <div>
      <Header activeHeading={4} />
      <EventCard
        active={true}
        data={allEvents && allEvents[0]}
        isLoading={isLoading}
      />
    </div>
  );
}

export default EventPage;
