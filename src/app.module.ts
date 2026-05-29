/**
 * PROPÓSITO: Centraliza configuração global da aplicação e registro dos módulos de domínio
 * DEPENDÊNCIAS: TypeOrmModule, módulos de feature e entidades do TypeORM
 * EXPORTAÇÕES: AppModule
 * USO: Carregado pelo bootstrap como módulo raiz da aplicação
 */

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
    // Registra conexão global do TypeORM no container de DI durante inicialização da aplicação
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'database.sqlite',

      // Mantém descoberta de entidades explícita para evitar registros acidentais em runtime
      entities: [Author, Book, Profile, Tag],

      // Atualiza schema automaticamente a cada startup; risco de perda de consistência em produção
      synchronize: true,
    }),

    AuthorsModule,
    BooksModule,
    ProfilesModule,
    TagsModule,
  ],
})
export class AppModule {}
