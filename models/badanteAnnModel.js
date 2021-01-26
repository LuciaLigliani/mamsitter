const mongoose = require('mongoose');

function isOccasional() {
  return this.typeWork === 'occasionale';
};

function isRegular() {
  return this.typeWork !== 'occasionale';
};

// titolo, anziano, occasionale/regolare, cucinare, auto
const badanteAnnSchema = new mongoose.Schema(
  {
    senior: {
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
          // type: mongoose.Schema.ObjectId,
          // ref: 'Senior'
        }
      ],
      required: true
    },
    typeWork: {
      type: String,
      enum: {
        values: ['occasionale', 'diurno', 'notturno', '24h', 'aOre'],
        message: 'Type of work must be occasionale, diurno, notturno, 24h or aOre'
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
      required: isRegular
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
    cook: {
      type: Boolean,
      default: false
    },
    car: {
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

badanteAnnSchema.pre('validate', function(next) {
  // salva solo le info necessarie a seconda che sia un lavoro regolare o occasionale
  if(this.typeWork === 'occasionale'){
    this.startDate = undefined;
    this.endDate = undefined;
    this.neededDays = undefined;
  } else {
    this.date = undefined;
    this.when = undefined;
  }
  
  next();
});

badanteAnnSchema.pre('validate', function(next) {
  // trasformo gli array vuoti in undefined per far funzionare il required
  if (this.senior.length === 0){
    this.senior = undefined;
  }
  if (this.typeWork === 'regolare' && this.neededDays.length === 0){
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
