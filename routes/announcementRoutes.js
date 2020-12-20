const express = require('express');
const announcementController = require('../controllers/announcementController');

const router = express.Router();

router
  .route('/')
  .get(announcementController.getAllAnnouncements)
  .post(announcementController.createAnnouncement)
  .delete(announcementController.deleteAllAnnouncements);

router
  .route('/:id')
  .get(announcementController.getAnnouncement)
  .patch(announcementController.updateAnnouncement)
  .delete(announcementController.deleteAnnouncement);

  module.exports = router;
