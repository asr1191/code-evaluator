const childProcess = require('child_process');

const replInstancesLocation = './replInstances';

function python2(fileName) {
  return new Promise((resolve, reject) => {
    const codeLocation = `${replInstancesLocation}/userCode/${fileName}`;
    const inputLocation = `${replInstancesLocation}/inputFiles/${fileName}.input`;

    function handleExecOutput(err, stdout, stderr) {
      if (err) {
        console.log(`ERROR OBJ: ${err}`);
        reject(err);
      } else {
        resolve({
          stdout,
          stderr,
        });
      }
    }

    childProcess.exec(`python2 ${codeLocation} < ${inputLocation}`, handleExecOutput);
  });
}

module.exports = python2;
