export default function Field({ label, children, className = "" }) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500">
        {label}
      </label>
      {children}
    </div>
  );
}
