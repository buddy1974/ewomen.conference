import { useState, useEffect, useRef } from "react";
import { CheckCircle, XCircle, AlertTriangle, ScanLine, KeyboardIcon, RefreshCw } from "lucide-react";
import { Html5QrcodeScanner } from "html5-qrcode";
import {
  getCheckIns,
  addCheckIn,
  hasCheckedIn,
  normaliseReference,
  TEST_REFERENCES,
  type CheckInRecord,
} from "@/lib/checkin";

type Status = "idle" | "verified" | "not_found" | "duplicate";

const STATUS_CONFIG: Record<Status, {
  icon: React.ReactNode;
  bg: string;
  border: string;
  title: string;
  message: string;
}> = {
  idle: {
    icon: <ScanLine size={32} className="text-gray-400" />,
    bg: "bg-gray-50",
    border: "border-gray-200",
    title: "Ready to Scan",
    message: "Scan a QR code or enter a reference below.",
  },
  verified: {
    icon: <CheckCircle size={32} className="text-green-600" />,
    bg: "bg-green-50",
    border: "border-green-300",
    title: "✓ Attendee Verified",
    message: "Welcome to E-Woman Conference 2026",
  },
  not_found: {
    icon: <XCircle size={32} className="text-red-500" />,
    bg: "bg-red-50",
    border: "border-red-300",
    title: "Reference Not Found",
    message: "Please verify payment before entry.",
  },
  duplicate: {
    icon: <AlertTriangle size={32} className="text-amber-500" />,
    bg: "bg-amber-50",
    border: "border-amber-300",
    title: "⚠ Already Checked In",
    message: "This attendee has already been admitted.",
  },
};

const CheckIn = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [lastRef, setLastRef] = useState("");
  const [manual, setManual] = useState("");
  const [records, setRecords] = useState<CheckInRecord[]>([]);
  const [tab, setTab] = useState<"scanner" | "manual">("scanner");
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const scannerDivId = "ew-qr-reader";

  // Load check-in records from localStorage
  const refreshRecords = () => setRecords(getCheckIns());
  useEffect(() => { refreshRecords(); }, [status]);

  // Verify a raw reference string
  const verify = (raw: string) => {
    const ref = normaliseReference(raw);
    if (!ref) return;
    setLastRef(ref);

    if (hasCheckedIn(ref)) {
      setStatus("duplicate");
      return;
    }

    if (TEST_REFERENCES.has(ref)) {
      addCheckIn(ref);
      setStatus("verified");
    } else {
      setStatus("not_found");
    }
  };

  // QR Scanner lifecycle
  useEffect(() => {
    if (tab !== "scanner") {
      scannerRef.current?.clear().catch(() => {});
      scannerRef.current = null;
      return;
    }

    // Short delay to ensure the DOM element is mounted
    const timer = setTimeout(() => {
      if (scannerRef.current) return;
      const scanner = new Html5QrcodeScanner(
        scannerDivId,
        { fps: 10, qrbox: { width: 250, height: 250 }, aspectRatio: 1 },
        false
      );
      scanner.render(
        (decoded) => {
          verify(decoded);
          // Brief pause before next scan
          scanner.pause(true);
          setTimeout(() => {
            try { scanner.resume(); } catch { /* already cleared */ }
          }, 3000);
        },
        () => { /* ignore scan errors */ }
      );
      scannerRef.current = scanner;
    }, 100);

    return () => {
      clearTimeout(timer);
      scannerRef.current?.clear().catch(() => {});
      scannerRef.current = null;
    };
  }, [tab]);

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    verify(manual);
    setManual("");
  };

  const reset = () => {
    setStatus("idle");
    setLastRef("");
  };

  const cfg = STATUS_CONFIG[status];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto space-y-6">

        {/* Header */}
        <div
          className="rounded-2xl px-6 py-5 text-white text-center shadow-lg"
          style={{ background: "linear-gradient(90deg, #d4198a 0%, #c0157c 100%)" }}
        >
          <h1 className="font-display text-2xl font-bold">E-Woman Conference Check-In</h1>
          <p className="text-white/90 text-sm mt-1">Scan attendee QR code or enter payment reference</p>
        </div>

        {/* Status card */}
        <div className={`rounded-2xl border-2 p-6 text-center transition-all ${cfg.bg} ${cfg.border}`}>
          <div className="flex justify-center mb-3">{cfg.icon}</div>
          <h2 className="font-display text-xl font-bold mb-1" style={{ color: "#1a001f" }}>{cfg.title}</h2>
          <p className="text-sm" style={{ color: "rgba(26,0,31,0.7)" }}>{cfg.message}</p>
          {lastRef && (
            <p className="font-mono text-sm font-bold mt-2" style={{ color: "#d4198a" }}>{lastRef}</p>
          )}
          {status !== "idle" && (
            <button
              onClick={reset}
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold px-5 py-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition"
              style={{ color: "#1a001f" }}
            >
              <RefreshCw size={14} /> Next Attendee
            </button>
          )}
        </div>

        {/* Tab switcher */}
        <div className="flex rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm">
          <button
            onClick={() => setTab("scanner")}
            className={`flex-1 py-3 text-sm font-semibold flex items-center justify-center gap-2 transition ${
              tab === "scanner" ? "text-white" : "text-gray-500 hover:bg-gray-50"
            }`}
            style={tab === "scanner" ? { background: "#d4198a" } : {}}
          >
            <ScanLine size={16} /> QR Scanner
          </button>
          <button
            onClick={() => setTab("manual")}
            className={`flex-1 py-3 text-sm font-semibold flex items-center justify-center gap-2 transition ${
              tab === "manual" ? "text-white" : "text-gray-500 hover:bg-gray-50"
            }`}
            style={tab === "manual" ? { background: "#d4198a" } : {}}
          >
            <KeyboardIcon size={16} /> Manual Entry
          </button>
        </div>

        {/* QR Scanner panel */}
        {tab === "scanner" && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden p-4">
            <div id={scannerDivId} />
          </div>
        )}

        {/* Manual entry panel */}
        {tab === "manual" && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <form onSubmit={handleManualSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: "#1a001f" }}>
                  Payment Reference
                </label>
                <input
                  type="text"
                  value={manual}
                  onChange={(e) => setManual(e.target.value)}
                  placeholder="e.g. MTN-847372819"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#d4198a]/30 focus:border-[#d4198a]"
                  autoComplete="off"
                  autoCapitalize="characters"
                />
                <p className="text-xs text-gray-400 mt-1.5">
                  Enter exactly as shown on the payment receipt.
                </p>
              </div>
              <button
                type="submit"
                disabled={!manual.trim()}
                className="w-full py-3 rounded-full text-white font-bold text-sm transition-all disabled:opacity-40"
                style={{ background: "#d4198a" }}
              >
                Verify Reference
              </button>
            </form>
          </div>
        )}

        {/* Stats + recent log */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm" style={{ color: "#1a001f" }}>Check-In Log</h3>
            <span
              className="text-xs font-bold px-3 py-1 rounded-full text-white"
              style={{ background: "#d4198a" }}
            >
              Total: {records.length}
            </span>
          </div>

          {records.length === 0 ? (
            <p className="text-xs text-gray-400 text-center py-4">No check-ins yet.</p>
          ) : (
            <ul className="space-y-2 max-h-48 overflow-y-auto">
              {[...records].reverse().map((r, i) => (
                <li key={i} className="flex items-center justify-between text-xs">
                  <span className="font-mono font-semibold" style={{ color: "#1a001f" }}>{r.reference}</span>
                  <span className="text-gray-400">
                    {new Date(r.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  );
};

export default CheckIn;
