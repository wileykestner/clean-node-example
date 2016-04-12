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
        _dishRepository.fetchDish(dishIdentifier, function (dish) {
            _dishCategoryRepository.fetch(dishCategoryIdentifier, function (dishCategory) {
                _dishToDishCategoryRelationshipRepository.create(identifiers, function () {
                    observer.didAddDishToCategory(dish, dishCategory);
                });
            });
        });
    }

    return {
        execute: _execute
    };
};
