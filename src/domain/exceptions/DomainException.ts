/**
 * Base class for all domain-level exceptions.
 * Keeps error handling typed and distinguishable from infrastructure errors.
 */
export class DomainException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DomainException";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class BookNotFoundException extends DomainException {
  constructor(id: string) {
    super(`Book with id "${id}" was not found.`);
    this.name = "BookNotFoundException";
  }
}

export class DuplicateISBNException extends DomainException {
  constructor(isbn: string) {
    super(`A book with ISBN "${isbn}" already exists in the shelf.`);
    this.name = "DuplicateISBNException";
  }
}

export class InvalidStatusTransitionException extends DomainException {
  constructor(reason: string) {
    super(reason);
    this.name = "InvalidStatusTransitionException";
  }
}
