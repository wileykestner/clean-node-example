//CreateDishSpec.js
"use strict";


var CreateDish = require("../app/CreateDish");
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
        var createdDishSuccessCalled;
        var createDishError;
        var createDishErrorCalled;
        var observer;

        beforeEach(function () {
            createdDishIdentifier = null;
            createdDishSuccessCalled = false;
            createDishErrorCalled = false;
            observer = {
                didCreateDishWithIdentifier: function (dishIdentifier) {
                    createdDishSuccessCalled = true;
                    createdDishIdentifier = dishIdentifier;
                },
                didFailToCreateDishWithIdentifier: function (error) {
                    createDishErrorCalled = true;
                    createDishError = error;
                }
            };
        });

        describe("with a valid dish name", function () {
            beforeEach(function (){
                subject.execute({name: "Tom Kha Soup"}, observer);
            });

            it("should notify the observer with the identifier for the created dish", function () {
                expect(createdDishIdentifier).not.toBe(null);
            });

            it("should not call the failure function on the observer", function (){
                expect(createDishErrorCalled).toBe(false);
            });

            it("should store the dish in the repository", function () {
                var fetchedDish = null;
                dishRepository.fetchDish(createdDishIdentifier, function (dish) {
                    fetchedDish = dish;
                });

                var expectedDish = {
                    identifier: createdDishIdentifier,
                    name: "Tom Kha Soup"
                };

                expect(fetchedDish).toEqual(expectedDish);
            });
        });

        describe("with an invalid dish name", function () {
            beforeEach(function (){
                subject.execute({name: ""}, observer);
            });

            it("should notify the observer with the identifier for the created dish", function () {
                var expectedError = {
                    code: "com.snacker.errors.CreateDish.execute.emptyName",
                    message: "Creating a dish requires a valid name, the provided name was an empty string."
                };
                expect(createDishError).toEqual(expectedError);
            });

            it("should not call the success function on the observer", function (){
                expect(createdDishSuccessCalled).toBe(false);
            });

            it("should not store the dish in the repository", function () {
                var capturedError = null;
                var success = null;
                var failure = function (error){
                    capturedError = error;
                };

                dishRepository.fetchDish(createdDishIdentifier, null, failure);

                var expectedError = {
                    code: "com.snacker.errors.dishRepository.fetchDish.invalidIdentifier",
                    message: "No dish with the identifier 'null' currently exists in this repository."
                };

                expect(capturedError).toEqual(expectedError);
            });
        });
    });
});
