import { BookMarked } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { BookDto } from "@/application/dtos/BookDto";
import type { ShelfColumnConfig } from "@/components/bookshelf/shelves";

interface ShelfColumnProps {
  config: ShelfColumnConfig;
  books: BookDto[];
}

export function ShelfColumn({ config, books }: ShelfColumnProps) {
  return (
    <section
      aria-label={`${config.label} shelf`}
      data-shelf={config.status}
      className="flex flex-col rounded-2xl border border-border/60 bg-card/40 p-5 shadow-sm backdrop-blur-sm"
    >
      <header className="mb-5 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${config.accent} text-2xl shadow-inner`}
          >
            {config.emoji}
          </span>
          <div>
            <h2 className="text-lg font-semibold leading-tight tracking-tight">
              {config.label}
            </h2>
            <p className="text-xs text-muted-foreground">{config.description}</p>
          </div>
        </div>
        <span
          aria-label={`${books.length} books`}
          className="inline-flex h-7 min-w-[2rem] items-center justify-center rounded-full border border-border/60 bg-background px-2 text-sm font-semibold tabular-nums text-foreground/80"
        >
          {books.length}
        </span>
      </header>

      <ul className="flex flex-1 flex-col gap-3">
        {books.length === 0 ? (
          <li className="rounded-xl border border-dashed border-border/60 bg-background/40 p-6 text-center text-sm text-muted-foreground">
            No books here yet.
          </li>
        ) : (
          books.map((book) => (
            <li key={book.id}>
              <Card className="transition-shadow hover:shadow-md">
                <CardContent className="flex items-start gap-3 p-4">
                  <span
                    aria-hidden="true"
                    className={`flex h-12 w-9 flex-shrink-0 items-center justify-center rounded-md bg-gradient-to-br ${config.accent} shadow-inner`}
                  >
                    <BookMarked className="h-4 w-4 text-foreground/40" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3
                      className="truncate text-sm font-semibold leading-tight text-foreground"
                      title={book.title}
                    >
                      {book.title}
                    </h3>
                    <p
                      className="truncate text-xs text-muted-foreground"
                      title={book.author}
                    >
                      {book.author}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}
