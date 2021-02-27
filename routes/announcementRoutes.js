const express = require('express');
const Announcement = require("../models/announcementModel");
const announcementController = require('../controllers/announcementController');
const authController = require('../controllers/authController');
const applicationRouter = require('./applicationRoutes');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const router = express.Router();

// you need to authenticate
router.use(authController.protect);

// search for the ann. Error if it doesn't exist or if the user is a family and the ann isn't create from her
router.use('/:id', catchAsync( async function (req, res, next) {
  const ann = await Announcement.findById(req.params.id)
  if(!ann) {
    return next(new AppError('Announcement not found', 404));
  }

  if(req.user.role === 'famiglia' && ann.user_id.toString() !== req.user.id.toString()) {
    return next(new AppError('You can\'t get this announcement', 403));
  } if(req.user.role !== 'famiglia' && req.user.role !== 'admin' && ann.typeAnnouncement !== req.user.role) {
    return next(new AppError('You can\'t get this announcement', 403));
  }

  req.announcement = ann;
  next();
}));

router.use('/:id/applications', applicationRouter);


router
  .route('/')
  .get(announcementController.getAllAnnouncements)//DONE
  .post(authController.restrictTo('famiglia'), announcementController.createAnnouncement)//DONE
  .delete(authController.restrictTo('admin'), announcementController.deleteAllAnnouncements);//DONE

router
  .route('/:id')
  .get(announcementController.getAnnouncement)//DONE
  .patch(authController.restrictTo('famiglia'), announcementController.updateAnnouncement)//DONE
  .delete(authController.restrictTo('famiglia', 'admin'), announcementController.deleteAnnouncement);//DONE

module.exports = router;
