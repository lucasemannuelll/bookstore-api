/**
 * PROPÓSITO: Expõe endpoints HTTP relacionados ao domínio de tags
 * DEPENDÊNCIAS: TagsService e pipeline de requisição do NestJS
 * EXPORTAÇÕES: TagsController
 * USO: Registrado pelo TagsModule para receber requisições da rota /tags
 */

import { Body, Controller, Get, Post } from '@nestjs/common';

import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';

@Controller('tags')
// Vincula todas as rotas da classe ao prefixo /tags durante o roteamento HTTP
export class TagsController {
    constructor(
        // Injeta service compartilhado pelo container para centralizar lógica fora do controller
        private readonly tagsService: TagsService
    ) {}

    @Post()
    // Faz binding automático do body validado da requisição para o DTO
    create(@Body() createTagDto: CreateTagDto) {
        return this.tagsService.create(createTagDto);
    }

    @Get()
    findAll() {
        return this.tagsService.findAll();
    }
}
