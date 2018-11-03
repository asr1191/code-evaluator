let languageFunctions = require('./lib/languages');
let saveCode = require('./lib/save-code');

function createEvaluator(evalInstance) {
  let evaluator = {
    'language': evalInstance.language,
    'input': evalInstance.input,
    'code': evalInstance.code,
    'fileName': '',
    'resultSet': '',

    'evaluateCode':function evaluateCode(id) {
      return new Promise((resolve, reject) => {
        saveCode(id, evalInstance).then((fileName)=>{
          this.fileName = fileName;
          let languageEvaluator = languageFunctions[this.language];
          this.resultSet = languageEvaluator(this.input, this.code, this.fileName);
          resolve();
        })
      }) 
    }
  };
  return evaluator;
}

module.exports = createEvaluator;
