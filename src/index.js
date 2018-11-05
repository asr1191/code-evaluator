const languageFunctions = require('./lib/languages');
const saveCode = require('./lib/save-code');

function createEvaluator(evalInstance) {
  const evaluator = {
    language: evalInstance.language,
    input: evalInstance.input,
    code: evalInstance.code,
    fileName: '',
    resultSet: '',

    evaluateCode: async function evaluateCode(id) {
      try {
        this.fileName = await saveCode(id, evalInstance);
        const languageEvaluator = languageFunctions[this.language];
        this.resultSet = await languageEvaluator(this.fileName);
      } catch (Err) {
        throw Err;
      }
    },
  };
  return evaluator;
}

module.exports = createEvaluator;
