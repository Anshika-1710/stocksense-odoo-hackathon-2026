export default function KpiCard({ label, value, tone = "default" }) {
  const toneClasses =
    tone === "alert" ? "text-signal" : tone === "success" ? "text-moss" : "text-ink";
  return (
    <div className="bg-white rounded-lg border border-black/5 px-5 py-4">
      <p className="text-xs uppercase tracking-wide text-slate/70">{label}</p>
      <p className={`text-3xl font-semibold mt-2 ${toneClasses}`}>{value}</p>
    </div>
  );
}
