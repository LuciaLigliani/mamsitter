const mongoose = require('mongoose');

// function isRegular() {
//   const result = this.typeWork !== 'occasionale' || this.typeWork === undefined;
//   return result;
// };

const badanteAnnSchema = new mongoose.Schema(
  {
    senior: {
      type: [
        {
          name: {
            type: String,
            trim: true,
            required: [true, 'You have to provide the senior\'s name']
          },
          sex: {
            type: String,
            enum: {
              values: ['M', 'F'],
              message: 'Sex must be M or F'
            }
          },
          age: {
            type: Number,
            required: [true, 'You have to provide the senior\'s age'],
            max: [120, 'Age can\'t be more to 120'],
            min: [50, 'Age must be more or equals to 50']
          },
          description: {
            type: String,
            trim: true
          },
          selfSufficient: {
            type: Boolean,
            default: true
          }
        }
      ],
      required: [true, 'You have to provide the senior\'s informations']
    },
    typeWork: {
      type: String,
      enum: {
        values: ['parttimePom', 'parttimeMat', 'fulltime', 'convivenza', 'aChiamata', 'notturno', 'weekend'],
        message: 'Type of work must be parttimePom, parttimeMat, fulltime, convivenza, aChiamata, notturno or weekend'
      },
      required: [true, 'You have to provide the type work']
    },
    startDate: {
      type: Date,
      min: [Date.now(), 'Start date must be after today'],
      required: [true, 'You have to provide the start date']
    },
    endDate: {
      type: Date,
      min: [function() {
        return this.startDate;
      }, 'End date must be after start date'],
      // required: [isRegular, 'You have to provide the end date']
    },
    // TODO: togliere l'id
    neededDays: {
      type: [{
        weekDay: {
          type: String,
          enum: {
            values: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
            message: 'Week day must be: monday, tuesday, wednesday, thursday, friday, saturday or sunday'
          },
          required: [true, 'You have to provide the days of the week  when you need']
        },
        partOfDay: {
          type: String,
          enum: {
            values: ['morning', 'afternoon', 'evening', 'night'],
            message: 'Part of the day must be: morning, afternoon, evening or night'
          },
          required: [true, 'You have to provide the part of the day when you need']
        }
      }],
      required: [true, 'You have to provide when you need']
    },
    cook: {
      type: Boolean,
      default: false
    },
    car: {
      type: Boolean,
      default: false
    },
    alsoColf: {
      type: Boolean,
      default: false
    }
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

badanteAnnSchema.virtual('seniorNumber').get(function() {
  const number = this.senior;
  return number.length;
});

badanteAnnSchema.virtual('announcementType').get(function() {
  const type = "badante";
  return type;
});

// badanteAnnSchema.pre('validate', function(next) {
//   // salva solo le info necessarie a seconda che sia un lavoro regolare o occasionale
//   if(this.typeWork === 'occasionale'){
//     this.endDate = undefined;
//   }
  
//   next();
// });

badanteAnnSchema.pre('validate', function(next) {
  // trasformo gli array vuoti in undefined per far funzionare il required
  if (this.senior.length === 0){
    this.senior = undefined;
  }
  if (this.neededDays.length === 0){
    this.neededDays = undefined;
  }

  next();
});

badanteAnnSchema.pre('findOneAndUpdate', function(next) {
  this.options.runValidators = true;
  this.options.new = true;
  this.options.context = 'query';
  
  next();
});

const badanteAnn = mongoose.model('BadanteAnn', badanteAnnSchema);
module.exports = badanteAnn;
