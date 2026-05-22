"use client";

import { useCallback, useEffect, useState } from "react";
import { Search, BookOpen } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/toaster";
import { BookCard, BookCardSkeleton, EmptyShelf } from "@/components/bookshelf/BookCard";
import { ShelfStats } from "@/components/bookshelf/ShelfStats";
import { AddBookDialog } from "@/components/bookshelf/AddBookDialog";
import { EditBookDialog } from "@/components/bookshelf/EditBookDialog";
import { useToast } from "@/hooks/use-toast";

import type { BookDto, ShelfSummaryDto, AddBookDto, UpdateBookDto, UpdateBookStatusDto } from "@/application/dtos/BookDto";

// ─── API helpers (interfaces layer — HTTP, not business logic) ────────────────

async function apiFetch<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: "Unknown error" }));
    throw new Error((body as { error?: string }).error ?? `HTTP ${res.status}`);
  }
  if (res.status === 204) return undefined as unknown as T;
  return res.json() as Promise<T>;
}

// ─── View component ───────────────────────────────────────────────────────────

export function BookshelfPage() {
  const { toast } = useToast();

  const [books, setBooks] = useState<BookDto[]>([]);
  const [summary, setSummary] = useState<ShelfSummaryDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [editTarget, setEditTarget] = useState<BookDto | null>(null);

  // ─── Data fetching ─────────────────────────────────────────────────────────

  const loadSummary = useCallback(async () => {
    const s = await apiFetch<ShelfSummaryDto>("/api/shelf/summary");
    setSummary(s);
  }, []);

  const loadBooks = useCallback(async (q?: string) => {
    setLoading(true);
    try {
      const url = q ? `/api/books/search?q=${encodeURIComponent(q)}` : "/api/books";
      const data = await apiFetch<BookDto[]>(url);
      setBooks(data);
      if (!q) await loadSummary();
    } finally {
      setLoading(false);
    }
  }, [loadSummary]);

  useEffect(() => {
    void loadBooks();
  }, [loadBooks]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => void loadBooks(searchQuery || undefined), 300);
    return () => clearTimeout(timer);
  }, [searchQuery, loadBooks]);

  // ─── Handlers ──────────────────────────────────────────────────────────────

  const handleAdd = async (dto: AddBookDto) => {
    await apiFetch<BookDto>("/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
    });
    toast({ title: "Book added", description: `"${dto.title}" is now on your shelf.` });
    await loadBooks(searchQuery || undefined);
  };

  const handleDelete = async (id: string) => {
    const book = books.find((b) => b.id === id);
    await apiFetch(`/api/books/${id}`, { method: "DELETE" });
    toast({
      title: "Book removed",
      description: book ? `"${book.title}" was removed from your shelf.` : undefined,
    });
    await loadBooks(searchQuery || undefined);
  };

  const handleUpdate = async (dto: UpdateBookDto) => {
    await apiFetch<BookDto>(`/api/books/${dto.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
    });
  };

  const handleUpdateStatus = async (dto: UpdateBookStatusDto) => {
    await apiFetch<BookDto>(`/api/books/${dto.id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: dto.status }),
    });
    toast({ title: "Status updated" });
    await loadBooks(searchQuery || undefined);
  };

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <BookOpen className="h-7 w-7 text-primary" />
            <h1 className="text-xl font-bold tracking-tight">Bookshelf</h1>
          </div>
          <AddBookDialog onAdd={handleAdd} />
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats */}
        {summary && <ShelfStats summary={summary} />}

        <Separator />

        {/* Search */}
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Search by title or author…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {loading ? (
            Array.from({ length: 10 }).map((_, i) => <BookCardSkeleton key={i} />)
          ) : books.length === 0 ? (
            <EmptyShelf />
          ) : (
            books.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onDelete={handleDelete}
                onEdit={(b) => setEditTarget(b)}
              />
            ))
          )}
        </div>
      </main>

      {/* Edit dialog */}
      <EditBookDialog
        book={editTarget}
        onClose={() => setEditTarget(null)}
        onUpdate={handleUpdate}
        onUpdateStatus={handleUpdateStatus}
      />

      {/* Toast notifications */}
      <Toaster />
    </div>
  );
}
