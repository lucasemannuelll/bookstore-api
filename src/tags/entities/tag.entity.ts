/**
 * PROPÓSITO: Define o mapeamento da entidade Tag para persistência no banco
 * DEPENDÊNCIAS: Decorators do TypeORM e entidade Book
 * EXPORTAÇÕES: Tag
 * USO: Registrada no TypeORM para criação de schema e carregamento de relações
 */

import {
    Column,
    Entity,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'

import { Book } from '../../books/entities/book.entity'

@Entity()
// Marca a classe para participação no metadata de entidades durante inicialização do TypeORM
export class Tag {
    @PrimaryGeneratedColumn()
    // Usa chave gerada pelo banco para evitar colisões manuais de identidade
    id!: number;

    @Column()
    name!: string;

    @ManyToMany(() => Book, (book) => book.tags)
    // Mantém relação bidirecional sincronizada entre tags e livros no ORM
    books!: Book[]
}
