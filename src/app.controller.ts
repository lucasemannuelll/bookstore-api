/**
 * LEVEL 1: FILE HEADER
 * FILENAME: app.controller.ts
 * PATH: src/app.controller.ts
 * LANGUAGE: TypeScript
 * PARADIGM: Object-Oriented, Decorator-based (NestJS)
 * PURPOSE: Root controller for the application, handling basic health checks or entry point requests.
 * DEPENDENCIES: @nestjs/common, ./app.service
 * CONTEXT: Part of the NestJS framework, acting as the entry point for HTTP requests.
 * AUTHOR NOTES: Standard boilerplate controller.
 * LAST MODIFIED: 2024-05-22
 */

// ============================================================================
// LEVEL 2: SECTION DIVIDERS - IMPORTS
// ============================================================================

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// ============================================================================
// LEVEL 2: SECTION DIVIDERS - CLASS DEFINITION
// ============================================================================

/**
 * LEVEL 3: CLASS DOCUMENTATION
 * CLASS: AppController
 * VISIBILITY: Exported
 * WHAT: Handles incoming HTTP requests for the root path.
 * HOW: Utilizes NestJS @Controller decorator to register as a route handler.
 * DEPENDENCIES: AppService is injected via constructor.
 */
@Controller()
export class AppController {
  /**
   * LEVEL 3: CONSTRUCTOR DOCUMENTATION
   * VISIBILITY: Public
   * WHAT: Initializes the AppController and injects dependencies.
   * PARAMETERS:
   *   - appService: AppService (Private, Readonly) - The service layer for root logic.
   * SIDE EFFECTS: Injects AppService instance into the class scope.
   * FRAMEWORK: NestJS Dependency Injection.
   */
  constructor(
    // WHAT: Dependency injection of the AppService.
    // WHY: To delegate business logic to the service layer.
    // HOW: NestJS looks for the AppService provider in the module.
    // FRAMEWORK: Constructor-based injection is standard in NestJS.
    private readonly appService: AppService,
  ) {}

  /**
   * LEVEL 3: METHOD DOCUMENTATION
   * METHOD: getHello
   * VISIBILITY: Public
   * WHAT: Responds to HTTP GET requests on the root path ('/').
   * RETURNS: string - A greeting message.
   * CALLED BY: HTTP Clients (Browsers, Curl, etc.)
   * CALLS: appService.getHello()
   * FRAMEWORK: @Get() decorator marks this as a GET route handler.
   */
  @Get()
  getHello(): string {
    // WHAT: Returns the result of getHello from the service.
    // WHY: To provide a response to the client.
    // HOW: Proxies the call to the injected AppService instance.
    // LANGUAGE: Uses 'this' to access class member 'appService'.
    return this.appService.getHello();
  }
}
