/**
<<<<<<< HEAD
 * PROPÓSITO: Centraliza configuração global da aplicação e registro dos módulos de domínio
 * DEPENDÊNCIAS: TypeOrmModule, módulos de feature e entidades do TypeORM
 * EXPORTAÇÕES: AppModule
 * USO: Carregado pelo bootstrap como módulo raiz da aplicação
 */

=======
 * LEVEL 1: FILE HEADER
 * FILENAME: app.module.ts
 * PATH: src/app.module.ts
 * LANGUAGE: TypeScript
 * PARADIGM: Decorator-based Configuration (NestJS)
 * PURPOSE: Root module of the application, orchestrating all other modules and global configurations.
 * DEPENDENCIES: @nestjs/common, @nestjs/typeorm, ./authors/authors.module, ./books/books.module, ./profiles/profiles.module, ./tags/tags.module
 * CONTEXT: The main entry point for NestJS dependency graph construction.
 * AUTHOR NOTES: Configures TypeORM with better-sqlite3 for local development.
 * LAST MODIFIED: 2024-05-22
 */

// ============================================================================
// LEVEL 2: SECTION DIVIDERS - IMPORTS
// ============================================================================

>>>>>>> bda22c9 (docs: add exhaustive defensive documentation to src directory)
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// WHAT: Importing feature modules to include them in the application context.
// WHY: To modularize functionality and maintain clean separation of concerns.
import { AuthorsModule } from './authors/authors.module';
import { BooksModule } from './books/books.module';
import { ProfilesModule } from './profiles/profiles.module';
import { TagsModule } from './tags/tags.module';

// WHAT: Importing entities for TypeORM root configuration.
// WHY: Entities must be registered so TypeORM can manage their database lifecycle.
import { Author } from './authors/entities/author.entity';
import { Book } from './books/entities/book.entity';
import { Profile } from './profiles/entities/profile.entity';
import { Tag } from './tags/entities/tag.entity';

// ============================================================================
// LEVEL 2: SECTION DIVIDERS - MODULE DEFINITION
// ============================================================================

/**
 * LEVEL 3: CLASS DOCUMENTATION
 * CLASS: AppModule
 * VISIBILITY: Exported
 * WHAT: The root module that ties the application together.
 * HOW: Uses the @Module() decorator to define imports, controllers, and providers.
 * FRAMEWORK: NestJS Module system.
 */
@Module({
  imports: [
<<<<<<< HEAD
    // Registra conexão global do TypeORM no container de DI durante inicialização da aplicação
=======
    // WHAT: TypeORM global configuration.
    // WHY: To establish a database connection for the entire app.
    // HOW: Calling forRoot() with configuration options.
    // FRAMEWORK: @nestjs/typeorm integration.
>>>>>>> bda22c9 (docs: add exhaustive defensive documentation to src directory)
    TypeOrmModule.forRoot({
      // WHAT: Database type specification.
      // WHY: 'better-sqlite3' is selected for high-performance synchronous operations.
      type: 'better-sqlite3',
      // WHAT: Name and location of the database file.
      // WHY: To persist data locally in a single file.
      database: 'database.sqlite',
<<<<<<< HEAD

      // Mantém descoberta de entidades explícita para evitar registros acidentais em runtime
      entities: [Author, Book, Profile, Tag],

      // Atualiza schema automaticamente a cada startup; risco de perda de consistência em produção
      synchronize: true,
    }),

=======
      // WHAT: Array of entity classes that represent the database schema.
      // WHY: To map TypeScript classes to SQL tables.
      entities: [Author, Book, Profile, Tag],
      // WHAT: Auto-synchronization toggle.
      // WHY: Automatically creates/updates tables based on entity definitions.
      // WARNING: DO NOT use in production as it may lead to destructive schema changes.
      synchronize: true,
    }),
    // WHAT: Domain-specific modules representing different parts of the bookstore.
    // WHY: To encapsulate logic related to authors, books, profiles, and tags.
>>>>>>> bda22c9 (docs: add exhaustive defensive documentation to src directory)
    AuthorsModule,
    BooksModule,
    ProfilesModule,
    TagsModule,
  ],
})
export class AppModule {}
