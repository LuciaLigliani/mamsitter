const express = require('express');
const authController = require('../controllers/authController');
const paymentController = require('../controllers/paymentController');

const router = express.Router();

// you need to authenticate
router.use(authController.protect);

router.use(authController.restrictTo('babysitter', 'badante', 'colf', 'famiglia'));

router.post('/', paymentController.createPayment);
router.delete('/:plan_id', paymentController.deletePayment);

module.exports = router;