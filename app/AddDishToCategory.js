// AddDishToCategory.js
"use strict";


var exports = module.exports = {};

exports.new = function (dependencies) {
    var _dishRepository = dependencies.dishRepository;
    var _dishCategoryRepository = dependencies.dishCategoryRepository;
    var _dishToDishCategoryRelationshipRepository = dependencies.dishToDishCategoryRelationshipRepository;

    function _execute(identifiers, observer) {
        var dishIdentifier = identifiers.dishIdentifier;
        var dishCategoryIdentifier = identifiers.dishCategoryIdentifier;
        var fetchDishSuccess = function (dish) {
            var fetchDishCategorySuccess = function (dishCategory) {
                _dishToDishCategoryRelationshipRepository.create(identifiers, function () {
                    observer.didAddDishToCategory(dish, dishCategory);
                });
            };
            var fetchDishCategoryFailure = function (repositoryError) {
                var error = {
                    code: "com.snacker.errors.AddDishToCategory.execute.invalidIdentifier",
                    message: "No dish category with the identifier '" + dishCategoryIdentifier + "' currently exists in the dish category repository."
                };
                observer.didFailToAddDishToCategory(error);
            };
            _dishCategoryRepository.fetch(dishCategoryIdentifier, fetchDishCategorySuccess, fetchDishCategoryFailure);
        };
        var fetchDishFailure = function (error) {
            var error = {
                code: "com.snacker.errors.AddDishToCategory.execute.invalidIdentifier",
                message: "No dish with the identifier '" + dishIdentifier + "' currently exists in the dish repository."
            };
            observer.didFailToAddDishToCategory(error);
        };

        _dishRepository.fetchDish(dishIdentifier, fetchDishSuccess, fetchDishFailure);
    }

    return {
        execute: _execute
    };
};
