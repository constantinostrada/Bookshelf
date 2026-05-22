/**
 * IBookRepository — repository interface (port).
 *
 * Lives in domain: describes WHAT operations are needed without any
 * knowledge of HOW they are implemented (DB, in-memory, API…).
 */

import type { Book } from "@/domain/entities/Book";
import type { BookId } from "@/domain/value-objects/BookId";
import type { ReadingStatusValue } from "@/domain/value-objects/ReadingStatus";

export interface IBookRepository {
  /** Persist a new book or update an existing one. */
  save(book: Book): Promise<void>;

  /** Find a single book by its identity. Returns undefined if not found. */
  findById(id: BookId): Promise<Book | undefined>;

  /** Return every book in the shelf, newest first. */
  findAll(): Promise<Book[]>;

  /** Return books filtered by reading status. */
  findByStatus(status: ReadingStatusValue): Promise<Book[]>;

  /** Search books by title or author (case-insensitive substring). */
  search(query: string): Promise<Book[]>;

  /** Remove a book permanently. */
  delete(id: BookId): Promise<void>;
}
