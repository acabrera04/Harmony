/**
 * UI Component: TailwindTest
 * Smoke-test component that exercises Discord theme tokens and Tailwind utilities.
 * Used to verify issue #15 acceptance criteria — not intended for production use.
 */

export function TailwindTest() {
  return (
    <div className="flex min-h-screen bg-discord-bg-tertiary font-sans">
        <aside className="w-16 bg-discord-bg-tertiary flex flex-col items-center py-3 gap-2">
          <div className="w-12 h-12 rounded-full bg-discord-accent flex items-center justify-center text-white font-bold text-lg">
            H
          </div>
        </aside>

        {/* Channel sidebar */}
        <nav className="w-60 bg-discord-bg-secondary flex flex-col p-2 gap-1">
          <p className="px-2 py-1 text-xs font-semibold uppercase tracking-wide text-discord-text-muted">
            Text Channels
          </p>
          {["general", "introductions", "off-topic"].map((channel) => (
            <button
              key={channel}
              type="button"
              className="flex items-center gap-1.5 px-2 py-1 rounded text-discord-text-muted hover:bg-discord-bg-primary hover:text-discord-text transition-colors text-sm text-left"
            >
              <span>#</span>
              {channel}
            </button>
          ))}
        </nav>

        {/* Main content */}
        <main className="flex-1 bg-discord-bg-primary flex flex-col">
          <header className="h-12 border-b border-black/20 flex items-center px-4 gap-2">
            <span className="text-discord-text-muted">#</span>
            <span className="font-semibold text-discord-text">general</span>
          </header>
          <div className="flex-1 p-4 flex flex-col gap-3">
            {/* Swatches — verifies all Discord color tokens */}
            <p className="text-xs uppercase tracking-wide text-discord-text-muted mb-1">
              Color token swatches
            </p>
            <div className="flex gap-3 flex-wrap">
              {[
                { label: "bg-primary", cls: "bg-discord-bg-primary" },
                { label: "bg-secondary", cls: "bg-discord-bg-secondary" },
                { label: "bg-tertiary", cls: "bg-discord-bg-tertiary" },
                { label: "accent", cls: "bg-discord-accent" },
              ].map(({ label, cls }) => (
                <div key={label} className="flex flex-col items-center gap-1">
                  <div className={`w-10 h-10 rounded ${cls} border border-white/10`} />
                  <span className="text-discord-text-muted text-xs">{label}</span>
                </div>
              ))}
            </div>

            {/* Font sample */}
            <div className="mt-4 bg-discord-bg-secondary rounded p-3">
              <p className="text-discord-text font-semibold mb-1">Font: Inter</p>
              <p className="text-discord-text text-sm">
                The quick brown fox jumps over the lazy dog.
              </p>
              <p className="text-discord-text-muted text-xs mt-1">
                ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789
              </p>
            </div>

            {/* Accent button */}
            <button type="button" className="mt-2 self-start px-4 py-2 rounded bg-discord-accent text-white font-medium text-sm hover:opacity-90 transition-opacity">
              Accent Button
            </button>
          </div>
        </main>
    </div>
  );
}
