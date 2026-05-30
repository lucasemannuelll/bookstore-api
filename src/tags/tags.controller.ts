/**
<<<<<<< HEAD
 * PROPÓSITO: Expõe endpoints HTTP relacionados ao domínio de tags
 * DEPENDÊNCIAS: TagsService e pipeline de requisição do NestJS
 * EXPORTAÇÕES: TagsController
 * USO: Registrado pelo TagsModule para receber requisições da rota /tags
 */

=======
 * LEVEL 1: FILE HEADER
 * FILENAME: tags.controller.ts
 * PATH: src/tags/tags.controller.ts
 * LANGUAGE: TypeScript
 * PARADIGM: Controller-based / REST API
 * PURPOSE: Handles incoming HTTP requests for the /tags endpoint and routes them to the TagsService.
 * DEPENDENCIES: @nestjs/common, TagsService, CreateTagDto
 * CONTEXT: The primary interface for external clients to interact with the tags resources.
 * AUTHOR NOTES: Adheres to RESTful conventions for POST and GET methods.
 * LAST MODIFIED: 2024-05-23
 */

/**
 * LEVEL 2: SECTION DIVIDERS - IMPORTS
 * WHAT: Importing NestJS decorators and the associated service and DTO.
 * WHY: To define HTTP routes and ensure type safety for incoming data.
 * HOW: Using standard ES6 imports from @nestjs/common and local files.
 */
>>>>>>> bda22c9 (docs: add exhaustive defensive documentation to src directory)
import { Body, Controller, Get, Post } from '@nestjs/common';

import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';

/**
 * LEVEL 2: SECTION DIVIDERS - CLASS DEFINITION
 * WHAT: Defining the TagsController class.
 * WHY: To group together all tag-related route handlers.
 * HOW: Using the @Controller('tags') decorator to set the base path for all routes in this class.
 */

/**
 * LEVEL 3: CLASS DOCUMENTATION
 * CLASS: TagsController
 * PURPOSE: Manages HTTP requests for tag creation and retrieval.
 */
@Controller('tags')
// Vincula todas as rotas da classe ao prefixo /tags durante o roteamento HTTP
export class TagsController {
    /**
     * LEVEL 4: INLINE COMMENTS
     * WHAT: Constructor for TagsController.
     * WHY: To inject the TagsService dependency.
     * HOW: Using TypeScript's shorthand for private readonly property declaration in the constructor.
     */
    constructor(
        // Injeta service compartilhado pelo container para centralizar lógica fora do controller
        private readonly tagsService: TagsService
    ) {}

    /**
     * LEVEL 3: METHOD DOCUMENTATION
     * METHOD: create
     * PURPOSE: Endpoint for creating a new tag.
     * DECORATORS: @Post() - Handles HTTP POST requests.
     * PARAMETERS: createTagDto (CreateTagDto) - The validated body of the request.
     * RETURNS: Promise<Tag> - The result of the service's create operation.
     */
    @Post()
    // Faz binding automático do body validado da requisição para o DTO
    create(@Body() createTagDto: CreateTagDto) {
        /**
         * LEVEL 4: INLINE COMMENTS
         * WHAT: Delegating tag creation to the service.
         * WHY: To keep the controller lean and separate concern between request handling and business logic.
         * HOW: Calling this.tagsService.create() with the provided DTO.
         */
        return this.tagsService.create(createTagDto);
    }

    /**
     * LEVEL 3: METHOD DOCUMENTATION
     * METHOD: findAll
     * PURPOSE: Endpoint for retrieving all tags.
     * DECORATORS: @Get() - Handles HTTP GET requests.
     * RETURNS: Promise<Tag[]> - The result of the service's findAll operation.
     */
    @Get()
    findAll() {
        /**
         * LEVEL 4: INLINE COMMENTS
         * WHAT: Fetching all tags via the service.
         * WHY: To retrieve the collection of tags stored in the system.
         * HOW: Calling this.tagsService.findAll() and returning its result.
         */
        return this.tagsService.findAll();
    }
}
