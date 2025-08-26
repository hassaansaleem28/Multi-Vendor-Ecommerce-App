import EventCard from "../components/UserComps/EventCard";
import Header from "../components/Layouts/Header";

function EventPage() {
  return (
    <div>
      <Header activeHeading={4} />
      <EventCard active={true} />
    </div>
  );
}

export default EventPage;
