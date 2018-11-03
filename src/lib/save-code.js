const fs = require('fs');
const { promisify } = require('util');

let writeFile = promisify(fs.writeFile);

const replInstanceLocation = './replInstances';

async function saveCode(id, evalInstance) {
    
    let fileName = evalInstance.language + id;
    let codeLocation = `${replInstanceLocation}/userCode/${fileName}`;
    let inputLocation = `${replInstanceLocation}/inputFiles/${fileName}.input`;

    await writeFile(codeLocation, evalInstance.code);
    await writeFile(inputLocation, evalInstance.input);
    return fileName;
}

module.exports = saveCode;
