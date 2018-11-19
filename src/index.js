const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const languageEvaluatorObjects = require('./lib/languages');
const saveCodeFn = require('./lib/save-code');
const saveInputFn = require('./lib/save-input');

const fsUnlink = promisify(fs.unlink);
const parentModuleDirectory = path.dirname(module.parent.filename);

/**
 * CodeEvaluator class provides an API for source codes in supported languages to
 * be compiled and run, giving back the a resultset of its STDOUT and STDERR outputs.
 *
 * @class
 */
class CodeEvaluator {
  /**
  * Returns a CodeEvaluator object.
  * @constructor
  * @param {evalInstance} evalInstance contains `language` , `input`, and `code`.
  * @param {codeDirRelative} string module relative directory for storing code files.
  * @param {inputDirRelative} string module relative directory for storing input files.
  * @param {compileDirRelative} string module relative directory for storing compiled binary files.
  */
  constructor(evalInstance, codeDirRelative, inputDirRelative, compileDirRelative) {
    this.evalInstance = evalInstance;
    this.fileName = '';

    this.codeDir = path.resolve(parentModuleDirectory, codeDirRelative);
    this.inputDir = path.resolve(parentModuleDirectory, inputDirRelative);
    this.compileDir = path.resolve(parentModuleDirectory, compileDirRelative);

    this.languageEvaluator = languageEvaluatorObjects[evalInstance.language];

    this.resultSet = {
      stdout: '',
      stderr: '',
    };
  }

  instantiateLanguageEvaluator(id) {
    this.fileName = `${this.evalInstance.language}_${id}`;
    this.languageEvaluatorInstance = this.languageEvaluator(
      this.fileName,
      this.codeDir,
      this.inputDir,
      this.compileDir,
    );
  }

  /**
   * Saves a codefile with the corresponding `id`.
   *
   * @param {string} id used to identify code, input, binary files.
   * @async
   * @function
   */
  async saveCode(id) {
    try {
      this.fileName = await saveCodeFn(id, this.evalInstance, this.codeDir);
      this.instantiateLanguageEvaluator(id);
    } catch (Err) {
      throw Err;
    }
  }

  /**
   * Saves an input file with the corresponding `id`, with a `.input`
   * extension.
   * @param {string} id used to identify code, input, binary files.
   * @async
   * @function
   */
  async saveInput(id) {
    try {
      this.fileName = await saveInputFn(id, this.evalInstance, this.inputDir);
    } catch (Err) {
      throw Err;
    }
  }

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
      }
      console.error(`${this.evalInstance.language} does not need compilation`);
      return true;
    } catch (Err) {
      if (Err.code === 1) {
        this.resultSet.stdout = Err.stdout;
        this.resultSet.stderr = Err.stderr;
        return false;
      }
      Err.code = 'COMPILATION_ERROR';
      throw Err;
    }
  }

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
  }

  /**
   * Deletes the current CodeEvaluator object's associated code
   * and input files.
   *
   * @async
   * @function
   */
  async clearFiles() {
    try {
      if (fs.existsSync(path.resolve(this.codeDir, this.fileName))) {
        await fsUnlink(path.resolve(this.codeDir, this.fileName));
      }
      if (fs.existsSync(path.resolve(this.inputDir, `${this.fileName}.input`))) {
        await fsUnlink(path.resolve(this.inputDir, `${this.fileName}.input`));
      }
      if (fs.existsSync(path.resolve(this.inputDir, `${this.fileName}.out`))) {
        await fsUnlink(path.resolve(this.compileDir, `${this.fileName}.out`));
      }
    } catch (Err) {
      console.log(Err.message);
    }
  }
}


module.exports = CodeEvaluator;
