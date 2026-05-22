import type { Config } from "tailwindcss";

/**
 * Tailwind 4 doesn't require a config file — theme tokens live in
 * `src/app/globals.css` inside the `@theme inline` block. This file
 * exists strictly so the chiron-daemon's `tailwind-upfront` setup
 * recipe finds it during detect and skips (otherwise it auto-writes
 * a Tailwind 3 style config that breaks the build).
 *
 * Add Tailwind 4 specific options here if needed.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
};

export default config;
