/**
 * SearchBooksUseCase — full-text search across title and author fields.
 */

import type { IBookRepository } from "@/domain/repositories/IBookRepository";
import type { BookDto, SearchBooksDto } from "@/application/dtos/BookDto";
import { BookMapper } from "@/application/mappers/BookMapper";

export class SearchBooksUseCase {
  constructor(private readonly bookRepository: IBookRepository) {}

  async execute(dto: SearchBooksDto): Promise<BookDto[]> {
    if (!dto.query || dto.query.trim().length === 0) {
      const all = await this.bookRepository.findAll();
      return BookMapper.toDtoList(all);
    }

    const results = await this.bookRepository.search(dto.query.trim());
    return BookMapper.toDtoList(results);
  }
}
