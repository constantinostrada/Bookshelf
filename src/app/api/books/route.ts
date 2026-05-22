/**
 * /api/books
 *
 * GET  — list all books
 * POST — add a new book
 */

import type { NextRequest } from "next/server";
import {
  handleGetAllBooks,
  handleAddBook,
} from "@/interfaces/controllers/BookController";

export async function GET(): Promise<Response> {
  return handleGetAllBooks();
}

export async function POST(req: NextRequest): Promise<Response> {
  return handleAddBook(req);
}
