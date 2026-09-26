export default function KpiCard({ label, value, tone = "default" }) {
  const toneStyles =
    tone === "alert"
      ? "border-l-4 border-l-red-500 text-red-600"
      : tone === "success"
      ? "border-l-4 border-l-emerald-500 text-emerald-600"
      : "border-l-4 border-l-indigo-500 text-ink";

  return (
    <div
      className={`bg-white rounded-xl border border-black/5 ${toneStyles} px-5 py-4 shadow-sm hover:shadow-md transition-shadow duration-200`}
    >
      <p className="text-xs uppercase tracking-wide text-slate/70">{label}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}