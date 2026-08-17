/**
 * Colour-coded order/withdraw status badge used inside every table.
 */
const TONES = {
  delivered: "bg-success-50 text-success-700 ring-success-500/20",
  succeeded: "bg-success-50 text-success-700 ring-success-500/20",
  approved: "bg-success-50 text-success-700 ring-success-500/20",
  processing: "bg-brand-50 text-brand-700 ring-brand-500/20",
  "processing refund": "bg-accent-50 text-accent-700 ring-accent-500/20",
  "refund success": "bg-success-50 text-success-700 ring-success-500/20",
  shipping: "bg-brand-50 text-brand-700 ring-brand-500/20",
  received: "bg-brand-50 text-brand-700 ring-brand-500/20",
  "on the way": "bg-accent-50 text-accent-700 ring-accent-500/20",
  "transferred to delivery partner":
    "bg-accent-50 text-accent-700 ring-accent-500/20",
  processingrefund: "bg-accent-50 text-accent-700 ring-accent-500/20",
};

function StatusPill({ status }) {
  const key = String(status || "").toLowerCase();
  const tone = TONES[key] || "bg-ink-100 text-ink-600 ring-ink-300/30";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-semibold ring-1 ring-inset ${tone}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {status || "—"}
    </span>
  );
}

export default StatusPill;
