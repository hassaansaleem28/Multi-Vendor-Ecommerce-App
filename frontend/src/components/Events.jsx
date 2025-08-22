import styles from "../styles/styles";
import EventCard from "./EventCard";

function Events() {
  return (
    <div className="">
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1 className="font-[800] text-[2rem] font-[Roboto]">
            Popular Events
          </h1>
        </div>
        <div className="w-full grid">
          <EventCard />
        </div>
      </div>
    </div>
  );
}

export default Events;
