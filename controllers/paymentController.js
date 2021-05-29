const paymentService = require("../services/paymentService");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");


exports.canApply = catchAsync (async (req, res, next) => {
  const response = await paymentService.createPayment({
    user_id: req.user.id,
    kind: 'canApply',
    plan_id: 'P-80G68817K2061102UMCYXAQI',
    subscription_id: req.body.subscription_id
  });

  if(!response.user) {
    return next(new AppError('User not found', 404));
  }
  
  res.status(201).json({
    status: 'success',
    data: response
  });
});

exports.highlight = catchAsync (async (req, res, next) => {
  const response = await paymentService.createPayment({
    user_id: req.user.id, 
    kind: 'highlight', 
    plan_id: 'P-61489737A52057731MCYW5SY', 
    subscription_id: req.body.subscription_id});
  
  if(!response.user) {
    return next(new AppError('User not found', 404));
  }
  
  res.status(201).json({
    status: 'success',
    data: response
  });
});

exports.base = catchAsync (async (req, res, next) => {
  const response = await paymentService.createPayment({
    user_id: req.user.id, 
    kind: 'base', 
    plan_id: 'P-2J783879HX5071231MCYXCEY', 
    subscription_id: req.body.subscription_id});

  if(!response.user) {
    return next(new AppError('User not found', 404));
  }
  
  res.status(201).json({
    status: 'success',
    data: response
  });
});

exports.premium = catchAsync (async (req, res, next) => {
  const response = await paymentService.createPayment({
    user_id: req.user.id, 
    kind: 'premium', 
    plan_id: 'P-7BH41788FX881821MMCYXCWI', 
    subscription_id: req.body.subscription_id});

  if(!response.user) {
    return next(new AppError('User not found', 404));
  }
  
  res.status(201).json({
    status: 'success',
    data: response
  });
});

exports.createAnn = catchAsync (async (req, res, next) => {
  const response = await paymentService.createPayment({
    user_id: req.user.id, 
    kind: 'createAnn', 
    plan_id: 'P-3C772619M03970249MCYXBOQ', 
    subscription_id: req.body.subscription_id});

  if(!response.user) {
    return next(new AppError('User not found', 404));
  }
  
  res.status(201).json({
    status: 'success',
    data: response
  });
});

// exports.deletePayment = catchAsync (async (req, res, next) => {
//   const response = await paymentService.createPayment(req.user.id, 'highlight', req.body.plan_id, req.body.subscription_id);

//   if(!response.user) {
//     return next(new AppError('User not found', 404));
//   }
  
//   res.status(201).json({
//     status: 'success',
//     data: response
//   });
// });