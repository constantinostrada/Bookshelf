/**
 * /api/books/search?q=query
 *
 * GET — search books by title or author
 */

import type { NextRequest } from "next/server";
import { handleSearchBooks } from "@/interfaces/controllers/BookController";

export async function GET(req: NextRequest): Promise<Response> {
  const query = req.nextUrl.searchParams.get("q") ?? "";
  return handleSearchBooks(query);
}
