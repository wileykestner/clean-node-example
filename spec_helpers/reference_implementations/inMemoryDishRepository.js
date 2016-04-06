// inMemoryDishRepository.js

var exports = module.exports = {};

exports.new = function () {
  return {
    createDish: createDish,
    fetchDish: fetchDish,
    _dishes_by_identifier: {}
  }

  function createDish (name, success) {
    var nextAvailableIdentifier = Object.keys(this._dishes_by_identifier).length;
    var newDish = {identifier: nextAvailableIdentifier, name: name};
    this._dishes_by_identifier[nextAvailableIdentifier] = newDish;

    success(nextAvailableIdentifier);
  }

  function fetchDish (dishIdentifier, success) {
    var dish = this._dishes_by_identifier[dishIdentifier]
    if (dish) {
      success(dish);
    }
  }
};
