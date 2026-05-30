/**
 * LEVEL 1: FILE HEADER
 * FILENAME: profiles.service.ts
 * PATH: src/profiles/profiles.service.ts
 * LANGUAGE: TypeScript
 * PARADIGM: Object-Oriented, Provider-based (NestJS)
 * PURPOSE: Contains business logic and database interactions for author profiles.
 * DEPENDENCIES: @nestjs/common, @nestjs/typeorm, typeorm, ./entities/profile.entity, ./dto/create-profile.dto, ../authors/entities/author.entity
 * CONTEXT: Service layer for managing author biographies and web presence.
 * AUTHOR NOTES: Implements verification for author existence before profile attachment.
 * LAST MODIFIED: 2024-05-22
 */

// ============================================================================
// LEVEL 2: SECTION DIVIDERS - IMPORTS
// ============================================================================

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Profile } from './entities/profile.entity';
import { CreateProfileDto } from './dto/create-profile.dto';

import { Author } from '../authors/entities/author.entity';

// ============================================================================
// LEVEL 2: SECTION DIVIDERS - CLASS DEFINITION
// ============================================================================

/**
 * LEVEL 3: CLASS DOCUMENTATION
 * CLASS: ProfilesService
 * VISIBILITY: Exported
 * WHAT: Service providing methods to manage author profile records and maintain relational integrity.
 * HOW: Annotated with @Injectable() for NestJS dependency management.
 * DEPENDENCIES: Repositories for Profile and Author are injected via the constructor.
 * FRAMEWORK: Acts as a provider within the NestJS IoC container.
 */
@Injectable()
export class ProfilesService {
  /**
   * LEVEL 3: CONSTRUCTOR DOCUMENTATION
   * VISIBILITY: Public
   * WHAT: Initializes the ProfilesService and injects the required database repositories.
   * PARAMETERS:
   *   - profilesRepository: Repository<Profile> (Private) - Repository for the Profile entity.
   *   - authorsRepository: Repository<Author> (Private) - Repository for the Author entity.
   * SIDE EFFECTS: Injects multiple repositories into the class scope for DB operations.
   * FRAMEWORK: @InjectRepository() identifies the specific entity repository to be injected from TypeORM.
   */
  constructor(
    // WHAT: Injection of the Profile repository.
    // WHY: To perform CRUD operations on the 'profile' table.
    @InjectRepository(Profile)
    private profilesRepository: Repository<Profile>,

    // WHAT: Injection of the Author repository.
    // WHY: Necessary to verify that the target author exists before linking a profile to them.
    @InjectRepository(Author)
    private authorsRepository: Repository<Author>,
  ) {}

  /**
   * LEVEL 3: METHOD DOCUMENTATION
   * METHOD: create
   * VISIBILITY: Public
   * WHAT: Creates and persists a new profile record for a specified author.
   * PARAMETERS:
   *   - createProfileDto: CreateProfileDto - The validated data object for the new profile.
   * RETURNS: Promise<Profile> - The saved profile record with the linked author object.
   * THROWS: NotFoundException - If the specified authorId does not exist in the database.
   * CALLED BY: ProfilesController.create()
   * ALGORITHM:
   *   1. Query the authorsRepository to find the author by ID.
   *   2. Throw an exception if the author is missing to prevent unlinked profiles.
   *   3. Instantiate the Profile entity with biography, website, and the retrieved author object.
   *   4. Persist the new Profile record to the database.
   */
  async create (createProfileDto: CreateProfileDto) {
    // WHAT: Attempt to find the author in the database using the provided ID.
    // WHY: To ensure the profile is associated with a legitimate author record.
    const author = await this.authorsRepository.findOneBy({
        id: createProfileDto.authorId,
    });

    // WHAT: Defensive check for author existence.
    // WHY: Maintains database integrity by preventing profiles from being created for non-existent authors.
    if (!author) {
        // WHAT: Throwing a NestJS-standard 404 exception.
        // WHY: To signal to the client that the parent resource (Author) was not found.
        throw new NotFoundException(`Author with ID ${createProfileDto.authorId} not found`);
    }

    // WHAT: Creating a new instance of the Profile entity.
    // WHY: To prepare the object in memory before database insertion.
    // HOW: Uses the repository's create() method to map DTO fields to the entity.
    const profile = this.profilesRepository.create({
        biography: createProfileDto.biography,
        website: createProfileDto.website,
        author,
    });

    // WHAT: Committing the new profile record to the database.
    // RETURNS: A promise that resolves to the saved Profile entity.
    return this.profilesRepository.save(profile);
  }

  /**
   * LEVEL 3: METHOD DOCUMENTATION
   * METHOD: findAll
   * VISIBILITY: Public
   * WHAT: Retrieves all profile records from the database, including their linked author data.
   * RETURNS: Promise<Profile[]> - An array of all profile records with the 'author' relation loaded.
   * CALLED BY: ProfilesController.findAll()
   * FRAMEWORK: TypeORM handles the JOIN required to fetch author details along with the profile.
   */
  findAll() {
    // WHAT: Querying the 'profile' table for all records.
    // WHY: To provide a complete list of author biographies for the API response.
    // HOW: Invokes the find() method with the 'author' relation enabled for Eager Loading.
    return this.profilesRepository.find({
        relations: {
            author: true
        }
    });
  }
}
