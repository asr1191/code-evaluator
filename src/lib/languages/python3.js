const childProcess = require('child_process');

const replInstancesLocation = './replInstances';

function python3(fileName) {
  return new Promise((resolve, reject) => {
    const codeLocation = `${replInstancesLocation}/userCode/${fileName}`;
    const inputLocation = `${replInstancesLocation}/inputFiles/${fileName}.input`;

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

    childProcess.exec(`python3 ${codeLocation} < ${inputLocation}`, { timeout: 10 }, handleExecOutput);
  });
}

module.exports = python3;
