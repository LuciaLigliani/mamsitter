const mongoose = require('mongoose');

function isOccasional() {
  return this.typeWork === 'occasional';
};

function isRegular() {
  return this.typeWork === 'regular';
};

//user_id, figli, occasionale/regolare, compiti, notte, cucinare, auto, lingue
const announcementSchema = new mongoose.Schema(
  {
    // user_id
    title: {
      type: String,
      unique: true,
      required: [true, 'An announcement must have a title'],
      trim: true
    },
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
    // childrenNumber: {
    //   type: Number,
    //   default: function() {
    //     return this.children.length;
    //   }
    // },
    typeWork: {
      type: String,
      enum: {
        values: ['occasional', 'regular'],
        message: 'Type of work must be occasional or regular'
      },
      required: true
    },
    date: {
      type: Date,
      min: [Date.now(), 'Date must be after today'],
      required: isOccasional,
      // select: isOccasional('occasional')
    },
    when: {
      startDate: {
        type: Date,
        min: [Date.now(), 'Start date must be after today'],
        required: isRegular
      },
      endDate: {
        type: Date,
        min: [function() {
          return this.when.startDate;
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
              values: ['morning', 'afternoon', 'evening'],
              message: 'Part of the day must be: morning, afternoon or evening'
            }
          }
        }],
        required: isRegular
      }
    },
    homework: {
      type: Boolean,
      default: false
    },
    night: {
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

  // {
  //   toJSON: { virtuals: true },
  //   toObject: { virtuals: true }
  // }
);

// announcementSchema.virtual('childrenNumber').get(function() {
//   return this.children.lenght;
// });

announcementSchema.pre('save', function(next) {
  // salva solo le info necessarie a seconda che sia un lavoro regolare o occasionale
  if(this.typeWork === 'regular'){
    this.date = undefined;
  } else {
    this.when = undefined;
  }
  
  next();
});

announcementSchema.pre('validate', function(next) {
  // trasformo gli array vuoti in undefined per far funzionare il required
  if (this.children.length === 0){
    this.children = undefined;
  }
  if (this.languages.length === 0){
    this.languages = undefined;
  }
  if (this.when.neededDays.length === 0){
    this.when.neededDays = undefined;
  }

  next();
});

// announcementSchema.pre('', function (next) {
//   // trasformo gli array vuoti in undefined per far funzionare il required
//   if (this.children.length === 0){
//     this.children = undefined;
//   }
//   if (this.languages.length === 0){
//     this.languages = undefined;
//   }
//   if (this.when.neededDays.length === 0){
//     this.when.neededDays = undefined;
//   }

//   next();
// });

const Announcement = mongoose.model('Announcement', announcementSchema);
module.exports = Announcement;
