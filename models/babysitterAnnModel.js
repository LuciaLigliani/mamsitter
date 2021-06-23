const mongoose = require('mongoose');

// function isRegular() {
//   const result = this.typeWork === 'regolare' || this.typeWork === undefined;
//   return result;
// };

const babysitterAnnSchema = new mongoose.Schema(
  {
    children: {
      type: [
        {
          name: {
            type: String,
            trim: true,
            required: [true, 'You have to provide the children\'s name']
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
            required: [true, 'You have to provide the children\'s age'],
            min: [0, 'Age can\'t be less then 0'],
            max: [18, 'Age must be less or equals to 18']
          },
          description: {
            type: String,
            trim: true
          }
        }
      ],
      required: [true, 'You have to provide the children\'s informations']
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
          required: [true, 'You have to provide the days of the week when you need']
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
      default: ["italiano"]
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

babysitterAnnSchema.virtual('childrenNumber').get(function() {
  const number = this.children;
  return number.length;
});

babysitterAnnSchema.virtual('announcementType').get(function() {
  const type = "babysitter";
  return type;
});

// babysitterAnnSchema.pre('validate', function(next) {
//   // salva solo le info necessarie a seconda che sia un lavoro regolare o occasionale
//   if(this.typeWork === 'occasionale'){
//     this.endDate = undefined;
//   }
  
//   next();
// });

babysitterAnnSchema.pre('validate', function(next) {
  // trasformo gli array vuoti in undefined per far funzionare il required
  if (this.children.length === 0){
    this.children = undefined;
  }
  if (this.languages.length === 0){
    this.languages = undefined;
  }
  if (this.neededDays.length === 0){
    this.neededDays = undefined;
  }

  next();
});

babysitterAnnSchema.pre('findOneAndUpdate', function(next) {
  this.options.runValidators = true;
  this.options.new = true;
  this.options.context = 'query';
  next();
});

const babysitterAnn = mongoose.model('BabysitterAnn', babysitterAnnSchema);
module.exports = babysitterAnn;
