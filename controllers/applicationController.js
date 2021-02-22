const Application = require('../models/applicationModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const Announcement = require('../models/announcementModel');
const AppError = require('../utils/appError');

exports.getMyApplications = catchAsync (async (req, res, next) => {
  let application = new APIFeatures(Application.find({ user_id: req.user.id }), req.query).filter();
  application = await application.query
  
  res.status(200).json({
    status: 'success',
    results: application.length,
    data: application
  });
});

exports.answer = catchAsync (async (req, res, next) => {
  const application = await Application.findById(req.params.id);
  // const application = await Application.findByIdAndUpdate(req.params.id, { $set: { connection: req.params.answer } });

  if (!application) {
    return next(new AppError('There\'s no application!', 404));
  }

  // the announcement
  if(req.user.id !== application.announcement_id) return next(new AppError('You can\'t perform this action', 403));



  res.status(200).json({
    status: 'success',
    data: application
  });
});

exports.apply = catchAsync (async (req, res, next) => {
  let announcement;
  if(req.user.canApply) {
    announcement = await Announcement.findById(req.params.annId);

    if (!announcement) {
      return next(new AppError('No announcement found!', 404));
    }
      try{
        if(req.user.role === announcement.typeAnnouncement){
          await Application.create({
            user_id: req.user.id,
            announcement_id: announcement._id
          })
        } else {
          return next(new AppError('You can\'t apply for this announcement because you don\'t have the necessary requirements', 400));
        }
      } catch {
        return next(new AppError('You have already apply for this announcement', 400))
      }
  } else {
    return next(new AppError('You have to pay to performe this action', 403));
  }

  res.status(200).json({
    status: 'success',
    data: announcement
  });
});

exports.deleteApplication = catchAsync (async (req, res, next) => {
  const announcement = await Announcement.findById(req.params.annId);

  if (!announcement) {
    return next(new AppError('No announcement found!', 404));
  }

  const application = await Application.findOne({ user_id: req.user.id, announcement_id: announcement._id });

  if(application) {
    await Application.findOneAndDelete({ user_id: req.user.id, announcement_id: announcement._id });
  } else return next(new AppError('You have not applied for this announcement!', 404));

  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.getAllApplications = catchAsync (async (req, res, next) => {
  let application = new APIFeatures(Application.find({ announcement_id: req.params.annId }), req.query).filter();
  application = await application.query
  
  res.status(200).json({
    status: 'success',
    results: application.length,
    data: application
  });
});