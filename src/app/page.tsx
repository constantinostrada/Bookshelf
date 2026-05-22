/**
 * Root page — intentional placeholder.
 *
 * The first task ("Pantalla principal: 3 estantes con los libros") asks
 * the agent to build the real bookshelf landing here, reusing the
 * pre-built components under src/components/bookshelf/ and the use
 * cases under src/application/use-cases/.
 */
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-3 p-8 text-center">
      <span className="rounded-full border border-foreground/15 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-foreground/60">
        Daemon Connected
      </span>
      <h1 className="text-2xl font-semibold tracking-tight">
        Hello from daemon 🎉
      </h1>
      <p className="text-sm text-foreground/60">
        Preview is live. The agent will replace this when the task starts.
      </p>
    </main>
  );
}
