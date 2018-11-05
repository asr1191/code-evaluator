const codeEvaluator = require('../index');

// can be used in an express get() or post() functions.
async function TestFunction() {
  const evalInstance = {
    language: 'python2',
    input: 'jessal kid',
    code: 'name = raw_input().split(" ")\nprint(name[0] + " is a good " + name[1])',
  };

  const evaluator = codeEvaluator(evalInstance);
  // passing an ID of 1 to the evaluator object, so that each compile request
  // can be referred to using its ID
  try {
    await evaluator.evaluateCode(1);
    console.log(`stdout: ${evaluator.resultSet.stdout}`);
    console.log(`stderr: ${evaluator.resultSet.stderr}`);
  } catch (e) {
    console.log('Red Alert!');
    if (e.code === 'EEXIST') {
      console.log('Compilation Error! Exiting!');
    }
  }
}

TestFunction();
