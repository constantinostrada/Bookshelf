/**
 * ISBN — value object that validates and normalises ISBN-10 / ISBN-13 codes.
 *
 * Equality is by normalised value (hyphens stripped, uppercase).
 */
export class ISBN {
  private readonly _value: string;

  constructor(raw: string) {
    const normalised = ISBN.normalise(raw);
    if (!ISBN.isValid(normalised)) {
      throw new Error(`"${raw}" is not a valid ISBN-10 or ISBN-13.`);
    }
    this._value = normalised;
  }

  get value(): string {
    return this._value;
  }

  equals(other: ISBN): boolean {
    return this._value === other._value;
  }

  toString(): string {
    return this._value;
  }

  // ─── Private helpers ────────────────────────────────────────────────────

  private static normalise(raw: string): string {
    return raw.replace(/[-\s]/g, "").toUpperCase();
  }

  private static isValid(normalised: string): boolean {
    return ISBN.isISBN13(normalised) || ISBN.isISBN10(normalised);
  }

  private static isISBN13(s: string): boolean {
    if (!/^\d{13}$/.test(s)) return false;
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      sum += parseInt(s[i], 10) * (i % 2 === 0 ? 1 : 3);
    }
    const check = (10 - (sum % 10)) % 10;
    return check === parseInt(s[12], 10);
  }

  private static isISBN10(s: string): boolean {
    if (!/^\d{9}[\dX]$/.test(s)) return false;
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(s[i], 10) * (10 - i);
    }
    const checkChar = s[9];
    const checkVal = checkChar === "X" ? 10 : parseInt(checkChar, 10);
    return (sum + checkVal) % 11 === 0;
  }
}
