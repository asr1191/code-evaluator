const languageFunctions = require('./lib/languages');
const saveCode = require('./lib/save-code');

/**
 * Returns a CodeEvaluator object, given an evalInstance object as argument.
 * @function
 * @constructor
 * @param {evalInstance} evalInstance
 */
function createEvaluator(evalInstance) {
  const evaluator = {
    language: evalInstance.language,
    input: evalInstance.input,
    code: evalInstance.code,
    fileName: '',
    resultSet: {
      stdout: '',
      stderr: '',
    },
    /**
     * Method that takes in an idea along with the object's properties to
     * first save the code and inputs to a file, and then proceed to compile
     * it and/or run the code depending on the language that is given.
     * @param {string} id
     */
    evaluateCode: async function evaluateCode(id) {
      try {
        this.fileName = await saveCode(id, evalInstance);
        const languageEvaluator = languageFunctions[this.language];
        this.resultSet = await languageEvaluator(this.fileName);
      } catch (Err) {
        if (Err.code === 127) {
          Err.code = 'COMPINT_UNAVAILABLE';
        }
        throw Err;
      }
    },
  };
  return evaluator;
}

module.exports = createEvaluator;
