export default function Section({ title, children }) {
  return (
    <div className="rounded-2xl border border-pink-100 bg-pink-50/30 p-5 space-y-4">
      <p className="text-xs font-bold uppercase tracking-widest text-luxe-rose">
        {title}
      </p>
      {children}
    </div>
  );
}
