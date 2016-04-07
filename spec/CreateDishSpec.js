//CreateDishSpec.js
"use strict";


var CreateDish = require("../app/CreateDish");
var PresentDishes = require("../app/PresentDishes");
var InMemoryDishRepository = require("../specHelpers/referenceImplementations/InMemoryDishRepository");

describe("CreateDish", function () {
    var subject;
    var dishRepository;

    beforeEach(function () {
        dishRepository = InMemoryDishRepository.new();
        var dependencies = {dishRepository: dishRepository};
        subject = CreateDish.new(dependencies);
    });

    describe("execute", function () {
        var createdDishIdentifier;
        var observer;

        beforeEach(function () {
            createdDishIdentifier = null;
            observer = {didCreateDishWithIdentifier: function (dishIdentifier) {
                createdDishIdentifier = dishIdentifier;
            }};

            subject.execute({name: "Tom Kha Soup"}, observer);
        });

        it("should notify the observer with the identifier for the created dish", function () {
            expect(createdDishIdentifier).not.toBe(null);
        });

        it("should able to present the created dish", function () {
            var presentedDishes = null;
            var presentedDishes = PresentDishes.new({dishRepository: dishRepository});
            presentedDishes.execute({didPresentDishes: function (dishes) {
                presentedDishes = dishes;
            }});

            var expectedDish = {
                identifier: createdDishIdentifier,
                name: "Tom Kha Soup"
            };
            var expectedDishes = [expectedDish];

            expect(presentedDishes).toEqual(expectedDishes);
        });
    });
});
