// File: custom-error.js

class CustomError extends Error {
    constructor(code) {
      super();
      this.code = code;
    }
  }
  
  module.exports = CustomError;