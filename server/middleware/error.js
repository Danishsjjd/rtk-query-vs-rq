const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (err, req, res, next) => {
  let message = err.message || "Interval server error";

  switch (err.name) {
    // mongoose validation
    case "ValidationError":
      for (field in err.errors) {
        message = err.errors[field].message;
      }
      err = new ErrorHandler(message, 400);
      break;
    // wrong mongodb id error
    case "CastError":
      message = `Resources not found with this id..Invalid ${err.path}`;
      err = new ErrorHandler(message, 400);
      break;
    // Duplicate key error
    case "MongoServerError":
      if (err.code === 11000) {
        message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400);
      } else {
        logger.error(err.message, err);
        err = new ErrorHandler(message, 500);
      }
      break;
    default:
      if (err.statusCode == undefined) err = new ErrorHandler(message, 500);
      break;
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
