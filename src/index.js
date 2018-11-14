const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const languageEvaluatorObjects = require('./lib/languages');
const saveCodeFn = require('./lib/save-code');

const fsUnlink = promisify(fs.unlink);
const parentModuleDirectory = path.dirname(module.parent.filename);

/**
 * Returns a CodeEvaluator object, given an evalInstance object as argument.
 *
 * @function
 * @constructor
 * @param {evalInstance} evalInstance
 * @param {codeDir} string
 * @param {inputDir} string
 */
function createEvaluator(evalInstance, codeDirRelative, inputDirRelative, compileDirRelative) {
  const evaluator = {
    language: evalInstance.language,
    code: evalInstance.code,
    input: evalInstance.input,
    fileName: '',
    codeDir: path.resolve(parentModuleDirectory, codeDirRelative),
    inputDir: path.resolve(parentModuleDirectory, inputDirRelative),
    compileDir: path.resolve(parentModuleDirectory, compileDirRelative),
    languageEvaluator: languageEvaluatorObjects[evalInstance.language],
    languageEvaluatorInstance: this.languageEvaluator(
      this.fileName,
      this.codeDir,
      this.inputDir,
      this.compileDir,
    ),
    resultSet: {
      stdout: '',
      stderr: '',
    },
    /**
     * Method that takes in an id along with the object's properties to save
     * the code and inputs to a file. Code file has no extension, while input
     * files have an `.input` extension.
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
     * Method compiles code from existing codeFile and outputs to a file
     * having the same filename with a `.out` extension.
     * @async
     * @function
     */
    compileCode: async function compileCode() {
      try {
        this.resultSet = await this.languageEvaluatorInstance.compileCode();
      } catch (Err) {
        throw Err;
      }
    },
    /**
     * Method that runs the code from existing code and input files
     * @async
     * @function
     */
    runCode: async function runCode() {
      try {
        this.resultSet = await this.languageEvaluatorInstance.runCode();
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
        await fsUnlink(path.resolve(this.compileDir, `${this.fileName}.out`));
      } catch (Err) {
        console.err(Err.message);
      }
    },
  };


  return evaluator;
}

module.exports = createEvaluator;
