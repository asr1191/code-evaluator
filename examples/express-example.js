/* eslint-disable no-unused-vars */
const CodeEvaluator = require('../src/index');

// Paths to store code and inputs, which will later be run using the
// saveCode() and runCode() methods.
const codeDir = '../evalInstanceFiles/codeFiles/';
const inputDir = '../evalInstanceFiles/inputFiles/';
const compileDir = '../evalInstanceFiles/compileFiles/';

// can be used in an Express get() or post() functions.
async function expressPOST() {
  // testlanguage is an example language, which returns a sample STDOUT and
  // STDIN message, after a delay of 2000ms.
  const evalInstanceTestLanguage = {
    language: 'testlanguage',
    input: 'random input',
    code: 'random code',
  };

  const evalInstancePython2 = {
    language: 'python2',
    input: 'jessal kid',
    code: 'name = raw_input().split(" ")\nprint(name[0] + " is a good " + name[1])',
  };

  const evalInstanceC = {
    language: 'c',
    input: 'World!',
    code: `#include <stdio.h>
    int main()
    {
      char word[20];
      scanf("%s", &word);
      printf("Hello %s", word);
      return 0;
    }`,
  };

  const evalInstanceCpp = {
    language: 'cpp',
    input: 'Jessal',
    code: `#include<iostream>
        using namespace std;
        int main() {
           char name[10];
           cin >> name;
           cout << "Hello " << name << "!";
         return 0;
        }`,
  };

  const evalInstanceCppHeapOverflow = {
    language: 'cpp',
    input: '',
    code: `char *a = malloc(100);
    char *b = malloc(100);
    char *c = malloc(100);
    for (int i = 0; i < 200; i++) {
        b[i] = 'Z';
    }`,
  };

  const evalInstanceCppSegmentation = {
    language: 'cpp',
    input: '',
    code: 'int main() { char *str;str = "GfG";*(str+1) = \'n\'; return 0; } ',
  };
  // Calling CodeEvaluator constructor function with an EvalInstance as
  // arguement to return a CodeEvaluator object, along with paths to store
  // the user's code and inputs that are to be run against the code.
  const evaluator = new CodeEvaluator(evalInstanceCpp, codeDir, inputDir, compileDir);

  // passing an ID to the evaluator object, so that each compile request
  // can be referred to using its ID. Can be a number or string.
  const id = 13;
  try {
    await evaluator.saveCode(id);
    await evaluator.saveInput(id);
    if (await evaluator.compileCode()) {
      await evaluator.runCode();
    }
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
    if (e.code === 'CODEDIR_NOEXIST') {
      console.error(e.message);
    } else if (e.code === 'CODEFILE_NOWRITE') {
      console.error(e.message);
    } else if (e.code === 'INPUTDIR_NOEXIST') {
      console.error(e.message);
    } else if (e.code === 'INPUTFILE_NOWRITE') {
      console.error(e.message);
    } else if (e.code === 'COMPILATION_ERROR') {
      console.error(e.message);
    } else if (e.code === 'CODERUN_ERROR') {
      console.error(e.message);
    } else {
      console.error(e.message);
    }
  } finally {
    await evaluator.clearFiles();
  }
}

expressPOST();
