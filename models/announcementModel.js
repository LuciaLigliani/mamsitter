const mongoose = require('mongoose');


const announcementSchema = new mongoose.Schema(
  {
    children: [
      {
        name: String,
        sex: String,
        age: Number,
        description: String
        // type: mongoose.Schema.ObjectId,
        // ref: 'Children'
      }
    ],
    isOccasional: {
      type: Boolean,
      date: Date
    },
    isRegular: {
      //type: Boolean,
      startDate: Date,
      endDate: Date,
      weekDays: [String],
      partOfDay: [String]
    },
    homework: Boolean,
    night: Boolean,
    cook: Boolean,
    car: Boolean,
    languages: [String]
  }
);

// announcementSchema.virtual('childrenNumber').get(function() {
//   return this.children.lenght();
// });

const Announcement = mongoose.model('Announcement', announcementSchema);
module.exports = Announcement;