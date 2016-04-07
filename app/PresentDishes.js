// PresentDishes.js
"use strict";


var exports = module.exports = {};

exports.new = function (dependencies) {
    var dishRepository = dependencies.dishRepository;

    function _execute(observer) {
        var success = function (allDishes) {
            observer.didPresentDishes(allDishes);
        };
        dishRepository.fetchAllDishes(success);
    }

    return {
        execute: _execute
    };
};
