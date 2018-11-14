const childProcess = require('child_process');
const path = require('path');

function c(fileName, codeDir, inputDir, compileDir) {
  const languageEvaluatorObject = {
    codeFileLocation: path.resolve(codeDir, fileName),
    inputFileLocation: path.resolve(inputDir, `${fileName}.input`),
    compileFileLocation: path.resolve(compileDir, `${fileName}.out`),

    runCode: async function runCode() {
      function handleExecOutput(err, stdout, stderr) {
        if (err && err.code !== 1) {
          throw err;
        } else {
          return {
            stdout,
            stderr,
          };
        }
      }
      childProcess.exec(`${this.compileFileLocation} < ${this.inputFileLocation}`, { timeout: 10000 }, handleExecOutput);
    },

    compileCode: async function compileCode() {
      function handleExecOutput(err, stdout, stderr) {
        if (err) {
          throw err;
        } else {
          return {
            stdout,
            stderr,
          };
        }
      }
      childProcess.exec(`gcc ${this.codeFileLocation} -o ${this.compileFileLocation}`, { timeout: 10000 }, handleExecOutput);
    },
  };
  return languageEvaluatorObject;
}

module.exports = c;
