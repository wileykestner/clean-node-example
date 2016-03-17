var meaning = require("../app/answer");

describe("Answer", function () {
  it("knows the answer to the ulitmate question of the meaning of life, the universe, and everything", function () {
    expect(meaning.answerToTheUltimateQuestionOfLifeTheUniverseAndEverything()).toBe(42);
  });
});
