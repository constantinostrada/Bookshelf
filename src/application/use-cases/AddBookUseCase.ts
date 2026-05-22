/**
 * AddBookUseCase — adds a new book to the reading shelf.
 *
 * Depends only on domain abstractions; knows nothing about databases or HTTP.
 */

import { Book } from "@/domain/entities/Book";
import { BookId } from "@/domain/value-objects/BookId";
import { ISBN } from "@/domain/value-objects/ISBN";
import { ReadingStatus } from "@/domain/value-objects/ReadingStatus";
import { DuplicateISBNException } from "@/domain/exceptions/DomainException";
import type { IBookRepository } from "@/domain/repositories/IBookRepository";
import type { AddBookDto, BookDto } from "@/application/dtos/BookDto";
import { BookMapper } from "@/application/mappers/BookMapper";
import type { IIdGenerator } from "@/application/ports/IIdGenerator";

export class AddBookUseCase {
  constructor(
    private readonly bookRepository: IBookRepository,
    private readonly idGenerator: IIdGenerator
  ) {}

  async execute(dto: AddBookDto): Promise<BookDto> {
    // 1. Validate & construct value objects (domain guards fire here)
    const isbn = new ISBN(dto.isbn);

    // 2. Enforce uniqueness — no two books with the same ISBN
    const existing = await this.bookRepository.findAll();
    const duplicate = existing.find((b) => b.isbn.equals(isbn));
    if (duplicate) {
      throw new DuplicateISBNException(isbn.value);
    }

    // 3. Build entity
    const now = new Date();
    const book = new Book({
      id: new BookId(this.idGenerator.generate()),
      title: dto.title,
      author: dto.author,
      isbn,
      status: new ReadingStatus(dto.status ?? "want-to-read"),
      coverUrl: dto.coverUrl,
      notes: dto.notes,
      addedAt: now,
      updatedAt: now,
    });

    // 4. Persist
    await this.bookRepository.save(book);

    // 5. Return DTO — never the raw entity
    return BookMapper.toDto(book);
  }
}
