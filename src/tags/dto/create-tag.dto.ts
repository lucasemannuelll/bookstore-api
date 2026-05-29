/**
 * PROPÓSITO: Define formato e regras mínimas de validação para criação de tags
 * DEPENDÊNCIAS: class-validator
 * EXPORTAÇÕES: CreateTagDto
 * USO: Consumido pelo ValidationPipe antes da execução dos controllers
 */

import { IsNotEmpty } from "class-validator";

export class CreateTagDto {
    @IsNotEmpty()
    // Impede persistência de tags vazias durante validação da requisição
    name!: string;
}
