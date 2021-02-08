const AppError = require("../utils/appError");

const sendErrorDev = (err, req, res) => {
  //TODO: controllare
  // api
  // if(req.originalUrl.startsWith('/api')) {
    res.status(err.statusCode). json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    })
  // }

  // rendered website
  // console.error('ERROR', err);
  // return res.status(err.statusCode).render('error', {
  //   title: 'Something went wrong!',
  //   msg: err.message
  // });
};

const sendErrorProd = (err, req, res) => {
  //  api
  // if (req.originalUrl.startsWith('/api')) {
    // Sono gli errori creati da me attraverso appError
    if(err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      });
    } 
      // log error
      // eslint-disable-next-line no-console
      // console.error('ERROR!', err);
      // const ciao =
      // console.log(err.stack);
      // err.errors.email.properties

      res.status(500).json({
        status: 'error',
        message: 'Something went very wrong!'
      });
  // }

  // rendered website
  // if (err.isOperational) {
  //   return res.status(err.statusCode).render('error', {
  //     title: 'Something went wrong!',
  //     msg: err.message
  //   });
  // }
  // log error
  // console.error('ERROR 💥', err);
  // return res.status(err.statusCode).render('error', {
  //   title: 'Something went wrong!',
  //   msg: 'Please try again later.'
  // });
};

const handleCastErrorDB = err => {
  return new AppError(`Invalid ${err.path}: ${err.value}.`, 400);
};

const handleDuplicateFieldsDB = err => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  return new AppError(`Duplicate field value: ${value}. Please use another value!`, 400);
};

const handleValidationErrorDB = err => {
  const errors = Object.values(err.errors).map(el => el.message);
  return new AppError(`Invalid input data. ${errors.join('.')}`, 400);
};

const handlePathNotViableDB = () => {
  return new AppError('Path not viable', 400);
};

const handleJWTError = () =>
  new AppError('Invalid token. Please log in again!', 401);

const handleJWTExpiredError = () =>
  new AppError('Your token has expired! Please log in again.', 401);

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  }else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;

    if (err.name === 'CastError') error = handleCastErrorDB(err);
    if (err.code === 11000) error = handleDuplicateFieldsDB(err);
    if (err.name === 'ValidationError') error = handleValidationErrorDB(err);
    if (err.codeName === 'PathNotViable') error = handlePathNotViableDB(err);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();
    
    sendErrorProd(error, req, res);
  }
};
