/**
 * LEVEL 1: FILE HEADER
 * FILENAME: profiles.module.ts
 * PATH: src/profiles/profiles.module.ts
 * LANGUAGE: TypeScript
 * PARADIGM: Decorator-based Configuration (NestJS)
 * PURPOSE: Encapsulates all components related to author profiles.
 * DEPENDENCIES: @nestjs/common, @nestjs/typeorm, ./profiles.controller, ./profiles.service, ./entities/profile.entity, ../authors/entities/author.entity
 * CONTEXT: Feature module for the Profile domain in the Bookstore API.
 * AUTHOR NOTES: Integrates Profile and Author entities to handle profile management.
 * LAST MODIFIED: 2024-05-22
 */

// ============================================================================
// LEVEL 2: SECTION DIVIDERS - IMPORTS
// ============================================================================

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';

import { Profile } from './entities/profile.entity';
import { Author } from '../authors/entities/author.entity'

// ============================================================================
// LEVEL 2: SECTION DIVIDERS - MODULE DEFINITION
// ============================================================================

/**
 * LEVEL 3: CLASS DOCUMENTATION
 * CLASS: ProfilesModule
 * VISIBILITY: Exported
 * WHAT: Orchestrates profile-related components including services and controllers.
 * HOW: Registers imports, controllers, and providers using the @Module() decorator.
 * FRAMEWORK: NestJS module system facilitates encapsulation and dependency management.
 */
@Module({
  imports: [
    // WHAT: Registers entities for TypeORM repository injection in this module.
    // WHY: ProfilesService needs access to both Profile and Author repositories.
    // HOW: Calling forFeature() makes these repositories available within this module's scope.
    // FRAMEWORK: TypeORM integration for scoped repository access.
    TypeOrmModule.forFeature([Profile, Author])
  ],
  // WHAT: List of controllers instantiated to handle HTTP traffic for the /profiles route.
  controllers: [ProfilesController],
  // WHAT: List of providers containing the business logic for the Profile domain.
  providers: [ProfilesService],
})
export class ProfilesModule {}
