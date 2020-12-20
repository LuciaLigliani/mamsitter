const Announcement = require('../models/announcementModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

exports.getAllAnnouncements = catchAsync (async (req, res, next) => {
  const features = new APIFeatures (Announcement.find(), req.query).filter().sort().limitFields().paginate();
  const announcements = await features.query;
  
  res.status(200).json({
    status: 'success',
    results: announcements.length,
    data: {
      announcements
    }
  });
});

exports.createAnnouncement = catchAsync (async (req, res, next) => {
  const newAnnouncement = await Announcement.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      announcement: newAnnouncement
    }
  });
});

exports.getAnnouncement = catchAsync (async (req, res, next) => {
  const announcement = await Announcement.findById(req.params.id);

  if (!announcement) {
    return next(new AppError('No announcement found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      announcement
    }
  });
});

exports.updateAnnouncement = catchAsync (async (req, res, next) => {
  const announcement = await Announcement.findByIdAndUpdate(req.params.id, req.body, { 
    new: true,
    runValidators: true
  });

  if (!announcement) {
    return next(new AppError('No announcement found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      announcement
    }
  });
});

exports.deleteAnnouncement = catchAsync (async (req, res, next) => {
  const announcement = await Announcement.findByIdAndDelete(req.params.id);

  if (!announcement) {
    return next(new AppError('No announcement found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.deleteAllAnnouncements = catchAsync (async (req, res, next) => {
  await Announcement.deleteMany({});

  res.status(204).json({
    status: 'success',
    data: null
  });
});
