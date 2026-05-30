/**
 * LEVEL 1: FILE HEADER
 * FILENAME: create-book.dto.ts
 * PATH: src/books/dto/create-book.dto.ts
 * LANGUAGE: TypeScript
 * PARADIGM: Data Transfer Object (DTO)
 * PURPOSE: Validates and structures data for creating a new book.
 * DEPENDENCIES: class-validator
 * CONTEXT: Incoming request body validation for BooksController.
 * AUTHOR NOTES: Uses strict typing and class-validator decorators.
 * LAST MODIFIED: 2024-05-22
 */

// ============================================================================
// LEVEL 2: SECTION DIVIDERS - IMPORTS
// ============================================================================

import {
    ArrayNotEmpty,
    IsArray,
    IsNotEmpty,
    IsNumber,
} from 'class-validator';

// ============================================================================
// LEVEL 2: SECTION DIVIDERS - DTO DEFINITION
// ============================================================================

/**
 * LEVEL 3: CLASS DOCUMENTATION
 * CLASS: CreateBookDto
 * VISIBILITY: Exported
 * WHAT: Schema for creating a book record.
 * HOW: Decorators enforce validation rules at runtime during request processing.
 * FRAMEWORK: NestJS ValidationPipe uses these rules to sanitize incoming payloads.
 */
export class CreateBookDto {
    /**
     * LEVEL 3: PROPERTY DOCUMENTATION
     * PROPERTY: title
     * WHAT: The title of the book.
     * HOW: Must be a non-empty string.
     * WHY: Every book must have a title for identification.
     * FRAMEWORK: @IsNotEmpty() ensures the field is not null, undefined, or empty.
     */
    @IsNotEmpty()
    title!: string;

    /**
     * LEVEL 3: PROPERTY DOCUMENTATION
     * PROPERTY: releaseYear
     * WHAT: The year the book was published.
     * HOW: Must be a numeric value.
     * WHY: To allow for chronological sorting and filtering.
     * FRAMEWORK: @IsNumber() validates that the input is a valid number.
     */
    @IsNumber()
    releaseYear!: number;

    /**
     * LEVEL 3: PROPERTY DOCUMENTATION
     * PROPERTY: authorId
     * WHAT: The database ID of the existing author.
     * HOW: Must be a numeric value corresponding to an Author record.
     * WHY: To link the new book to a creator during the creation process.
     * FRAMEWORK: @IsNumber() validates the foreign key ID format.
     */
    @IsNumber()
    authorId!: number;

    /**
     * LEVEL 3: PROPERTY DOCUMENTATION
     * PROPERTY: tagIds
     * WHAT: An array of IDs representing the tags to associate with the book.
     * HOW: Must be a non-empty array of numbers.
     * WHY: To categorize the book under one or more themes or genres.
     * FRAMEWORK: @IsArray() checks type; @ArrayNotEmpty() ensures at least one tag is provided.
     */
    @IsArray()
    @ArrayNotEmpty()
    tagIds!: number[];
}
