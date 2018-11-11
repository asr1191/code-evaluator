const childProcess = require('child_process');
const path = require('path');

function python2(fileName, codeDir, inputDir) {
  return new Promise((resolve, reject) => {
    const codeFileLocation = path.resolve(codeDir, fileName);
    const inputFileLocation = path.resolve(inputDir, `${fileName}.input`);

    function handleExecOutput(err, stdout, stderr) {
      if (err) {
        reject(err);
      } else {
        resolve({
          stdout,
          stderr,
        });
      }
    }

    childProcess.exec(`python2 ${codeFileLocation} < ${inputFileLocation}`, { timeout: 10 }, handleExecOutput);
  });
}

module.exports = python2;
