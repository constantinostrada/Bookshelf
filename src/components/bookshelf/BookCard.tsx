"use client";

import { BookOpen, Trash2, Edit3, BookMarked } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/bookshelf/StatusBadge";
import type { BookDto } from "@/application/dtos/BookDto";

interface BookCardProps {
  book: BookDto;
  onDelete: (id: string) => void;
  onEdit: (book: BookDto) => void;
}

export function BookCard({ book, onDelete, onEdit }: BookCardProps) {
  return (
    <Card className="flex h-full flex-col transition-shadow hover:shadow-md">
      {/* Cover placeholder */}
      <div className="flex h-40 items-center justify-center rounded-t-xl bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900">
        {book.coverUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={book.coverUrl}
            alt={`${book.title} cover`}
            className="h-full w-full rounded-t-xl object-cover"
          />
        ) : (
          <BookMarked className="h-14 w-14 text-indigo-300 dark:text-indigo-600" />
        )}
      </div>

      <CardContent className="flex flex-1 flex-col gap-2 pt-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-semibold leading-tight" title={book.title}>
              {book.title}
            </h3>
            <p className="truncate text-xs text-muted-foreground" title={book.author}>
              {book.author}
            </p>
          </div>
        </div>

        <StatusBadge status={book.status} />

        <p className="font-mono text-xs text-muted-foreground">ISBN: {book.isbn}</p>

        {book.notes && (
          <p className="line-clamp-2 text-xs italic text-muted-foreground">"{book.notes}"</p>
        )}
      </CardContent>

      <CardFooter className="gap-2 pt-2">
        <Button variant="outline" size="sm" className="flex-1" onClick={() => onEdit(book)}>
          <Edit3 className="mr-1 h-3 w-3" />
          Edit
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
          onClick={() => onDelete(book.id)}
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </CardFooter>
    </Card>
  );
}

export function BookCardSkeleton() {
  return (
    <Card className="flex h-full flex-col animate-pulse">
      <div className="h-40 rounded-t-xl bg-muted" />
      <CardContent className="flex flex-1 flex-col gap-2 pt-4">
        <div className="h-4 w-3/4 rounded bg-muted" />
        <div className="h-3 w-1/2 rounded bg-muted" />
        <div className="h-5 w-24 rounded bg-muted" />
        <div className="h-3 w-32 rounded bg-muted" />
      </CardContent>
      <CardFooter className="gap-2 pt-2">
        <div className="h-8 flex-1 rounded bg-muted" />
        <div className="h-8 w-9 rounded bg-muted" />
      </CardFooter>
    </Card>
  );
}

export function EmptyShelf() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center gap-4 py-24 text-center">
      <BookOpen className="h-16 w-16 text-muted-foreground/40" />
      <div>
        <p className="text-lg font-medium text-muted-foreground">Your shelf is empty</p>
        <p className="text-sm text-muted-foreground/70">Add your first book to get started.</p>
      </div>
    </div>
  );
}
