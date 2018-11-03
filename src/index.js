let languageFunctions = require('./lib/languages');
let saveCode = require('./lib/save-code');

function createEvaluator(evalInstance) {
  let evaluator = {
    'language': evalInstance.language,
    'input': evalInstance.input,
    'code': evalInstance.code,
    'fileName': '',
    'resultSet': '',

    'evaluateCode':async function evaluateCode(id) {
      this.fileName = await saveCode(id, evalInstance)
      let languageEvaluator = languageFunctions[this.language];
      this.resultSet = await languageEvaluator(this.input, this.code, this.fileName);

    }
  };
  return evaluator;
}

module.exports = createEvaluator;
