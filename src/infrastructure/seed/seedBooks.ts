/**
 * seedBooks — populates an IBookRepository with sample data for development.
 *
 * Only used during local development / demo mode.
 * process.env is allowed here (infrastructure layer).
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
  {
    id: "11111111-1111-1111-1111-111111111111",
    title: "Clean Architecture",
    author: "Robert C. Martin",
    isbn: "9780134494166",
    status: "read",
    notes: "Fundamental reading for any serious software engineer.",
  },
  {
    id: "22222222-2222-2222-2222-222222222222",
    title: "Domain-Driven Design",
    author: "Eric Evans",
    isbn: "9780321125217",
    status: "reading",
    notes: "Dense but invaluable — take your time with the strategic patterns.",
  },
  {
    id: "33333333-3333-3333-3333-333333333333",
    title: "The Pragmatic Programmer",
    author: "David Thomas & Andrew Hunt",
    isbn: "9780135957059",
    status: "want-to-read",
  },
  {
    id: "44444444-4444-4444-4444-444444444444",
    title: "Refactoring",
    author: "Martin Fowler",
    isbn: "9780134757599",
    status: "read",
    notes: "Essential companion to any brownfield codebase.",
  },
  {
    id: "55555555-5555-5555-5555-555555555555",
    title: "Structure and Interpretation of Computer Programs",
    author: "Harold Abelson & Gerald Jay Sussman",
    isbn: "9780262510875",
    status: "abandoned",
    notes: "Started twice — will try again someday.",
  },
];

export async function seedBooks(repository: IBookRepository): Promise<void> {
  for (const data of SEED_DATA) {
    const now = new Date();
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
