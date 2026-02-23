/**
 * AppLayout — wraps all /channels/* authenticated routes.
 * TODO: add authentication guard here (redirect to login if unauthenticated).
 */
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
