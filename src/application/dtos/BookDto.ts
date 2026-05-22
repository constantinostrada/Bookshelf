/**
 * DTOs — plain data contracts that cross the application boundary.
 * No domain objects leak out; use cases return these instead.
 */

import type { ReadingStatusValue } from "@/domain/value-objects/ReadingStatus";

// ─── Output DTOs ─────────────────────────────────────────────────────────────

export interface BookDto {
  id: string;
  title: string;
  author: string;
  isbn: string;
  status: ReadingStatusValue;
  coverUrl?: string;
  notes?: string;
  addedAt: string; // ISO-8601 string — safe for JSON serialisation
  updatedAt: string;
}

export interface ShelfSummaryDto {
  total: number;
  wantToRead: number;
  reading: number;
  read: number;
  abandoned: number;
}

// ─── Input DTOs ──────────────────────────────────────────────────────────────

export interface AddBookDto {
  title: string;
  author: string;
  isbn: string;
  status?: ReadingStatusValue;
  coverUrl?: string;
  notes?: string;
}

export interface UpdateBookDto {
  id: string;
  title?: string;
  author?: string;
  coverUrl?: string;
  notes?: string;
}

export interface UpdateBookStatusDto {
  id: string;
  status: ReadingStatusValue;
}

export interface DeleteBookDto {
  id: string;
}

export interface GetBookDto {
  id: string;
}

export interface SearchBooksDto {
  query: string;
}

export interface GetBooksByStatusDto {
  status: ReadingStatusValue;
}
