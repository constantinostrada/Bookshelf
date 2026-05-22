/**
 * container.ts — manual dependency-injection container.
 *
 * Wires infrastructure implementations to application use cases.
 * This is the ONLY place where concrete classes are referenced together.
 *
 * For a production app, replace InMemoryBookRepository with a real adapter
 * (e.g. PrismaBookRepository) here — zero other files change.
 *
 * Singleton pattern: the container is created once at module load time
 * so all Next.js route handlers share the same in-memory state across
 * requests during a single server process.
 */

import { InMemoryBookRepository } from "@/infrastructure/persistence/InMemoryBookRepository";
import { CryptoIdGenerator } from "@/infrastructure/identity/CryptoIdGenerator";
import { seedBooks } from "@/infrastructure/seed/seedBooks";

import { AddBookUseCase } from "@/application/use-cases/AddBookUseCase";
import { GetAllBooksUseCase } from "@/application/use-cases/GetAllBooksUseCase";
import { GetBookByIdUseCase } from "@/application/use-cases/GetBookByIdUseCase";
import { UpdateBookUseCase } from "@/application/use-cases/UpdateBookUseCase";
import { UpdateBookStatusUseCase } from "@/application/use-cases/UpdateBookStatusUseCase";
import { DeleteBookUseCase } from "@/application/use-cases/DeleteBookUseCase";
import { SearchBooksUseCase } from "@/application/use-cases/SearchBooksUseCase";
import { GetShelfSummaryUseCase } from "@/application/use-cases/GetShelfSummaryUseCase";

// ─── Singletons ──────────────────────────────────────────────────────────────

const bookRepository = new InMemoryBookRepository();
const idGenerator = new CryptoIdGenerator();

// Seed development data once (non-blocking; errors are swallowed intentionally)
seedBooks(bookRepository).catch(() => {
  /* seed failure must not crash the server */
});

// ─── Use case factories ───────────────────────────────────────────────────────

export const container = {
  addBook: () => new AddBookUseCase(bookRepository, idGenerator),
  getAllBooks: () => new GetAllBooksUseCase(bookRepository),
  getBookById: () => new GetBookByIdUseCase(bookRepository),
  updateBook: () => new UpdateBookUseCase(bookRepository),
  updateBookStatus: () => new UpdateBookStatusUseCase(bookRepository),
  deleteBook: () => new DeleteBookUseCase(bookRepository),
  searchBooks: () => new SearchBooksUseCase(bookRepository),
  getShelfSummary: () => new GetShelfSummaryUseCase(bookRepository),
} as const;
