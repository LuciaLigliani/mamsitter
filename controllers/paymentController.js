const Payment = require("../models/payment");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");


exports.createPayment = catchAsync (async (req, res, next) => {
  const payment = await Payment.create({
    user_id: req.user.id,
    kind: req.body.kind,
    plan_id: req.body.plan_id,
    subscription_id: req.body.subscription_id
  });

  let options;
  if(req.body.kind === 'highlight') options = { highlighted: true };
  else if(req.body.kind === 'createAnn') options = { can: true };
  else if(req.body.kind === 'apply') options = { can: true };
  else if(req.body.kind === 'base') options = { profile: "base" };
  else if(req.body.kind === 'premium') options = { profile: "premium" };
  else if(req.body.kind === 'topClass') options = { profile: "topClass" };

  const user = await User.findByIdAndUpdate(req.user.id, { $set: options });

  if(!user) {
    return next(new AppError('User not found', 404));
  }
  
  res.status(201).json({
    status: 'success',
    data: payment
  });
});

exports.deletePayment = catchAsync (async (req, res, next) => {
  const payment = await Payment.findOneAndDelete({user_id: req.user.id, plan_id: req.params.plan_id});
  
  let options;
  if(payment.kind === 'highlight') options = { highlighted: false };
  else if(payment.kind === 'createAnn') options = { can: false };
  else if(payment.kind === 'apply') options = { can: false };
  else if(payment.kind === 'base') options = { profile: "standard" };
  else if(payment.kind === 'premium') options = { profile: "base" };
  else if(payment.kind === 'topClass') options = { profile: "base" };

  const user = await User.findByIdAndUpdate(req.user.id, { $set: options });

  if(!user) {
    return next(new AppError('User not found', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});