/**
 * GetAllBooksUseCase — retrieves the complete book shelf.
 */

import type { IBookRepository } from "@/domain/repositories/IBookRepository";
import type { BookDto } from "@/application/dtos/BookDto";
import { BookMapper } from "@/application/mappers/BookMapper";

export class GetAllBooksUseCase {
  constructor(private readonly bookRepository: IBookRepository) {}

  async execute(): Promise<BookDto[]> {
    const books = await this.bookRepository.findAll();
    return BookMapper.toDtoList(books);
  }
}
