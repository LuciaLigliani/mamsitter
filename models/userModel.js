const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
      ref: 'colf',
      required: [isColf, 'colf_id is required'] 
    },
    famiglia_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'famiglia',
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
    // active: {
    //   type: Boolean,
    //   default: true,
    //   select: false
    // }
  });

// userSchema.pre('validate', function(next){
//   if(!validator.isEmail(this.email)) next(new AppError('Incorrect email or password', 400));
//   else if(this.password[7] === undefined) next(new AppError('Password must be at least 8 character', 400));
//   else if(this.password !== this.passwordConfirm) next(new AppError('Passwords are not the same', 400));
//   next();
// });

userSchema.pre('save', function(next) {
  // salva solo le info necessarie
  if(this.role === 'babysitter'){
    this.famiglia_id = undefined;
    this.colf_id = undefined;
    this.badante_id = undefined;
    // if(this.babysitter_id === undefined) next(new AppError('babysitter_id is required', 400));
  } 
  else if (this.role === 'badante') {
    this.famiglia_id = undefined;
    this.babysitter_id = undefined;
    this.colf_id = undefined;
    // if(this.badante_id === undefined) next(new AppError('badante_id is required', 400));
  }
  else if (this.role === 'colf') {
    this.famiglia_id = undefined;
    this.babysitter_id = undefined;
    this.badante_id = undefined;
    // if(this.colf_id === undefined) next(new AppError('colf_id is required', 400));
  }
  else{
    this.babysitter_id = undefined;
    this.colf_id = undefined;
    this.badante_id = undefined;
    // if(this.famiglia_id === undefined) next(new AppError('famiglia_id is required', 400));
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
//   this.find({ active: { $ne: false } });
//   next();
// });

userSchema.pre('findOneAndUpdate', function(next) {
  this.options.runValidators = true;
  this.options.new = true;
  this.options.context = 'query';
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