/**
 * PROPÓSITO: Inicializa a aplicação NestJS e configura validação global de entrada
 * DEPENDÊNCIAS: NestFactory, AppModule, ValidationPipe
 * EXPORTAÇÕES: Nenhuma
 * USO: Executado automaticamente como ponto de entrada da aplicação
 */

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // Cria o container de DI e executa os hooks de inicialização dos módulos
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(
    // Remove propriedades não declaradas no DTO antes da aplicação chegar nos controllers
    new ValidationPipe({
      whitelist: true,
    }),
  );

  // Aguarda o binding da porta para garantir que a aplicação esteja pronta para receber requisições
  await app.listen(3000);
}
bootstrap();
