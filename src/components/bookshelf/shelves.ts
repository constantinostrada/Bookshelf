/**
 * Shelf column configuration — the three reading-life sections that appear
 * side by side on the bookshelf landing page.
 *
 * `abandoned` is intentionally NOT a column here: the landing view focuses on
 * the active reading lifecycle. Abandoned books are still stored in the
 * repository but live outside this view.
 */

import type { ReadingStatusValue } from "@/domain/value-objects/ReadingStatus";

export interface ShelfColumnConfig {
  status: ReadingStatusValue;
  label: string;
  emoji: string;
  accent: string;
  description: string;
}

export const SHELF_COLUMNS: readonly ShelfColumnConfig[] = [
  {
    status: "want-to-read",
    label: "To Read",
    emoji: "📚",
    accent:
      "from-amber-50 to-amber-100/60 dark:from-amber-950/50 dark:to-amber-900/30",
    description: "Books on your wishlist, ready when you are.",
  },
  {
    status: "reading",
    label: "Reading",
    emoji: "📖",
    accent:
      "from-blue-50 to-indigo-100/60 dark:from-blue-950/50 dark:to-indigo-900/30",
    description: "What you're working through right now.",
  },
  {
    status: "read",
    label: "Read",
    emoji: "✅",
    accent:
      "from-emerald-50 to-emerald-100/60 dark:from-emerald-950/50 dark:to-emerald-900/30",
    description: "Books you've finished. Worth remembering.",
  },
] as const;
