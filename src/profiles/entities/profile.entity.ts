import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

import { Author } from '../../authors/entities/author.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  biography: string;

  @Column()
  website: string;

  @OneToOne(() => Author, (author) => author.profile)
  @JoinColumn()
  author: Author;
}
