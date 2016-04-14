// PresentDishesInDishCategory.js
"use strict";


var exports = module.exports = {};

exports.new = function (dependencies) {
    var _dishRepository = dependencies.dishRepository;
    var _dishToDishCategoryRepository = dependencies.dishToDishCategoryRepository;

    function _execute(params, observer) {
        var dishCategoryIdentifier = params.dishCategoryIdentifier;

        var success = function (dishIdentifiers) {
            var dishes = [];
            for (var i = 0; i < dishIdentifiers.length; i++) {
                var dishIdentifier = dishIdentifiers[i];

                var fetchDishSuccess = function (dish){
                    dishes.push(dish);
                };
                _dishRepository.fetchDish(dishIdentifier, fetchDishSuccess);
            }
            observer.didPresentDishesInCategory(dishes);
        };

        _dishToDishCategoryRepository.fetchDishIdentifiersForDishCategoryIdentifier(
            dishCategoryIdentifier,
            success
        );
    }

    return {
        execute: _execute
    };
};
