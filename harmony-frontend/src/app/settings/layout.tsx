/**
 * AppLayout for /settings/* routes.
 * Authentication guard note: the route tree currently relies on page-level auth handling.
 */
export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
