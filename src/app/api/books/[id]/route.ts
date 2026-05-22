/**
 * /api/books/[id]
 *
 * GET    — get a single book
 * PATCH  — update book details
 * DELETE — remove a book
 */

import type { NextRequest } from "next/server";
import {
  handleGetBookById,
  handleUpdateBook,
  handleDeleteBook,
} from "@/interfaces/controllers/BookController";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: RouteContext): Promise<Response> {
  const { id } = await params;
  return handleGetBookById(id);
}

export async function PATCH(req: NextRequest, { params }: RouteContext): Promise<Response> {
  const { id } = await params;
  return handleUpdateBook(id, req);
}

export async function DELETE(_req: NextRequest, { params }: RouteContext): Promise<Response> {
  const { id } = await params;
  return handleDeleteBook(id);
}
