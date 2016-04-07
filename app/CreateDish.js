// CreateDish.js
"use strict";


var exports = module.exports = {};

exports.new = function (dependencies) {
    var _dishRepository = dependencies.dishRepository;

    function _execute(dishProperties, observer) {
        var dishName = dishProperties.name;

        var success = function (dishIdentifier) {
            observer.didCreateDishWithIdentifier(dishIdentifier);
        };
        _dishRepository.createDish(dishName, success);
    }

    return {
        execute: _execute
    };
};
