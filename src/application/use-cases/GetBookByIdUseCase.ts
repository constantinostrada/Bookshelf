/**
 * GetBookByIdUseCase — retrieves a single book by its ID.
 */

import { BookId } from "@/domain/value-objects/BookId";
import { BookNotFoundException } from "@/domain/exceptions/DomainException";
import type { IBookRepository } from "@/domain/repositories/IBookRepository";
import type { BookDto, GetBookDto } from "@/application/dtos/BookDto";
import { BookMapper } from "@/application/mappers/BookMapper";

export class GetBookByIdUseCase {
  constructor(private readonly bookRepository: IBookRepository) {}

  async execute(dto: GetBookDto): Promise<BookDto> {
    const id = new BookId(dto.id);
    const book = await this.bookRepository.findById(id);

    if (!book) {
      throw new BookNotFoundException(dto.id);
    }

    return BookMapper.toDto(book);
  }
}
