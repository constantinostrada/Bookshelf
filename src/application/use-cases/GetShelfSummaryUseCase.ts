/**
 * GetShelfSummaryUseCase — returns an aggregated summary of the reading shelf.
 * Delegates summarisation logic to the BookShelfService domain service.
 */

import { BookShelfService } from "@/domain/services/BookShelfService";
import type { IBookRepository } from "@/domain/repositories/IBookRepository";
import type { ShelfSummaryDto } from "@/application/dtos/BookDto";

export class GetShelfSummaryUseCase {
  private readonly shelfService = new BookShelfService();

  constructor(private readonly bookRepository: IBookRepository) {}

  async execute(): Promise<ShelfSummaryDto> {
    const books = await this.bookRepository.findAll();
    return this.shelfService.summarise(books);
  }
}
