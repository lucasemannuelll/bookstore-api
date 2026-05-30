<<<<<<< HEAD
/**
 * PROPÓSITO: Inicializa a aplicação NestJS e configura validação global de entrada
 * DEPENDÊNCIAS: NestFactory, AppModule, ValidationPipe
 * EXPORTAÇÕES: Nenhuma
 * USO: Executado automaticamente como ponto de entrada da aplicação
 */

=======
/*
 * FILE: main.ts
 * PATH: src/main.ts
 * LANGUAGE: TypeScript 5.x (NestJS Framework)
 * PARADIGM: Asynchronous, Modular, Dependency Injection based (OOP)
 *
 * PURPOSE:
 *   This is the entry point of the entire NestJS application. It initializes the 
 *   application context, configures global middleware (pipes), and starts the 
 *   HTTP server to listen for incoming requests.
 *
 * DEPENDENCIES:
 *   - @nestjs/common: Provides the ValidationPipe for request payload validation.
 *   - @nestjs/core: Provides NestFactory to bootstrap the application instance.
 *   - ./app.module: The root module that aggregates all other modules in the system.
 *
 * CONTEXT:
 *   This file is executed by the Node.js runtime (often via 'npm run start').
 *   It is the very first piece of code that runs. It creates the 'app' object
 *   which is the heart of the web server.
 *
 * AUTHOR NOTES:
 *   The server is currently hardcoded to listen on port 3000. 
 *   TODO: Move port and validation settings to a configuration service or .env file.
 *
 * LAST MODIFIED: 2026-05-30
 */

// ============================================================
// SECTION: Imports
// WHAT: External framework components and internal root module
// WHY: We need NestFactory to build the app and AppModule to define its structure.
// ============================================================

// WHAT: ValidationPipe is a built-in NestJS pipe for validating incoming request data.
// WHY: We use it globally to ensure all DTOs (Data Transfer Objects) are respected.
>>>>>>> bda22c9 (docs: add exhaustive defensive documentation to src directory)
import { ValidationPipe } from '@nestjs/common';

// WHAT: NestFactory is the core class that exposes static methods to create app instances.
// WHY: It's the engine that starts the whole NestJS ecosystem.
import { NestFactory } from '@nestjs/core';

// WHAT: AppModule is the root of our application's dependency graph.
// WHY: Without this, Nest wouldn't know which controllers or services to load.
import { AppModule } from './app.module';

// ============================================================
// SECTION: Bootstrapping Logic
// WHAT: The asynchronous initialization sequence for the server.
// WHY: Node.js and NestJS rely on async operations for non-blocking I/O.
// ============================================================

/*
 * FUNCTION: bootstrap
 * VISIBILITY: internal (not exported)
 *
 * WHAT IT DOES:
 *   Creates the Nest application instance using the root module, 
 *   attaches global validation logic, and binds the server to a network port.
 *
 * PARAMETERS:
 *   None.
 *
 * RETURNS:
 *   Promise<void>: Since it's an async function that performs side effects (starting a server).
 *
 * SIDE EFFECTS:
 *   - Spawns a web server process.
 *   - Mutates the global state of the application instance by adding pipes.
 *   - Binds to a TCP port (3000).
 *
 * THROWS / ERRORS:
 *   - If AppModule has circular dependencies or missing providers, NestFactory.create will throw.
 *   - If port 3000 is already in use, app.listen will throw an EADDRINUSE error.
 *
 * CALLED BY:
 *   The file's top-level execution scope (see the bottom of this file).
 *
 * CALLS:
 *   - NestFactory.create(): To instantiate the app.
 *   - app.useGlobalPipes(): To configure global validation logic.
 *   - app.listen(): To start the HTTP server.
 *
 * ALGORITHM / APPROACH:
 *   1. Instantiate the app from the root module.
 *   2. Apply a ValidationPipe globally.
 *   3. Set 'whitelist: true' to strip any properties not defined in the DTO.
 *   4. Start the server on port 3000.
 */
async function bootstrap() {
<<<<<<< HEAD
  // Cria o container de DI e executa os hooks de inicialização dos módulos
=======
  // Step 1: Create the application instance.
  // FRAMEWORK: NestFactory.create returns an INestApplication object.
  // ASSUME: AppModule is valid and all its dependencies can be resolved by the DI container.
>>>>>>> bda22c9 (docs: add exhaustive defensive documentation to src directory)
  const app = await NestFactory.create(AppModule);
  
  // Step 2: Configure global validation.
  // WHY: We want to validate all incoming requests automatically based on class-validator decorators.
  app.useGlobalPipes(
<<<<<<< HEAD
    // Remove propriedades não declaradas no DTO antes da aplicação chegar nos controllers
=======
    // WHAT: Creating a new instance of the ValidationPipe.
>>>>>>> bda22c9 (docs: add exhaustive defensive documentation to src directory)
    new ValidationPipe({
      // WHAT: whitelist: true
      // WHY: If the client sends properties that aren't in our DTO, they are automatically removed.
      // SECURITY: Prevents "mass assignment" attacks where a user injects extra fields into the DB.
      whitelist: true,
    }),
  );

<<<<<<< HEAD
  // Aguarda o binding da porta para garantir que a aplicação esteja pronta para receber requisições
  await app.listen(3000);
}
=======
  // Step 3: Listen for incoming traffic.
  // WHAT: Binding the Express/Fastify server (underlying Nest) to port 3000.
  // MAGIC: 3000 is the default port. In production, this should be process.env.PORT.
  await app.listen(3000);
}

// ============================================================
// SECTION: Execution Trigger
// WHAT: Actually calling the bootstrap function.
// WHY: Defining the function isn't enough; we must invoke it to start the app.
// ============================================================

// UNCERTAIN: We don't have a .catch() block here. If bootstrap fails (e.g., DB down), 
// the process might crash with an unhandled promise rejection.
>>>>>>> bda22c9 (docs: add exhaustive defensive documentation to src directory)
bootstrap();
