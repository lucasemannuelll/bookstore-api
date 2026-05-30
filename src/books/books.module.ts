/**
 * LEVEL 1: FILE HEADER
 * FILENAME: books.module.ts
 * PATH: src/books/books.module.ts
 * LANGUAGE: TypeScript
 * PARADIGM: Decorator-based Configuration (NestJS)
 * PURPOSE: Encapsulates all components related to books.
 * DEPENDENCIES: @nestjs/common, @nestjs/typeorm, ./books.controller, ./books.service, ./entities/book.entity, ../authors/entities/author.entity, ../tags/entities/tag.entity
 * CONTEXT: Feature module for the Book domain.
 * AUTHOR NOTES: Integrates multiple entities (Book, Author, Tag) for complex service logic.
 * LAST MODIFIED: 2024-05-22
 */

// ============================================================================
// LEVEL 2: SECTION DIVIDERS - IMPORTS
// ============================================================================

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BooksService } from './books.service';
import { BooksController } from './books.controller';

import { Book } from './entities/book.entity';
import { Author } from '../authors/entities/author.entity';
import { Tag } from '../tags/entities/tag.entity'

// ============================================================================
// LEVEL 2: SECTION DIVIDERS - MODULE DEFINITION
// ============================================================================

/**
 * LEVEL 3: CLASS DOCUMENTATION
 * CLASS: BooksModule
 * VISIBILITY: Exported
 * WHAT: Orchestrates book-related components including services and controllers.
 * HOW: Registers imports, controllers, and providers using the @Module() decorator.
 * FRAMEWORK: NestJS module system facilitates encapsulation and dependency management.
 */
@Module({
  imports: [
    // WHAT: Registers entities for TypeORM repository injection in this module.
    // WHY: BooksService needs access to Book, Author, and Tag repositories to perform its tasks.
    // HOW: Calling forFeature() makes these repositories available for injection within this module scope.
    // FRAMEWORK: TypeORM integration for scoped repository access.
    TypeOrmModule.forFeature([Book, Author, Tag])
  ],
  // WHAT: List of controllers instantiated to handle HTTP traffic for the /books route.
  controllers: [BooksController],
  // WHAT: List of providers containing the business logic for the Book domain.
  providers: [BooksService],
})
export class BooksModule {}
