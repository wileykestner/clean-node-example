// CreateDish.js
"use strict";


var exports = module.exports = {};

exports.new = function (dependencies) {
    var dishRepository = dependencies.dishRepository;

    function execute(dishProperties, observer) {
        var dishName = dishProperties.name;

        var success = function (dishIdentifier) {
            observer.didCreateDishWithIdentifier(dishIdentifier);
        };
        dishRepository.createDish(dishName, success);
    }

    return {
        execute: execute
    };
};
