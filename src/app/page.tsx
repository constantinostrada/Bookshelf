import { BookOpen } from "lucide-react";

import { container } from "@/infrastructure/di/container";
import { ShelfColumn } from "@/components/bookshelf/ShelfColumn";
import { SHELF_COLUMNS } from "@/components/bookshelf/shelves";
import type { BookDto } from "@/application/dtos/BookDto";
import type { ReadingStatusValue } from "@/domain/value-objects/ReadingStatus";

export const dynamic = "force-dynamic";

function groupByStatus(books: BookDto[]): Record<ReadingStatusValue, BookDto[]> {
  const grouped: Record<ReadingStatusValue, BookDto[]> = {
    "want-to-read": [],
    reading: [],
    read: [],
    abandoned: [],
  };
  for (const book of books) {
    grouped[book.status].push(book);
  }
  return grouped;
}

export default async function Home() {
  const books = await container.getAllBooks().execute();
  const grouped = groupByStatus(books);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <header className="border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-6 py-6 lg:px-10">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <BookOpen className="h-5 w-5" />
          </span>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Bookshelf <span className="text-muted-foreground font-medium">by coco</span>
            </h1>
            <p className="text-sm text-muted-foreground">
              Your personal reading life — at a glance.
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {SHELF_COLUMNS.map((config) => (
            <ShelfColumn
              key={config.status}
              config={config}
              books={grouped[config.status]}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
