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
  });
};
