import { QRCodeSVG } from "qrcode.react";
import { Link } from "react-router-dom";
import { ClipboardList, Printer } from "lucide-react";

const SURVEY_URL = "https://www.e-womanconference.online/evaluation";

const EvaluationQR = () => (
  <div className="min-h-screen gradient-magenta flex items-center justify-center py-16 px-4">
    <div className="max-w-sm w-full space-y-6 text-center animate-fade-in-up">

      {/* Header */}
      <div>
        <p className="text-white text-xs uppercase tracking-widest mb-2">
          E-Woman Conference 2026
        </p>
        <h1 className="font-display text-3xl font-bold text-white leading-tight">
          Conference Evaluation
        </h1>
      </div>

      {/* QR Card */}
      <div className="bg-white rounded-3xl shadow-2xl px-8 py-10 flex flex-col items-center gap-6">
        <div className="flex items-center gap-2 text-[#d4198a]">
          <ClipboardList size={20} />
          <span className="text-sm font-bold uppercase tracking-wider">Scan to Fill Survey</span>
        </div>

        <div className="p-3 rounded-2xl border-4 border-[#d4198a]/15 bg-white">
          <QRCodeSVG
            value={SURVEY_URL}
            size={220}
            fgColor="#1a001f"
            bgColor="#ffffff"
            level="M"
          />
        </div>

        <div className="space-y-1">
          <p className="font-semibold text-gray-800 text-base leading-snug">
            Scan to fill the conference evaluation
          </p>
          <p className="text-xs text-gray-400 break-all">{SURVEY_URL}</p>
        </div>

        <p className="font-display text-sm font-bold" style={{ color: "#d4198a" }}>
          Empower · Elevate · Excel
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={() => window.print()}
          className="inline-flex items-center justify-center gap-2 bg-white text-[#d4198a] px-6 py-3 rounded-full font-semibold text-sm shadow hover:bg-gray-50 transition"
        >
          <Printer size={16} />
          Print QR Code
        </button>
        <Link
          to="/evaluation"
          className="inline-flex items-center justify-center gap-2 bg-white/15 border border-white/30 text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-white/20 transition"
        >
          Open Survey →
        </Link>
      </div>

      <p className="text-white/50 text-xs">
        Share this link or QR code with attendees to collect feedback
      </p>
    </div>
  </div>
);

export default EvaluationQR;
