const mongoose = require('mongoose');

function isOccasional() {
  return this.typeWork === 'occasionale';
};

function isRegular() {
  return this.typeWork === 'regolare';
};

// titolo, figli, occasionale/regolare, compiti, cucinare, auto, lingue
const babysitterAnnSchema = new mongoose.Schema(
  {
    children: {
      type: [
        {
          // user_id
          name: {
            type: String,
            trim: true,
            required: true
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
            required: true,
            //min
            max: [15, 'Age must be less or equals to 15']
          },
          description: {
            type: String,
            trim: true
          }
          // type: mongoose.Schema.ObjectId,
          // ref: 'Children'
        }
      ],
      required: true
    },
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
        values: ['morning', 'afternoon', 'evening', 'night', 'allDay'],
        message: 'Part of the day must be: morning, afternoon, evening, night or allDay'
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
            values: ['morning', 'afternoon', 'evening', 'night'],
            message: 'Part of the day must be: morning, afternoon, evening or night'
          }
        }
      }],
      required: isRegular
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

babysitterAnnSchema.pre('validate', function(next) {
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

babysitterAnnSchema.pre('validate', function(next) {
  // trasformo gli array vuoti in undefined per far funzionare il required
  if (this.children.length === 0){
    this.children = undefined;
  }
  if (this.languages.length === 0){
    this.languages = undefined;
  }
  if (this.typeWork === 'regolare' && this.neededDays.length === 0){
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
