module.exports = function testlanguage() {
  return new Promise((resolve) => {
    const resultSet = {
      stdout: 'jessal',
      stderr: '',
    };
    setTimeout(() => {
      resolve(resultSet);
    }, 500);
  });
};
