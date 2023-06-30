// File: custom-error.js

export default class CustomError extends Error {
    constructor(code) {
      super();
      this.code = code;
    }
  }