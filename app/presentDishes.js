// presentDishes.js

var exports = module.exports = {};

exports.execute = function (observer) {
  var dishes = ["Tom Kha Soup"];
  observer.didPresentDishes(dishes);
};
