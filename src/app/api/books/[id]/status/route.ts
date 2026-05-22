/**
 * /api/books/[id]/status
 *
 * PATCH — update a book's reading status
 */

import type { NextRequest } from "next/server";
import { handleUpdateBookStatus } from "@/interfaces/controllers/BookController";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, { params }: RouteContext): Promise<Response> {
  const { id } = await params;
  return handleUpdateBookStatus(id, req);
}
