const announcementService = require('../services/announcementService');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllAnnouncements = catchAsync (async (req, res, next) => {
  // FIXME: la ricerca funziona solo per l'annuncio generico, non quello specifico
  const announcements = await announcementService.getAllAnnouncement(req);

  res.status(200).json({
    status: 'success',
    results: announcements.length,
    data: announcements
  });
});

exports.createAnnouncement = catchAsync (async (req, res, next) => {
  // assign user to announcement
  const {body} = req;
  body.user_id = req.user.id;

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
  const ann = await announcementService.updateAnnouncement(req.params.id, req.body);

  if (!ann) {
    return next(new AppError('No announcement found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: ann
  });
});

exports.deleteAnnouncement = catchAsync (async (req, res, next) => {
  const ann = await announcementService.deleteAnnouncement(req.params.id);

  if (!ann) {
    return next(new AppError('No announcement found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.deleteAllAnnouncements = catchAsync (async (req, res, next) => {
  await announcementService.deleteAllAnnouncements();

  res.status(204).json({
    status: 'success',
    data: null
  });
});
