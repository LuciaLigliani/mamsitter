const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    },
    kind: {
      type: String,
      trim: true,
      required: [true, 'Please provide the type of payment'],
      enum: ['highlight', 'createAnn', 'apply', 'base', 'premium', 'topClass']
    },
    plan_id: {
      type: String,
      require: [true, 'Please provide the plan id']
    },
    subscription_id: {
      type: String,
      require: [true, 'Please provide the subscription id']
    }
  }
);

paymentSchema.index({ user_id: 1, plan_id: 1 }, { unique: true });

paymentSchema.pre('findOneAndUpdate', function(next) {
  this.options.runValidators = true;
  this.options.new = true;
  this.options.context = 'query';
  next();
});

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;
