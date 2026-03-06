import { useState, useEffect } from "react";

const CAPACITY = 500;
const START_REGISTERED = 217;

export default function RegistrationCounter() {
  const [registered, setRegistered] = useState(START_REGISTERED);

  useEffect(() => {
    const interval = setInterval(() => {
      setRegistered((prev) => {
        if (prev < 340) return prev + Math.floor(Math.random() * 2);
        return prev;
      });
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  const remaining = CAPACITY - registered;

  return (
    <div
      className="registration-counter"
      style={{ textAlign: "center", marginTop: 20 }}
    >
      <p style={{ fontWeight: 700, fontSize: 18, color: "#1a001f", lineHeight: 1.4 }}>
        🔥 {registered} Women Already Registered
      </p>
      <p style={{ fontSize: 15, color: "#c9a227", fontWeight: 600, lineHeight: 1.4 }}>
        Only {remaining} Seats Remaining
      </p>
    </div>
  );
}
