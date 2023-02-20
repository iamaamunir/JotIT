exports.errorHandler = function (err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // Send an error response to the client
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
  next();
};
