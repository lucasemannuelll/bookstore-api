/**
 * LEVEL 1: FILE HEADER
 * FILENAME: create-profile.dto.ts
 * PATH: src/profiles/dto/create-profile.dto.ts
 * LANGUAGE: TypeScript
 * PARADIGM: Data Transfer Object (DTO)
 * PURPOSE: Validates and structures data for creating a new author profile.
 * DEPENDENCIES: class-validator
 * CONTEXT: Incoming request body validation for ProfilesController.
 * AUTHOR NOTES: Ensures that every profile is linked to a valid author ID and has a correct URL format.
 * LAST MODIFIED: 2024-05-22
 */

// ============================================================================
// LEVEL 2: SECTION DIVIDERS - IMPORTS
// ============================================================================

import { IsNotEmpty, IsNumber, IsUrl } from 'class-validator';

// ============================================================================
// LEVEL 2: SECTION DIVIDERS - DTO DEFINITION
// ============================================================================

/**
 * LEVEL 3: CLASS DOCUMENTATION
 * CLASS: CreateProfileDto
 * VISIBILITY: Exported
 * WHAT: Schema definition for creating a profile record.
 * HOW: Decorators enforce validation rules at runtime during request processing.
 * FRAMEWORK: NestJS ValidationPipe uses these rules to sanitize and validate incoming payloads.
 */
export class CreateProfileDto {
  /**
   * LEVEL 3: PROPERTY DOCUMENTATION
   * PROPERTY: biography
   * WHAT: The biographical text for the author.
   * HOW: Must be a non-empty string.
   * WHY: A profile is incomplete without at least some biographical information.
   * FRAMEWORK: @IsNotEmpty() ensures the field is not null, undefined, or an empty string.
   */
  @IsNotEmpty()
  biography: string;

  /**
   * LEVEL 3: PROPERTY DOCUMENTATION
   * PROPERTY: website
   * WHAT: The URL of the author's website.
   * HOW: Must be a valid URL format (e.g., https://example.com).
   * WHY: To provide a clickable link to the author's professional site.
   * FRAMEWORK: @IsUrl() performs regex-based URL validation.
   */
  @IsUrl()
  website: string;

  /**
   * LEVEL 3: PROPERTY DOCUMENTATION
   * PROPERTY: authorId
   * WHAT: The unique database ID of the author this profile belongs to.
   * HOW: Must be a numeric value.
   * WHY: Profiles must be linked to an existing author record via a foreign key.
   * FRAMEWORK: @IsNumber() validates the ID format.
   */
  @IsNumber()
  authorId: number;
}
