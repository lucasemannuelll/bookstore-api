/**
 * LEVEL 1: FILE HEADER
 * FILENAME: authors.module.ts
 * PATH: src/authors/authors.module.ts
 * LANGUAGE: TypeScript
 * PARADIGM: Decorator-based Configuration (NestJS)
 * PURPOSE: Encapsulates all components related to authors.
 * DEPENDENCIES: @nestjs/common, @nestjs/typeorm, ./authors.controller, ./authors.service, ./entities/author.entity
 * CONTEXT: Feature module for Author domain.
 * AUTHOR NOTES: Exports AuthorsService for use in other modules (e.g., BooksModule).
 * LAST MODIFIED: 2024-05-22
 */

// ============================================================================
// LEVEL 2: SECTION DIVIDERS - IMPORTS
// ============================================================================

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { Author } from './entities/author.entity';

// ============================================================================
// LEVEL 2: SECTION DIVIDERS - MODULE DEFINITION
// ============================================================================

/**
 * LEVEL 3: CLASS DOCUMENTATION
 * CLASS: AuthorsModule
 * VISIBILITY: Exported
 * WHAT: Orchestrates author-related components including services and controllers.
 * HOW: Uses @Module() decorator to register imports, controllers, and providers.
 * FRAMEWORK: NestJS module system facilitates dependency management and encapsulation.
 */
@Module({
  imports: [
    // WHAT: Registers the Author entity for use within this module.
    // WHY: To enable repository injection in AuthorsService using @InjectRepository(Author).
    // HOW: Calling forFeature() allows the module to 'own' this repository.
    // FRAMEWORK: TypeORM feature registration for modular entity management.
    TypeOrmModule.forFeature([Author])
  ],
  // WHAT: List of controllers instantiated by this module to handle HTTP traffic.
  controllers: [AuthorsController],
  // WHAT: List of providers (services) available for injection within this module.
  providers: [AuthorsService],
  // WHAT: List of providers to be shared with other modules that import AuthorsModule.
  // WHY: Allows other modules (like BooksModule) to leverage AuthorsService logic.
  exports: [AuthorsService],
})
export class AuthorsModule {}
