/**
 * BookController — thin controller helpers shared by API route handlers.
 *
 * Responsibilities:
 *  1. Parse and validate raw request input.
 *  2. Call the appropriate use case.
 *  3. Serialise the result (or error) into a NextResponse.
 *
 * NO business logic here — only input validation and response shaping.
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { container } from "@/infrastructure/di/container";
import {
  DomainException,
  BookNotFoundException,
  DuplicateISBNException,
} from "@/domain/exceptions/DomainException";
import type {
  AddBookDto,
  UpdateBookDto,
  UpdateBookStatusDto,
} from "@/application/dtos/BookDto";
import type { ReadingStatusValue } from "@/domain/value-objects/ReadingStatus";
import { READING_STATUSES } from "@/domain/value-objects/ReadingStatus";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function errorResponse(status: number, message: string): NextResponse {
  return NextResponse.json({ error: message }, { status });
}

function mapDomainError(err: unknown): NextResponse {
  if (err instanceof BookNotFoundException) {
    return errorResponse(404, err.message);
  }
  if (err instanceof DuplicateISBNException) {
    return errorResponse(409, err.message);
  }
  if (err instanceof DomainException) {
    return errorResponse(422, err.message);
  }
  if (err instanceof Error) {
    return errorResponse(400, err.message);
  }
  return errorResponse(500, "An unexpected error occurred.");
}

// ─── Handlers ────────────────────────────────────────────────────────────────

export async function handleGetAllBooks(): Promise<NextResponse> {
  try {
    const books = await container.getAllBooks().execute();
    return NextResponse.json(books);
  } catch (err) {
    return mapDomainError(err);
  }
}

export async function handleAddBook(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();
    const dto: AddBookDto = {
      title: body.title,
      author: body.author,
      isbn: body.isbn,
      status: body.status,
      coverUrl: body.coverUrl,
      notes: body.notes,
    };
    const book = await container.addBook().execute(dto);
    return NextResponse.json(book, { status: 201 });
  } catch (err) {
    return mapDomainError(err);
  }
}

export async function handleGetBookById(id: string): Promise<NextResponse> {
  try {
    const book = await container.getBookById().execute({ id });
    return NextResponse.json(book);
  } catch (err) {
    return mapDomainError(err);
  }
}

export async function handleUpdateBook(
  id: string,
  req: NextRequest
): Promise<NextResponse> {
  try {
    const body = await req.json();
    const dto: UpdateBookDto = {
      id,
      title: body.title,
      author: body.author,
      coverUrl: body.coverUrl,
      notes: body.notes,
    };
    const book = await container.updateBook().execute(dto);
    return NextResponse.json(book);
  } catch (err) {
    return mapDomainError(err);
  }
}

export async function handleUpdateBookStatus(
  id: string,
  req: NextRequest
): Promise<NextResponse> {
  try {
    const body = await req.json();
    if (!READING_STATUSES.includes(body.status)) {
      return errorResponse(
        400,
        `status must be one of: ${READING_STATUSES.join(", ")}`
      );
    }
    const dto: UpdateBookStatusDto = { id, status: body.status as ReadingStatusValue };
    const book = await container.updateBookStatus().execute(dto);
    return NextResponse.json(book);
  } catch (err) {
    return mapDomainError(err);
  }
}

export async function handleDeleteBook(id: string): Promise<NextResponse> {
  try {
    await container.deleteBook().execute({ id });
    return new NextResponse(null, { status: 204 });
  } catch (err) {
    return mapDomainError(err);
  }
}

export async function handleSearchBooks(query: string): Promise<NextResponse> {
  try {
    const books = await container.searchBooks().execute({ query });
    return NextResponse.json(books);
  } catch (err) {
    return mapDomainError(err);
  }
}

export async function handleGetShelfSummary(): Promise<NextResponse> {
  try {
    const summary = await container.getShelfSummary().execute();
    return NextResponse.json(summary);
  } catch (err) {
    return mapDomainError(err);
  }
}
