let childProcess = require('child_process');
const replInstancesLocation = './replInstances';

function python2(fileName) {
  return new Promise((resolve, reject) =>{
    let codeLocation = `${replInstancesLocation}/userCode/${fileName}`;
    let inputLocation = `${replInstancesLocation}/inputFiles/${fileName}.input`;

    function handleExecOutput(err, stdout, stderr){  
      if (err){
        reject(err);
      } else {
        resolve({stdout, stderr})
      }
    }
    
    childProcess.exec(`python3 ${codeLocation} < ${inputLocation}`, handleExecOutput);
  });
}

module.exports = python2;