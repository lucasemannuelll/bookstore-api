/**
 * LEVEL 1: FILE HEADER
 * FILENAME: create-author.dto.ts
 * PATH: src/authors/dto/create-author.dto.ts
 * LANGUAGE: TypeScript
 * PARADIGM: Data Transfer Object (DTO)
 * PURPOSE: Validates and structures data for creating a new author.
 * DEPENDENCIES: class-validator
 * CONTEXT: Used by AuthorsController to validate incoming request bodies.
 * AUTHOR NOTES: Uses class-validator decorators for automatic validation.
 * LAST MODIFIED: 2024-05-22
 */

// ============================================================================
// LEVEL 2: SECTION DIVIDERS - IMPORTS
// ============================================================================

import { IsEmail, IsNotEmpty } from 'class-validator';

// ============================================================================
// LEVEL 2: SECTION DIVIDERS - DTO DEFINITION
// ============================================================================

/**
 * LEVEL 3: CLASS DOCUMENTATION
 * CLASS: CreateAuthorDto
 * VISIBILITY: Exported
 * WHAT: Schema for creating an author record.
 * HOW: Decorators enforce validation rules at runtime during request processing.
 * FRAMEWORK: NestJS uses ValidationPipe to process these decorators.
 */
export class CreateAuthorDto {
  /**
   * LEVEL 3: PROPERTY DOCUMENTATION
   * PROPERTY: name
   * WHAT: The author's full name.
   * HOW: Must be a non-empty string.
   * WHY: An author must have an identifiable name.
   * FRAMEWORK: @IsNotEmpty() ensures the field is present and not an empty string.
   */
  @IsNotEmpty()
  name: string;

  /**
   * LEVEL 3: PROPERTY DOCUMENTATION
   * PROPERTY: email
   * WHAT: The author's email address.
   * HOW: Must be a valid email format (e.g., user@example.com).
   * WHY: For unique identification and communication.
   * FRAMEWORK: @IsEmail() performs regex-based email validation.
   */
  @IsEmail()
  email: string;
}
