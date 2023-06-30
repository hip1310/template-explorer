// File: error-handler.js

const errorCodes = require("../util/constants");

export const errorHandler =(err, req, res, next) =>{
  console.log("err",err)
  const code = (err && err.code) || null;
  const error = errorCodes[code] || errorCodes["INTERNAL_ERROR"];

  return res.status(error.statusCode).json({ message: error.message });
}

export default errorHandler
