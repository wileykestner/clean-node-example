// CreateDish.js
"use strict";


var exports = module.exports = {};

exports.new = function (dependencies) {
    var _dishRepository = dependencies.dishRepository;

    function _execute(dishProperties, observer) {
        var dishName = dishProperties.name;
        if (dishName) {
            var success = function (dishIdentifier) {
                observer.didCreateDishWithIdentifier(dishIdentifier);
            };
            _dishRepository.createDish(dishName, success);
        } else {
            var error = {
                code: 'com.snacker.errors.CreateDish.execute.emptyName',
                message: 'Creating a dish requires a valid name, the provided name was an empty string.'
            };
            observer.didFailToCreateDishWithIdentifier(error);
        }




    }

    return {
        execute: _execute
    };
};
