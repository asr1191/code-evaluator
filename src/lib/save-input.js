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

  if (!fs.existsSync(inputDir)) {
    const inputDirNoExistError = new Error('Inputfile directory does not exists!');
    inputDirNoExistError.code = 'INPUTDIR_NOEXIST';
    throw inputDirNoExistError;
  }

  try {
    await writeFile(inputLocation, evalInstance.input, { flag: 'wx' });
  } catch (inputWriteFileError) {
    inputWriteFileError.code = 'INPUTFILE_NOWRITE';
    throw inputWriteFileError;
  }
  return fileName;
}

module.exports = saveCode;
