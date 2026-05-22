/**
 * seedBooks — populates an IBookRepository with sample data for development.
 *
 * Provides at least three books per visible shelf column (To Read / Reading /
 * Read) so the landing screen never looks empty.
 */

import { Book } from "@/domain/entities/Book";
import { BookId } from "@/domain/value-objects/BookId";
import { ISBN } from "@/domain/value-objects/ISBN";
import { ReadingStatus } from "@/domain/value-objects/ReadingStatus";
import type { IBookRepository } from "@/domain/repositories/IBookRepository";

const SEED_DATA: Array<{
  id: string;
  title: string;
  author: string;
  isbn: string;
  status: "want-to-read" | "reading" | "read" | "abandoned";
  coverUrl?: string;
  notes?: string;
}> = [
  // ─── Want to Read ────────────────────────────────────────────────────────
  {
    id: "11111111-1111-1111-1111-111111111111",
    title: "The Pragmatic Programmer",
    author: "David Thomas & Andrew Hunt",
    isbn: "9780135957059",
    status: "want-to-read",
    notes: "Recommended by half the team — finally getting around to it.",
  },
  {
    id: "11111111-1111-1111-1111-111111111112",
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    isbn: "9781449373320",
    status: "want-to-read",
    notes: "The book everyone calls 'the boar book'.",
  },
  {
    id: "11111111-1111-1111-1111-111111111113",
    title: "Crime and Punishment",
    author: "Fyodor Dostoevsky",
    isbn: "9780486415871",
    status: "want-to-read",
  },

  // ─── Reading ─────────────────────────────────────────────────────────────
  {
    id: "22222222-2222-2222-2222-222222222221",
    title: "Domain-Driven Design",
    author: "Eric Evans",
    isbn: "9780321125217",
    status: "reading",
    notes: "Dense but invaluable — take your time with the strategic patterns.",
  },
  {
    id: "22222222-2222-2222-2222-222222222222",
    title: "The Mythical Man-Month",
    author: "Frederick P. Brooks Jr.",
    isbn: "9780201835953",
    status: "reading",
    notes: "Still relevant 50 years later.",
  },
  {
    id: "22222222-2222-2222-2222-222222222223",
    title: "Atomic Habits",
    author: "James Clear",
    isbn: "9780735211292",
    status: "reading",
  },

  // ─── Read ────────────────────────────────────────────────────────────────
  {
    id: "33333333-3333-3333-3333-333333333331",
    title: "Clean Architecture",
    author: "Robert C. Martin",
    isbn: "9780134494166",
    status: "read",
    notes: "Fundamental reading for any serious software engineer.",
  },
  {
    id: "33333333-3333-3333-3333-333333333332",
    title: "Refactoring",
    author: "Martin Fowler",
    isbn: "9780134757599",
    status: "read",
    notes: "Essential companion to any brownfield codebase.",
  },
  {
    id: "33333333-3333-3333-3333-333333333333",
    title: "The Phoenix Project",
    author: "Gene Kim, Kevin Behr, George Spafford",
    isbn: "9781942788294",
    status: "read",
    notes: "A novel about DevOps — surprisingly gripping.",
  },
];

export async function seedBooks(repository: IBookRepository): Promise<void> {
  const now = new Date();
  for (const data of SEED_DATA) {
    const book = new Book({
      id: new BookId(data.id),
      title: data.title,
      author: data.author,
      isbn: new ISBN(data.isbn),
      status: new ReadingStatus(data.status),
      coverUrl: data.coverUrl,
      notes: data.notes,
      addedAt: now,
      updatedAt: now,
    });
    await repository.save(book);
  }
}
