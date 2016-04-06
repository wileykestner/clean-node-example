// PresentDishes.js

var exports = module.exports = {};

exports.new = function (dependencies) {
  return {
    execute: execute,
    _dishRepository: dependencies.dishRepository
  };

  function execute (observer) {
    var success = function (allDishes) {
        observer.didPresentDishes(allDishes);
    };
    this._dishRepository.fetchAllDishes(success);
  }
};
