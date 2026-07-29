import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="text-center max-w-md space-y-6">
        <div className="space-y-2">
          <p className="font-serif text-8xl font-extrabold text-luxe-rose/30">404</p>
          <h1 className="font-serif text-3xl font-bold text-gray-900">Page Not Found</h1>
          <p className="text-sm text-gray-500">
            The page you are looking for doesn't exist or has been moved.
          </p>
        </div>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-luxe-rose text-white text-sm font-semibold hover:bg-luxe-rose-dark shadow-md transition-all"
        >
          Browse Our Collection
        </Link>
      </div>
    </div>
  );
}
