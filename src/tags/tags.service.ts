/**
 * PROPÓSITO: Centraliza regras e acesso a dados relacionados às tags
 * DEPENDÊNCIAS: Repository<Tag>, DTOs e sistema de DI do NestJS
 * EXPORTAÇÕES: TagsService
 * USO: Consumido pelo TagsController durante o ciclo de requisição HTTP
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Tag } from './entities/tag.entity';
import { CreateTagDto } from './dto/create-tag.dto';

@Injectable()
// Registra a classe como provider gerenciado pelo container de DI do NestJS
export class TagsService {
    constructor(
        @InjectRepository(Tag)
        // Injeta repositório já vinculado à conexão ativa e à entidade Tag
        private tagsRepository: Repository<Tag>,
    ) {}

    create(createTagDto: CreateTagDto) {
        // Converte o DTO em instância de entidade antes dos hooks e persistência do TypeORM
        const tag = this.tagsRepository.create(createTagDto)

        // Aguarda persistência para garantir geração de campos automáticos e sincronização com o banco
        return this.tagsRepository.save(tag);
    }

    findAll() {
        return this.tagsRepository.find({
            // Carrega relação no mesmo fluxo para evitar consultas extras posteriores
            relations: { books: true }
        });
    }
}
