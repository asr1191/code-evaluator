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
async function saveCode(id, evalInstance, inputDir) {
  const fileName = `${evalInstance.language}_${id}`;
  const inputLocation = path.resolve(inputDir, `${fileName}.input`);

  try {
    await writeFile(inputLocation, evalInstance.input, { flag: 'wx' });
  } catch (inputWriteFileError) {
    inputWriteFileError.code = 'INPUT_EXISTS';
    throw inputWriteFileError;
  }
  return fileName;
}

module.exports = saveCode;
