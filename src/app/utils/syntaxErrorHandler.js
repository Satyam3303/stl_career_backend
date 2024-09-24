// Middleware to handle syntax errors in JSON
const jsonSyntaxErrorHandler = (err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      logger.error(`Invalid JSON format: ${err.message}`);
      return res.status(400).json({
        status_code: 400,
        success: false,
        message: 'Invalid JSON format',
        error: err.message,
      });
    }
    next(err);
  };
  
  module.exports = jsonSyntaxErrorHandler;