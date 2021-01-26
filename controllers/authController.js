const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require("jsonwebtoken");
const User = require('../models/userModel');
const AppError = require("../utils/appError");
const catchAsync = require('../utils/catchAsync');
const sendEmail = require('../utils/email');

const signToken = id => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
}

const createSendToken = (user, statusCode, res) => {
  const token = signToken (user._id);

  res.status(statusCode).json({
    status: 'success',
    token,
    data: user
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  // FIXME: se metto una password minore di 8 mi da l'errore ValidatorError da gestire in prod
  // per non consentire di creare un profilo admin
  const newUser = await User.create( req.body// {
  //   email: req.body.email,
  //   password: req.body.password,
  //   passwordConfirm: req.body.passwordConfirm}
  );

  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  createSendToken(user, 200, res);
});

// you have to log in
exports.protect = catchAsync(async (req, res, next) => {
  // getting token and check of it's there
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not logged in! Please log in to get access.', 401));
  }

  // verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // check if user still exists
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) return next( new AppError('The user belonging to this token does no longer exist.', 401));

  // check if user changed password after the token was issued
  if (freshUser.changedPasswordAfter(decoded.iat)){
    return next(new AppError('User recently changed password! Please log in again.', 401));
  }
  
  req.user = freshUser;
  next();

});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) return next(new AppError('You do not have permission to perform this action', 403));

    next();
  };
};

exports.forgotPassword = catchAsync (async (req, res, next) => {
  // get user by email
  const user = await User.findOne({ email: req.body.email });
  if(!user) return next(new AppError('There is no user with this email address.', 404));

  // create password reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // send email
  const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;
  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`; 

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 min)',
      message
    });
  
    res.status(200).json({
      status: 'success',
      message: 'Token send to email!'
    });
  } catch(err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new AppError('There was an error sending the email. Please try again later!', 500));
  }

});

exports.resetPassword = catchAsync (async (req, res, next) => {
  // get user by the token and check if the token is not expire
  const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
  const user = await User.findOne({ passwordResetToken: hashedToken, passwordResetExpires: {$gt: Date.now()} });

  // set the new password only if the user exist and the token has not expire
  if (!user) return next(new AppError('The token is invalid or has expired', 400));
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // passwordChangedAt is modified thanks to a pre save hook in user model

  createSendToken(user, 200, res);
});

exports.updateMyPassword = catchAsync (async (req, res, next) => {
  // get user
  const user = await User.findById(req.user.id).select('+password');

  // check if old password is correct
  if(!(await user.correctPassword(req.body.passwordCurrent, user.password))) return next(new AppError('Your current password is wrong.', 401));

  // update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  // passwordChangedAt is modified thanks to a pre save hook in user model

  createSendToken(user, 200, res);
});