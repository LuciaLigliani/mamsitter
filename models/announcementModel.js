const mongoose = require('mongoose');

function isForBabysitter() {
  return this.typeAnnouncement === 'babysitter';
};

function isForBadante() {
  return this.typeWork === 'badante';
};

function isForColf() {
  return this.typeAnnouncement === 'colf';
};

//id, user_id, titolo, tipo annuncio
const announcementSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      // type: mongoose.Schema.ObjectId,
      // ref: 'User',
      required: [true, 'This announcement must refer to a user']
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
      required: true
    },
    babysitterAnn_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'BabysitterAnn',
      required: isForBabysitter
    },
    badanteAnn_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'BabysitterAnn',
      required: isForBadante
    },
    colfAnn_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'colfAnn',
      required: isForColf
    }
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

announcementSchema.pre('findOneAndUpdate', function(next) {
  this.options.runValidators = true;
  this.options.new = true;
  // this.options.context = 'query';
  next();
});

const Announcement = mongoose.model('Announcement', announcementSchema);
module.exports = Announcement;
