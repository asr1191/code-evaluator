const fs = require('fs');

const replInstanceLocation = './replInstances/';


function saveCode(id, evalInstance) {
  return new Promise((resolve, reject) => {
    
    let fileName = evalInstance.language + id;
    let fileLocation = replInstanceLocation + fileName;

    fs.writeFile(fileLocation, evalInstance.code, (err) => {
      if (err){
        throw err;
      } else {
        resolve(fileName);
      }
    })
  })
}

module.exports = saveCode;
