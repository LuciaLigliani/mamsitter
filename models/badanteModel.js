const mongoose = require('mongoose');
const validator = require('validator');
const validationFields = require('../utils/validationFields');

const badanteSchema = new mongoose.Schema(
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
      validate: [validator.isMobilePhone, 'Please provide a valid phone number.'],
      required: [true, 'Please provide a phone number.']
    },
    description: {
      type: String,
      trim: true
    },
    parttimePom: Boolean,
    parttimeMat: Boolean,
    fulltime: Boolean,
    convivenza: Boolean,
    aChiamata: Boolean,
    notturno: Boolean,
    weekend: Boolean,
    // occasional: Boolean,
    // diurnal: Boolean,
    // nocturnal: Boolean,
    // allDay: Boolean,
    // atHour: Boolean,
    // TODO: togliere l'id
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
      }]
    },
    cook: Boolean,
    car: Boolean,
    moreSeniors: Boolean,
    beSelfSufficient: Boolean,
    alsoColf: Boolean
  },
  
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

badanteSchema.virtual('role').get(function() {
  const role = "badante";
  return role;
});

badanteSchema.pre('validate', function(next) {
  // trasformo gli array vuoti in undefined per far funzionare il required
  if (this.availableDays.length === 0){
    this.availableDays = undefined;
  }

  next();
});

badanteSchema.pre('findOneAndUpdate', function(next) {
  this.options.runValidators = true;
  this.options.new = true;
  this.options.context = 'query';
  next();
});

const badante = mongoose.model('Badante', badanteSchema);
module.exports = badante;
