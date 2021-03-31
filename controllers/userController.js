const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
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

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(path.join(__dirname, `public/img/users/${req.file.filename}`));

  next();
});

exports.getPhoto = catchAsync (async (req, res, next) => {
  const user = await userService.getUser(req.params.id);

  if (!user) {
    return next(new AppError('No user found!', 404));
  }

  const options = {
    root: path.join(__dirname, '../public'),
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  }

  const fileName = `/img/users/${req.params.filename}`;
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Sent:', fileName);
    }
  });
});

exports.updateMyProfile = catchAsync (async (req, res, next) => {
  if (req.file) req.body.photo = req.file.filename;
  const user = await userService.updateUser(req.user.id, req.body);

  if (user === undefined) {
    return next(new AppError('No user found!', 404));
  }
  
  res.status(200).json({
    status: 'success',
    data: user
  });
});

exports.deleteAccount = catchAsync (async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (user === undefined) {
    return next(new AppError('No user found', 404));
  }

  user.remove();

  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.getUser = catchAsync (async (req, res, next) => {
  const user = await userService.getUser(req.params.id);

  if (!user) {
    return next(new AppError('No user found!', 404));
  }

  if(req.user.role === 'famiglia' && user.role === 'famiglia') {
    return next(new AppError('You can\'t get this user!', 403));

  }

  res.status(200).json({
    status: 'success',
    data: user
  });
});

exports.deleteUser = catchAsync (async (req, res, next) => {
  const user = await userService.deleteUser(req.params.id);

  if (user === undefined) {
    return next(new AppError('No user found', 404));
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

exports.getAllUsersLessInfo = catchAsync (async (req, res, next) => {
  //req.query.fields = 'role,photo';
  const users = await userService.getAllUsers(req);

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: users
  });
});

exports.reviewWorker = catchAsync (async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError('No user found!', 404));
  }

  if(user.role === 'famiglia' || user.role === 'admin') {
    return next(new AppError('You can\'t review this user!', 403));
  }

  // if(user.profile === 'premium') {
  //   return next(new AppError('You have already reviewed this user!', 403));
  // }

  console.log(!req.body.review && !req.body.rate);
  if(!req.body.review && !req.body.rate) {
    user.profile = 'base';
  } else {
    if(req.body.rate > 5 || req.body.rate < 1) {
      return next(new AppError('Rate must be between 1 and 5', 400));
    }
    user.profile = 'premium';
  }

  

  user.review = req.body.review;
  user.rate = req.body.rate;
  user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: 'success',
    data: user
  });
});

// exports.updateReview = catchAsync (async (req, res, next) => {
//   const user = await User.findById(req.params.id);

//   if (!user) {
//     return next(new AppError('No user found!', 404));
//   }

//   if(user.role === 'famiglia' || user.role === 'admin') {
//     return next(new AppError('You can\'t review this user!', 403));
//   }

//   if(user.profile !== 'premium') {
//     return next(new AppError('You have not reviewed this user yet!', 403));
//   }

//   user.review = req.body.review;
//   user.rate = req.body.rate;
//   user.save({ validateBeforeSave: false });

//   res.status(200).json({
//     status: 'success',
//     data: user
//   });
// });

// exports.deleteReview = catchAsync (async (req, res, next) => {
//   const user = await User.findById(req.params.id);

//   if (!user) {
//     return next(new AppError('No user found!', 404));
//   }

//   if(user.role === 'famiglia' || user.role === 'admin') {
//     return next(new AppError('You can\'t review this user!', 403));
//   }

//   if(user.profile !== 'premium') {
//     return next(new AppError('You have not reviewed this user yet!', 403));
//   }

//   user.review = undefined;
//   user.rate = undefined;
//   user.profile = 'base';
//   user.save({ validateBeforeSave: false });

//   res.status(200).json({
//     status: 'success',
//     data: user
//   });
// });