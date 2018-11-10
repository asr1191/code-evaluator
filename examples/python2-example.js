const codeEvaluator = require('../src/index');

// Paths to store code and inputs, which will later be run using the
// evaluate code method.
const codeDir = '../replInstances/codeFiles/';
const inputDir = '../replInstances/inputFiles/';

// can be used in an Express get() or post() functions.
async function expressPOST(res, req, next) {
  const evalInstance = {
    language: 'python2',
    input: 'jessal kid',
    code: 'name = raw_input().split(" ")\nprint(name[0] + " is a good " + name[1])',
  };
  // Calling CodeEvaluator constructor function with an EvalInstance as
  // arguement to return a CodeEvaluator object, along with paths to store
  // the user's code and inputs that are to be run against the code.
  const evaluator = codeEvaluator(evalInstance, codeDir, inputDir);

  // passing an ID of 1 to the evaluator object, so that each compile request
  // can be referred to using its ID
  try {
    await evaluator.evaluateCode(1);
    console.log(`stdout: ${evaluator.resultSet.stdout}`);
    console.log(`stderr: ${evaluator.resultSet.stderr}`);

  // MUST specify behavior on:
  //  1. Finding existing code file. (Error Code: CODE_EXISTS)
  //  2. Finding existing input file. (Error Code: INPUT_EXISTS)
  //  3. Compilers/interpreters not installed (Error Code: COMPINT_UNAVAILABLE)
  } catch (e) {
    if (e.code === 'CODE_EXISTS') {
      console.log('Codefile exists. Check ID');
      console.log(e.message);
    } else if (e.code === 'INPUT_EXISTS') {
      console.log(e.message);
      console.log('Input file exists. Check ID');
    } else if (e.code === 'COMPINT_UNAVAILABLE') {
      console.log(e.message);
      console.log('Compiler/Interpreter not installed, check installation.');
    }
  }
}

expressPOST();
