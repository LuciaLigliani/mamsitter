const express = require('express');
const announcementController = require('../controllers/announcementController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(authController.protect, announcementController.getAllAnnouncements)
  .post(authController.protect, authController.restrictTo('famiglia'), announcementController.createAnnouncement)
  .delete(announcementController.deleteAllAnnouncements);

router
  .route('/:id')
  .get(announcementController.getAnnouncement)
  .patch(announcementController.updateAnnouncement)
  .delete(announcementController.deleteAnnouncement);
  

  module.exports = router;
