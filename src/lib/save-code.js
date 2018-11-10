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
async function saveCode(id, evalInstance, codeDir, inputDir) {
  const fileName = `${evalInstance.language}_${id}`;
  console.log(process.cwd());
  const codeLocation = path.resolve(process.cwd(), codeDir, fileName);
  const inputLocation = path.resolve(process.cwd(), inputDir, `${fileName}.input`);

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
