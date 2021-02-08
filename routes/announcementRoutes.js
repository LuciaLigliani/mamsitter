const express = require('express');
const announcementController = require('../controllers/announcementController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(announcementController.getAllAnnouncements)
  .post(authController.restrictTo('famiglia'), announcementController.createAnnouncement)
  .delete(announcementController.deleteAllAnnouncements);

router
  .route('/:id')
  .get(announcementController.getAnnouncement)
  .patch(announcementController.updateAnnouncement)
  .delete(announcementController.deleteAnnouncement);
  

  module.exports = router;
