const fs = require('fs');
const {
  promisify,
} = require('util');

const writeFile = promisify(fs.writeFile);

const replInstanceLocation = './replInstances';

async function saveCode(id, evalInstance) {
  const fileName = evalInstance.language + id;
  const codeLocation = `${replInstanceLocation}/userCode/${fileName}`;
  const inputLocation = `${replInstanceLocation}/inputFiles/${fileName}.input`;

  await writeFile(codeLocation, evalInstance.code);
  await writeFile(inputLocation, evalInstance.input);
  return fileName;
}

module.exports = saveCode;
