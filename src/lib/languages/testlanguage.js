module.exports = function testlanguage() {
  return new Promise((resolve) => {
    const resultSet = {
      stdout: 'SAMPLE STDOUT MESSAGE',
      stderr: 'SAMPLE STDERR MESSAGE',
    };
    setTimeout(() => {
      resolve(resultSet);
    }, 500);
  });
};
