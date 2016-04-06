var exports = module.exports = {};

exports.runContractSpecs = function (dishRepositoryImplementationTestProvider) {

  describe("DishRepositoryContract", function (){
    var subject, simulateCreateFailure;

    beforeEach(function() {
      simulateCreateFailure = dishRepositoryImplementationTestProvider.provideSimulateCreateFailure();
      subject = dishRepositoryImplementationTestProvider.provideTestSubject();
    });

    describe("createDish", function(){

      describe("when dish creation succeeds", function (){
        var fetchSuccess, capturedDish, createSuccess, capturedCreatedDishIdentifier;

        beforeEach(function (done){

          capturedCreatedDishIdentifier = null;
          createSuccess = function(createdDishIdentifier) {
            capturedCreatedDishIdentifier = createdDishIdentifier;
            done();
          };

          subject.createDish("Pad Thai", createSuccess);

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

      describe("when dish creation fails", function () {
        var createFailure, capturedCreateError;

        beforeEach(function (done){
          simulateCreateFailure(subject);

          capturedCreateError = null;
          createFailure = function(createError) {
            capturedCreateError = createError;
            done();
          };

          var nullSuccess = null;
          subject.createDish("Pad Thai", nullSuccess, createFailure);
        });

        it("should pass an error to the success function", function () {
          var expectedError = {
            code: "com.snacker.errors.dishRepository.createDish.dishCreationException",
            message: "There was an unspecified error during dish creation."
          };

          expect(capturedCreateError).toEqual(expectedError);
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
