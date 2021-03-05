const announcementService = require('../services/announcementService');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Famiglia = require('../models/famigliaModel');

exports.getAllAnnouncements = catchAsync (async (req, res, next) => {
  if(req.user.role === 'famiglia') {
    // ann creati da lei
    req.query.user_id = req.user.id;
  } else if(req.user.role !== 'admin') {
    // ann in base al ruolo
    req.query.typeAnnouncement = req.user.role;
  }
  
  const announcements = await announcementService.getAllAnnouncement(req);

  res.status(200).json({
    status: 'success',
    results: announcements.length,
    data: announcements
  });
});

exports.createAnnouncement = catchAsync (async (req, res, next) => {
  if (!req.user.can) {
    return next(new AppError('You have to pay to performe this action', 402));
  }

  // assign user to announcement
  const {body} = req;
  body.user_id = req.user.id;

  // assign location
  const user = await Famiglia.findById(req.user.famiglia_id);
  body.city = user.city;
  body.district = user.district;

  const newAnnouncement = await announcementService.createAnnouncement(body);

  res.status(201).json({
    status: 'success',
    data: newAnnouncement
  });
});

exports.getAnnouncement = catchAsync (async (req, res, next) => {
  const ann = await announcementService.getAnnouncement(req.params.id);

  if (!ann) {
    return next(new AppError('No announcement found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: ann
  });
});

exports.updateAnnouncement = catchAsync (async (req, res, next) => {
  const ann = await announcementService.updateAnnouncement(req.announcement, req.body);

  res.status(200).json({
    status: 'success',
    data: ann
  });
});

exports.deleteAnnouncement = catchAsync (async (req, res, next) => {
  await announcementService.deleteAnnouncement(req.announcement);

  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.deleteAllAnnouncements = catchAsync (async (req, res, next) => {
  await announcementService.deleteAnnouncements({});

  res.status(204).json({
    status: 'success',
    data: null
  });
});