/**
 * UpdateBookUseCase — updates the mutable details of a book (title, author, cover, notes).
 */

import { BookId } from "@/domain/value-objects/BookId";
import { BookNotFoundException } from "@/domain/exceptions/DomainException";
import type { IBookRepository } from "@/domain/repositories/IBookRepository";
import type { BookDto, UpdateBookDto } from "@/application/dtos/BookDto";
import { BookMapper } from "@/application/mappers/BookMapper";

export class UpdateBookUseCase {
  constructor(private readonly bookRepository: IBookRepository) {}

  async execute(dto: UpdateBookDto): Promise<BookDto> {
    const id = new BookId(dto.id);
    const book = await this.bookRepository.findById(id);

    if (!book) {
      throw new BookNotFoundException(dto.id);
    }

    book.updateDetails(
      dto.title ?? book.title,
      dto.author ?? book.author,
      dto.coverUrl !== undefined ? dto.coverUrl : book.coverUrl
    );

    if (dto.notes !== undefined) {
      book.addNote(dto.notes);
    }

    await this.bookRepository.save(book);

    return BookMapper.toDto(book);
  }
}
