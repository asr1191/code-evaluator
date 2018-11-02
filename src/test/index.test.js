let codeEvaluator = require('../index');
async function TestFunction(){
  let evalInstance = {
    language: 'testlanguage',
    input: 'jessal',
    code: 'print(\'apple\')'
  };
  let evaluator = codeEvaluator(evalInstance);
  evaluator.evaluateCode(1).then(() => {
    console.log(evaluator.resultSet)
  });
}

TestFunction();