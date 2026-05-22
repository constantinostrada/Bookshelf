/**
 * Tests for T1 — Bookshelf landing page.
 *
 * These are content-level assertions against the source files that
 * encode each acceptance criterion. They run via Node's built-in
 * test runner (no external framework needed).
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, "..");

async function read(rel) {
  return readFile(path.join(root, rel), "utf8");
}

test("AC1: header renders the 'Bookshelf' title", async () => {
  const page = await read("src/app/page.tsx");
  assert.match(
    page,
    /<h1[^>]*>[\s\S]*?Bookshelf[\s\S]*?<\/h1>/,
    "page.tsx must contain a heading that includes 'Bookshelf'"
  );
});

test("AC2: three columns side by side — To Read, Reading, Read", async () => {
  const shelves = await read("src/components/bookshelf/shelves.ts");

  // Exactly three column configs
  const labels = [...shelves.matchAll(/label:\s*"([^"]+)"/g)].map((m) => m[1]);
  assert.deepEqual(
    labels,
    ["To Read", "Reading", "Read"],
    "shelves.ts must declare exactly To Read / Reading / Read columns"
  );

  // Page lays them out as a 3-column grid (md:grid-cols-3)
  const page = await read("src/app/page.tsx");
  assert.match(
    page,
    /md:grid-cols-3/,
    "page.tsx must arrange the columns side-by-side on md+ screens"
  );
});

test("AC3: each column has a distinctive emoji and a book count", async () => {
  const shelves = await read("src/components/bookshelf/shelves.ts");
  const emojis = [...shelves.matchAll(/emoji:\s*"([^"]+)"/g)].map((m) => m[1]);
  assert.equal(emojis.length, 3, "one emoji per column");
  assert.equal(
    new Set(emojis).size,
    3,
    "the three column emojis must be distinct"
  );

  const col = await read("src/components/bookshelf/ShelfColumn.tsx");
  assert.match(
    col,
    /\{books\.length\}/,
    "ShelfColumn renders {books.length} as the counter"
  );
});

test("AC4: each book renders as a card showing title and author", async () => {
  const col = await read("src/components/bookshelf/ShelfColumn.tsx");
  assert.match(col, /<Card[\s\S]*?\{book\.title\}/);
  assert.match(col, /\{book\.author\}/);
});

test("AC5: at least three sample books pre-loaded per visible column", async () => {
  const seed = await read("src/infrastructure/seed/seedBooks.ts");
  const counts = {
    "want-to-read": (seed.match(/status:\s*"want-to-read"/g) ?? []).length,
    reading: (seed.match(/status:\s*"reading"/g) ?? []).length,
    read: (seed.match(/status:\s*"read"/g) ?? []).length,
  };
  assert.ok(
    counts["want-to-read"] >= 3,
    `want-to-read needs ≥3 books, got ${counts["want-to-read"]}`
  );
  assert.ok(
    counts.reading >= 3,
    `reading needs ≥3 books, got ${counts.reading}`
  );
  assert.ok(counts.read >= 3, `read needs ≥3 books, got ${counts.read}`);
});

test("AC6: layout uses generous spacing, clear typography, good contrast", async () => {
  const page = await read("src/app/page.tsx");
  // Generous outer padding + grid gap on the columns
  assert.match(page, /py-(?:8|10|12|16)/, "page main has generous vertical padding");
  assert.match(page, /gap-(?:4|5|6|8)/, "grid uses a generous gap between columns");
  // Clear typography (size/weight/tracking)
  assert.match(page, /text-2xl[\s\S]*font-bold[\s\S]*tracking-tight/);
  // Theme-aware contrast (background + muted-foreground tokens)
  assert.match(page, /bg-(?:background|gradient-to-b)/);
  assert.match(page, /text-muted-foreground/);

  const col = await read("src/components/bookshelf/ShelfColumn.tsx");
  assert.match(col, /tracking-tight/);
  assert.match(col, /text-muted-foreground/);
});
