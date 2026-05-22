/**
 * DeleteBookUseCase — permanently removes a book from the shelf.
 */

import { BookId } from "@/domain/value-objects/BookId";
import { BookNotFoundException } from "@/domain/exceptions/DomainException";
import type { IBookRepository } from "@/domain/repositories/IBookRepository";
import type { DeleteBookDto } from "@/application/dtos/BookDto";

export class DeleteBookUseCase {
  constructor(private readonly bookRepository: IBookRepository) {}

  async execute(dto: DeleteBookDto): Promise<void> {
    const id = new BookId(dto.id);
    const book = await this.bookRepository.findById(id);

    if (!book) {
      throw new BookNotFoundException(dto.id);
    }

    await this.bookRepository.delete(id);
  }
}
