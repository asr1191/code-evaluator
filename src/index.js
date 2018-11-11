const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const languageFunctions = require('./lib/languages');
const saveCodeFn = require('./lib/save-code');

const fsUnlink = promisify(fs.unlink);
/**
 * Returns a CodeEvaluator object, given an evalInstance object as argument.
 *
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
     * Method that takes in an id along with the object's properties to
     * save the code and inputs to a file.
     *
     * @param {string} id
     */
    saveCode: async function saveCode(id) {
      try {
        this.fileName = await saveCodeFn(id, evalInstance, this.codeDir, this.inputDir);
      } catch (Err) {
        if (Err.code === 127) {
          Err.code = 'COMPINT_UNAVAILABLE';
        }
        throw Err;
      }
    },
    /**
     * Method that compiles/runs the code from existing code and input files
     * @async
     * @function
     */
    runCode: async function runCode() {
      try {
        const languageEvaluator = languageFunctions[this.language];
        this.resultSet = await languageEvaluator(this.fileName, this.codeDir, this.inputDir);
      } catch (Err) {
        throw Err;
      }
    },
    /**
     * Method that deleted the current CodeEvaluator object's associated code
     * and input files.
     *
     * @async
     * @function
     */
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
