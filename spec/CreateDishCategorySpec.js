//CreateDishCategorySpec.js
"use strict";

var CreateDishCategory = require("../app/CreateDishCategory");
var InMemoryDishCategoryRepository = require("../specHelpers/referenceImplementations/InMemoryDishCategoryRepository");

describe("CreateDishCategory", function () {
    var subject;
    var dishCategoryRepository;

    beforeEach(function () {
        dishCategoryRepository = InMemoryDishCategoryRepository.new();
        var dependencies = {dishCategoryRepository: dishCategoryRepository};
        subject = CreateDishCategory.new(dependencies);
    });

    describe("execute", function () {
        var createdDishCategoryIdentifier;
        var observer;

        beforeEach(function () {
            createdDishCategoryIdentifier = null;
            observer = {didCreateDishCategoryWithIdentifier: function (dishCategoryIdentifier) {
                createdDishCategoryIdentifier = dishCategoryIdentifier;
            }};

            subject.execute({name: "Vegetarian"}, observer);
        });

        it("should notify the observer with the identifier for the created dish", function () {
            expect(createdDishCategoryIdentifier).not.toBe(null);
        });

        it("should store the category in the dish category repository", function () {
            var storedDishCategory = null;
            dishCategoryRepository.fetch(createdDishCategoryIdentifier, function (dishCategory) {
                storedDishCategory = dishCategory;
            });

            var expectedDishCategory = {
                identifier: createdDishCategoryIdentifier,
                name: "Vegetarian"
            };

            expect(storedDishCategory).toEqual(expectedDishCategory);
        });
    });
});
