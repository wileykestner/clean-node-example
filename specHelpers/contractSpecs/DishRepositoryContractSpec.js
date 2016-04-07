//dishRepositoryContractSpec.js
"use strict";


var exports = module.exports = {};

exports.runContractSpecs = function (dishRepositoryImplementationTestProvider) {

    describe("DishRepositoryContract", function (){
        var subject;
        var simulateCreateFailure;

        beforeEach(function() {
            simulateCreateFailure = dishRepositoryImplementationTestProvider.provideSimulateCreateFailure();
            subject = dishRepositoryImplementationTestProvider.provideTestSubject();
        });

        describe("createDish", function(){
            describe("when dish creation succeeds", function (){
                var fetchSuccess;
                var capturedDish;
                var createSuccess;
                var capturedCreatedDishIdentifier;

                beforeEach(function (done) {
                    capturedCreatedDishIdentifier = null;
                    createSuccess = function(createdDishIdentifier) {
                        capturedCreatedDishIdentifier = createdDishIdentifier;
                        done();
                    };

                    subject.createDish("Pad Thai", createSuccess);

                    capturedDish = null;
                    fetchSuccess = function (fetchedDish) {
                        capturedDish = fetchedDish;
                        done();
                    };

                    subject.fetchDish(capturedCreatedDishIdentifier, fetchSuccess);
                });

                it("should call the success callback with the created dish", function() {
                    expect(Object.keys(capturedDish).length).toEqual(2);
                    expect(capturedDish.identifier).toEqual(capturedCreatedDishIdentifier);
                    expect(capturedDish.name).toEqual("Pad Thai");
                });
            });

            describe("when dish creation fails", function () {
                var createFailure;
                var capturedCreateError;

                beforeEach(function (done){
                    simulateCreateFailure(subject);

                    capturedCreateError = null;
                    createFailure = function(createError) {
                        capturedCreateError = createError;
                        done();
                    };

                    var nullSuccess = null;
                    subject.createDish("Pad Thai", nullSuccess, createFailure);
                });

                it("should pass an error to the success function", function () {
                    var expectedError = {
                        code: "com.snacker.errors.dishRepository.createDish.dishCreationException",
                        message: "There was an unspecified error during dish creation."
                    };

                    var errorKeyCount = Object.keys(capturedCreateError).length;
                    expect(errorKeyCount).toEqual(3);
                    expect(capturedCreateError.code).toEqual("com.snacker.errors.dishRepository.createDish.dishCreationException");
                    expect(capturedCreateError.message).toEqual("There was an unspecified error during dish creation.");
                    expect(capturedCreateError.underlyingException).toBeDefined();
                    expect(capturedCreateError.underlyingException).not.toBe(null);
                });
            });
        });

        describe("fetchDish", function () {
            var capturedIdentifier;
            beforeEach(function () {
                subject.createDish("Phrik Thai", function (dishIdentifier) {
                    capturedIdentifier = dishIdentifier;
                });
            });

            it("should pass the dish to the success function when called with a valid dish identifier", function () {
                var capturedDish = null;
                subject.fetchDish(capturedIdentifier, function (dish) {
                    capturedDish = dish;
                });

                var expectedDish = {
                    identifier: capturedIdentifier,
                    name: "Phrik Thai"
                };

                expect(capturedDish).toEqual(expectedDish);
            });

            it("should pass an error to the failure function when called with an invalid dish identifier", function () {
                var capturedError = null;
                var unusedSuccess = null;
                subject.fetchDish(1234, unusedSuccess, function (error) {
                    capturedError = error;
                });

                var expectedError = {
                    code: "com.snacker.errors.dishRepository.fetchDish.invalidIdentifier",
                    message: "No dish with the identifier '1234' currently exists in this repository."
                };
                expect(capturedError).toEqual(expectedError);
            });
        });

        describe("removeDish", function () {
            describe("when the dish to remove exists", function (){
                var capturedIdentifier;
                var capturedRemovedDish;
                var capturedRemoveError;

                beforeEach(function (){
                    var nullFailure = null;

                    capturedIdentifier = null;
                    var createSuccess = function (dishIdentifier) {
                        capturedIdentifier =  dishIdentifier;
                    };

                    capturedRemovedDish = null;
                    var removeSuccess = function (removedDish) {
                        capturedRemovedDish =  removedDish;
                    };

                    capturedRemoveError = null;
                    var removeFailure = function (removeError) {
                        capturedRemoveError =  removeError;
                    };

                    subject.createDish("Potatoes au Gratin", createSuccess, nullFailure);

                    subject.removeDish(capturedIdentifier, removeSuccess, removeFailure);
                });

                it("should call the success block with the removed dish", function (){
                    var expectedDish = {
                        identifier: capturedIdentifier,
                        name: "Potatoes au Gratin"
                    };
                    expect(capturedRemovedDish).toEqual(expectedDish);
                });

                it("should not call the failure function", function (){
                    expect(capturedRemoveError).toEqual(null);
                });
            });

            describe("when the dish to remove does not exist", function (){
                var capturedRemovedDish;
                var capturedError;

                beforeEach(function (done){
                    capturedRemovedDish = null;
                    var removeSuccess = function (removedDish) {
                        capturedRemovedDish = removedDish;
                        done();
                    };

                    capturedError = null;
                    var removeFailure = function (error) {
                        capturedError = error;
                        done();
                    };

                    subject.removeDish(1234, removeSuccess, removeFailure);
                });

                it("should call the failure block with an error", function (){
                    var expectedError = {
                        code: "com.snacker.errors.dishRepository.removeDish.invalidIdentifier",
                        message: "Cannot remove dish with the identifier '1234' because no such dish with that identifier currently exists in this repository."
                    };
                    expect(capturedError).toEqual(expectedError);
                });
            });
        });

        describe("fetchAllDishes", function () {
            describe("when no dishes have been created", function () {
                var capturedDishes;

                beforeEach(function (){
                    capturedDishes = null;
                    var success = function (allDishes) {
                        capturedDishes = allDishes;
                    };

                    subject.fetchAllDishes(success);
                });

                it("should succeed with an empty list", function (){
                    expect(capturedDishes).toEqual([]);
                });
            });

            describe("when a single dish has been created", function () {
                var capturedDishes;

                beforeEach(function (){
                    subject.createDish("Spring Rolls", function(){}, function() {});

                    capturedDishes = null;
                    var success = function (allDishes) {
                        capturedDishes = allDishes;
                    };

                    subject.fetchAllDishes(success);
                });

                it("should call the success function with a one-element list containing the single dish ", function (){
                    var expectedDish = {identifier: 0, name: "Spring Rolls"};
                    var expectedDishes = [expectedDish];

                    expect(capturedDishes).toEqual(expectedDishes);
                });
            });
        });
    });
};
