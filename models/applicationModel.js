const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    },
    announcement_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'Announcement',
      required: true
    },
    connection: Boolean
  }
);

applicationSchema.index({ user_id: 1, announcement_id:1 }, { unique: true });

applicationSchema.pre('findOneAndUpdate', function(next) {
  this.options.runValidators = true;
  this.options.new = true;
  this.options.context = 'query';
  next();
});

const Application = mongoose.model('Application', applicationSchema);
module.exports = Application;
