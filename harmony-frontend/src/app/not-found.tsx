import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen items-center justify-center bg-discord-bg-primary">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-discord-accent">404</h1>
        <p className="mt-2 text-xl font-semibold text-white">Page Not Found</p>
        <p className="mt-1 text-sm text-gray-400">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded bg-discord-accent px-4 py-2 text-sm font-medium text-white hover:bg-[#4752c4] transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
