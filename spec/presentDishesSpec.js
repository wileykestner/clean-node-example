var presentDishes = require("../app/presentDishes");

describe("presentDishes", function () {
  var subject, observer, presentedDishes;

  beforeEach(function () {
    subject = presentDishes;
    presentedDishes = null;
    observer = {"didPresentDishes": function (dishes) {
      presentedDishes = dishes;
    }};
  });

  it("presents a list of dishes to an observer", function () {
    presentDishes.execute(observer);

    var expectedDishes = ["Tom Kha Soup"];
    expect(presentedDishes).toEqual(expectedDishes);
  });
});
