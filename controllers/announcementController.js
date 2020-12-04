const Announcement = require('../models/announcementModel');

exports.getAllAnnouncement = async (req, res) => {
  try {
    // EXECUTE QUERY
    const announcements = await Announcement.find();

console.log(announcements);


    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: announcements.length,
      data: {
        announcements
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.createAnnouncement = async (req, res) => {
  try {
    const newAnnouncement = await Announcement.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        announcement: newAnnouncement
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};