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

    function _fetchDishCategory(dishCategoryIdentifier, success) {
        var dishCategory = _dishCategoriesByIdentifier[dishCategoryIdentifier];
        success(dishCategory);
    }

    return {
        create: _createDishCategory,
        fetch: _fetchDishCategory,
        dishCategoriesByIdentifier: _dishCategoriesByIdentifier
    };
};
