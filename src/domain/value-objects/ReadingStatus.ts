/**
 * ReadingStatus — value object / enumeration for the lifecycle of a book.
 */
export const READING_STATUSES = ["want-to-read", "reading", "read", "abandoned"] as const;

export type ReadingStatusValue = (typeof READING_STATUSES)[number];

export class ReadingStatus {
  private readonly _value: ReadingStatusValue;

  constructor(value: ReadingStatusValue) {
    if (!READING_STATUSES.includes(value)) {
      throw new Error(
        `Invalid reading status "${value}". Must be one of: ${READING_STATUSES.join(", ")}.`
      );
    }
    this._value = value;
  }

  get value(): ReadingStatusValue {
    return this._value;
  }

  equals(other: ReadingStatus): boolean {
    return this._value === other._value;
  }

  isFinished(): boolean {
    return this._value === "read";
  }

  isInProgress(): boolean {
    return this._value === "reading";
  }

  toString(): string {
    return this._value;
  }

  // ─── Static factories ────────────────────────────────────────────────────

  static wantToRead(): ReadingStatus {
    return new ReadingStatus("want-to-read");
  }

  static reading(): ReadingStatus {
    return new ReadingStatus("reading");
  }

  static read(): ReadingStatus {
    return new ReadingStatus("read");
  }

  static abandoned(): ReadingStatus {
    return new ReadingStatus("abandoned");
  }
}
