const Application = require('../models/applicationModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.apply = catchAsync (async (req, res, next) => {
  const {announcement} = req;

  if(req.params.id === undefined) return next(new AppError('This route is not for the worker', 400));

  if(req.user.can) {
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
    return next(new AppError('You have to pay to performe this action', 402));
  }

  res.status(200).json({
    status: 'success',
    data: announcement
  });
});

exports.getAllApplications = catchAsync (async (req, res, next) => {
  let applications;
  if(req.user.role === 'famiglia') {
    req.query.announcement_id = req.params.id;
  } 
  if(req.user.role === 'babysitter' || req.user.role === 'badante' || req.user.role === 'colf') {
    if(req.params.id !== undefined) return next(new AppError('This route is not for the worker ', 400));
    req.query.user_id = req.user.id;
  }
  if(req.user.role === 'admin' && req.params.id !== undefined) {
    req.query.announcement_id = req.params.id;
  }

  applications = new APIFeatures(Application.find(), req.query).filter('generic');
  applications = await applications.query;

  res.status(200).json({
    status: 'success',
    results: applications.length,
    data: applications
  });
});

exports.getApplication = catchAsync (async (req, res, next) => {
  const application = await Application.findById(req.params.appId).populate({
    path: 'user_id'
  }).populate({
    path: 'announcement_id'
  });
  
  res.status(200).json({
    status: 'success',
    data: application
  });
});

exports.deleteApplication = catchAsync (async (req, res, next) => {
  await Application.findOneAndDelete({user_id: req.user.id, announcement_id: req.params.id});

  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.answer = catchAsync (async (req, res, next) => {
  const application = await Application.findByIdAndUpdate(req.application.id, { $set: { connection: req.params.answer }});

  res.status(200).json({
    status: 'success',
    data: application
  });
});