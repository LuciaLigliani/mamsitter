const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const Babysitter = require('./babysitterModel');
const Badante = require('./badanteModel');
const Colf = require('./colfModel');
const Famiglia = require('./famigliaModel');
const Announcement = require('./announcementModel');
const Application = require('./applicationModel');

function isBabysitter() {
  return this.role === 'babysitter';
};

function isBadante() {
  return this.role === 'badante';
};

function isColf() {
  return this.role === 'colf';
};

function isFamiglia() {
  return this.role === 'famiglia';
};

// TODO: gestire l'admin
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Incorrect email or password']
    },
    role: {
      type: String,
      trim: true,
      required: [true, 'Please provide a role'],
      enum: ['babysitter', 'badante', 'colf', 'famiglia', 'admin']
    },
    password: {
      type: String,
      trim: true,
      required: [true, 'Please provide a password'],
      minlength: [8, 'Password must be at least 8 character'],
      select: false
    },
    passwordConfirm: {
      type: String,
      trim: true,
      required: [true, 'Please confirm your password'],
      validate: {
        // This only works on CREATE and SAVE!!!
        validator: function(el) {
          return el === this.password;
        }, 
        message: 'Passwords are not the same'
      }},
    babysitter_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'Babysitter',   
      required: [isBabysitter, 'babysitter_id is required'] 
    },
    badante_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'Badante',
      required: [isBadante, 'badante_id is required'] 
    },
    colf_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'Colf',
      required: [isColf, 'colf_id is required'] 
    },
    famiglia_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'Famiglia',
      required: [isFamiglia, 'famiglia_id is required'] 
    },
    passwordChangedAt: {
      type: Date,
      select: false
    },
    passwordResetToken: {
      type: String,
      select: false
    },
    passwordResetExpires: {
      type: String,
      select: false
    },
    profile: {
      type: String,
      required: true,
      enum: ['semplice', 'base', 'premium', 'topClas'],
      // controllare
      default: function() {
          return this.role === 'famiglia' ? 'semplice' : 'base';
        },
    },
    highlighted: {
      type: Boolean,
      default: false,
      required: true
    },
    can:{
      type: Boolean,
      default: false,
      required: true
    }
  },
  
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

userSchema.pre('save', function(next) {
  // salva solo le info necessarie
  if(this.role === 'babysitter'){
    this.famiglia_id = undefined;
    this.colf_id = undefined;
    this.badante_id = undefined;
  } 
  else if (this.role === 'badante') {
    this.famiglia_id = undefined;
    this.babysitter_id = undefined;
    this.colf_id = undefined;
  }
  else if (this.role === 'colf') {
    this.famiglia_id = undefined;
    this.babysitter_id = undefined;
    this.badante_id = undefined;
  }
  else{
    this.babysitter_id = undefined;
    this.colf_id = undefined;
    this.badante_id = undefined;
    this.highlighted = undefined;
  }
  
  next();
});

userSchema.pre('save', async function(next){
  if(!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function (next) {
  if(!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// userSchema.pre(/^find/, function(next) {
//   // this points to the current query
//   this.find({ role: { $ne: 'admin' } });
//   next();
// });

// userSchema.pre(/^find/, function(next) {
//   this.populate({
//     path: 'babysitter_id'
//   }).populate({
//     path: 'badante_id'
//   }).populate({
//     path: 'colf_id'
//   }).populate({
//     path: 'famiglia_id'
//   });
  
//   next();
// });

userSchema.pre('findOneAndUpdate', function(next) {
  this.options.runValidators = true;
  this.options.new = true;
  this.options.context = 'query';
  next();
});

userSchema.pre('remove', async function(next) {
  // delete specific user
  if (this.role === 'famiglia') {
    const ann = await Announcement.find({user_id: this._id});
    ann.remove();
    await Famiglia.findByIdAndDelete(this.famiglia_id);
  } else {
    await Application.findOneAndDelete({user_id: this._id});
    if (this.role === 'babysitter') await Babysitter.findByIdAndDelete(this.babysitter_id);
    if (this.role === 'badante') await Badante.findByIdAndDelete(this.badante_id);
    if (this.role === 'colf') await Colf.findByIdAndDelete(this.colf_id);
  }
  next();
});

userSchema.methods.correctPassword = async function( candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimeStamp) {
  if(this.passwordChangedAt){
    const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    // ritorna false se la password viene cambiata dopo 
    return JWTTimeStamp < changedTimeStamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function(){
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  // ho 1 ora per resettare la password
  this.passwordResetExpires = Date.now() + 60 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);
module.exports = User;