function errorHandler(err, req, res, next) {
  console.error(`[Cart Service Error] ${req.method} ${req.url}:`, err);

  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({
    error: message,
  });
}

module.exports = errorHandler;
