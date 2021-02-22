const express = require('express');
const announcementController = require('../controllers/announcementController');
const authController = require('../controllers/authController');

const router = express.Router();

// you need to authenticate
router.use(authController.protect);

router
  .route('/')
  .get(authController.restrictTo('babysitter', 'badante', 'colf'), announcementController.getAllAnnouncements)//DONE
  .post(authController.restrictTo('famiglia'), announcementController.createAnnouncement)
  .delete(announcementController.deleteAllAnnouncements);

router
  .route('/:id')
  .get(authController.restrictTo('babysitter', 'badante', 'colf'), announcementController.getAnnouncement)//DONE
  .patch(announcementController.updateAnnouncement)
  .delete(announcementController.deleteAnnouncement);

// TODO: you need to be an admin

  
// you need to be a family

// you need to be a worker
// router.use(authController.restrictTo('babysitter', 'badante', 'colf'));


module.exports = router;
