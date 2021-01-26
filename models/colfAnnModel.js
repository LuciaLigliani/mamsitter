const mongoose = require('mongoose');

function isOccasional() {
  return this.typeWork === 'occasionale';
};

function isRegular() {
  return this.typeWork === 'regolare';
};

// titolo, occasionale/regolare
const colfAnnSchema = new mongoose.Schema(
  {
    typeWork: {
      type: String,
      enum: {
        values: ['occasionale', 'regolare'],
        message: 'Type of work must be occasionale or regolare'
      },
      required: true
    },
    date: {
      type: Date,
      min: [Date.now(), 'Date must be after today'],
      required: isOccasional
    },
    when: {
      type: String,
      enum: {
        values: ['morning', 'afternoon'],
        message: 'Part of the day must be: morning or afternoon'
      },
      required: isOccasional
    },
    startDate: {
      type: Date,
      min: [Date.now(), 'Start date must be after today'],
      required: isRegular
    },
    endDate: {
      type: Date,
      min: [function() {
        return this.startDate;
      }, 'End date must be after start date'],
      required: isRegular,
    },
    neededDays: {
      type: [{
        weekDay: {
          type: String,
          enum: {
            values: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
            message: 'Week day must be: monday, tuesday, wednesday, thursday, friday, saturday or sunday'
          },
        },
        partOfDay: {
          type: String,
          enum: {
            values: ['morning', 'afternoon'],
            message: 'Part of the day must be: morning or afternoon'
          }
        }
      }],
      required: isRegular
    }
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
); 

colfAnnSchema.virtual('announcementType').get(function() {
  const type = "colf";
  return type;
});

colfAnnSchema.pre('validate', function(next) {
  // salva solo le info necessarie a seconda che sia un lavoro regolare o occasionale
  if(this.typeWork === 'regolare'){
    this.date = undefined;
    this.when = undefined;
  } else {
    this.startDate = undefined;
    this.endDate = undefined;
    this.neededDays = undefined;
  }
  
  next();
});

colfAnnSchema.pre('validate', function(next) {
  // trasformo gli array vuoti in undefined per far funzionare il required
  if (this.typeWork === 'regolare' && this.neededDays.length === 0){
    this.neededDays = undefined;
  }

  next();
});

colfAnnSchema.pre('findOneAndUpdate', function(next) {
  this.options.runValidators = true;
  this.options.new = true;
  this.options.context = 'query';
  next();
});

const colfAnn = mongoose.model('ColfAnn', colfAnnSchema);
module.exports = colfAnn;