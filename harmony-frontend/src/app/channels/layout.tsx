/**
 * AppLayout — wraps all /channels/* authenticated routes.
 * Authentication guard note: the route tree currently relies on page-level auth handling.
 */
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
