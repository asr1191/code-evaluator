languageEvaluatorList = require('./language-evaluator-list')

class CodeEvaluator {

  constructor(language, input, code){
    this.language = language
    this.input = input
    this.code = code
  }
  
  getInput()  {
    return this.input
  }
  
  getCode() {
    return this.code
  }

  getLanguage() {
    return this.getLanguage
  }
  
  setInput(input) {
    this.input = input
  }
  
  setCode(code) {
    this.code = code
  }
  
  setLanguage(language) {
    this.language = language
  }
  
  evaluateCode() {
    //TODO List compatibility for Input
    resultSet = languageEvaluatorList[this.getLanguage()]
    // (this.getInput(), this.getCode())
    return resultSet(this.getInput(), this.getCode())
  }
}

module.exports = CodeEvaluator