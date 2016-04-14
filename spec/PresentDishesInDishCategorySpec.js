//PresentDishesInDishCategorySpec.js
"use strict";


var InMemoryDishRepository = require("../specHelpers/referenceImplementations/InMemoryDishRepository");
var InMemoryDishCategoryRepository = require("../specHelpers/referenceImplementations/InMemoryDishCategoryRepository");
var InMemoryDishToDishCategoryRepository = require("../specHelpers/referenceImplementations/InMemoryDishToDishCategoryRelationshipRepository");
var PresentDishesInDishCategory = require("../app/PresentDishesInDishCategory");


describe("PresentDishesInDishCategory", function () {
    var subject;
    var dishRepository;
    var dishCategoryRepository;
    var dishToDishCategoryRepository;

    beforeEach(function () {
        dishRepository = InMemoryDishRepository.new();
        dishCategoryRepository = InMemoryDishCategoryRepository.new();
        dishToDishCategoryRepository = InMemoryDishToDishCategoryRepository.new();
        var dependencies = {
            dishRepository: dishRepository,
            dishToDishCategoryRepository: dishToDishCategoryRepository
        };
        subject = PresentDishesInDishCategory.new(dependencies);
    });

    describe("execute", function () {
        var dishes;

        describe("when the dishCategoryIdentifier is valid", function (){
            describe("when there are two vegetarian dishes and one Italian dish", function (){
                var padThaiIdentifier;
                var tomKhaVegetableSoupIdentifier;
                var spaghettiIdentifier;
                var vegetarianCategoryIdentifier;
                var italianCategoryIdentifier;

                beforeEach(function (){
                    padThaiIdentifier = null;
                    dishRepository.createDish("Pad Thai", function (createdDishIdentifier) {
                        padThaiIdentifier = createdDishIdentifier;
                    });

                    tomKhaVegetableSoupIdentifier = null;
                    dishRepository.createDish("Tom Kha Vegetable Soup", function (createdDishIdentifier) {
                        tomKhaVegetableSoupIdentifier = createdDishIdentifier;
                    });

                    spaghettiIdentifier = null;
                    dishRepository.createDish("Spaghetti and Meatballs", function (createdDishIdentifier) {
                        spaghettiIdentifier = createdDishIdentifier;
                    });

                    vegetarianCategoryIdentifier = null;
                    dishCategoryRepository.create("Vegetarian", function (createdDishCategoryIdentifier){
                        vegetarianCategoryIdentifier = createdDishCategoryIdentifier;
                    });

                    italianCategoryIdentifier = null;
                    dishCategoryRepository.create("Italian", function (createdDishCategoryIdentifier){
                        italianCategoryIdentifier = createdDishCategoryIdentifier;
                    });

                    dishToDishCategoryRepository.create({
                        dishIdentifier: spaghettiIdentifier,
                        dishCategoryIdentifier: italianCategoryIdentifier,
                    });

                    dishToDishCategoryRepository.create({
                        dishIdentifier: padThaiIdentifier,
                        dishCategoryIdentifier: vegetarianCategoryIdentifier,
                    });

                    dishToDishCategoryRepository.create({
                        dishIdentifier: tomKhaVegetableSoupIdentifier,
                        dishCategoryIdentifier: vegetarianCategoryIdentifier,
                    });

                    var params = {dishCategoryIdentifier: vegetarianCategoryIdentifier};
                    var didPresentDishesInCategory = function (presentedDishes) {
                        dishes = presentedDishes;
                    };
                    var observer = {didPresentDishesInCategory: didPresentDishesInCategory};

                    subject.execute(params, observer);
                });

                it("should present only the dishes in the requested category", function (){
                    var padThai = {
                        identifier: padThaiIdentifier,
                        name: "Pad Thai"
                    };
                    var tomKhaVegetableSoup = {
                        identifier: tomKhaVegetableSoupIdentifier,
                        name: "Tom Kha Vegetable Soup"
                    };
                    var expectedDishes = [padThai, tomKhaVegetableSoup];
                    expect(dishes).toEqual(expectedDishes);
                });
            });
        });
    });
});
