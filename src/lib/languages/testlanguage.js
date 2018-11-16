function testlanguage() {
  const languageEvaluatorObject = {
    isCompilable: false,
    testReject: false,

    runCode: function runCode() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (!this.testReject) {
            resolve({
              stdout: 'STDOUT Example Output',
              stderr: 'STDERR Example Output',
            });
          } else {
            reject(new Error('Sample Rejection Error in TestLanguage'));
          }
        }, 2000);
      });
    },
  };
  return languageEvaluatorObject;
}

module.exports = testlanguage;
