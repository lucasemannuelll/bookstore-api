/**
 * LEVEL 1: FILE HEADER
 * FILENAME: profiles.controller.ts
 * PATH: src/profiles/profiles.controller.ts
 * LANGUAGE: TypeScript
 * PARADIGM: Object-Oriented, Decorator-based (NestJS)
 * PURPOSE: Handles HTTP requests related to the Author Profile domain.
 * DEPENDENCIES: @nestjs/common, ./profiles.service, ./dto/create-profile.dto
 * CONTEXT: Routing layer for profiles in the Bookstore API.
 * AUTHOR NOTES: Standard RESTful controller implementation for managing biographical data.
 * LAST MODIFIED: 2024-05-22
 */

// ============================================================================
// LEVEL 2: SECTION DIVIDERS - IMPORTS
// ============================================================================

import { Body, Controller, Get, Post } from '@nestjs/common';

import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';

// ============================================================================
// LEVEL 2: SECTION DIVIDERS - CLASS DEFINITION
// ============================================================================

/**
 * LEVEL 3: CLASS DOCUMENTATION
 * CLASS: ProfilesController
 * VISIBILITY: Exported
 * WHAT: Controller responsible for handling incoming profile-related HTTP requests.
 * HOW: Annotated with @Controller('profiles') to handle routes prefixed with /profiles.
 * DEPENDENCIES: ProfilesService is injected via the constructor for business logic execution.
 * FRAMEWORK: NestJS Controller manages the entry points for the Profile domain.
 */
@Controller('profiles')
export class ProfilesController {
    /**
     * LEVEL 3: CONSTRUCTOR DOCUMENTATION
     * VISIBILITY: Public
     * WHAT: Initializes the ProfilesController and injects the ProfilesService dependency.
     * PARAMETERS:
     *   - profilesService: ProfilesService (Private, Readonly) - The service layer for Profile operations.
     * SIDE EFFECTS: Injects the ProfilesService instance into the class scope.
     * FRAMEWORK: NestJS Dependency Injection system automatically provides the required service.
     */
    constructor (
        // WHAT: Dependency injection of the ProfilesService.
        // WHY: To delegate complex business logic and database interactions to a dedicated layer.
        // HOW: The service is registered as a provider in the ProfilesModule.
        private readonly profilesService: ProfilesService
    ) {}

    /**
     * LEVEL 3: METHOD DOCUMENTATION
     * METHOD: create
     * VISIBILITY: Public
     * WHAT: Creates a new author profile via an HTTP POST request.
     * PARAMETERS:
     *   - createProfileDto: CreateProfileDto - The data object containing biography, website, and author ID.
     * RETURNS: Promise<Profile> - The newly created and persisted profile record.
     * CALLED BY: HTTP Client sending a POST request to /profiles.
     * CALLS: profilesService.create(createProfileDto)
     * FRAMEWORK: @Post() defines the HTTP verb; @Body() extracts the payload from the request.
     */
    @Post()
    create (
        // WHAT: Extracts the request body and validates it against the CreateProfileDto schema.
        // WHY: To ensure that the incoming biographical data is well-formed and includes a valid author reference.
        // FRAMEWORK: NestJS ValidationPipe performs the validation based on DTO decorators.
        @Body() createProfileDto: CreateProfileDto
    ) {
        // WHAT: Calls the service to process and persist the new profile.
        // WHY: To maintain a clean separation between the transport layer (HTTP) and business logic.
        // HOW: Invokes the create method on the injected profilesService.
        return this.profilesService.create(createProfileDto);
    }

    /**
     * LEVEL 3: METHOD DOCUMENTATION
     * METHOD: findAll
     * VISIBILITY: Public
     * WHAT: Retrieves all author profiles from the database via an HTTP GET request.
     * RETURNS: Promise<Profile[]> - An array containing all profile records and their linked author details.
     * CALLED BY: HTTP Client sending a GET request to /profiles.
     * CALLS: profilesService.findAll()
     * FRAMEWORK: @Get() decorator maps this method to the GET /profiles endpoint.
     */
    @Get()
    findAll() {
        // WHAT: Calls the service to fetch the complete list of profiles.
        // WHY: To provide a comprehensive view of all author biographies and websites.
        // HOW: Invokes the findAll method on the injected profilesService instance.
        return this.profilesService.findAll();
    }
}
