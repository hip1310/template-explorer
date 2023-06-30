module.exports = {
  INVALID_SORT_COLUMN: {
    statusCode: 400, // Bad Request
    message: "Invlid sort by column",
  },
  INVALID_SORT_ORDER: {
    statusCode: 400, // Bad Request
    message: "Invlid sort order",
  },
  INTERNAL_ERROR: {
    statusCode: 500, // Internal Server Error
    message: "Internal Server Error",
  },
};
