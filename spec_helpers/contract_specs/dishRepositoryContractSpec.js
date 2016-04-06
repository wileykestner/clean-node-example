var exports = module.exports = {};

exports.runContractSpecs = function (dishRepositoryImplementationTestProvider) {

  describe("DishRepositoryContract", function (){
    var subject, setupCreateFailure, setupFetchFailure;

    beforeEach(function() {
      subject = dishRepositoryImplementationTestProvider.provideTestSubject();
    });

    describe("createDish", function(){
      var createSuccess;
      var capturedCreatedDishIdentifier;

      beforeEach(function(done){
        capturedCreatedDishIdentifier = null;
        capturedCreateError = null;

        createSuccess = function(createdDishIdentifier) {
          capturedCreatedDishIdentifier = createdDishIdentifier;
          done();
        };

        subject.createDish("Pad Thai", createSuccess);
      });

      describe("when dish creation succeeds", function (){
        var fetchSuccess;
        var capturedDish;

        beforeEach(function (done){
          capturedDish = null;

          fetchSuccess = function (fetchedDish) {
            capturedDish = fetchedDish;
            done();
          };

          subject.fetchDish(capturedCreatedDishIdentifier, fetchSuccess);
        });

        it("should call `fetchSuccess` with the created dish", function() {
          expect(capturedDish.identifier).toEqual(capturedCreatedDishIdentifier);
          expect(capturedDish.name).toEqual("Pad Thai");
        });
      });
    });

    describe("fetchDish", function () {
      var capturedIdentifier;
      beforeEach(function () {
        subject.createDish("Phrik Thai", function (dishIdentifier) {
          capturedIdentifier = dishIdentifier;
        });
      });

      it("should pass the dish to the success function when called with a valid dish identifier", function () {
        var capturedDish = null;
        subject.fetchDish(capturedIdentifier, function (dish) {
          capturedDish = dish;
        });

        var expectedDish = {
          identifier: capturedIdentifier,
          name: "Phrik Thai"
        };

        expect(capturedDish).toEqual(expectedDish);
      });

      it("should pass an error to the failure function when called with an invalid dish identifier", function () {
        var capturedError = null;
        var unusedSuccess = null;
        subject.fetchDish(1234, unusedSuccess, function (error) {
          capturedError = error;
        });

        var expectedError = {
          code: "com.snacker.errors.dishRepository.fetchDish.invalidIdentifier",
          message: "No dish with the identifier '1234' currently exists in this repository."
        };
        expect(capturedError).toEqual(expectedError);
      });
    });
  });
};
