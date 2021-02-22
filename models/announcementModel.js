const mongoose = require('mongoose');

function isForBabysitter() {
  return this.typeAnnouncement === 'babysitter';
};

function isForBadante() {
  return this.typeAnnouncement === 'badante';
};

function isForColf() {
  return this.typeAnnouncement === 'colf';
};

const announcementSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      unique: true,
      required: [true, 'An announcement must have a title'],
      trim: true
    },
    typeAnnouncement: {
      type: String,
      enum: {
        values: ['babysitter', 'badante', 'colf'],
        message: 'An announcement must be for a babysitter, badante or colf'
      },
      required: [true, 'Please provide the worker you need']
    },
    babysitterAnn_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'BabysitterAnn',
      required: [isForBabysitter, 'babysitterAnn_id is required']
    },
    badanteAnn_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'BadanteAnn',
      required: [isForBadante, 'badanteAnn_id is required']
    },
    colfAnn_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'ColfAnn',
      required: [isForColf, 'colfAnn_id is required']
    }
  },
  
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

announcementSchema.pre('save', function(next) {
  // salva solo le info necessarie
  if(this.typeAnnouncement === 'babysitter'){
    this.badanteAnn_id = undefined;
    this.colfAnn_id = undefined;
  } 
  else if (this.typeAnnouncement === 'badante') {
    this.colfAnn_id = undefined;
    this.babysitterAnn_id = undefined;
  }
  else{
    this.badanteAnn_id = undefined;
    this.babysitterAnn_id = undefined;
  }
  
  next();
});

// announcementSchema.pre(/^find/, function(next) {
//   this.populate({
//     path: 'user_id'
//   }).populate({
//     path: 'babysitterAnn_id'
//   }).populate({
//     path: 'badanteAnn_id'
//   }).populate({
//     path: 'colfAnn_id'
//   }).populate({
//     path: 'candidates'
//   });
  
//   next();
// });

announcementSchema.pre('findOneAndUpdate', function(next) {
  this.options.runValidators = true;
  this.options.new = true;
  this.options.context = 'query';
  next();
});

announcementSchema.virtual('candidates', {
  ref: 'Application',
  foreignField: 'announcement_id',
  localField: '_id'
});

const Announcement = mongoose.model('Announcement', announcementSchema);
module.exports = Announcement;
