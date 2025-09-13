import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function CountDown({ data }) {
  const [timeLeft, setTimeLeft] = useState(calcTimeLeft());
  useEffect(function () {
    const timer = setTimeout(() => {
      setTimeLeft(calcTimeLeft());
      if (
        typeof timeLeft.days === "undefined" &&
        typeof timeLeft.hours === "undefined" &&
        typeof timeLeft.minutes === "undefined" &&
        typeof timeLeft.seconds === "undefined"
      ) {
        axios.delete(
          `${API_BASE_URL}/api/v2/events/delete-shop-event/${data._id}`
        );
      }
    }, 1000);
    return () => clearTimeout(timer);
  });

  function calcTimeLeft() {
    const difference = +new Date(data?.finish_Date) - +new Date();
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }
  const timerComponents = Object.keys(timeLeft).map((interval, i) => {
    if (!timeLeft[interval]) return null;
    return (
      <span key={i} className="text-[25px] text-[#475ad2]">
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });
  return (
    <div>
      {timerComponents.length ? (
        timerComponents
      ) : (
        <span className="text-[red] text-[25px]">Time' s Up!</span>
      )}
    </div>
  );
}

export default CountDown;
