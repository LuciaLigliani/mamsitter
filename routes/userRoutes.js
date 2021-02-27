const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

// you need to authenticate
router.use(authController.protect);

router
  .route('/myProfile') //DONE
  .get(userController.myProfile)
  .patch(userController.updateMyProfile)
  .delete(userController.deleteAccount)

router.patch('/updateMyPassword', userController.updateMyPassword);//DONE
// router.get('/logout', authController.logout);

// qualsiasi user
// /payment/worker/can... /payment/family/can...
router.patch('/payment/can', userController.can);//DONE
router.patch('/payment/premium', userController.bePremium);//DONE
router.patch('/payment/topClass', userController.beTopClass);//DONE

router.get('/', authController.restrictTo('admin', 'famiglia'), userController.getAllUsers);

// TODO: you need to be an admin
router.delete('/', authController.restrictTo('admin'), userController.deleteAllUsers);
// router.get('/', userController.getAllUsers);
// router.delete('/', userController.deleteAllUsers);

// you need to be a family
router.patch('/payment/base', authController.restrictTo('famiglia'), userController.beBase);//DONE

// you need to be a worker
router.use(authController.restrictTo('babysitter', 'badante', 'colf'));

router.patch('/payment/highlight', userController.beHighlighted);//DONE

module.exports = router;
