const codeEvaluator = require('../src/index');

// Paths to store code and inputs, which will later be run using the
// saveCode() and runCode() methods.
const codeDir = '../replInstances/codeFiles/';
const inputDir = '../replInstances/inputFiles/';
const compileDir = '../replInstances/binaries/';

// can be used in an Express get() or post() functions.
async function expressPOST() {
  const evalInstance = {
    // testlanguage is an example language, which returns a sample STDOUT and
    // STDIN message, after a delay of 500ms.
    language: 'cpp',
    // input: 'jessal kid',
    // code: 'name = raw_input().split(" ")\nprint(name[0] + " is a good " + name[1])',
    input: 'Compilers',
    code: '#include<iostream>\n'
        + 'using namespace std;\n'
        + 'int main() {\n'
        + '   char name[10];'
        + '   cin >> name;\n'
        + '   cout << "Hello " << name < "!";\n'
        + ' return 0;\n'
        + '}',
  };
  // Calling CodeEvaluator constructor function with an EvalInstance as
  // arguement to return a CodeEvaluator object, along with paths to store
  // the user's code and inputs that are to be run against the code.
  const evaluator = codeEvaluator(evalInstance, codeDir, inputDir, compileDir);

  // passing an ID to the evaluator object, so that each compile request
  // can be referred to using its ID. Can be a number or string.
  const id = 13;
  try {
    await evaluator.saveCode(id);
    await evaluator.saveInput(id);
    await evaluator.compileCode();
    await evaluator.runCode();
    // await evaluator.runCode()
    // If evaluation should happen with existing code and input files, the
    // runCode() method can be called instead of saveCode()
    console.log(`stdout: ${evaluator.resultSet.stdout}`);
    console.log(`stderr: ${evaluator.resultSet.stderr}`);

    // Calling clearFiles() to delete the code, input, and binary files that were
    // created.
    await evaluator.clearFiles();

  // MUST specify behavior on:
  //  1. Finding existing code file. (Error Code: CODE_EXISTS)
  //  2. Finding existing input file. (Error Code: INPUT_EXISTS)
  //  3. Compilers/interpreters not installed (Error Code: COMPINT_UNAVAILABLE)
  } catch (e) {
    if (e.code === 'CODE_EXISTS') {
      console.log('Codefile exists. Check ID');
      console.log(e.stack);
    } else if (e.code === 'INPUT_EXISTS') {
      console.log(e.stack);
      console.log('Input file exists. Check ID');
    } else if (e.code === 'COMPINT_UNAVAILABLE') {
      console.log(e.stack);
      console.log('Compiler/Interpreter not installed, check installation.');
    } else if (e.code === 'COMP_ERROR') {
      console.log('Compilation Error!');
      console.log(`stdout: ${evaluator.resultSet.stdout}`);
      console.log(`stderr: ${evaluator.resultSet.stderr}`);
      await evaluator.clearFiles();
    } else {
      console.log(e.stack);
    }
  }
}

expressPOST();
