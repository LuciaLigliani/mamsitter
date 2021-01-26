const Announcement = require('../models/announcementModel');
const BabysitterAnn = require('../models/babysitterAnnModel');
const AnnouncementService = require('../services/announcementService');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
const ColfAnn = require('../models/colfAnnModel');
const BadanteAnn = require('../models/badanteAnnModel');

const myFunction = async (ann) => {
  const type = ann.typeAnnouncement;
  let found;
  if (type === 'babysitter') found = await BabysitterAnn.findById(ann.babysitterAnn_id);
  else if (type === 'badante') found = await BadanteAnn.findById(ann.badanteAnn_id);
  else if (type === 'colf') found = await ColfAnn.findById(ann.colfAnn_id);

  return {
    generalAnnouncement: ann,
    specificAnnouncement: found
  };
}

exports.getAllAnnouncements = catchAsync (async (req, res, next) => {
  // FIXME: la ricerca funziona solo per l'annuncio generico, non quello specifico
  const features = new APIFeatures (Announcement.find(), req.query).filter().sort().limitFields().paginate();

  const anns = await features.query;

  const announcements = await Promise.all(anns.map(myFunction));

  res.status(200).json({
    status: 'success',
    results: announcements.length,
    data: announcements
  });
});

exports.createAnnouncement = catchAsync (async (req, res, next) => {
  const newAnnouncement = await AnnouncementService.createAnnouncement(req.body);
  

  res.status(201).json({
    status: 'success',
    data: newAnnouncement
  });
});

exports.getAnnouncement = catchAsync (async (req, res, next) => {
  const ann = await Announcement.findById(req.params.id);

  if (!ann) {
    return next(new AppError('No announcement found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: await myFunction(ann)
  });
});

exports.updateAnnouncement = catchAsync (async (req, res, next) => {
  // FIXME: run validators
  const ann = await AnnouncementService.updateAnnouncement(req.params.id, req.body);

  if (!ann) {
    return next(new AppError('No announcement found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: ann
  });
});

exports.deleteAnnouncement = catchAsync (async (req, res, next) => {
  const ann = await AnnouncementService.deleteAnnouncement(req.params.id);

  if (!ann) {
    return next(new AppError('No announcement found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.deleteAllAnnouncements = catchAsync (async (req, res, next) => {
  await AnnouncementService.deleteAllAnnouncements();

  res.status(204).json({
    status: 'success',
    data: null
  });
});
