let languageEvaluatorList = require('./lib/language-evaluator-list');
let saveCode = require('./lib/save-code');

function createEvaluator(evalInstance) {
  let evaluator = {
    'language': evalInstance.language,
    'input': evalInstance.input,
    'code': evalInstance.code,

    'evaluateCode': function evaluateCode(id) {
      //TODO Set Callback
      this.fileLocation = saveCode();

      //TODO List compatibility for Input
      let languageEvaluator = languageEvaluatorList[this.language];
      let resultSet = languageEvaluator(this.input, this.code, this.fileLocation);
      return resultSet;
    }
  };
  return evaluator;
}

module.exports = createEvaluator;
