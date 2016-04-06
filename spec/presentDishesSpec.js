var presentDishes = require("../app/presentDishes");

describe("presentDishes", function () {
  var subject;

  beforeEach(function () {
    subject = presentDishes;
  });

  it("presents a list of dishes to an observer", function () {
    var presentedDishes = null;
    var observer = {"didPresentDishes": function (dishes) {
      presentedDishes = dishes;
    }};

    presentDishes.execute(observer);

    var expectedDishes = ["Tom Kha Soup"];
    expect(presentedDishes).toEqual(expectedDishes);
  });
});
