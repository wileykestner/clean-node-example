var dishRepositoryContractSpec = require("../spec_helpers/contract_specs/dishRepositoryContractSpec");
var InMemoryDishRepository = require("../spec_helpers/reference_implementations/InMemoryDishRepository");

var dishRepositoryImplementationTestProvider = {
  provideTestSubject: function () {
    return InMemoryDishRepository.new();
  },
  provideSimulateCreateFailure: function () {
      return function (testSubject) {
        delete testSubject.dishesByIdentifier
      }
  }
};

dishRepositoryContractSpec.runContractSpecs(dishRepositoryImplementationTestProvider);
