/**
<<<<<<< HEAD
 * PROPÓSITO: Define o mapeamento da entidade Tag para persistência no banco
 * DEPENDÊNCIAS: Decorators do TypeORM e entidade Book
 * EXPORTAÇÕES: Tag
 * USO: Registrada no TypeORM para criação de schema e carregamento de relações
 */

=======
 * LEVEL 1: FILE HEADER
 * FILENAME: tag.entity.ts
 * PATH: src/tags/entities/tag.entity.ts
 * LANGUAGE: TypeScript
 * PARADIGM: Object-Oriented Programming / Object-Relational Mapping (ORM)
 * PURPOSE: Defines the database schema and structure for the 'Tag' entity using TypeORM.
 * DEPENDENCIES: typeorm (Entity, PrimaryGeneratedColumn, Column, ManyToMany decorators)
 * CONTEXT: Represents the 'tag' table in the database and its relationship with the 'Book' entity.
 * AUTHOR NOTES: This entity supports a many-to-many relationship with Books.
 * LAST MODIFIED: 2024-05-23
 */

/**
 * LEVEL 2: SECTION DIVIDERS - IMPORTS
 * WHAT: Importing TypeORM decorators and the related Book entity.
 * WHY: To define the database structure and relationships between tables.
 * HOW: Importing from 'typeorm' and local entity paths.
 */
>>>>>>> bda22c9 (docs: add exhaustive defensive documentation to src directory)
import {
    Column,
    Entity,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'

import { Book } from '../../books/entities/book.entity'

/**
 * LEVEL 2: SECTION DIVIDERS - CLASS DEFINITION
 * WHAT: Defining the Tag entity class.
 * WHY: To map this TypeScript class to a database table.
 * HOW: Using the @Entity() decorator provided by TypeORM.
 */

/**
 * LEVEL 3: CLASS DOCUMENTATION
 * CLASS: Tag
 * PURPOSE: Represents a tag that can be associated with multiple books.
 * RELATIONSHIPS: Many-to-many relationship with the Book entity.
 */
@Entity()
// Marca a classe para participação no metadata de entidades durante inicialização do TypeORM
export class Tag {
    /**
     * LEVEL 4: INLINE COMMENTS
     * WHAT: Primary key 'id' property.
     * WHY: Uniquely identifies each tag record in the database.
     * HOW: Using @PrimaryGeneratedColumn() to auto-increment the ID.
     */
    @PrimaryGeneratedColumn()
    // Usa chave gerada pelo banco para evitar colisões manuais de identidade
    id!: number;

    /**
     * LEVEL 4: INLINE COMMENTS
     * WHAT: The 'name' of the tag.
     * WHY: To store the human-readable label for the tag.
     * HOW: Using @Column() to map this property to a standard database column.
     */
    @Column()
    name!: string;

    /**
     * LEVEL 4: INLINE COMMENTS
     * WHAT: The 'books' relationship property.
     * WHY: To establish a many-to-many relationship where one tag can belong to many books.
     * HOW: Using @ManyToMany() pointing to the Book entity and specifying the inverse side (book.tags).
     */
    @ManyToMany(() => Book, (book) => book.tags)
    // Mantém relação bidirecional sincronizada entre tags e livros no ORM
    books!: Book[]
}
