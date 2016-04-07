// CreateDish.js
"use strict";


var exports = module.exports = {};

exports.new = function (dependencies) {
    var _dishCategoryRepository = dependencies.dishCategoryRepository;

    function _execute(dishCategoryProperties, observer) {
        var dishCategoryName = dishCategoryProperties.name;

        var success = function (dishCategoryIdentifier) {
            observer.didCreateDishCategoryWithIdentifier(dishCategoryIdentifier);
        };
        _dishCategoryRepository.create(dishCategoryName, success);
    }

    return {
        execute: _execute
    };
};
