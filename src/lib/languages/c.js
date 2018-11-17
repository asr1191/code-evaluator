const childProcess = require('child_process');
const path = require('path');

function c(fileName, codeDir, inputDir, compileDir) {
  const languageEvaluatorObject = {
    isCompilable: true,
    codeFileLocation: path.resolve(codeDir, fileName),
    inputFileLocation: path.resolve(inputDir, `${fileName}.input`),
    compileFileLocation: path.resolve(compileDir, `${fileName}.out`),

    runCode: function runCode() {
      return new Promise((resolve, reject) => {
        function handleExecOutput(err, stdout, stderr) {
          if (err && err.code !== 1) {
            reject(err);
          } else {
            resolve({
              stdout,
              stderr,
            });
          }
        }
        childProcess.exec(`${this.compileFileLocation} < ${this.inputFileLocation}`, { timeout: 10000 }, handleExecOutput);
      });
    },

    compileCode: function compileCode() {
      return new Promise((resolve, reject) => {
        function handleExecOutput(err, stdout, stderr) {
          if (err) {
            if (err.code === 1) {
              const compileTimeError = err;
              compileTimeError.stdout = stdout;
              compileTimeError.stderr = stderr;
              resolve(compileTimeError);
            } else reject(err);
          } else {
            resolve({
              stdout,
              stderr,
            });
          }
        }
        childProcess.exec(`gcc -x c ${this.codeFileLocation} -o ${this.compileFileLocation}`, { timeout: 10000 }, handleExecOutput);
      });
    },
  };
  return languageEvaluatorObject;
}

module.exports = c;
