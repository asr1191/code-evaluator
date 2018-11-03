const fs = require('fs');
const { promisify } = require('util');

let writeFile = promisify(fs.writeFile);

const replInstanceLocation = './replInstances';

function saveCode(id, evalInstance) {
  return new Promise((resolve, reject) => {
    
    let fileName = evalInstance.language + id;
    let codeLocation = `${replInstanceLocation}/userCode/${fileName}`;
    let inputLocation = `${replInstanceLocation}/inputFiles/${fileName}.input`

    writeFile(codeLocation, evalInstance.code)
      .then(() => {
        writeFile(inputLocation, evalInstance.input)
          .then(() => {
            resolve(fileName)
          })
          .catch((err) => {
            throw err;
          })
      })
      .catch((err) => {
        throw err;
      });
  });
}

module.exports = saveCode;
