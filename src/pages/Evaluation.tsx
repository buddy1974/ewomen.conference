import { useState } from "react";
import { CheckCircle, ChevronRight } from "lucide-react";
import { supabase } from "@/lib/supabase";

// ── sub-components ────────────────────────────────────────────────────────────

const SectionHeader = ({
  number,
  title,
}: {
  number: string;
  title: string;
}) => (
  <div className="flex items-center gap-3 mb-6">
    <span
      className="flex-shrink-0 w-9 h-9 rounded-full text-white font-bold text-sm flex items-center justify-center"
      style={{ background: "#d4198a" }}
    >
      {number}
    </span>
    <h2 className="font-display text-xl font-bold text-gray-900">{title}</h2>
  </div>
);

const LikertRow = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number | null;
  onChange: (v: number) => void;
}) => (
  <div className="space-y-2">
    <p className="text-sm text-gray-700 leading-relaxed">{label}</p>
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          className={`w-10 h-10 rounded-full border-2 text-sm font-bold transition-all duration-150 ${
            value === n
              ? "border-[#d4198a] bg-[#d4198a] text-white shadow-md scale-110"
              : "border-gray-200 text-gray-500 hover:border-[#d4198a] hover:text-[#d4198a]"
          }`}
        >
          {n}
        </button>
      ))}
    </div>
  </div>
);

const QUALITY_OPTIONS = ["Excellent", "Good", "Fair", "Poor"] as const;
type Quality = (typeof QUALITY_OPTIONS)[number];

const QualityRow = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3 border-b border-gray-100 last:border-0">
    <span className="text-sm font-medium text-gray-700 sm:w-44">{label}</span>
    <div className="flex gap-2 flex-wrap">
      {QUALITY_OPTIONS.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150 ${
            value === opt
              ? "bg-[#d4198a] border-[#d4198a] text-white shadow"
              : "border-gray-200 text-gray-500 hover:border-[#d4198a] hover:text-[#d4198a]"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  </div>
);

const TextArea = ({
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) => (
  <textarea
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    rows={rows}
    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#d4198a] focus:ring-2 focus:ring-[#d4198a]/20 resize-none transition"
  />
);

const TextInput = ({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) => (
  <input
    type="text"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#d4198a] focus:ring-2 focus:ring-[#d4198a]/20 transition"
  />
);

// ── main page ─────────────────────────────────────────────────────────────────

const blankForm = (): Omit<EvaluationResponse, "id" | "submittedAt"> => ({
  q1_content_relevant: null,
  q2_speaker_quality: null,
  q3_positive_environment: null,
  q4_well_organized: null,
  q5_learned_something: null,
  q6_best_session: "",
  q7_needs_improvement: "",
  r1_venue: "",
  r2_food: "",
  r3_networking: "",
  r4_coordination: "",
  q9_topics: "",
  q10_recommend: "",
  q11_one_word: "",
  q12_comments: "",
});

const Evaluation = () => {
  const [form, setForm] = useState(blankForm());
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const missing =
      !form.q1_content_relevant ||
      !form.q2_speaker_quality ||
      !form.q3_positive_environment ||
      !form.q4_well_organized ||
      !form.q5_learned_something ||
      !form.q10_recommend;

    if (missing) {
      setError(
        "Please answer all required questions (ratings in Part 1 and recommendation in Part 3)."
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setError("");
    setSubmitting(true);

    const { error: dbError } = await supabase.from("evaluations").insert([{
      q1_content_relevant: form.q1_content_relevant,
      q2_speaker_quality: form.q2_speaker_quality,
      q3_positive_environment: form.q3_positive_environment,
      q4_well_organized: form.q4_well_organized,
      q5_learned_something: form.q5_learned_something,
      q6_best_session: form.q6_best_session || null,
      q7_needs_improvement: form.q7_needs_improvement || null,
      r1_venue: form.r1_venue || null,
      r2_food: form.r2_food || null,
      r3_networking: form.r3_networking || null,
      r4_coordination: form.r4_coordination || null,
      q9_topics: form.q9_topics || null,
      q10_recommend: form.q10_recommend,
      q11_one_word: form.q11_one_word || null,
      q12_comments: form.q12_comments || null,
    }]);

    setSubmitting(false);

    if (dbError) {
      setError("Something went wrong saving your response. Please try again.");
      console.error("Supabase insert error:", dbError);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ── thank-you screen ────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen gradient-magenta flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl px-8 py-12 text-center animate-fade-in-up">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: "linear-gradient(135deg,#d4198a,#ff33aa)" }}
          >
            <CheckCircle size={40} className="text-white" />
          </div>
          <h1 className="font-display text-3xl font-bold text-gray-900 mb-3">
            Thank You!
          </h1>
          <p className="text-gray-600 leading-relaxed mb-2">
            Your feedback has been received.
          </p>
          <p className="text-gray-500 text-sm mb-8">
            Thank you for being part of the E-Woman Community.
          </p>
          <p
            className="font-display text-lg font-bold"
            style={{ color: "#d4198a" }}
          >
            Empower · Elevate · Excel
          </p>
        </div>
      </div>
    );
  }

  // ── form ────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen gradient-magenta py-16 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10 animate-fade-in-up">
          <p className="text-white text-xs uppercase tracking-widest mb-3">
            E-Woman Conference 2026
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Evaluation Form
          </h1>
          <div className="w-16 h-1 bg-white/40 mx-auto rounded-full" />
        </div>

        {/* Intro card */}
        <div
          className="bg-white/10 border border-white/20 rounded-2xl px-6 py-5 mb-6 text-white text-sm leading-relaxed animate-fade-in-up"
          style={{ animationDelay: "0.05s" }}
        >
          <p className="font-semibold text-base mb-1">Thank You for Attending!</p>
          <p className="text-white/90">
            We hope you found the E-Woman Conference inspiring, empowering, and
            impactful. Your feedback is very important to us and will help us
            improve future conferences and better serve the amazing women in our
            community.
          </p>
          <p className="text-white/70 text-xs mt-3">
            This form is anonymous and will only be used to improve future
            E-Woman events.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-5 py-3 mb-5 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* ── PART 1 ─────────────────────────────────────────────────────── */}
          <div
            className="bg-white rounded-3xl shadow-xl px-8 py-8 animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            <SectionHeader number="1" title="Overall Conference Experience" />
            <p className="text-xs text-gray-400 mb-6">
              Rate each statement: 1 = Strongly Disagree → 5 = Strongly Agree
              &nbsp;
              <span className="text-[#d4198a] font-semibold">* Required</span>
            </p>
            <div className="space-y-7">
              <LikertRow
                label="The conference content was relevant to my personal and/or professional growth *"
                value={form.q1_content_relevant}
                onChange={(v) => set("q1_content_relevant", v)}
              />
              <LikertRow
                label="The quality of the speakers and presenters was high *"
                value={form.q2_speaker_quality}
                onChange={(v) => set("q2_speaker_quality", v)}
              />
              <LikertRow
                label="The conference created a supportive and positive environment *"
                value={form.q3_positive_environment}
                onChange={(v) => set("q3_positive_environment", v)}
              />
              <LikertRow
                label="The event was well organized and the schedule was clear *"
                value={form.q4_well_organized}
                onChange={(v) => set("q4_well_organized", v)}
              />
              <LikertRow
                label="I learned something useful that I can apply in my life *"
                value={form.q5_learned_something}
                onChange={(v) => set("q5_learned_something", v)}
              />
            </div>
          </div>

          {/* ── PART 2 ─────────────────────────────────────────────────────── */}
          <div
            className="bg-white rounded-3xl shadow-xl px-8 py-8 animate-fade-in-up"
            style={{ animationDelay: "0.15s" }}
          >
            <SectionHeader number="2" title="Sessions & Logistics" />
            <div className="space-y-7">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Which session or speaker impacted you the most?
                </label>
                <TextArea
                  value={form.q6_best_session}
                  onChange={(v) => set("q6_best_session", v)}
                  placeholder="Tell us which session or speaker stood out for you…"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Which session or part of the conference could be improved?
                </label>
                <TextArea
                  value={form.q7_needs_improvement}
                  onChange={(v) => set("q7_needs_improvement", v)}
                  placeholder="Your honest feedback helps us do better…"
                />
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-4">
                  Please rate the following:
                </p>
                <div className="bg-gray-50 rounded-2xl px-5 py-2">
                  <QualityRow
                    label="Venue & Accessibility"
                    value={form.r1_venue}
                    onChange={(v) => set("r1_venue", v)}
                  />
                  <QualityRow
                    label="Food & Refreshments"
                    value={form.r2_food}
                    onChange={(v) => set("r2_food", v)}
                  />
                  <QualityRow
                    label="Networking Opportunities"
                    value={form.r3_networking}
                    onChange={(v) => set("r3_networking", v)}
                  />
                  <QualityRow
                    label="Organization / Coordination"
                    value={form.r4_coordination}
                    onChange={(v) => set("r4_coordination", v)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── PART 3 ─────────────────────────────────────────────────────── */}
          <div
            className="bg-white rounded-3xl shadow-xl px-8 py-8 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <SectionHeader number="3" title="Future Conferences" />
            <div className="space-y-7">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What topics would you like to see at future E-Woman Conferences?
                </label>
                <TextArea
                  value={form.q9_topics}
                  onChange={(v) => set("q9_topics", v)}
                  placeholder="e.g. Leadership · Business · Marriage · Finance · Health · Ministry · Entrepreneurship…"
                  rows={3}
                />
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">
                  Would you recommend E-Woman Conference to someone else? *
                </p>
                <div className="flex gap-3 flex-wrap">
                  {["Yes", "Maybe", "No"].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => set("q10_recommend", opt)}
                      className={`px-6 py-2.5 rounded-full text-sm font-semibold border-2 transition-all duration-150 ${
                        form.q10_recommend === opt
                          ? "bg-[#d4198a] border-[#d4198a] text-white shadow-md"
                          : "border-gray-200 text-gray-600 hover:border-[#d4198a] hover:text-[#d4198a]"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  One word to describe your experience
                </label>
                <TextInput
                  value={form.q11_one_word}
                  onChange={(v) => set("q11_one_word", v)}
                  placeholder="e.g. Inspiring"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional comments or suggestions
                </label>
                <TextArea
                  value={form.q12_comments}
                  onChange={(v) => set("q12_comments", v)}
                  placeholder="Anything else you'd like to share with us…"
                  rows={4}
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div
            className="pb-8 animate-fade-in-up"
            style={{ animationDelay: "0.25s" }}
          >
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 w-full bg-white hover:bg-gray-50 text-[#d4198a] py-5 px-8 rounded-full font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100"
            >
              {submitting ? "Saving…" : "Submit My Feedback"}
              {!submitting && <ChevronRight size={20} />}
            </button>
            <p className="text-center text-white/60 text-xs mt-3">
              Anonymous · takes less than 3 minutes
            </p>
          </div>

        </form>

        {/* Footer tag */}
        <p
          className="text-center font-display text-sm font-semibold mb-8 animate-fade-in-up"
          style={{ color: "rgba(255,255,255,0.7)", animationDelay: "0.3s" }}
        >
          Empower · Elevate · Excel
        </p>

      </div>
    </div>
  );
};

export default Evaluation;
