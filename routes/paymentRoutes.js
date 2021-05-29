const express = require('express');
const authController = require('../controllers/authController');
const paymentController = require('../controllers/paymentController');

const router = express.Router();

// you need to authenticate
router.use(authController.protect);

// router.use(authController.restrictTo('babysitter', 'badante', 'colf', 'famiglia'));

router.post('/canApply', authController.restrictTo('babysitter', 'badante', 'colf'), paymentController.canApply);
router.post('/highlight', authController.restrictTo('babysitter', 'badante', 'colf'), paymentController.highlight);
router.post('/createAnn', authController.restrictTo('famiglia'), paymentController.createAnn);
router.post('/base', authController.restrictTo('famiglia'), paymentController.base);
router.post('/premium', authController.restrictTo('famiglia'), paymentController.premium);
// router.delete('/:plan_id', paymentController.deletePayment);

module.exports = router;