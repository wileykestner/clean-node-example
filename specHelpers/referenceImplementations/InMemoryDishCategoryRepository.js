// InMemoryDishCategoryRepository.js
"use strict";


var exports = module.exports = {};

exports.new = function () {
    var _dishCategoriesByIdentifier = {};

    function _createDishCategory(name, success) {
        var nextAvailableIdentifier = Object.keys(_dishCategoriesByIdentifier).length;
        var dishCategory = {identifier: nextAvailableIdentifier, name: name};
        _dishCategoriesByIdentifier[nextAvailableIdentifier] = dishCategory;
        success(nextAvailableIdentifier);
    }

    function _fetchDishCategory(dishCategoryIdentifier, success, failure) {
        var dishCategory = _dishCategoriesByIdentifier[dishCategoryIdentifier];
        if (dishCategory) {
            success(dishCategory);
        } else {
            var error = {
                code: "com.snacker.errors.DishCategoryRepository.fetchDishCategory.invalidIdentifier",
                message: "No dish category with the identifier '" + dishCategoryIdentifier + "' currently exists in the dish category repository."
            };
            failure(error);
        }
    }

    return {
        create: _createDishCategory,
        fetch: _fetchDishCategory,
        dishCategoriesByIdentifier: _dishCategoriesByIdentifier
    };
};
