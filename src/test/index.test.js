codeEvaluator = require('../index')

evaluator = new codeEvaluator('testlanguage','hello','world')
console.log(evaluator.evaluateCode())