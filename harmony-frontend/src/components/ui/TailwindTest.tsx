/**
 * UI Component: TailwindTest
 * Smoke-test component that exercises Marathon theme tokens and Tailwind utilities.
 * Used to verify issue #15 acceptance criteria — not intended for production use.
 */

export function TailwindTest() {
  return (
    <div className='flex min-h-screen bg-marathon-bg-tertiary font-sans'>
      <aside className='w-16 bg-marathon-bg-tertiary flex flex-col items-center py-3 gap-2'>
        <div className='w-12 h-12 rounded-full bg-marathon-accent flex items-center justify-center text-black font-bold text-lg'>
          H
        </div>
      </aside>

      {/* Channel sidebar */}
      <nav className='w-60 bg-marathon-bg-secondary flex flex-col p-2 gap-1'>
        <p className='px-2 py-1 text-xs font-semibold uppercase tracking-wide text-marathon-text-muted'>
          Text Channels
        </p>
        {['general', 'introductions', 'off-topic'].map(channel => (
          <button
            key={channel}
            type='button'
            className='flex items-center gap-1.5 px-2 py-1 rounded text-marathon-text-muted hover:bg-marathon-bg-primary hover:text-marathon-text transition-colors text-sm text-left'
          >
            <span>#</span>
            {channel}
          </button>
        ))}
      </nav>

      {/* Main content */}
      <main className='flex-1 bg-marathon-bg-primary flex flex-col'>
        <header className='h-12 border-b border-black/20 flex items-center px-4 gap-2'>
          <span className='text-marathon-text-muted'>#</span>
          <span className='font-semibold text-marathon-text'>general</span>
        </header>
        <div className='flex-1 p-4 flex flex-col gap-3'>
          {/* Swatches — verifies all Marathon color tokens */}
          <p className='text-xs uppercase tracking-wide text-marathon-text-muted mb-1'>
            Color token swatches
          </p>
          <div className='flex gap-3 flex-wrap'>
            {[
              { label: 'bg-primary', cls: 'bg-marathon-bg-primary' },
              { label: 'bg-secondary', cls: 'bg-marathon-bg-secondary' },
              { label: 'bg-tertiary', cls: 'bg-marathon-bg-tertiary' },
              { label: 'accent', cls: 'bg-marathon-accent' },
            ].map(({ label, cls }) => (
              <div key={label} className='flex flex-col items-center gap-1'>
                <div className={`w-10 h-10 rounded ${cls} border border-white/10`} />
                <span className='text-marathon-text-muted text-xs'>{label}</span>
              </div>
            ))}
          </div>

          {/* Font sample */}
          <div className='mt-4 bg-marathon-bg-secondary rounded p-3'>
            <p className='text-marathon-text font-semibold mb-1'>Font: JetBrains Mono</p>
            <p className='text-marathon-text text-sm'>
              The quick brown fox jumps over the lazy dog.
            </p>
            <p className='text-marathon-text-muted text-xs mt-1'>
              ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789
            </p>
          </div>

          {/* Accent button */}
          <button
            type='button'
            className='mt-2 self-start px-4 py-2 rounded bg-marathon-accent text-black font-medium text-sm hover:opacity-90 transition-opacity'
          >
            Accent Button
          </button>
        </div>
      </main>
    </div>
  );
}
