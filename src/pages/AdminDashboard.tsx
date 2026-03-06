import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Users, Clock, AlertTriangle, RefreshCw, Trash2 } from "lucide-react";
import { getCheckIns, clearCheckIns, type CheckInRecord } from "@/lib/checkin";

const AdminDashboard = () => {
  const [records, setRecords] = useState<CheckInRecord[]>([]);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const refresh = () => {
    setRecords(getCheckIns());
    setLastRefresh(new Date());
  };

  useEffect(() => {
    refresh();
    // Auto-refresh every 15 s
    const t = setInterval(refresh, 15000);
    return () => clearInterval(t);
  }, []);

  // Detect duplicates (same reference appearing more than once)
  const countMap = new Map<string, number>();
  records.forEach((r) => countMap.set(r.reference, (countMap.get(r.reference) ?? 0) + 1));
  const duplicates = records.filter((r) => (countMap.get(r.reference) ?? 0) > 1);

  const handleClear = () => {
    if (!window.confirm("Clear all check-in data? This cannot be undone.")) return;
    clearCheckIns();
    refresh();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Header */}
        <div
          className="rounded-2xl px-6 py-5 text-white shadow-lg"
          style={{ background: "linear-gradient(90deg, #d4198a 0%, #c0157c 100%)" }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-white/90 text-sm mt-0.5">E-Woman Conference 2026 — Check-In Overview</p>
            </div>
            <Link
              to="/checkin"
              className="bg-white text-sm font-bold px-4 py-2 rounded-full transition hover:bg-white/90"
              style={{ color: "#d4198a" }}
            >
              Open Scanner
            </Link>
          </div>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total Check-Ins", value: records.length, icon: <Users size={20} />, color: "#d4198a" },
            { label: "Unique Refs", value: countMap.size, icon: <Clock size={20} />, color: "#1a001f" },
            { label: "Duplicates", value: duplicates.length, icon: <AlertTriangle size={20} />, color: duplicates.length > 0 ? "#d97706" : "#9ca3af" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 text-center">
              <div className="flex justify-center mb-1" style={{ color: s.color }}>{s.icon}</div>
              <p className="font-display text-2xl font-bold" style={{ color: "#1a001f" }}>{s.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Refresh + clear controls */}
        <div className="flex items-center justify-between">
          <button
            onClick={refresh}
            className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition"
            style={{ color: "#1a001f" }}
          >
            <RefreshCw size={14} />
            Refresh
          </button>
          <p className="text-xs text-gray-400">
            Last updated: {lastRefresh.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
          </p>
          <button
            onClick={handleClear}
            className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full bg-red-50 border border-red-200 hover:bg-red-100 transition text-red-600"
          >
            <Trash2 size={14} />
            Clear All
          </button>
        </div>

        {/* Duplicate warnings */}
        {duplicates.length > 0 && (
          <div className="bg-amber-50 border border-amber-300 rounded-2xl p-5">
            <h3 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
              <AlertTriangle size={16} /> Duplicate Entries ({duplicates.length})
            </h3>
            <ul className="space-y-1">
              {[...new Set(duplicates.map((d) => d.reference))].map((ref) => (
                <li key={ref} className="font-mono text-sm text-amber-700">
                  {ref} — scanned {countMap.get(ref)}×
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Recent scans table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-sm" style={{ color: "#1a001f" }}>Recent Scans</h3>
            <span className="text-xs text-gray-400">{records.length} total</span>
          </div>

          {records.length === 0 ? (
            <p className="text-center text-sm text-gray-400 py-8">No check-ins recorded yet.</p>
          ) : (
            <div className="divide-y divide-gray-50 max-h-96 overflow-y-auto">
              {[...records].reverse().map((r, i) => {
                const isDup = (countMap.get(r.reference) ?? 0) > 1;
                return (
                  <div key={i} className={`flex items-center justify-between px-6 py-3 ${isDup ? "bg-amber-50" : ""}`}>
                    <div className="flex items-center gap-3">
                      {isDup && <AlertTriangle size={14} className="text-amber-500 flex-shrink-0" />}
                      <span className="font-mono text-sm font-semibold" style={{ color: "#1a001f" }}>
                        {r.reference}
                      </span>
                      {isDup && <span className="text-xs text-amber-600 font-medium">duplicate</span>}
                    </div>
                    <span className="text-xs text-gray-400">
                      {new Date(r.timestamp).toLocaleString([], {
                        month: "short", day: "numeric",
                        hour: "2-digit", minute: "2-digit",
                      })}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
