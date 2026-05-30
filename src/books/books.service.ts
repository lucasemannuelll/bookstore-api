/**
 * LEVEL 1: FILE HEADER
 * FILENAME: books.service.ts
 * PATH: src/books/books.service.ts
 * LANGUAGE: TypeScript
 * PARADIGM: Object-Oriented, Provider-based (NestJS)
 * PURPOSE: Contains business logic and database interactions for books.
 * DEPENDENCIES: @nestjs/common, @nestjs/typeorm, typeorm, ./entities/book.entity, ./dto/create-book.dto, ../authors/entities/author.entity, ../tags/entities/tag.entity
 * CONTEXT: Service layer for managing books and their complex associations.
 * AUTHOR NOTES: Implements validation for author existence and bulk tag association.
 * LAST MODIFIED: 2024-05-22
 */

// ============================================================================
// LEVEL 2: SECTION DIVIDERS - IMPORTS
// ============================================================================

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { In, Repository } from 'typeorm'

import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';

import { Author } from '../authors/entities/author.entity';
import { Tag } from '../tags/entities/tag.entity'

// ============================================================================
// LEVEL 2: SECTION DIVIDERS - CLASS DEFINITION
// ============================================================================

/**
 * LEVEL 3: CLASS DOCUMENTATION
 * CLASS: BooksService
 * VISIBILITY: Exported
 * WHAT: Service providing methods to manage book records and their relational integrity.
 * HOW: Annotated with @Injectable() for NestJS dependency management.
 * DEPENDENCIES: Repositories for Book, Author, and Tag are injected via the constructor.
 * FRAMEWORK: Acts as a provider within the NestJS IoC container.
 */
@Injectable()
export class BooksService {
    /**
     * LEVEL 3: CONSTRUCTOR DOCUMENTATION
     * VISIBILITY: Public
     * WHAT: Initializes the BooksService and injects the required database repositories.
     * PARAMETERS:
     *   - booksRepository: Repository<Book> (Private) - Repository for the Book entity.
     *   - authorsRepository: Repository<Author> (Private) - Repository for the Author entity.
     *   - tagsRepository: Repository<Tag> (Private) - Repository for the Tag entity.
     * SIDE EFFECTS: Injects multiple repositories into the class scope for DB operations.
     * FRAMEWORK: @InjectRepository() identifies the specific entity repository to be injected.
     */
    constructor(
        // WHAT: Injection of the Book repository.
        // WHY: To perform CRUD operations on the 'book' table.
        @InjectRepository(Book)
        private booksRepository: Repository<Book>,

        // WHAT: Injection of the Author repository.
        // WHY: Necessary to verify author existence and link them to new books.
        @InjectRepository(Author)
        private authorsRepository: Repository<Author>,

        // WHAT: Injection of the Tag repository.
        // WHY: Required to fetch and associate multiple tags with a single book.
        @InjectRepository(Tag)
        private tagsRepository: Repository<Tag>,
    ) {}

    /**
     * LEVEL 3: METHOD DOCUMENTATION
     * METHOD: create
     * VISIBILITY: Public
     * WHAT: Creates and persists a new book record with established author and tag associations.
     * PARAMETERS:
     *   - createBookDto: CreateBookDto - The validated data object for the new book.
     * RETURNS: Promise<Book> - The saved book record with populated relations.
     * THROWS: NotFoundException - If the specified authorId does not exist in the database.
     * CALLED BY: BooksController.create()
     * ALGORITHM:
     *   1. Attempt to find the author by the provided ID.
     *   2. Throw an exception if the author is missing to ensure referential integrity.
     *   3. Fetch all requested tags using a bulk ID query.
     *   4. Instantiate the Book entity and map the gathered relationships.
     *   5. Persist the complete Book entity to the database.
     */
    async create(createBookDto: CreateBookDto) {
        // WHAT: Querying the database for the author by ID.
        // WHY: To ensure the book is correctly linked to a valid creator.
        const author = await this.authorsRepository.findOneBy({
            id: createBookDto.authorId,
        });

        // WHAT: Defensive check for author existence.
        // WHY: Prevents the creation of "orphaned" books with invalid author references.
        if(!author) {
            // WHAT: Throwing a specific HTTP exception for the controller to catch.
            // HOW: Uses NestJS standard NotFoundException which results in a 404 response.
            throw new NotFoundException(`Author with ID ${createBookDto.authorId} not found`);
        }

        // WHAT: Retrieving a set of tags using the provided array of IDs.
        // WHY: To create the many-to-many associations between the book and its categories.
        // HOW: Uses TypeORM's 'In' operator for efficient bulk retrieval in a single query.
        const tags = await this.tagsRepository.find({
            where: {
                id: In(createBookDto.tagIds),
            }
        });

        // WHAT: Creating a new instance of the Book entity.
        // WHY: To prepare the object with all its properties and relations before saving.
        // HOW: Uses the repository's create() method which is synchronous and memory-only.
        const book = this.booksRepository.create({
            title: createBookDto.title,
            releaseYear: createBookDto.releaseYear,
            author,
            tags,
        });

        // WHAT: Persisting the book entity to the database.
        // WHY: To commit the new record and its relationships to persistent storage.
        // RETURNS: A promise that resolves to the saved entity including the database-generated ID.
        return this.booksRepository.save(book);
    }

    /**
     * LEVEL 3: METHOD DOCUMENTATION
     * METHOD: findAll
     * VISIBILITY: Public
     * WHAT: Retrieves all book records from the database, including their full author and tag details.
     * RETURNS: Promise<Book[]> - An array of all book records with associated relations loaded.
     * CALLED BY: BooksController.findAll()
     * FRAMEWORK: TypeORM handles the necessary SQL JOINs based on the 'relations' configuration.
     */
    findAll() {
        // WHAT: Querying the 'book' table for all records.
        // WHY: To provide a complete list of books for the API response.
        // HOW: Invokes the find() method with eager loading of 'author' and 'tags' relations.
        return this.booksRepository.find({
            relations: { author: true, tags: true }
        });
    }
}
