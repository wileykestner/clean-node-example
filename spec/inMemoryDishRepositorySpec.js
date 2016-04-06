var dishRepositoryContractSpec = require("../spec_helpers/contract_specs/dishRepositoryContractSpec");
var inMemoryDishRepository = require("../spec_helpers/reference_implementations/inMemoryDishRepository");

var dishRepositoryImplementationTestProvider = {
  provideTestSubject: function () {
    return inMemoryDishRepository.new();
  },
  provideSetupCreateFailure: function () {
      return function (testSubject) {
        delete testSubject._dishes_by_identifier
      }
  }
};

dishRepositoryContractSpec.runContractSpecs(dishRepositoryImplementationTestProvider);
