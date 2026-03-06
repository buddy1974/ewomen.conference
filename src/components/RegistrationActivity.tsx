import { useState, useEffect, useRef } from "react";
import { Users } from "lucide-react";

const CITIES = ["Yaoundé", "Douala", "Bafoussam", "Bamenda", "Abuja", "Paris", "London"];
const TEMPLATES: Array<(city: string) => string> = [
  (c) => `Someone from ${c} just registered`,
  (c) => `Someone from ${c} secured a seat`,
  (c) => `New registration from ${c}`,
];

const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const RegistrationActivity = () => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const hideRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const showRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const show = () => {
      setMessage(pick(TEMPLATES)(pick(CITIES)));
      setVisible(true);
      if (hideRef.current) clearTimeout(hideRef.current);
      hideRef.current = setTimeout(() => setVisible(false), 6000);
    };

    // Recursive scheduler: next notification in 12–18 s
    const schedule = () => {
      const delay = 12000 + Math.random() * 6000;
      showRef.current = setTimeout(() => {
        show();
        schedule();
      }, delay);
    };

    // First notification after 5 s
    showRef.current = setTimeout(() => {
      show();
      schedule();
    }, 5000);

    return () => {
      if (showRef.current) clearTimeout(showRef.current);
      if (hideRef.current) clearTimeout(hideRef.current);
    };
  }, []);

  if (!message) return null;

  return (
    <div
      className="fixed bottom-24 md:bottom-6 left-4 md:left-6 z-40 flex items-center gap-3"
      style={{
        background: "#ffffff",
        borderRadius: 14,
        padding: "12px 16px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.14)",
        maxWidth: 260,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(10px)",
        transition: "opacity 450ms ease, transform 450ms ease",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          flexShrink: 0,
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: "rgba(212,25,138,0.12)",
          color: "#d4198a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Users size={16} />
      </div>
      <p style={{ fontSize: 13, fontWeight: 500, color: "#1a001f", lineHeight: 1.4, margin: 0 }}>
        {message}
      </p>
    </div>
  );
};

export default RegistrationActivity;
