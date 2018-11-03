let codeEvaluator = require('../index');

//can be used in an express get() or post() functions.
async function TestFunction(){
  let evalInstance = {
    language: 'testlanguage',
    input: 'jessal',
    code: 'name = raw_input()\nprint(name)'
  };

  let evaluator = codeEvaluator(evalInstance);
  await evaluator.evaluateCode(1)
  console.log(evaluator.resultSet)
  
}

TestFunction();