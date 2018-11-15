const childProcess = require('child_process');
const path = require('path');

function python2(fileName, codeDir, inputDir) {
  const languageEvaluatorObject = {
    isCompilable: false,
    codeFileLocation: path.resolve(codeDir, fileName),
    inputFileLocation: path.resolve(inputDir, `${fileName}.input`),

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
      childProcess.exec(`python2 ${this.codeFileLocation} < ${this.inputFileLocation}`, { timeout: 10000 }, handleExecOutput);
    },
  };
  return languageEvaluatorObject;
}

module.exports = python2;
