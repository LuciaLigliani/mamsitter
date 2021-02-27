const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');
const AppError = require("../utils/appError");
const util = require('../utils/util');
const userService = require('../services/userService');

exports.updateMyPassword = catchAsync (async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  // check if old password is correct
  if(!(await user.correctPassword(req.body.passwordCurrent, user.password))) return next(new AppError('Your current password is wrong.', 401));

  // update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  // passwordChangedAt is modified thanks to a pre save hook in user model

  util.createSendToken(user, 200, res);
});

exports.myProfile = catchAsync (async (req, res, next) => {
  const user = await userService.getUser(req.user.id);

  if (!user) {
    return next(new AppError('No user found!', 404));
  }

  res.status(200).json({
    status: 'success',
    data: user
  });
});

exports.updateMyProfile = catchAsync (async (req, res, next) => {
  const user = await userService.updateUser(req.user.id, req.body);

  if (!user) {
    return next(new AppError('No user found!', 404));
  }
  
  res.status(200).json({
    status: 'success',
    data: user
  });
});

exports.deleteAccount = catchAsync (async (req, res, next) => {
  const user = await userService.deleteUser(req.user.id);

  if (user === undefined) {
    return next(new AppError('No user found', 404));
  }

  if (user === false) {
    return next(new AppError('You can\'t delete your account', 403));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.deleteAllUsers = catchAsync (async (req, res, next) => {
  await userService.deleteAllUsers();

  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.beHighlighted = catchAsync (async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user.id, { $set: { highlighted: true } });

  if (!user) {
    return next(new AppError('No user found!', 404));
  }

  res.status(200).json({
    status: 'success',
    data: user
  });
});

exports.can = catchAsync (async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user.id, { $set: { can: true } });

  if (!user) {
    return next(new AppError('No user found!', 404));
  }

  res.status(200).json({
    status: 'success',
    data: user
  });
});

exports.bePremium = catchAsync (async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user.id, { $set: { profile: "premium" } });

  if (!user) {
    return next(new AppError('No user found!', 404));
  }

  res.status(200).json({
    status: 'success',
    data: user
  });
});

exports.beTopClass = catchAsync (async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user.id, { $set: { profile: "topClass" } });

  if (!user) {
    return next(new AppError('No user found!', 404));
  }

  res.status(200).json({
    status: 'success',
    data: user
  });
});

exports.beBase = catchAsync (async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user.id, { $set: { profile: "base" } });

  if (!user) {
    return next(new AppError('No user found!', 404));
  }

  res.status(200).json({
    status: 'success',
    data: user
  });
});

exports.getAllUsers = catchAsync (async (req, res, next) => {
  // if(req.user.role !== 'admin' && req.query.role === 'famiglia') req.query.role = undefined
  // if(req.user.role === 'famiglia') req.query.role = ''

  const users = await userService.getAllUsers(req);

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: users
  });
});