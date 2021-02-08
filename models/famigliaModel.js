const mongoose = require('mongoose');
const validationFields = require('../utils/validationFields');

const famigliaSchema = new mongoose.Schema(
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
    description: {
      type: String,
      trim: true
    }
  },
  
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

famigliaSchema.virtual('role').get(function() {
  const role = "famiglia";
  return role;
});

famigliaSchema.pre('findOneAndUpdate', function(next) {
  this.options.runValidators = true;
  this.options.new = true;
  this.options.context = 'query';
  next();
});

// famigliaSchema.pre('validate', function(next) {
//   // trasformo gli array vuoti in undefined per far funzionare il required
//   if (this.availableDays.length === 0){
//     this.availableDays = undefined;
//   }
//   if (this.languages.length === 0){
//     this.languages = undefined;
//   }
//   if (this.ageRange.length === 0){
//     this.ageRange = undefined;
//   }

//   next();
// });

const famiglia = mongoose.model('Famiglia', famigliaSchema);
module.exports = famiglia;
