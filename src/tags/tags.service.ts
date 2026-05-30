/**
<<<<<<< HEAD
 * PROPÓSITO: Centraliza regras e acesso a dados relacionados às tags
 * DEPENDÊNCIAS: Repository<Tag>, DTOs e sistema de DI do NestJS
 * EXPORTAÇÕES: TagsService
 * USO: Consumido pelo TagsController durante o ciclo de requisição HTTP
 */

=======
 * LEVEL 1: FILE HEADER
 * FILENAME: tags.service.ts
 * PATH: src/tags/tags.service.ts
 * LANGUAGE: TypeScript
 * PARADIGM: Functional / Service-Oriented
 * PURPOSE: Contains the business logic for managing tags, interacting directly with the database via TypeORM.
 * DEPENDENCIES: @nestjs/common, @nestjs/typeorm, typeorm, Tag Entity, CreateTagDto
 * CONTEXT: Acted upon by the TagsController to perform CRUD operations on tags.
 * AUTHOR NOTES: Uses the Repository pattern for database abstraction.
 * LAST MODIFIED: 2024-05-23
 */

/**
 * LEVEL 2: SECTION DIVIDERS - IMPORTS
 * WHAT: Importing decorators and types for dependency injection and database interaction.
 * WHY: To facilitate the injection of the Tag repository and provide type safety.
 * HOW: Importing from NestJS and TypeORM packages.
 */
>>>>>>> bda22c9 (docs: add exhaustive defensive documentation to src directory)
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Tag } from './entities/tag.entity';
import { CreateTagDto } from './dto/create-tag.dto';

/**
 * LEVEL 2: SECTION DIVIDERS - CLASS DEFINITION
 * WHAT: Defining the TagsService class.
 * WHY: To centralize data access logic and business rules for tags.
 * HOW: Using the @Injectable() decorator to allow it to be managed by the NestJS DI container.
 */

/**
 * LEVEL 3: CLASS DOCUMENTATION
 * CLASS: TagsService
 * PURPOSE: Provides methods to create and retrieve tags from the database.
 */
@Injectable()
// Registra a classe como provider gerenciado pelo container de DI do NestJS
export class TagsService {
    /**
     * LEVEL 4: INLINE COMMENTS
     * WHAT: Constructor for TagsService.
     * WHY: To inject the Tag repository into the service.
     * HOW: Using the @InjectRepository(Tag) decorator to inject the TypeORM Repository for the Tag entity.
     */
    constructor(
        @InjectRepository(Tag)
        // Injeta repositório já vinculado à conexão ativa e à entidade Tag
        private tagsRepository: Repository<Tag>,
    ) {}

    /**
     * LEVEL 3: METHOD DOCUMENTATION
     * METHOD: create
     * PURPOSE: Creates and persists a new tag in the database.
     * PARAMETERS: createTagDto (CreateTagDto) - The data for the new tag.
     * RETURNS: Promise<Tag> - The newly created tag entity.
     */
    create(createTagDto: CreateTagDto) {
<<<<<<< HEAD
        // Converte o DTO em instância de entidade antes dos hooks e persistência do TypeORM
        const tag = this.tagsRepository.create(createTagDto)

        // Aguarda persistência para garantir geração de campos automáticos e sincronização com o banco
=======
        /**
         * LEVEL 4: INLINE COMMENTS
         * WHAT: Creating a tag instance.
         * WHY: To transform the DTO data into an entity instance ready for saving.
         * HOW: Calling this.tagsRepository.create() with the DTO data.
         */
        const tag = this.tagsRepository.create(createTagDto)

        /**
         * LEVEL 4: INLINE COMMENTS
         * WHAT: Saving the tag to the database.
         * WHY: To persist the new record in the 'tag' table.
         * HOW: Calling this.tagsRepository.save() and returning the resulting Promise.
         */
>>>>>>> bda22c9 (docs: add exhaustive defensive documentation to src directory)
        return this.tagsRepository.save(tag);
    }

    /**
     * LEVEL 3: METHOD DOCUMENTATION
     * METHOD: findAll
     * PURPOSE: Retrieves all tags from the database along with their associated books.
     * RETURNS: Promise<Tag[]> - An array of all tag entities.
     */
    findAll() {
        /**
         * LEVEL 4: INLINE COMMENTS
         * WHAT: Finding all tags.
         * WHY: To provide a list of all existing tags for categorization.
         * HOW: Calling this.tagsRepository.find() with a relations object to eagerly load the 'books' association.
         */
        return this.tagsRepository.find({
            // Carrega relação no mesmo fluxo para evitar consultas extras posteriores
            relations: { books: true }
        });
    }
}
