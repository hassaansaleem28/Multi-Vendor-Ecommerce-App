import { useEffect, useState } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const UNITS = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Mins" },
  { key: "seconds", label: "Secs" },
];

/** A single unit box whose digits flip when the value changes. */
function TimeBox({ value, label, dark }) {
  const display = String(value ?? 0).padStart(2, "0");

  return (
    <div className="flex flex-col items-center">
      <div
        className={`relative grid h-[58px] w-[58px] place-items-center overflow-hidden rounded-xl border shadow-card sm:h-[64px] sm:w-[64px] ${
          dark
            ? "border-white/10 bg-white/10 backdrop-blur"
            : "border-ink-100 bg-white"
        }`}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={display}
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className={`absolute font-display text-[24px] font-bold tabular-nums sm:text-[27px] ${
              dark ? "text-white" : "text-ink-900"
            }`}
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>
      <span
        className={`mt-1.5 text-[11px] font-semibold uppercase tracking-wider ${
          dark ? "text-white/50" : "text-ink-400"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

function CountDown({ data, dark = false }) {
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

  const isLive = Object.keys(timeLeft).length > 0;

  if (!isLive) {
    return (
      <div className="inline-flex items-center gap-2 rounded-xl bg-danger-50 px-4 py-2.5">
        <span className="h-2 w-2 rounded-full bg-danger-500" />
        <span className="font-display text-[15px] font-bold text-danger-600">
          Time&apos;s up — offer ended
        </span>
      </div>
    );
  }

  return (
    <div>
      <p
        className={`mb-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] ${
          dark ? "text-white/50" : "text-ink-400"
        }`}
      >
        Offer ends in
      </p>
      <div className="flex items-start gap-2.5 sm:gap-3">
        {UNITS.map(u => (
          <TimeBox
            key={u.key}
            value={timeLeft[u.key]}
            label={u.label}
            dark={dark}
          />
        ))}
      </div>
    </div>
  );
}

export default CountDown;
