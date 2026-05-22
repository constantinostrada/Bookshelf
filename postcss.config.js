/**
 * PostCSS configuration — Tailwind 4 syntax.
 *
 * We ship this as `.js` (CommonJS) rather than `.mjs` so the
 * chiron-daemon's `tailwind-upfront` setup recipe sees `postcss.config.js`
 * during its detect phase and skips — the recipe is hardcoded to write a
 * Tailwind 3 style config when none is present, which would otherwise
 * conflict with our Tailwind 4 setup. Twin file `tailwind.config.ts` is
 * present for the same reason: both must exist for the recipe to skip.
 */
module.exports = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
