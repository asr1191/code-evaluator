const fs = require('fs');

function writeCode(id, evalInstance) {
  let filename = evalInstance.language + id;
  fs.writeFile(filename, evalInstance.code, (err) => {
    if (err) throw err;
    console.log(`The file ${filename} has been saved!`);
    saveCode();
  });
}

function saveCode(){

}

module.exports = saveCode;