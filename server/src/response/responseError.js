const responseError = (statusCode, message, res) => {
  res.status(statusCode).json([
    {
      status: statusCode,
      message,
    },
  ]);
};

module.exports = responseError;
