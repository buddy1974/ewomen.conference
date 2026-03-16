import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Users, Clock, AlertTriangle, RefreshCw, Trash2, Download, Lock, ClipboardList } from "lucide-react";
import { getCheckIns, clearCheckIns, type CheckInRecord } from "@/lib/checkin";

// ── Evaluation helpers ────────────────────────────────────────────────────────
import { supabase } from "@/lib/supabase";

interface EvaluationResponse {
  id: string;
  created_at: string;
  q1_content_relevant: number | null;
  q2_speaker_quality: number | null;
  q3_positive_environment: number | null;
  q4_well_organized: number | null;
  q5_learned_something: number | null;
  q6_best_session: string | null;
  q7_needs_improvement: string | null;
  r1_venue: string | null;
  r2_food: string | null;
  r3_networking: string | null;
  r4_coordination: string | null;
  q9_topics: string | null;
  q10_recommend: string | null;
  q11_one_word: string | null;
  q12_comments: string | null;
}

const exportEvaluationsCSV = (rows: EvaluationResponse[]) => {
  const headers = [
    "ID","Submitted","ContentRelevant","SpeakerQuality","PositiveEnv","WellOrg","LearnedSomething",
    "BestSession","NeedsImprovement","Venue","Food","Networking","Coordination",
    "Topics","Recommend","OneWord","Comments",
  ];
  const escape = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const lines = rows.map((r) =>
    [r.id, r.created_at, r.q1_content_relevant, r.q2_speaker_quality,
     r.q3_positive_environment, r.q4_well_organized, r.q5_learned_something,
     r.q6_best_session, r.q7_needs_improvement,
     r.r1_venue, r.r2_food, r.r3_networking, r.r4_coordination,
     r.q9_topics, r.q10_recommend, r.q11_one_word, r.q12_comments]
      .map(escape).join(",")
  );
  const csv = [headers.join(","), ...lines].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "ewoman-evaluations.csv";
  a.click();
  URL.revokeObjectURL(url);
};

const avg = (rows: EvaluationResponse[], key: keyof EvaluationResponse) => {
  const vals = rows.map((r) => r[key]).filter((v) => typeof v === "number") as number[];
  if (!vals.length) return "—";
  return (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1);
};

// ── Access guard ─────────────────────────────────────────────────────────────
const STAFF_KEY = "ewoman2026";

const AccessRestricted = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-10 text-center max-w-sm w-full space-y-4">
      <div className="flex justify-center mb-2">
        <Lock size={36} style={{ color: "#d4198a" }} />
      </div>
      <h1 className="font-display text-2xl font-bold" style={{ color: "#1a001f" }}>
        Access Restricted
      </h1>
      <p className="text-sm text-gray-500">Event Staff Only</p>
      <Link
        to="/"
        className="inline-block mt-2 px-6 py-3 rounded-full text-white text-sm font-semibold"
        style={{ backgroundColor: "#d4198a" }}
      >
        Return to Home
      </Link>
    </div>
  </div>
);

// ── CSV export ────────────────────────────────────────────────────────────────
const exportCSV = (records: CheckInRecord[]) => {
  const header = "Reference,Timestamp";
  const rows = records.map((r) => `${r.reference},${r.timestamp}`);
  const csv = [header, ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "ewoman-checkins.csv";
  a.click();
  URL.revokeObjectURL(url);
};

// ── Dashboard ─────────────────────────────────────────────────────────────────
const AdminDashboard = () => {
  const params = new URLSearchParams(window.location.search);
  const key = params.get("key");

  if (key !== STAFF_KEY) return <AccessRestricted />;

  const [records, setRecords] = useState<CheckInRecord[]>([]);
  const [evaluations, setEvaluations] = useState<EvaluationResponse[]>([]);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const refresh = async () => {
    setRecords(getCheckIns());
    if (supabase) {
      const { data } = await supabase
        .from("evaluations")
        .select("*")
        .order("created_at", { ascending: false });
      setEvaluations(data ?? []);
    }
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
              <p className="text-white text-sm mt-0.5">E-Woman Conference 2026 — Check-In Overview</p>
            </div>
            <Link
              to={`/checkin?key=${STAFF_KEY}`}
              className="bg-white text-sm font-bold px-4 py-2 rounded-full transition hover:bg-gray-100"
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

        {/* Controls row */}
        <div className="flex items-center justify-between flex-wrap gap-3">
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

          <div className="flex items-center gap-2">
            <button
              onClick={() => exportCSV(records)}
              disabled={records.length === 0}
              className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition disabled:opacity-40"
              style={{ color: "#1a001f" }}
            >
              <Download size={14} />
              Export CSV
            </button>
            <button
              onClick={handleClear}
              className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full bg-red-50 border border-red-200 hover:bg-red-100 transition text-red-600"
            >
              <Trash2 size={14} />
              Clear All
            </button>
          </div>
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

        {/* ── Evaluations panel ─────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between flex-wrap gap-3">
            <h3 className="font-semibold text-sm flex items-center gap-2" style={{ color: "#1a001f" }}>
              <ClipboardList size={16} style={{ color: "#d4198a" }} />
              Evaluation Responses
              <span className="text-xs font-normal text-gray-400">({evaluations.length})</span>
            </h3>
            <div className="flex items-center gap-2">
              <Link
                to="/evaluation"
                target="_blank"
                className="text-xs font-semibold px-3 py-1.5 rounded-full border border-gray-200 hover:bg-gray-50 transition"
                style={{ color: "#d4198a" }}
              >
                Open Form ↗
              </Link>
              <button
                onClick={() => exportEvaluationsCSV(evaluations)}
                disabled={evaluations.length === 0}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition disabled:opacity-40"
                style={{ color: "#1a001f" }}
              >
                <Download size={12} />
                Export CSV
              </button>
            </div>
          </div>

          {evaluations.length === 0 ? (
            <p className="text-center text-sm text-gray-400 py-8">No evaluations submitted yet.</p>
          ) : (
            <>
              {/* Average scores */}
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Average Ratings (out of 5)</p>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {[
                    { label: "Content", key: "q1_content_relevant" as const },
                    { label: "Speakers", key: "q2_speaker_quality" as const },
                    { label: "Environment", key: "q3_positive_environment" as const },
                    { label: "Organisation", key: "q4_well_organized" as const },
                    { label: "Learned", key: "q5_learned_something" as const },
                  ].map(({ label, key }) => (
                    <div key={key} className="bg-white rounded-xl p-3 text-center shadow-sm">
                      <p className="font-display text-xl font-bold" style={{ color: "#d4198a" }}>{avg(evaluations, key)}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-500">
                  <span>Recommend Yes: {evaluations.filter((e) => e.q10_recommend === "Yes").length}</span>
                  <span>·</span>
                  <span>Maybe: {evaluations.filter((e) => e.q10_recommend === "Maybe").length}</span>
                  <span>·</span>
                  <span>No: {evaluations.filter((e) => e.q10_recommend === "No").length}</span>
                </div>
              </div>

              {/* Response list */}
              <div className="divide-y divide-gray-50 max-h-96 overflow-y-auto">
                {evaluations.map((ev) => (
                  <div key={ev.id} className="px-6 py-3 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-gray-400">{ev.id.slice(0, 8)}…</span>
                      <span className="text-xs text-gray-400">
                        {new Date(ev.created_at).toLocaleString([], {
                          month: "short", day: "numeric",
                          hour: "2-digit", minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {[ev.q1_content_relevant, ev.q2_speaker_quality, ev.q3_positive_environment, ev.q4_well_organized, ev.q5_learned_something].map((v, i) => (
                        <span key={i} className="bg-pink-50 text-pink-700 px-2 py-0.5 rounded-full font-semibold">{v ?? "—"}/5</span>
                      ))}
                      {ev.q10_recommend && (
                        <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{ev.q10_recommend}</span>
                      )}
                      {ev.q11_one_word && (
                        <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full italic">"{ev.q11_one_word}"</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
