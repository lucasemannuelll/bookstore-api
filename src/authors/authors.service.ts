/**
 * LEVEL 1: FILE HEADER
 * FILENAME: authors.service.ts
 * PATH: src/authors/authors.service.ts
 * LANGUAGE: TypeScript
 * PARADIGM: Object-Oriented, Provider-based (NestJS)
 * PURPOSE: Contains business logic and database interactions for authors.
 * DEPENDENCIES: @nestjs/common, @nestjs/typeorm, typeorm, ./entities/author.entity, ./dto/create-author.dto
 * CONTEXT: Service layer for authors.
 * AUTHOR NOTES: Interacts directly with TypeORM Repository.
 * LAST MODIFIED: 2024-05-22
 */

// ============================================================================
// LEVEL 2: SECTION DIVIDERS - IMPORTS
// ============================================================================

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Author } from './entities/author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';

// ============================================================================
// LEVEL 2: SECTION DIVIDERS - CLASS DEFINITION
// ============================================================================

/**
 * LEVEL 3: CLASS DOCUMENTATION
 * CLASS: AuthorsService
 * VISIBILITY: Exported
 * WHAT: Service providing methods to manage author records in the database.
 * HOW: Annotated with @Injectable() for NestJS dependency management.
 * DEPENDENCIES: Author Repository injected via constructor.
 * FRAMEWORK: Marked as a provider that can be shared and injected across the app.
 */
@Injectable()
export class AuthorsService {
  /**
   * LEVEL 3: CONSTRUCTOR DOCUMENTATION
   * VISIBILITY: Public
   * WHAT: Initializes the AuthorsService and injects the Author repository.
   * PARAMETERS:
   *   - authorRepository: Repository<Author> (Private) - TypeORM repository for authors.
   * SIDE EFFECTS: Injects Author repository instance for database operations.
   * FRAMEWORK: @InjectRepository(Author) specifies which entity repository to inject from TypeORM.
   */
  constructor(
    // WHAT: Injection of TypeORM repository for the Author entity.
    // WHY: To perform standard CRUD operations on the 'author' table.
    // HOW: The repository is provided by TypeOrmModule.forFeature([Author]).
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
  ) {}

  /**
   * LEVEL 3: METHOD DOCUMENTATION
   * METHOD: create
   * VISIBILITY: Public
   * WHAT: Persists a new author record to the database.
   * PARAMETERS:
   *   - createAuthorDto: CreateAuthorDto - Validated data for the new author.
   * RETURNS: Promise<Author> - The saved author record with its generated ID.
   * CALLS: authorRepository.create, authorRepository.save
   * SIDE EFFECTS: Inserts a new row into the 'author' table.
   */
  create(createAuthorDto: CreateAuthorDto) {
    // WHAT: Creates a new Author entity instance from the DTO.
    // WHY: To prepare the object for persistence; 'create' only instantiates, it doesn't hit the DB.
    // HOW: Uses repository's create method which maps DTO properties to entity properties.
    const author = this.authorRepository.create(createAuthorDto);

    // WHAT: Saves the Author entity instance to the database.
    // WHY: To commit the new author record to persistent storage.
    // HOW: Uses repository's save method which performs an INSERT SQL operation.
    // RETURNS: A promise that resolves to the saved entity including DB-generated fields.
    return this.authorRepository.save(author);
  }

  /**
   * LEVEL 3: METHOD DOCUMENTATION
   * METHOD: findAll
   * VISIBILITY: Public
   * WHAT: Fetches all author records from the database, including related profiles and books.
   * RETURNS: Promise<Author[]> - Array of all author records with their associated relations loaded.
   * CALLS: authorRepository.find
   * FRAMEWORK: TypeORM handles the JOINs required for the 'relations' option.
   */
  findAll() {
    // WHAT: Retrieves all records from the 'author' table.
    // WHY: To provide a comprehensive list of authors with their details for UI or API consumption.
    // HOW: Uses repository's find method with relation loading specified.
    // FRAMEWORK: TypeORM 'relations' option enables Eager Loading of associations at the query level.
    return this.authorRepository.find({
      relations: { profile: true, books: true }
    });
  }
}
