const fs = require('fs');
const path = require('path');
const {
  promisify,
} = require('util');

const writeFile = promisify(fs.writeFile);
/**
 * Saves code into onto userCode and input into inputFiles directories
 * respectively, according to their language and id.
 *
 * Example: python2_134 and python2.134.input
 * @async
 * @param {string} id
 * @param {EvalInstance} evalInstance
 */
async function saveCode(id, evalInstance, codeDir) {
  const fileName = `${evalInstance.language}_${id}`;
  const codeLocation = path.resolve(codeDir, fileName);

  try {
    await writeFile(codeLocation, evalInstance.code, { flag: 'wx' });
  } catch (codeWriteFileError) {
    codeWriteFileError.code = 'CODE_EXISTS';
    throw codeWriteFileError;
  }
  return fileName;
}

module.exports = saveCode;
