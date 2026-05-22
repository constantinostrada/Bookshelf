/**
 * /api/shelf/summary
 *
 * GET — return aggregated shelf statistics
 */

import { handleGetShelfSummary } from "@/interfaces/controllers/BookController";

export async function GET(): Promise<Response> {
  return handleGetShelfSummary();
}
