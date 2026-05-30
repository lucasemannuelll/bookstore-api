/**
 * LEVEL 1: FILE HEADER
 * FILENAME: books.controller.ts
 * PATH: src/books/books.controller.ts
 * LANGUAGE: TypeScript
 * PARADIGM: Object-Oriented, Decorator-based (NestJS)
 * PURPOSE: Handles HTTP requests related to the Book domain.
 * DEPENDENCIES: @nestjs/common, ./books.service, ./dto/create-book.dto
 * CONTEXT: Routing layer for the Book domain in the Bookstore API.
 * AUTHOR NOTES: Standard RESTful controller implementation.
 * LAST MODIFIED: 2024-05-22
 */

// ============================================================================
// LEVEL 2: SECTION DIVIDERS - IMPORTS
// ============================================================================

import { Body, Controller, Get, Post } from '@nestjs/common';

import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';

// ============================================================================
// LEVEL 2: SECTION DIVIDERS - CLASS DEFINITION
// ============================================================================

/**
 * LEVEL 3: CLASS DOCUMENTATION
 * CLASS: BooksController
 * VISIBILITY: Exported
 * WHAT: Controller responsible for handling incoming book-related HTTP requests.
 * HOW: Annotated with @Controller('books') to handle routes prefixed with /books.
 * DEPENDENCIES: BooksService is injected via the constructor for business logic execution.
 * FRAMEWORK: NestJS Controller manages the entry points for the Book domain.
 */
@Controller('books')
export class BooksController {
    /**
     * LEVEL 3: CONSTRUCTOR DOCUMENTATION
     * VISIBILITY: Public
     * WHAT: Initializes the BooksController and injects the BooksService dependency.
     * PARAMETERS:
     *   - booksService: BooksService (Private, Readonly) - The service layer for Book operations.
     * SIDE EFFECTS: Injects the BooksService instance into the class scope.
     * FRAMEWORK: NestJS Dependency Injection system automatically provides the required service.
     */
    constructor(
        // WHAT: Dependency injection of the BooksService.
        // WHY: To delegate complex business logic and database interactions.
        // HOW: The service is registered as a provider in the BooksModule.
        private readonly booksService: BooksService
    ) {}

    /**
     * LEVEL 3: METHOD DOCUMENTATION
     * METHOD: create
     * VISIBILITY: Public
     * WHAT: Creates a new book record via an HTTP POST request.
     * PARAMETERS:
     *   - createBookDto: CreateBookDto - The data object containing title, year, author, and tags.
     * RETURNS: Promise<Book> - The newly created book record.
     * CALLED BY: HTTP Client sending a POST request to /books.
     * CALLS: booksService.create(createBookDto)
     * FRAMEWORK: @Post() defines the HTTP verb; @Body() extracts the payload from the request.
     */
    @Post()
    create(
        // WHAT: Extracts the request body and validates it against the CreateBookDto schema.
        // WHY: To ensure that the incoming data meets the required structure and types.
        // FRAMEWORK: NestJS ValidationPipe performs the validation based on DTO decorators.
        @Body() createBookDto: CreateBookDto
    ) {
        // WHAT: Calls the service to process and persist the new book.
        // WHY: To maintain a clean separation between the transport layer (HTTP) and business logic.
        // HOW: Invokes the create method on the injected booksService.
        return this.booksService.create(createBookDto);
    }

    /**
     * LEVEL 3: METHOD DOCUMENTATION
     * METHOD: findAll
     * VISIBILITY: Public
     * WHAT: Retrieves all books from the database via an HTTP GET request.
     * RETURNS: Promise<Book[]> - An array containing all book records and their relations.
     * CALLED BY: HTTP Client sending a GET request to /books.
     * CALLS: booksService.findAll()
     * FRAMEWORK: @Get() decorator maps this method to the GET /books endpoint.
     */
    @Get()
    findAll() {
        // WHAT: Calls the service to fetch the complete list of books.
        // WHY: To provide the requester with a full bibliography including author and tag details.
        // HOW: Invokes the findAll method on the injected booksService instance.
        return this.booksService.findAll();
    }
}
