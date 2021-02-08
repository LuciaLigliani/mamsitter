const mongoose = require('mongoose');
const validator = require('validator');
const validationFields = require('../utils/validationFields');

const babysitterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Please provide a name']
    },
    surname: {
      type: String,
      trim: true,
      required: [true, 'Please provide a surname']
    },
    sex: {
      type: String,
      required: [true, 'Please provide the sex'],
      enum: {
        values: ['M', 'F'],
        message: 'Sex must be M or F'
      }
    },
    birthDate: {
      type: Date,
      min: [validationFields.minDate, 'You can\'t be more then 100 years old'],
      max: [validationFields.maxDate, 'You have to be more then 18 years old'],
      required: [true, 'Please provide your birth date.']
    },
    city: {
      type: String,
      trim: true,
      default: 'Milano',
      required: [true, 'Please provide a city.']
    },
    district: {
      type: String,
      required: [true, 'Please provide a correct district.'],
      enum: {
        values: ['district1', 'district2', 'district3'],
        message: 'District can be district1, district2 or district3'
      }
    },
    phoneNumber: {
      type: String,
      validate: [validator.isMobilePhone, 'Please provide a valid phone number.']
    },
    description: {
      type: String,
      trim: true
    },
    occasional: {
      type: Boolean,
      required: [true, 'Please provide if you are available to work occasionally.']
    },
    regular: {
      type: Boolean,
      required: [true, 'Please provide if you are available to work regularly.']
    },
    availableDays: {
      type: [{
        weekDay: {
          type: String,
          enum: {
            values: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
            message: 'Week day must be: monday, tuesday, wednesday, thursday, friday, saturday or sunday'
          },
          required: [true, 'Please provide the days of the week when you are available']
        },
        partOfDay: {
          type: String,
          enum: {
            values: ['morning', 'afternoon', 'evening', 'night'],
            message: 'Part of the day must be: morning, afternoon, evening or night'
          },
          required: [true, 'Please provide the part of the day when you are available']
        }
      }],
      required: [true, 'Please provide when you are available.']
    },
    homework: {
      type: Boolean,
      default: false
    },
    cook: {
      type: Boolean,
      default: false
    },
    car: {
      type: Boolean,
      default: false
    },
    languages: {
      type: [String],
      required: true
    },
    moreChildren: {
      type: Boolean,
      default: true
    },
    ageRange: {
      type: [Number],
      required: [true, 'Please provide a range of children\'s age'],
      validate: [validationFields.validateRange, 'You have to provide the right children\'s age range: children can be 15 or less.']
    }
  },
  
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

babysitterSchema.virtual('role').get(function() {
  const role = "babysitter";
  return role;
});

babysitterSchema.pre('validate', function(next) {
  // trasformo gli array vuoti in undefined per far funzionare il required
  if (this.availableDays.length === 0){
    this.availableDays = undefined;
  }
  if (this.languages.length === 0){
    this.languages = undefined;
  }
  if (this.ageRange.length === 0){
    this.ageRange = undefined;
  }

  next();
});

babysitterSchema.pre('findOneAndUpdate', function(next) {
  this.options.runValidators = true;
  this.options.new = true;
  this.options.context = 'query';
  next();
});

const babysitter = mongoose.model('Babysitter', babysitterSchema);
module.exports = babysitter;
