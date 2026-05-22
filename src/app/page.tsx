import { BookshelfPage } from "@/interfaces/views/BookshelfPage";

/**
 * Root page — delegates entirely to the BookshelfPage view component.
 * Keeping this file minimal lets us add layouts, suspense, etc. cleanly.
 */
export default function Home() {
  return <BookshelfPage />;
}
