/**
 * BookShelfService — domain service for logic that spans multiple books
 * and doesn't naturally belong to a single Book entity.
 *
 * Receives dependencies via constructor (no hard-coded coupling).
 */

import type { Book } from "@/domain/entities/Book";

export interface ShelfSummary {
  total: number;
  wantToRead: number;
  reading: number;
  read: number;
  abandoned: number;
}

export class BookShelfService {
  /**
   * Compute a high-level summary of the reading shelf from a list of books.
   * This lives in the domain because it encodes business meaning —
   * e.g. what "finished" means — not just a count.
   */
  summarise(books: Book[]): ShelfSummary {
    const summary: ShelfSummary = {
      total: books.length,
      wantToRead: 0,
      reading: 0,
      read: 0,
      abandoned: 0,
    };

    for (const book of books) {
      switch (book.status.value) {
        case "want-to-read":
          summary.wantToRead++;
          break;
        case "reading":
          summary.reading++;
          break;
        case "read":
          summary.read++;
          break;
        case "abandoned":
          summary.abandoned++;
          break;
      }
    }

    return summary;
  }

  /**
   * Enforce the rule: a book may not move from "read" back to "want-to-read"
   * without being explicitly re-added.  Returns a validation message or null.
   */
  validateStatusTransition(
    current: string,
    next: string
  ): string | null {
    if (current === "read" && next === "want-to-read") {
      return 'A finished book cannot be moved back to "want-to-read". Add a new entry instead.';
    }
    return null;
  }
}
