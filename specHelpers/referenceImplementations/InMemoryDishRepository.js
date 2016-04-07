// InMemoryDishRepository.js
"use strict";


var exports = module.exports = {};

exports.new = function () {
    var _dishesByIdentifier = {};

    function _createDish(name, success, failure) {
        try {
            var nextAvailableIdentifier = Object.keys(_dishesByIdentifier).length;
            var newDish = {identifier: nextAvailableIdentifier, name: name};
            _dishesByIdentifier[nextAvailableIdentifier] = newDish;
            success(nextAvailableIdentifier);
        } catch (exception) {
            var error = {
                code: "com.snacker.errors.dishRepository.createDish.dishCreationException",
                message: "There was an unspecified error during dish creation.",
                underlyingException: exception
            };
            failure(error);
        }
    }

    function _fetchDish(dishIdentifier, success, failure) {
        var dish = _dishesByIdentifier[dishIdentifier];
        if (dish) {
            success(dish);
        } else {
            var invalidIdentifierError = {
                code: "com.snacker.errors.dishRepository.fetchDish.invalidIdentifier",
                message: "No dish with the identifier '" + dishIdentifier + "' currently exists in this repository."
            };
            failure(invalidIdentifierError);
        }
    }

    function _fetchAllDishes(success) {
        var keys = Object.keys(_dishesByIdentifier);
        var sortedKeys = keys.sort(function(a, b) { return a - b; });

        var allDishes = [];
        for (var i = 0; i < sortedKeys.length; i++) {
            var key = sortedKeys[i];
            var dish = _dishesByIdentifier[key];
            allDishes.push(dish);
        }

        success(allDishes);
    }

    function _removeDish(dishIdentifier, success, failure) {
        var dishToRemove = _dishesByIdentifier[dishIdentifier];
        if (dishToRemove) {
            delete _dishesByIdentifier[dishIdentifier];

            success(dishToRemove);
        } else {
            var expectedError = {
                code: "com.snacker.errors.dishRepository.removeDish.invalidIdentifier",
                message: "Cannot remove dish with the identifier '" + dishIdentifier + "' because no such dish with that identifier currently exists in this repository."
            };
            failure(expectedError);
        }
    }

    return {
        createDish: _createDish,
        fetchDish: _fetchDish,
        fetchAllDishes: _fetchAllDishes,
        removeDish: _removeDish,
        dishesByIdentifier: _dishesByIdentifier
    };
};
