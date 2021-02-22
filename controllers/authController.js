const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const util = require('../utils/util');
const sendEmail = require('../utils/email');
const userService = require('../services/userService');

exports.signup = catchAsync(async (req, res, next) => {
  if(req.body.role === 'admin') {
    return next(new AppError('You can\'t sign up as admin!', 400));
  }

  const newUser = await userService.createUser(req.body);

  util.createSendToken(newUser, 201, res);
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

  util.createSendToken(user, 200, res);
});

// means that you have to authenticate
exports.protect = catchAsync(async (req, res, next) => {
  // getting token and check if it's there
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
      subject: 'Your password reset token (valid for an hour)',
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

  util.createSendToken(user, 200, res);
});

// exports.logout = (req, res) => {
//   res.cookie('jwt', 'loggedout', {
//     expires: new Date(Date.now() + 10 * 1000),
//     httpOnly: true
//   });
//   res.status(200).json({ status: 'success' });
// };