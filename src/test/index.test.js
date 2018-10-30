let codeEvaluator = require('../index');

let evalInstance = {
  language: 'testlanguage',
  input: 'hello',
  code: 'world'
};
let evaluator = codeEvaluator(evalInstance);
console.log(evaluator.evaluateCode());