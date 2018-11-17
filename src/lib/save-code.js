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

  if (!fs.existsSync(codeDir)) {
    const codeDirNoExistError = new Error('Codefile directory does not exists!');
    codeDirNoExistError.code = 'CODEDIR_NOEXIST';
    throw codeDirNoExistError;
  }

  try {
    await writeFile(codeLocation, evalInstance.code, { flag: 'wx' });
  } catch (codeFileWriteError) {
    codeFileWriteError.code = 'CODEFILE_NOWRITE';
    throw codeFileWriteError;
  }

  return fileName;
}

module.exports = saveCode;
