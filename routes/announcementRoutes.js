const express = require('express');
const announcementController = require('../controllers/announcementController');

const router = express.Router();

router
  .route('/')
  .get(announcementController.getAllAnnouncement)
  .post(announcementController.createAnnouncement);

  module.exports = router;