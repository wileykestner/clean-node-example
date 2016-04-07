// PresentDishes.js
"use strict";


var exports = module.exports = {};

exports.new = function (dependencies) {
    var _dishRepository = dependencies.dishRepository;

    function _execute(observer) {
        var success = function (allDishes) {
            observer.didPresentDishes(allDishes);
        };
        _dishRepository.fetchAllDishes(success);
    }

    return {
        execute: _execute
    };
};
