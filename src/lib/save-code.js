const fs = require('fs');
const {
  promisify,
} = require('util');

const writeFile = promisify(fs.writeFile);

const replInstanceLocation = './replInstances';

async function saveCode(id, evalInstance) {
  const fileName = `${evalInstance.language}_${id}`;
  const codeLocation = `${replInstanceLocation}/userCode/${fileName}`;
  const inputLocation = `${replInstanceLocation}/inputFiles/${fileName}.input`;

  try {
    await writeFile(codeLocation, evalInstance.code, { flag: 'wx' });
  } catch (codeWriteFileError) {
    throw codeWriteFileError;
    // console.error(`Could not write codeFile(ID:${id}):`, codeWriteFileError.message);
  }

  try {
    await writeFile(inputLocation, evalInstance.input, { flag: 'wx' });
  } catch (inputWriteFileError) {
    throw inputWriteFileError;
    // console.error(`Could not write inputFile(ID:${id}):`, inputWriteFileError.message);
  }
  return fileName;
}

module.exports = saveCode;
