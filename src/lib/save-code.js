const fs = require('fs');
const {
  promisify,
} = require('util');

const writeFile = promisify(fs.writeFile);

const replInstanceLocation = './replInstances';

/**
 * Saves code into onto userCode and input into inputFiles directories
 * respectively, according to their language and id.
 *
 * Example: python2_134 and python2.134.input
 * @async
 * @param {string} id
 * @param {EvalInstance} evalInstance
 */
async function saveCode(id, evalInstance) {
  const fileName = `${evalInstance.language}_${id}`;
  const codeLocation = `${replInstanceLocation}/userCode/${fileName}`;
  const inputLocation = `${replInstanceLocation}/inputFiles/${fileName}.input`;

  try {
    await writeFile(codeLocation, evalInstance.code, { flag: 'wx' });
  } catch (codeWriteFileError) {
    codeWriteFileError.code = 'CODE_EXISTS';
    throw codeWriteFileError;
  }

  try {
    await writeFile(inputLocation, evalInstance.input, { flag: 'wx' });
  } catch (inputWriteFileError) {
    inputWriteFileError.code = 'INPUT_EXISTS';
    throw inputWriteFileError;
  }
  return fileName;
}

module.exports = saveCode;
