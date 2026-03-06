import { useParams, Link } from "react-router-dom";
import { Calendar, MapPin, Download } from "lucide-react";
import TicketQR from "@/components/TicketQR";

const Ticket = () => {
  const { reference } = useParams<{ reference: string }>();
  const ref = (reference ?? "").toUpperCase();

  if (!ref) {
    return (
      <div className="min-h-screen gradient-magenta flex items-center justify-center p-8">
        <div className="bg-white rounded-3xl p-8 text-center shadow-2xl max-w-sm w-full">
          <p className="text-gray-700 font-semibold mb-4">No reference provided.</p>
          <Link to="/register" className="text-[#d4198a] underline text-sm">
            Go to Registration
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-magenta py-16 px-4 flex items-center">
      <div className="max-w-sm mx-auto w-full">

        {/* Ticket card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

          {/* Header */}
          <div
            className="px-8 py-6 text-white text-center"
            style={{ background: "linear-gradient(90deg, #d4198a 0%, #c0157c 100%)" }}
          >
            <p className="text-xs uppercase tracking-widest text-white mb-1">Your Ticket</p>
            <h1 className="font-display text-xl font-bold">E-Woman Conference 2026</h1>
          </div>

          <div className="px-8 py-8 space-y-6 text-center">

            {/* Reference */}
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Reference</p>
              <p className="font-mono text-lg font-bold" style={{ color: "#1a001f" }}>{ref}</p>
            </div>

            {/* QR Code */}
            <div className="flex justify-center">
              <TicketQR reference={ref} size={180} />
            </div>

            <p className="text-xs text-gray-400 leading-relaxed">
              Present this QR code at the check-in desk on arrival.
            </p>

            {/* Event details */}
            <div className="bg-gray-50 rounded-2xl px-6 py-4 space-y-2 text-left">
              <div className="flex items-center gap-3 text-sm" style={{ color: "#1a001f" }}>
                <Calendar size={15} className="flex-shrink-0" style={{ color: "#d4198a" }} />
                <span className="font-medium">March 13–14, 2026</span>
              </div>
              <div className="flex items-center gap-3 text-sm" style={{ color: "#1a001f" }}>
                <MapPin size={15} className="flex-shrink-0" style={{ color: "#d4198a" }} />
                <span className="font-medium">Hilton Hotel – Yaoundé</span>
              </div>
            </div>

            {/* Print hint */}
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-2.5 rounded-full border-2 transition-all"
              style={{ borderColor: "#d4198a", color: "#d4198a" }}
            >
              <Download size={15} />
              Save / Print Ticket
            </button>

            <Link
              to="/"
              className="block text-xs text-gray-400 hover:text-gray-600 transition underline underline-offset-2"
            >
              Return to homepage
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
