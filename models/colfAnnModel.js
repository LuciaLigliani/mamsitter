const mongoose = require('mongoose');

function isOccasional() {
  const result = this.typeWork === 'occasionale' || this.typeWork === undefined;
  return result;
};

function isRegular() {
  const result = this.typeWork === 'regolare' || this.typeWork === undefined;
  return result;
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
      required: [true, 'You have to provide the type work']
    },
    date: {
      type: Date,
      min: [Date.now(), 'Date must be after today'],
      required: [isOccasional, 'You have to provide the date']
    },
    when: {
      type: String,
      enum: {
        values: ['morning', 'afternoon'],
        message: 'Part of the day must be: morning or afternoon'
      },
      required: [isOccasional, 'You have to provide when you need']
    },
    startDate: {
      type: Date,
      min: [Date.now(), 'Start date must be after today'],
      required: [isRegular, 'You have to provide the start date']
    },
    endDate: {
      type: Date,
      min: [function() {
        return this.startDate;
      }, 'End date must be after start date'],
      required: [isRegular, 'You have to provide the end date']
    },
    neededDays: {
      type: [{
        weekDay: {
          type: String,
          enum: {
            values: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
            message: 'Week day must be: monday, tuesday, wednesday, thursday, friday, saturday or sunday'
          },
          required: [isRegular, 'You have to provide the days of th eweek when you need']
        },
        partOfDay: {
          type: String,
          enum: {
            values: ['morning', 'afternoon'],
            message: 'Part of the day must be: morning or afternoon'
          },
          required: [isRegular, 'You have to provide the part of the day when you need']
        }
      }],
      required: [isRegular, 'You have to provide when you need']
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