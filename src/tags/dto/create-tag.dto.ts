/**
<<<<<<< HEAD
 * PROPÓSITO: Define formato e regras mínimas de validação para criação de tags
 * DEPENDÊNCIAS: class-validator
 * EXPORTAÇÕES: CreateTagDto
 * USO: Consumido pelo ValidationPipe antes da execução dos controllers
 */

=======
 * LEVEL 1: FILE HEADER
 * FILENAME: create-tag.dto.ts
 * PATH: src/tags/dto/create-tag.dto.ts
 * LANGUAGE: TypeScript
 * PARADIGM: Object-Oriented Programming / Data Transfer Objects
 * PURPOSE: Defines the structure and validation rules for data sent when creating a new Tag entity.
 * DEPENDENCIES: class-validator (for IsNotEmpty decorator)
 * CONTEXT: Part of the Tags module, used by TagsController and TagsService.
 * AUTHOR NOTES: This DTO ensures that the 'name' field is present and valid before reaching the service layer.
 * LAST MODIFIED: 2024-05-23
 */

/**
 * LEVEL 2: SECTION DIVIDERS - IMPORTS
 * WHAT: Importing necessary decorators and libraries.
 * WHY: To enable automated validation of the incoming request body.
 * HOW: Using the standard ES6 import syntax.
 */
>>>>>>> bda22c9 (docs: add exhaustive defensive documentation to src directory)
import { IsNotEmpty } from "class-validator";

/**
 * LEVEL 2: SECTION DIVIDERS - CLASS DEFINITION
 * WHAT: Defining the CreateTagDto class.
 * WHY: To provide a type-safe and validated structure for creating tags.
 * HOW: Declaring a class with property decorators for validation.
 */

/**
 * LEVEL 3: CLASS DOCUMENTATION
 * CLASS: CreateTagDto
 * PURPOSE: A Data Transfer Object used to capture and validate tag creation data.
 * INVARIANTS: The 'name' property must not be empty.
 */
export class CreateTagDto {
    /**
     * LEVEL 4: INLINE COMMENTS
     * WHAT: The 'name' property of the tag.
     * WHY: Tags need a unique or identifying name to be useful for categorization.
     * HOW: Defined as a string property with the @IsNotEmpty() decorator to ensure it's provided in the request.
     */
    @IsNotEmpty()
    // Impede persistência de tags vazias durante validação da requisição
    name!: string;
}
