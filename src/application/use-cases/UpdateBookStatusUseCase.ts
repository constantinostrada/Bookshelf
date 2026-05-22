/**
 * UpdateBookStatusUseCase — changes the reading status of a book.
 * Delegates the transition-validity check to the domain service.
 */

import { BookId } from "@/domain/value-objects/BookId";
import { ReadingStatus } from "@/domain/value-objects/ReadingStatus";
import {
  BookNotFoundException,
  InvalidStatusTransitionException,
} from "@/domain/exceptions/DomainException";
import { BookShelfService } from "@/domain/services/BookShelfService";
import type { IBookRepository } from "@/domain/repositories/IBookRepository";
import type { BookDto, UpdateBookStatusDto } from "@/application/dtos/BookDto";
import { BookMapper } from "@/application/mappers/BookMapper";

export class UpdateBookStatusUseCase {
  private readonly shelfService = new BookShelfService();

  constructor(private readonly bookRepository: IBookRepository) {}

  async execute(dto: UpdateBookStatusDto): Promise<BookDto> {
    const id = new BookId(dto.id);
    const book = await this.bookRepository.findById(id);

    if (!book) {
      throw new BookNotFoundException(dto.id);
    }

    // Validate domain transition rules
    const error = this.shelfService.validateStatusTransition(
      book.status.value,
      dto.status
    );
    if (error) {
      throw new InvalidStatusTransitionException(error);
    }

    book.updateStatus(new ReadingStatus(dto.status));
    await this.bookRepository.save(book);

    return BookMapper.toDto(book);
  }
}
