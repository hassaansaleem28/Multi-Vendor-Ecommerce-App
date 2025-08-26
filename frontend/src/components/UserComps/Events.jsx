import { useSelector } from "react-redux";
import styles from "../../styles/styles";
import EventCard from "../UserComps/EventCard";
import Loader from "./Loader";

function Events() {
  const { allEvents, isLoading } = useSelector(state => state.events);

  return (
    <div className="">
      {isLoading ? (
        <Loader />
      ) : (
        <div className={`${styles.section}`}>
          <div className={`${styles.heading}`}>
            <h1 className="font-[800] text-[2rem] font-[Roboto]">
              Popular Events
            </h1>
          </div>
          <div className="w-full grid">
            <EventCard data={allEvents && allEvents[0]} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Events;
