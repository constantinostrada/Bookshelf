/**
 * BookId — strongly-typed identity value object.
 *
 * Wraps a raw string UUID so the type system prevents mixing IDs
 * from different entities (e.g. BookId vs UserId).
 */
export class BookId {
  private readonly _value: string;

  constructor(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error("BookId must not be empty.");
    }
    this._value = value.trim();
  }

  get value(): string {
    return this._value;
  }

  equals(other: BookId): boolean {
    return this._value === other._value;
  }

  toString(): string {
    return this._value;
  }
}
