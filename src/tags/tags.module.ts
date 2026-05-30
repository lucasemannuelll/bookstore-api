/**
<<<<<<< HEAD
 * PROPÓSITO: Encapsula dependências e fluxo de DI relacionados ao domínio de tags
 * DEPENDÊNCIAS: TypeOrmModule, TagsController, TagsService, entidade Tag
 * EXPORTAÇÕES: TagsModule
 * USO: Importado pelo AppModule para registrar recursos de tags na aplicação
 */

=======
 * LEVEL 1: FILE HEADER
 * FILENAME: tags.module.ts
 * PATH: src/tags/tags.module.ts
 * LANGUAGE: TypeScript
 * PARADIGM: Modular / Dependency Injection
 * PURPOSE: Orchestrates the Tags module by declaring its controllers, providers, and imports.
 * DEPENDENCIES: @nestjs/common, @nestjs/typeorm, TagsController, TagsService, Tag Entity
 * CONTEXT: This is the central configuration for everything related to the 'Tags' feature in the NestJS application.
 * AUTHOR NOTES: Uses TypeOrmModule.forFeature to register the Tag entity within this scope.
 * LAST MODIFIED: 2024-05-23
 */

/**
 * LEVEL 2: SECTION DIVIDERS - IMPORTS
 * WHAT: Importing NestJS module decorators and local components.
 * WHY: To glue together the various parts of the Tags functionality.
 * HOW: Importing from NestJS core and local file system paths.
 */
>>>>>>> bda22c9 (docs: add exhaustive defensive documentation to src directory)
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';

import { Tag } from './entities/tag.entity';

/**
 * LEVEL 2: SECTION DIVIDERS - MODULE DEFINITION
 * WHAT: Defining the TagsModule using the @Module decorator.
 * WHY: To encapsulate the tags logic and manage its dependencies.
 * HOW: Providing 'imports', 'controllers', and 'providers' arrays to the decorator.
 */

/**
 * LEVEL 3: CLASS DOCUMENTATION
 * CLASS: TagsModule
 * PURPOSE: Serves as the entry point for the Tags feature, managing dependency injection and entity registration.
 */
@Module({
<<<<<<< HEAD
  imports: [
    // Registra o repositório de Tag no escopo deste módulo para injeção via TypeORM
    TypeOrmModule.forFeature([Tag]),
  ],
=======
  /**
   * LEVEL 4: INLINE COMMENTS
   * WHAT: Module imports.
   * WHY: To bring in external functionality, specifically the TypeORM repository for the Tag entity.
   * HOW: Calling TypeOrmModule.forFeature([Tag]) to make the Tag repository available for injection.
   */
  imports: [TypeOrmModule.forFeature([Tag])],

  /**
   * LEVEL 4: INLINE COMMENTS
   * WHAT: Controllers declaration.
   * WHY: To handle incoming HTTP requests related to tags.
   * HOW: Listing TagsController in the controllers array.
   */
>>>>>>> bda22c9 (docs: add exhaustive defensive documentation to src directory)
  controllers: [TagsController],

  /**
   * LEVEL 4: INLINE COMMENTS
   * WHAT: Providers declaration.
   * WHY: To define the services that contain the business logic and can be injected into controllers.
   * HOW: Listing TagsService in the providers array.
   */
  providers: [TagsService],
})
export class TagsModule {}
