const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const languageEvaluatorObjects = require('./lib/languages');
const saveCodeFn = require('./lib/save-code');
const saveInputFn = require('./lib/save-input');

const fsUnlink = promisify(fs.unlink);
const parentModuleDirectory = path.dirname(module.parent.filename);

/**
 * Returns a CodeEvaluator object.
 *
 * @function
 * @constructor
 * @param {evalInstance} evalInstance contains `language` , `input`, and `code`.
 * @param {codeDirRelative} string module relative directory for storing code files.
 * @param {inputDirRelative} string module relative directory for storing input files.
 * @param {compileDirRelative} string module relative directory for storing compiled binary files.
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

    resultSet: {
      stdout: '',
      stderr: '',
    },
    instantiateLanguageEvaluator() {
      this.languageEvaluatorInstance = this.languageEvaluator(
        this.fileName,
        this.codeDir,
        this.inputDir,
        this.compileDir,
      );
    },
    instantiateLanguageEvaluator(id) {
      this.fileName = `${this.language}_${id}`;
      this.languageEvaluatorInstance = this.languageEvaluator(
        this.fileName,
        this.codeDir,
        this.inputDir,
        this.compileDir,
      );
    },
    /**
     * Saves a codefile with the corresponding `id`.
     *
     * @param {string} id used to identify code, input, binary files.
     * @async
     * @function
     */
    async saveCode(id) {
      try {
        this.fileName = await saveCodeFn(id, evalInstance, this.codeDir);
        this.instantiateLanguageEvaluator();
      } catch (Err) {
        throw Err;
      }
    },
    /**
     * Saves an input file with the corresponding `id`, with a `.input`
     * extension.
     * @param {string} id used to identify code, input, binary files.
     * @async
     * @function
     */
    async saveInput(id) {
      try {
        this.fileName = await saveInputFn(id, evalInstance, this.inputDir);
      } catch (Err) {
        throw Err;
      }
    },
    /**
     * Compiles code from existing codeFile and outputs to a file
     * having the same filename with a `.out` extension.
     * @async
     * @function
     */
    async compileCode() {
      try {
        if (this.languageEvaluatorInstance.isCompilable) {
          this.resultSet = await this.languageEvaluatorInstance.compileCode();
          return true;
        } else {
          console.error(`${this.language} does not need compilation`);
        }
      } catch (Err) {
        if (Err.code === 1){
          this.resultSet.stdout = Err.stdout;
          this.resultSet.stderr = Err.stderr;
          return false;
        } else {
          Err.code = 'COMPILATION_ERROR';
          throw Err;
        }
      }
    },
    /**
     * Runs the code from existing code and input files.
     * @async
     * @function
     */
    async runCode() {
      try {
        this.resultSet = await this.languageEvaluatorInstance.runCode();
      } catch (Err) {
        Err.code = 'CODERUN_ERROR';
        throw Err;
      }
    },
    /**
     * Deletes the current CodeEvaluator object's associated code
     * and input files.
     *
     * @async
     * @function
     */
    async clearFiles() {
      try {
        await fsUnlink(path.resolve(this.codeDir, this.fileName));
        await fsUnlink(path.resolve(this.inputDir, `${this.fileName}.input`));
        if (this.languageEvaluatorInstance.isCompilable) {
          await fsUnlink(path.resolve(this.compileDir, `${this.fileName}.out`));
        }
      } catch (Err) {
        console.log(Err.message);
      }
    },
  };
  return evaluator;
}

module.exports = createEvaluator;
