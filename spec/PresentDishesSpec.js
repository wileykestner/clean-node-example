//PresentDishesSpec.js
"use strict";


var PresentDishes = require("../app/PresentDishes");
var InMemoryDishRepository = require("../specHelpers/referenceImplementations/InMemoryDishRepository");

describe("PresentDishes", function () {
    var subject;
    var dishRepository;

    beforeEach(function () {
        dishRepository = InMemoryDishRepository.new();
        var dependencies = {dishRepository: dishRepository}
        subject = PresentDishes.new(dependencies);
    });

    describe("when no dishes have been created", function () {
        it("presents an empty list of dishes to an observer", function () {
            var presentedDishes = null;
            var observer = {"didPresentDishes": function (dishes) {
                presentedDishes = dishes;
            }};

            subject.execute(observer);

            var expectedDishes = [];
            expect(presentedDishes).toEqual(expectedDishes);
        });
    });

    describe("when one dish has been created", function () {
        beforeEach(function (){
            var emptySuccess = function(){};
            var emptyFailure = function(){};
            dishRepository.createDish("Pad See Ew", emptySuccess, emptyFailure);
        });

        it("presents a list containing the single created dish to an observer", function () {
            var presentedDishes = null;
            var observer = {"didPresentDishes": function (dishes) {
                presentedDishes = dishes;
            }};

            subject.execute(observer);
            var expectedDish = {identifier: 0, name: "Pad See Ew"};
            var expectedDishes = [expectedDish];
            expect(presentedDishes).toEqual(expectedDishes);
        });
    });
});
