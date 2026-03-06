import { useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, MapPin, Download, FileDown } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import TicketQR from "@/components/TicketQR";

const Ticket = () => {
  const { reference } = useParams<{ reference: string }>();
  const ref = (reference ?? "").toUpperCase();
  const cardRef = useRef<HTMLDivElement>(null);
  const [pdfLoading, setPdfLoading] = useState(false);

  const downloadPDF = async () => {
    if (!cardRef.current) return;
    setPdfLoading(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const imgW = pageW - 40; // 20mm margin each side
      const imgH = (canvas.height * imgW) / canvas.width;
      const yOffset = (pageH - imgH) / 2;
      pdf.addImage(imgData, "PNG", 20, yOffset > 0 ? yOffset : 10, imgW, imgH);
      pdf.save(`ewoman-ticket-${ref}.pdf`);
    } finally {
      setPdfLoading(false);
    }
  };

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

        {/* Ticket card — captured for PDF */}
        <div ref={cardRef} className="bg-white rounded-3xl shadow-2xl overflow-hidden">

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

          </div>
        </div>

        {/* Action buttons — outside the card so they don't appear in PDF */}
        <div className="mt-5 space-y-3">

          {/* PDF Download */}
          <button
            onClick={downloadPDF}
            disabled={pdfLoading}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full font-semibold text-sm text-white transition-all disabled:opacity-60"
            style={{ backgroundColor: "#d4198a", boxShadow: "0 4px 16px rgba(212,25,138,0.35)" }}
          >
            <FileDown size={16} />
            {pdfLoading ? "Generating PDF…" : `Download Ticket (PDF)`}
          </button>

          {/* Print */}
          <button
            onClick={() => window.print()}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-full font-semibold text-sm border-2 transition-all"
            style={{ borderColor: "rgba(255,255,255,0.6)", color: "#ffffff" }}
          >
            <Download size={15} />
            Save / Print Ticket
          </button>

          <Link
            to="/"
            className="block text-center text-xs text-white underline underline-offset-2 pt-1"
          >
            Return to homepage
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Ticket;
