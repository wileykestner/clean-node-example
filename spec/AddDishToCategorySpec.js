//AddDishToCategorySpec.js
"use strict";

var InMemoryDishToDishCategoryRelationshipRepository = require("../specHelpers/referenceImplementations/InMemoryDishToDishCategoryRelationshipRepository");
var InMemoryDishCategoryRepository = require("../specHelpers/referenceImplementations/InMemoryDishCategoryRepository");
var InMemoryDishRepository = require("../specHelpers/referenceImplementations/InMemoryDishRepository");
var AddDishToCategory = require("../app/AddDishToCategory.js");

describe("AddDishToCategory", function () {
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

        subject = AddDishToCategory.new(dependencies);
    });

    describe("execute", function () {
        var observer;
        var dishIdentifier;
        var dishCategoryIdentifier;
        var dish;
        var dishCategory;

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
});
