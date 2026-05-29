/**
 * PROPÓSITO: Encapsula dependências e fluxo de DI relacionados ao domínio de tags
 * DEPENDÊNCIAS: TypeOrmModule, TagsController, TagsService, entidade Tag
 * EXPORTAÇÕES: TagsModule
 * USO: Importado pelo AppModule para registrar recursos de tags na aplicação
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';

import { Tag } from './entities/tag.entity';

@Module({
  imports: [
    // Registra o repositório de Tag no escopo deste módulo para injeção via TypeORM
    TypeOrmModule.forFeature([Tag]),
  ],
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule {}
