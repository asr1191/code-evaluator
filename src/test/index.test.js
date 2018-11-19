/* global describe it beforeEach before after */
const chai = require('chai');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const CodeEvaluator = require('../index.js');

const { expect } = chai;
const fsReaddir = promisify(fs.readdir);

const codeDir = './files';
const inputDir = './files';
const compileDir = './files';


describe('API Tests', () => {
  describe('Language support', () => {
    before(() => {
      if (!fs.existsSync(path.resolve(__dirname, './files'))) {
        fs.mkdirSync(path.resolve(__dirname, './files'));
      }
    });

    beforeEach(async () => {
      const codeFileNames = await fsReaddir(path.resolve(__dirname, codeDir));
      codeFileNames.forEach((filename) => {
        fs.unlinkSync(path.resolve(__dirname, codeDir, filename));
      });
      const inputFileNames = await fsReaddir(path.resolve(__dirname, inputDir));
      inputFileNames.forEach((filename) => {
        fs.unlinkSync(path.resolve(__dirname, inputDir, filename));
      });
      const compileFileNames = await fsReaddir(path.resolve(__dirname, compileDir));
      compileFileNames.forEach((filename) => {
        fs.unlinkSync(path.resolve(__dirname, compileDir, filename));
      });
    });

    after(() => {
      if (!fs.existsSync(path.resolve(__dirname, './files'))) {
        fs.rmdirSync(path.resolve(__dirname, './files'));
      }
    });

    it('Runs testlanguage program', async () => {
      const evalInstanceTestLanguage = {
        language: 'testlanguage',
        input: 'random input',
        code: 'random code',
      };
      const evaluator = new CodeEvaluator(evalInstanceTestLanguage, codeDir, inputDir, compileDir);
      await evaluator.saveCode(1);
      await evaluator.saveInput(1);
      if (await evaluator.compileCode()) {
        await evaluator.runCode();
      }
      await evaluator.clearFiles();
      expect(evaluator.resultSet.stdout).to.equal('STDOUT Example Output');
      expect(evaluator.resultSet.stderr).to.equal('STDERR Example Output');
    });

    it('Runs python2 program', async () => {
      const evalInstancePython2 = {
        language: 'python2',
        input: 'jessal kid',
        code: 'name = raw_input().split(" ")\nprint(name[0] + " is a good " + name[1])',
      };
      const evaluator = new CodeEvaluator(evalInstancePython2, codeDir, inputDir, compileDir);
      await evaluator.saveCode(1);
      await evaluator.saveInput(1);
      if (await evaluator.compileCode()) {
        await evaluator.runCode();
      }
      await evaluator.clearFiles();
      expect(evaluator.resultSet.stdout).to.equal('jessal is a good kid\n');
      expect(evaluator.resultSet.stderr).to.equal('');
    });

    it('Runs python3 program', async () => {
      const evalInstancePython3 = {
        language: 'python3',
        input: 'jessal kid',
        code: 'name = input().split(" ")\nprint(name[0] + " is a good " + name[1])',
      };
      const evaluator = new CodeEvaluator(evalInstancePython3, codeDir, inputDir, compileDir);
      await evaluator.saveCode(1);
      await evaluator.saveInput(1);
      if (await evaluator.compileCode()) {
        await evaluator.runCode();
      }
      await evaluator.clearFiles();
      expect(evaluator.resultSet.stdout).to.equal('jessal is a good kid\n');
      expect(evaluator.resultSet.stderr).to.equal('');
    });

    it('Runs C program', async () => {
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
      const evaluator = new CodeEvaluator(evalInstanceC, codeDir, inputDir, compileDir);
      await evaluator.saveCode(1);
      await evaluator.saveInput(1);
      if (await evaluator.compileCode()) {
        await evaluator.runCode();
      }
      await evaluator.clearFiles();
      expect(evaluator.resultSet.stdout).to.equal('Hello World!');
      expect(evaluator.resultSet.stderr).to.equal('');
    });

    it('Runs C++ program', async () => {
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
      const evaluator = new CodeEvaluator(evalInstanceCpp, codeDir, inputDir, compileDir);
      await evaluator.saveCode(1);
      await evaluator.saveInput(1);
      if (await evaluator.compileCode()) {
        await evaluator.runCode();
      }
      await evaluator.clearFiles();
      expect(evaluator.resultSet.stdout).to.equal('Hello Jessal!');
      expect(evaluator.resultSet.stderr).to.equal('');
    });
  });
});
