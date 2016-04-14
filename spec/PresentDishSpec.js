//PresentDishSpec.js
"use strict";


var PresentDish = require("../app/PresentDish");
var InMemoryDishRepository = require("../specHelpers/referenceImplementations/InMemoryDishRepository");

describe("PresentDish", function () {
    var subject;
    var dishRepository;

    beforeEach(function () {
        dishRepository = InMemoryDishRepository.new();
        var dependencies = {dishRepository: dishRepository};
        subject = PresentDish.new(dependencies);
    });

    describe("execute", function () {
        describe("when no dishes have been created", function () {
            it("calls the observer's failure function with an error", function () {
                var error = null;
                var observer = {"didFailToPresentDish": function (presentationError) {
                    error = presentationError;
                }};

                subject.execute(1234, observer);
                var expectedError = {
                    code: "com.snacker.errors.PresentDish.execute.invalidIdentifier",
                    message: "No dish with the identifier '1234' currently exists."
                };
                expect(error).toEqual(expectedError);
            });
        });

        describe("when one dish has been created", function () {
            var observer;
            var presentedDish;
            var dishIdentifier;

            beforeEach(function (){
                var success = function(createdDishIdentifier) {
                    dishIdentifier = createdDishIdentifier;
                };
                var emptyFailure = function(){};
                dishRepository.createDish("Pad See Ew", success, emptyFailure);

                presentedDish = null;
                observer = {"didPresentDish": function (dishes) {
                    presentedDish = dishes;
                }};

                subject.execute(dishIdentifier, observer);
            });

            it("presents the requested dish to an observer", function () {
                var expectedDish = {identifier: 0, name: "Pad See Ew"};
                expect(presentedDish).toEqual(expectedDish);
            });
        });
    });
});
