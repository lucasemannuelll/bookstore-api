/**
 * LEVEL 1: FILE HEADER
 * FILENAME: authors.controller.ts
 * PATH: src/authors/authors.controller.ts
 * LANGUAGE: TypeScript
 * PARADIGM: Object-Oriented, Decorator-based (NestJS)
 * PURPOSE: Handles HTTP requests related to the Author domain.
 * DEPENDENCIES: @nestjs/common, ./authors.service, ./dto/create-author.dto
 * CONTEXT: Routing layer for authors.
 * AUTHOR NOTES: Standard RESTful controller.
 * LAST MODIFIED: 2024-05-22
 */

// ============================================================================
// LEVEL 2: SECTION DIVIDERS - IMPORTS
// ============================================================================

import { Body, Controller, Get, Post } from '@nestjs/common';

import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';

// ============================================================================
// LEVEL 2: SECTION DIVIDERS - CLASS DEFINITION
// ============================================================================

/**
 * LEVEL 3: CLASS DOCUMENTATION
 * CLASS: AuthorsController
 * VISIBILITY: Exported
 * WHAT: Controller responsible for handling incoming author-related HTTP requests.
 * HOW: Annotated with @Controller('authors') to handle routes prefixed with /authors.
 * DEPENDENCIES: AuthorsService is injected via the constructor.
 * FRAMEWORK: NestJS Controller handles the request-response lifecycle.
 */
@Controller('authors')
export class AuthorsController {
  /**
   * LEVEL 3: CONSTRUCTOR DOCUMENTATION
   * VISIBILITY: Public
   * WHAT: Initializes the AuthorsController and injects the AuthorsService.
   * PARAMETERS:
   *   - authorsService: AuthorsService (Private, Readonly) - The service layer for authors.
   * SIDE EFFECTS: Injects AuthorsService instance into the class scope for member access.
   * FRAMEWORK: NestJS Dependency Injection system automatically resolves and provides the service.
   */
  constructor(
    // WHAT: Dependency injection of AuthorsService.
    // WHY: To delegate database operations and complex business logic to a dedicated layer.
    // HOW: NestJS looks up the AuthorsService provider in the current module's context.
    private readonly authorsService: AuthorsService
  ) {}

  /**
   * LEVEL 3: METHOD DOCUMENTATION
   * METHOD: create
   * VISIBILITY: Public
   * WHAT: Creates a new author via an HTTP POST request.
   * PARAMETERS:
   *   - createAuthorDto: CreateAuthorDto - The data object containing name and email.
   * RETURNS: Promise<Author> - The newly created and persisted author record.
   * CALLED BY: HTTP Client sending a POST request to /authors.
   * CALLS: authorsService.create(createAuthorDto)
   * FRAMEWORK: @Post() defines the HTTP verb; @Body() extracts the payload from the request.
   */
  @Post()
  create(
    // WHAT: Extracts the request body and validates it against the CreateAuthorDto schema.
    // WHY: To ensure only well-formed data reaches the service layer.
    // FRAMEWORK: NestJS ValidationPipe uses class-validator rules from the DTO.
    @Body() createAuthorDto: CreateAuthorDto
  ) {
    // WHAT: Calls the service to persist the new author record.
    // WHY: To maintain a thin controller and centralize persistence logic in the service.
    // HOW: Proxies the validated DTO to the authorsService's create method.
    return this.authorsService.create(createAuthorDto);
  }

  /**
   * LEVEL 3: METHOD DOCUMENTATION
   * METHOD: findAll
   * VISIBILITY: Public
   * WHAT: Retrieves all authors from the system via an HTTP GET request.
   * RETURNS: Promise<Author[]> - An array of all author records, including relations.
   * CALLED BY: HTTP Client sending a GET request to /authors.
   * CALLS: authorsService.findAll()
   * FRAMEWORK: @Get() decorator handles the mapping to the GET method on the /authors route.
   */
  @Get()
  findAll() {
    // WHAT: Calls the service to fetch the complete list of authors.
    // WHY: To provide the requester with a full bibliography and author list.
    // HOW: Invokes the findAll method on the injected authorsService instance.
    return this.authorsService.findAll();
  }
}
