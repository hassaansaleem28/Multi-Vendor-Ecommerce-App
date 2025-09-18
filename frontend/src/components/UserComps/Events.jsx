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
          <div className="w-full grid mb-14">
            {allEvents?.length !== 0 &&
              allEvents &&
              allEvents?.map((event, i) => (
                <EventCard
                  data={event}
                  key={i}
                  active={true}
                  isLoading={isLoading}
                />
              ))}
            {allEvents?.length === 0 && <h4>No Product Events Running!</h4>}
          </div>
        </div>
      )}
    </div>
  );
}

export default Events;
