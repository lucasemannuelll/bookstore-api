import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthorsModule } from './authors/authors.module';
import { BooksModule } from './books/books.module';
import { ProfilesModule } from './profiles/profiles.module';
import { TagsModule } from './tags/tags.module';

import { Author } from './authors/entities/author.entity';
import { Book } from './books/entities/book.entity';
import { Profile } from './profiles/entities/profile.entity';
import { Tag } from './tags/entities/tag.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'database.sqlite',
      entities: [Author, Book, Profile, Tag],
      synchronize: true,
    }),
    AuthorsModule,
    BooksModule,
    ProfilesModule,
    TagsModule,
  ],
})
export class AppModule {}