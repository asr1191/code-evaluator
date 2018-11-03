let codeEvaluator = require('../index');

//can be used in an express get() or post() functions.
async function TestFunction(){
  let evalInstance = {
    language: 'python2',
    input: 'jessal kid',
    code: 'name = input().split(\" \")\nprint(name[0] + \" is a good \" + name[1])'
  };

  let evaluator = codeEvaluator(evalInstance);
  //passing an ID of 1 to the evaluator object, so that each compile request
  //can be referred to using its ID
  await evaluator.evaluateCode(1) 
  console.log("stdin: " + evalInstance.resultSet.stdin)
  console.log("stderr: " + evalInstance.resultSet.stderr)
  
}

TestFunction();