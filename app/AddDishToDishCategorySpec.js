//AddDishToDishCategorySpec.js
"use strict";

var InMemoryDishToDishCategoryRelationshipRepository = require("../specHelpers/referenceImplementations/InMemoryDishToDishCategoryRelationshipRepository");
var InMemoryDishCategoryRepository = require("../specHelpers/referenceImplementations/InMemoryDishCategoryRepository");
var InMemoryDishRepository = require("../specHelpers/referenceImplementations/InMemoryDishRepository");
var AddDishToDishCategory = require("../app/AddDishToDishCategory");

describe("AddDishToDishCategory", function () {
    var subject;
    var dishRepository;
    var dishCategoryRepository;
    var dishToDishCategoryRelationshipRepository;

    beforeEach(function () {
        dishRepository  = InMemoryDishRepository.new();
        dishCategoryRepository = InMemoryDishCategoryRepository.new();
        dishToDishCategoryRelationshipRepository = InMemoryDishToDishCategoryRelationshipRepository.new();

        var dependencies = {
            dishRepository: dishRepository,
            dishCategoryRepository: dishCategoryRepository,
            dishToDishCategoryRelationshipRepository: dishToDishCategoryRelationshipRepository
        };

        subject = AddDishToDishCategory.new(dependencies);
    });

    describe("execute", function () {
        var observer;
        var dishIdentifier;
        var dishCategoryIdentifier;
        var dish;
        var dishCategory;

        describe("when both the dish and the dish category exist", function (){
            beforeEach(function () {
                dishIdentifier = null;
                dishRepository.createDish("Pad Thai", function (createdDishIdentifier) {
                    dishIdentifier = createdDishIdentifier;
                });

                dishCategoryIdentifier = null;
                dishCategoryRepository.create("Vegetarian", function (createdDishCategoryIdentifier) {
                    dishCategoryIdentifier = createdDishCategoryIdentifier;
                });

                dish = null;
                dishCategory = null;
                observer = {didAddDishToCategory: function (addedDish, addedDishCategory) {
                    dish = addedDish;
                    dishCategory = addedDishCategory;
                }};

                var identifiers = {
                    "dishIdentifier": dishIdentifier,
                    "dishCategoryIdentifier": dishCategoryIdentifier,
                };
                subject.execute(identifiers, observer);
            });

            it("should notify the observer with the dish", function () {
                var expectedDish = {
                    identifier: dishIdentifier,
                    name: "Pad Thai",
                };

                expect(dish).toEqual(expectedDish);
            });

            it("should notify the observer with the dish category", function () {
                var expectedDishCategory = {
                    identifier: dishCategoryIdentifier,
                    name: "Vegetarian",
                };

                expect(dishCategory).toEqual(expectedDishCategory);
            });

            it("should store the relationship in the dishToDishCategoryRelationshipRepository", function (){
                var dishIdentifiersInCategory = null;
                var success = function (dishIdentifiers) {
                    dishIdentifiersInCategory = dishIdentifiers;
                };
                dishToDishCategoryRelationshipRepository.fetchDishIdentifiersForDishCategoryIdentifier(dishCategoryIdentifier, success);

                var expectedDishIdentifiers = [dishIdentifier];
                expect(dishIdentifiersInCategory).toEqual(expectedDishIdentifiers);
            });
        });

        describe("when the dish exists, but the dish category doesn't", function () {
            var error;
            var successCallbackCalled;

            beforeEach(function () {
                dishIdentifier = null;
                dishRepository.createDish("Pad Thai", function (createdDishIdentifier) {
                    dishIdentifier = createdDishIdentifier;
                });

                successCallbackCalled = false;
                error = null;
                observer = {
                    didAddDishToCategory: function (addedDish, addedDishCategory) {
                        successCallbackCalled = true;
                    },
                    didFailToAddDishToCategory: function (addError) {
                        error = addError;
                    },
                };

                var identifiers = {
                    "dishIdentifier": dishIdentifier,
                    "dishCategoryIdentifier": 27,
                };
                subject.execute(identifiers, observer);
            });

            it("should call the failure callback with an error", function () {
                var expectedError = {
                    code: "com.snacker.errors.AddDishToCategory.execute.invalidIdentifier",
                    message: "No dish category with the identifier '27' currently exists in the dish category repository."
                };

                expect(error).toEqual(expectedError);
            });

            it("should not call the success callback", function (){
                expect(successCallbackCalled).toEqual(false);
            });
        });

        describe("when the dish category exists, but the dish doesn't", function () {
            var error;
            var successCallbackCalled;

            beforeEach(function () {
                dishCategoryIdentifier = null;
                dishCategoryRepository.create("Vegetarian", function (createdDishCategoryIdentifier) {
                    dishCategoryIdentifier = createdDishCategoryIdentifier;
                });

                successCallbackCalled = false;
                error = null;
                observer = {
                    didAddDishToCategory: function (addedDish, addedDishCategory) {
                        successCallbackCalled = true;
                    },
                    didFailToAddDishToCategory: function (addError) {
                        error = addError;
                    },
                };

                var identifiers = {
                    "dishIdentifier": 43,
                    "dishCategoryIdentifier": dishCategoryIdentifier,
                };
                subject.execute(identifiers, observer);
            });

            it("should call the failure callback with an error", function () {
                var expectedError = {
                    code: "com.snacker.errors.AddDishToCategory.execute.invalidIdentifier",
                    message: "No dish with the identifier '43' currently exists in the dish repository."
                };

                expect(error).toEqual(expectedError);
            });

            it("should not call the success callback", function (){
                expect(successCallbackCalled).toEqual(false);
            });
        });
    });
});
