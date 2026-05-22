/**
 * BookMapper — converts between domain entities and application DTOs.
 * Lives in application because it needs to know both sides of the boundary.
 */

import type { Book } from "@/domain/entities/Book";
import type { BookDto } from "@/application/dtos/BookDto";

export class BookMapper {
  static toDto(book: Book): BookDto {
    return {
      id: book.id.value,
      title: book.title,
      author: book.author,
      isbn: book.isbn.value,
      status: book.status.value,
      coverUrl: book.coverUrl,
      notes: book.notes,
      addedAt: book.addedAt.toISOString(),
      updatedAt: book.updatedAt.toISOString(),
    };
  }

  static toDtoList(books: Book[]): BookDto[] {
    return books.map(BookMapper.toDto);
  }
}
