/**
 * InMemoryBookRepository — in-memory implementation of IBookRepository.
 *
 * Perfect for development and tests. Swap for a real DB adapter in production
 * without touching any domain or application code.
 */

import type { Book } from "@/domain/entities/Book";
import type { BookId } from "@/domain/value-objects/BookId";
import type { ReadingStatusValue } from "@/domain/value-objects/ReadingStatus";
import type { IBookRepository } from "@/domain/repositories/IBookRepository";

export class InMemoryBookRepository implements IBookRepository {
  private readonly store = new Map<string, Book>();

  async save(book: Book): Promise<void> {
    this.store.set(book.id.value, book);
  }

  async findById(id: BookId): Promise<Book | undefined> {
    return this.store.get(id.value);
  }

  async findAll(): Promise<Book[]> {
    return [...this.store.values()].sort(
      (a, b) => b.addedAt.getTime() - a.addedAt.getTime()
    );
  }

  async findByStatus(status: ReadingStatusValue): Promise<Book[]> {
    return [...this.store.values()].filter((b) => b.status.value === status);
  }

  async search(query: string): Promise<Book[]> {
    const lower = query.toLowerCase();
    return [...this.store.values()].filter(
      (b) =>
        b.title.toLowerCase().includes(lower) ||
        b.author.toLowerCase().includes(lower)
    );
  }

  async delete(id: BookId): Promise<void> {
    this.store.delete(id.value);
  }

  /** Utility for seeding tests — not part of the interface contract. */
  clear(): void {
    this.store.clear();
  }
}
