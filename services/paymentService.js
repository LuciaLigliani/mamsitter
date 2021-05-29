const Payment = require("../models/payment");
const User = require("../models/userModel");

exports.createPayment = async (pay) => {
  const payment = await Payment.create(pay);
  let options;
  if(payment.kind === 'highlight') options = { highlighted: true };
  else if(payment.kind === 'createAnn') options = { can: true };
  else if(payment.kind === 'canApply') options = { can: true };
  else if(payment.kind === 'base') options = { profile: "base" };
  else if(payment.kind === 'premium') options = { profile: "premium" };

  const user = await User.findByIdAndUpdate(payment.user_id, { $set: options });

  if (!user) {
    return undefined;
  }
  
  return {
    payment,
    user
  };
};

// exports.deletePayment = catchAsync (async (req, res, next) => {
//   const payment = await Payment.findOneAndDelete({user_id: req.user.id, plan_id: req.params.plan_id});
  
//   let options;
//   if(payment.kind === 'highlight') options = { highlighted: false };
//   else if(payment.kind === 'createAnn') options = { can: false };
//   else if(payment.kind === 'apply') options = { can: false };
//   else if(payment.kind === 'base') options = { profile: "semplice" };
//   else if(payment.kind === 'premium') options = { profile: "base" };

//   const user = await User.findByIdAndUpdate(req.user.id, { $set: options });

//   if(!user) {
//     return next(new AppError('User not found', 404));
//   }

//   res.status(204).json({
//     status: 'success',
//     data: null
//   });
// });