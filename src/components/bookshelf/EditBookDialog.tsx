"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { BookDto, UpdateBookDto, UpdateBookStatusDto } from "@/application/dtos/BookDto";
import type { ReadingStatusValue } from "@/domain/value-objects/ReadingStatus";

interface EditBookDialogProps {
  book: BookDto | null;
  onClose: () => void;
  onUpdate: (dto: UpdateBookDto) => Promise<void>;
  onUpdateStatus: (dto: UpdateBookStatusDto) => Promise<void>;
}

export function EditBookDialog({ book, onClose, onUpdate, onUpdateStatus }: EditBookDialogProps) {
  const [form, setForm] = useState({ title: "", author: "", coverUrl: "", notes: "" });
  const [status, setStatus] = useState<ReadingStatusValue>("want-to-read");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (book) {
      setForm({
        title: book.title,
        author: book.author,
        coverUrl: book.coverUrl ?? "",
        notes: book.notes ?? "",
      });
      setStatus(book.status);
      setError(null);
    }
  }, [book]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!book) return;
    setError(null);
    setSubmitting(true);
    try {
      await onUpdate({
        id: book.id,
        title: form.title,
        author: form.author,
        coverUrl: form.coverUrl || undefined,
        notes: form.notes || undefined,
      });
      if (status !== book.status) {
        await onUpdateStatus({ id: book.id, status });
      }
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update book.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={!!book} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit book</DialogTitle>
          <DialogDescription>Update the details for this book.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-1.5">
            <Label htmlFor="edit-title">Title *</Label>
            <Input
              id="edit-title"
              required
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="edit-author">Author *</Label>
            <Input
              id="edit-author"
              required
              value={form.author}
              onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
            />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="edit-status">Status</Label>
            <Select
              value={status}
              onValueChange={(v) => setStatus(v as ReadingStatusValue)}
            >
              <SelectTrigger id="edit-status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="want-to-read">Want to Read</SelectItem>
                <SelectItem value="reading">Reading</SelectItem>
                <SelectItem value="read">Read</SelectItem>
                <SelectItem value="abandoned">Abandoned</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="edit-coverUrl">Cover URL (optional)</Label>
            <Input
              id="edit-coverUrl"
              type="url"
              value={form.coverUrl}
              onChange={(e) => setForm((f) => ({ ...f, coverUrl: e.target.value }))}
            />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="edit-notes">Notes (optional)</Label>
            <Input
              id="edit-notes"
              value={form.notes}
              onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Saving…" : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
