let languageEvaluatorList = require('./lib/language-evaluator-list');
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
          let languageEvaluator = languageEvaluatorList[this.language];
          this.resultSet = languageEvaluator(this.input, this.code, this.fileName);
          resolve();
        })
      }) 
    }
  };
  return evaluator;
}

module.exports = createEvaluator;
