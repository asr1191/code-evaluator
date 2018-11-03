module.exports = function testlanguage(filename){
  return new Promise((resolve, reject) => {
    let resultSet = {
      stdout:'jessal',
      stderr:''
    }
    setTimeout(()=>{
      resolve(resultSet)
    },500);
  });
}