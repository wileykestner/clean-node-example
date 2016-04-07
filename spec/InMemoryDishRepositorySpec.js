//InMemoryDishRepositorySpec.js
"use strict";


var dishRepositoryContractSpec = require("../specHelpers/contractSpecs/DishRepositoryContractSpec");
var InMemoryDishRepository = require("../specHelpers/referenceImplementations/InMemoryDishRepository");

var dishRepositoryImplementationTestProvider = {
    provideTestSubject: function () {
        return InMemoryDishRepository.new();
    },
    provideSimulateCreateFailure: function () {
        return function (testSubject) {
            delete testSubject.dishesByIdentifier;
        };
    }
};

dishRepositoryContractSpec.runContractSpecs(dishRepositoryImplementationTestProvider);
