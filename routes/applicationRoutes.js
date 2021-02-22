const express = require('express');
const applicationController = require('../controllers/applicationController');
const authController = require('../controllers/authController');

const router = express.Router();

// you need to authenticate
router.use(authController.protect);

router.get('/', authController.restrictTo('babysitter', 'badante', 'colf'), applicationController.getMyApplications);
router.patch('/:id/:answer', authController.restrictTo('famiglia'), applicationController.answer);

router
  .route('/:annId')
  .get(authController.restrictTo('famiglia'), applicationController.getAllApplications)
  .post(authController.restrictTo('babysitter', 'badante', 'colf'), applicationController.apply)
  .delete(authController.restrictTo('babysitter', 'badante', 'colf'), applicationController.deleteApplication);

module.exports = router;