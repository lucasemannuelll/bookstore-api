import {
    Column,
    Entity,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { Book } from '../../books/entities/book.entity';
import { Profile } from '../../profiles/entities/profile.entity';

@Entity()
export class Author {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @OneToOne(() => Profile, (profile) => profile.author)
    profile: Profile;

    @OneToMany(() => Book, (book) => book.author)
    books: Book[];
}
