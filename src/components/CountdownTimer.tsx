import { useState, useEffect, useRef } from "react";

interface CountdownTimerProps {
  targetDate: string;
}

const CountdownTimer = ({ targetDate }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const prevRef = useRef(timeLeft);

  useEffect(() => {
    const target = new Date(targetDate).getTime();
    const tick = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      const next = {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
      prevRef.current = timeLeft;
      setTimeLeft(next);
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const units = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Seconds" },
  ];

  return (
    <div className="flex gap-3 sm:gap-5 justify-center">
      {units.map(({ value, label }) => (
        <div key={label} className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl px-3 py-2 sm:px-5 sm:py-3 text-center min-w-[64px]">
          <div className="font-display text-2xl sm:text-4xl font-bold text-glow tabular-nums transition-all duration-300 ease-out">
            {String(value).padStart(2, "0")}
          </div>
          <div className="text-xs sm:text-sm text-white mt-1 font-body tracking-wider uppercase">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;
