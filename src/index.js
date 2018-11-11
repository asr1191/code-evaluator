const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const languageFunctions = require('./lib/languages');
const saveCode = require('./lib/save-code');

const fsUnlink = promisify(fs.unlink);
/**
 * Returns a CodeEvaluator object, given an evalInstance object as argument.
 * @function
 * @constructor
 * @param {evalInstance} evalInstance
 * @param {codeDir} string
 * @param {inputDir} string
 */
function createEvaluator(evalInstance, codeDir, inputDir) {
  const evaluator = {
    language: evalInstance.language,
    code: evalInstance.code,
    input: evalInstance.input,
    fileName: '',
    inputDir,
    codeDir,
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
        this.fileName = await saveCode(id, evalInstance, this.codeDir, this.inputDir);
        await this.runCode();
      } catch (Err) {
        if (Err.code === 127) {
          Err.code = 'COMPINT_UNAVAILABLE';
        }
        throw Err;
      }
    },
    runCode: async function runCode() {
      try {
        const languageEvaluator = languageFunctions[this.language];
        this.resultSet = await languageEvaluator(this.fileName, this.codeDir, this.inputDir);
      } catch (Err) {
        throw Err;
      }
    },
    clearFiles: async function clearFiles() {
      try {
        await fsUnlink(path.resolve(this.codeDir, this.fileName));
        await fsUnlink(path.resolve(this.inputDir, `${this.fileName}.input`));
      } catch (Err) {
        throw Err;
      }
    },
  };
  return evaluator;
}

module.exports = createEvaluator;
