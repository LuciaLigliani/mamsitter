const AppError = require("../utils/appError");

const sendErrorDev = (err, res) => {
  res.status(err.statusCode). json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  })
};

const sendErrorProd = (err, res) => {
  // Sono gli errori creati da me attraverso appError
  if(err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  } else {
    // eslint-disable-next-line no-console
    console.error('ERROR!', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!'
    });
  }
};

const handleCastErrorDB = err => {
  return new AppError(`Invalid ${err.path}: ${err.value}.`, 400);
};

const handleDuplicateFieldsDB = () => {
  return new AppError('Duplicate field value. Please use another value!', 400);
};

const handleValidationErrorDB = err => {
  const errors = Object.values(err.errors).map(el => el.message);
  return new AppError(`Invalid input data. ${errors.join('.')}`, 400);
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  }else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };

    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
    // gestire il require 
    
    sendErrorProd(error, res);
  }
};
