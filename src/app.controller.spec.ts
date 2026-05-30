/**
 * LEVEL 1: FILE HEADER
 * FILENAME: app.controller.spec.ts
 * PATH: src/app.controller.spec.ts
 * LANGUAGE: TypeScript
 * PARADIGM: Unit Testing (Jest + NestJS Testing Utilities)
 * PURPOSE: Verifies the behavior of AppController in isolation.
 * DEPENDENCIES: @nestjs/testing, ./app.controller, ./app.service
 * CONTEXT: Unit tests for the root controller.
 * AUTHOR NOTES: Standard boilerplate test file.
 * LAST MODIFIED: 2024-05-22
 */

// ============================================================================
// LEVEL 2: SECTION DIVIDERS - IMPORTS
// ============================================================================

import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// ============================================================================
// LEVEL 2: SECTION DIVIDERS - TEST SUITE
// ============================================================================

/**
 * LEVEL 3: TEST SUITE DOCUMENTATION
 * SUITE: AppController
 * WHAT: Contains unit tests for the AppController class.
 * HOW: Uses Jest describe block to group related tests.
 */
describe('AppController', () => {
  // WHAT: Instance of AppController to be tested.
  // WHY: To call methods and verify their outputs against expectations.
  let appController: AppController;

  /**
   * LEVEL 3: TEST SETUP DOCUMENTATION
   * WHAT: Initializes the testing module before each test.
   * HOW: Uses NestJS Test utility to create a module with AppController and AppService.
   * SIDE EFFECTS: Re-instantiates appController for every test case to ensure test isolation.
   * LANGUAGE: Uses 'async' as module compilation is an asynchronous operation.
   */
  beforeEach(async () => {
    // WHAT: Creating a mock NestJS application context.
    // WHY: To provide dependencies to the controller being tested without bootstrapping the full app.
    // HOW: Asynchronous call to Test.createTestingModule and .compile().
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    // WHAT: Retrieving the controller instance from the compiled testing module.
    // WHY: To perform tests on the actual class instance.
    // HOW: Using the get() method of TestingModule with the class type.
    appController = app.get<AppController>(AppController);
  });

  // ============================================================================
  // LEVEL 2: SECTION DIVIDERS - TEST CASES
  // ============================================================================

  /**
   * LEVEL 3: TEST GROUP DOCUMENTATION
   * GROUP: root
   * WHAT: Tests the root endpoint functionality.
   */
  describe('root', () => {
    /**
     * LEVEL 3: TEST CASE DOCUMENTATION
     * WHAT: Ensures getHello() returns the expected string.
     * EXPECTATION: Should return "Hello World!".
     * CALLED BY: Jest test runner.
     */
    it('should return "Hello World!"', () => {
      // WHAT: Asserting the return value of getHello.
      // WHY: To verify correctness of the implementation and integration between controller and service.
      // HOW: Comparing the result with 'Hello World!' using the toBe() matcher.
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
