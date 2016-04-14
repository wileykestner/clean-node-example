// InMemoryDishToDishCategoryRelationshipRepository.js
"use strict";


var exports = module.exports = {};

exports.new = function () {
    var _categoryIdentifiersToDishIdentifiers = {};
    function _create(properties, success) {
        var dishIdentifier = properties.dishIdentifier;
        var dishCategoryIdentifier = properties.dishCategoryIdentifier;

        if (!_categoryIdentifiersToDishIdentifiers[dishCategoryIdentifier]) {
            _categoryIdentifiersToDishIdentifiers[dishCategoryIdentifier] = [];
        }
        _categoryIdentifiersToDishIdentifiers[dishCategoryIdentifier].push(dishIdentifier);

        if (success) {
            success();
        }
    }

    function _fetchDishIdentifiersForDishCategoryIdentifier(dishCategoryIdentifier, success){
        var dishIdentifiers = _categoryIdentifiersToDishIdentifiers[dishCategoryIdentifier];
        if (dishIdentifiers) {
            success(dishIdentifiers);
        }
    };

    return {
        create: _create,
        fetchDishIdentifiersForDishCategoryIdentifier: _fetchDishIdentifiersForDishCategoryIdentifier
    };
};
