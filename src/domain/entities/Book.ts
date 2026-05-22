/**
 * Book — core domain entity.
 *
 * Protects its own invariants inside the constructor.
 * No framework dependencies, no ORM annotations.
 */

import { BookId } from "@/domain/value-objects/BookId";
import { ISBN } from "@/domain/value-objects/ISBN";
import { ReadingStatus } from "@/domain/value-objects/ReadingStatus";

export interface BookProps {
  id: BookId;
  title: string;
  author: string;
  isbn: ISBN;
  status: ReadingStatus;
  coverUrl?: string;
  notes?: string;
  addedAt: Date;
  updatedAt: Date;
}

export class Book {
  private readonly _id: BookId;
  private _title: string;
  private _author: string;
  private _isbn: ISBN;
  private _status: ReadingStatus;
  private _coverUrl: string | undefined;
  private _notes: string | undefined;
  private readonly _addedAt: Date;
  private _updatedAt: Date;

  constructor(props: BookProps) {
    Book.assertNonEmptyString(props.title, "title");
    Book.assertNonEmptyString(props.author, "author");

    this._id = props.id;
    this._title = props.title.trim();
    this._author = props.author.trim();
    this._isbn = props.isbn;
    this._status = props.status;
    this._coverUrl = props.coverUrl;
    this._notes = props.notes;
    this._addedAt = props.addedAt;
    this._updatedAt = props.updatedAt;
  }

  // ─── Getters ────────────────────────────────────────────────────────────

  get id(): BookId {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get author(): string {
    return this._author;
  }

  get isbn(): ISBN {
    return this._isbn;
  }

  get status(): ReadingStatus {
    return this._status;
  }

  get coverUrl(): string | undefined {
    return this._coverUrl;
  }

  get notes(): string | undefined {
    return this._notes;
  }

  get addedAt(): Date {
    return this._addedAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  // ─── Behaviour ──────────────────────────────────────────────────────────

  updateDetails(title: string, author: string, coverUrl?: string): void {
    Book.assertNonEmptyString(title, "title");
    Book.assertNonEmptyString(author, "author");
    this._title = title.trim();
    this._author = author.trim();
    this._coverUrl = coverUrl;
    this._updatedAt = new Date();
  }

  updateStatus(status: ReadingStatus): void {
    this._status = status;
    this._updatedAt = new Date();
  }

  addNote(notes: string): void {
    this._notes = notes;
    this._updatedAt = new Date();
  }

  // ─── Invariant helpers ───────────────────────────────────────────────────

  private static assertNonEmptyString(value: string, field: string): void {
    if (!value || value.trim().length === 0) {
      throw new Error(`Book.${field} must not be empty.`);
    }
  }
}
