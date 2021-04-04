const paymentService = require("../services/paymentService");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");


exports.canApply = catchAsync (async (req, res, next) => {
  const response = await paymentService.createPayment(req.user.id, 'apply', req.body.plan_id, req.body.subscription_id);

  if(!response.user) {
    return next(new AppError('User not found', 404));
  }
  
  res.status(201).json({
    status: 'success',
    data: response
  });
});

exports.highlight = catchAsync (async (req, res, next) => {
  const payment = {user_id: req.user.id, kind: 'highlight', plan_id: req.body.plan_id, subscription_id: req.body.subscription_id};
  const response = await paymentService.createPayment(payment);
  
  if(!response.user) {
    return next(new AppError('User not found', 404));
  }
  
  res.status(201).json({
    status: 'success',
    data: response
  });
});

exports.base = catchAsync (async (req, res, next) => {
  const response = await paymentService.createPayment(req.user.id, 'base', req.body.plan_id, req.body.subscription_id);

  if(!response.user) {
    return next(new AppError('User not found', 404));
  }
  
  res.status(201).json({
    status: 'success',
    data: response
  });
});

exports.premium = catchAsync (async (req, res, next) => {
  const response = await paymentService.createPayment(req.user.id, 'premium', req.body.plan_id, req.body.subscription_id);

  if(!response.user) {
    return next(new AppError('User not found', 404));
  }
  
  res.status(201).json({
    status: 'success',
    data: response
  });
});

exports.createAnn = catchAsync (async (req, res, next) => {
  const response = await paymentService.createPayment(req.user.id, 'createAnn', req.body.plan_id, req.body.subscription_id);

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