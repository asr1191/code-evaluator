module.exports = function testlanguage(input, code, filename){
  return new Promise((resolve, reject) => {
    let resultSet = {
      stdout:input,
      stderr:''
    }
    setTimeout(()=>{
      resolve(resultSet)
    },500);
  });
}