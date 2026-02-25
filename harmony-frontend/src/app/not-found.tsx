/**
 * NotFoundPage (404)
 * Rendered by Next.js App Router when notFound() is called or a route is unmatched.
 * Issue #36 — Build 404 and error pages
 */

import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-discord-bg-primary px-4 text-center">
      <p className="text-8xl font-black text-discord-accent select-none">404</p>

      <h1 className="mt-4 text-2xl font-bold text-white">
        This page doesn&apos;t exist.
      </h1>

      <p className="mt-2 max-w-sm text-sm text-discord-text-muted">
        The page you were looking for could not be found. It may have been
        moved, deleted, or the link might be wrong.
      </p>

      <Link
        href="/"
        className="mt-8 inline-block rounded bg-discord-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#4752c4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-discord-accent focus-visible:ring-offset-2 focus-visible:ring-offset-discord-bg-primary"
      >
        Take me home
      </Link>
    </div>
  );
}
