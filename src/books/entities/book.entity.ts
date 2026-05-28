import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'

import { Author } from '../../authors/entities/author.entity';
import { Tag } from '../../tags/entities/tag.entity';

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    releaseYear!: number;

    @ManyToOne(() => Author, (author) => author.books)
    author!: Author;

    @ManyToMany(() => Tag, (tag) => tag.books, {
        cascade: true,
    })
    @JoinTable()
    tags!: Tag[];
}