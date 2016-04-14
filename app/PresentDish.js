// PresentDish.js
"use strict";


var exports = module.exports = {};

exports.new = function (dependencies) {
    var _dishRepository = dependencies.dishRepository;

    function _execute(dishIdentifier, observer) {
        var success = function (dish) {
            observer.didPresentDish(dish);
        };
        var failure = function (error) {
            var error = {};
            var invalidIdentifierError = {
                code: "com.snacker.errors.PresentDish.execute.invalidIdentifier",
                message: "No dish with the identifier '" + dishIdentifier + "' currently exists."
            };
            observer.didFailToPresentDish(invalidIdentifierError);
        };
        _dishRepository.fetchDish(dishIdentifier, success, failure);
    }

    return {
        execute: _execute
    };
};
