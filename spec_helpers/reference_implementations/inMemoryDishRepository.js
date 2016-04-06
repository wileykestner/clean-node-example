// inMemoryDishRepository.js

var exports = module.exports = {};

exports.new = function () {
  return {
    createDish: createDish,
    fetchDish: fetchDish,
    removeDish: removeDish,
    _dishes_by_identifier: {}
  }

  function createDish (name, success, failure) {
    try {
      var nextAvailableIdentifier = Object.keys(this._dishes_by_identifier).length;
      var newDish = {identifier: nextAvailableIdentifier, name: name};
      this._dishes_by_identifier[nextAvailableIdentifier] = newDish;
      success(nextAvailableIdentifier);
    }
    catch (e) {
      var error = {
        code: "com.snacker.errors.dishRepository.createDish.dishCreationException",
        message: "There was an unspecified error during dish creation."
      };
      failure(error);
    }
  }

  function fetchDish (dishIdentifier, success, failure) {
    var dish = this._dishes_by_identifier[dishIdentifier]
    if (dish) {
      success(dish);
    }
    else {
      var invalidIdentifierError = {
        code: "com.snacker.errors.dishRepository.fetchDish.invalidIdentifier",
        message: "No dish with the identifier '" + dishIdentifier + "' currently exists in this repository."
      };
      failure(invalidIdentifierError);
    }
  }

  function removeDish (dishIdentifier, success, failure) {
    var dishToRemove = this._dishes_by_identifier[dishIdentifier];
    if (dishToRemove) {
      delete this._dishes_by_identifier[dishIdentifier]

      success(dishToRemove);
    }
    else {
      var expectedError = {
        code: "com.snacker.errors.dishRepository.removeDish.invalidIdentifier",
        message: "Cannot remove dish with the identifier '" + dishIdentifier + "' because no such dish with that identifier currently exists in this repository."
      };
      failure(expectedError);
    }
  }
};
